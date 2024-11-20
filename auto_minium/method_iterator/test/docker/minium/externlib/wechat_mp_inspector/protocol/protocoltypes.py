
from __future__ import annotations
from typing import Any, Union, Dict, List
from dataclasses import dataclass
from ..event import BaseEvent
from .protocolcommand import ProtocolCommand, OPTIONAL, domainclass


__version__ = "1.3"

@domainclass
class Accessibility:
    """[Just CDP][Experimental]"""
    AXNodeId: str
    AXValueType: str
    AXValueSourceType: str
    AXValueNativeSourceType: str
    class AXValueSource:
        """A single source for a computed AX property."""
        type: Accessibility.AXValueSourceType
        value: Accessibility.AXValue
        attribute: str
        attributeValue: Accessibility.AXValue
        superseded: bool
        nativeSource: Accessibility.AXValueNativeSourceType
        nativeSourceValue: Accessibility.AXValue
        invalid: bool
        invalidReason: str
    
    class AXRelatedNode:
        backendDOMNodeId: DOM.BackendNodeId
        idref: str
        text: str
    
    class AXProperty:
        name: Accessibility.AXPropertyName
        value: Accessibility.AXValue
    
    class AXValue:
        """A single computed AX property."""
        type: Accessibility.AXValueType
        value: Any
        relatedNodes: list
        sources: list
    
    AXPropertyName: str
    class AXNode:
        """A node in the accessibility tree."""
        nodeId: Accessibility.AXNodeId
        ignored: bool
        ignoredReasons: list
        role: Accessibility.AXValue
        chromeRole: Accessibility.AXValue
        name: Accessibility.AXValue
        description: Accessibility.AXValue
        value: Accessibility.AXValue
        properties: list
        parentId: Accessibility.AXNodeId
        childIds: list
        backendDOMNodeId: DOM.BackendNodeId
        frameId: Page.FrameId
    
    class loadComplete(BaseEvent):
        """The loadComplete event mirrors the load complete event sent by the browser to assistive
technology when the web page has finished loading."""
        root: Accessibility.AXNode
    
    class nodesUpdated(BaseEvent):
        """The nodesUpdated event is sent every time a previously requested node has changed the in tree."""
        nodes: list
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables the accessibility domain."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables the accessibility domain which causes `AXNodeId`s to remain consistent between method calls.
This turns on accessibility for the page, which can impact performance until accessibility is disabled."""
        pass
    
    @dataclass
    class getPartialAXTree(ProtocolCommand):
        """Fetches the accessibility node and partial accessibility tree for this DOM node, if it exists."""
        nodeId: DOM.NodeId = OPTIONAL
        backendNodeId: DOM.BackendNodeId = OPTIONAL
        objectId: Runtime.RemoteObjectId = OPTIONAL
        fetchRelatives: bool = OPTIONAL
    
    @dataclass
    class getFullAXTree(ProtocolCommand):
        """Fetches the entire accessibility tree for the root Document"""
        depth: int = OPTIONAL
        frameId: Page.FrameId = OPTIONAL
    
    @dataclass
    class getRootAXNode(ProtocolCommand):
        """Fetches the root node.
Requires `enable()` to have been called previously."""
        frameId: Page.FrameId = OPTIONAL
    
    @dataclass
    class getAXNodeAndAncestors(ProtocolCommand):
        """Fetches a node and all ancestors up to and including the root.
Requires `enable()` to have been called previously."""
        nodeId: DOM.NodeId = OPTIONAL
        backendNodeId: DOM.BackendNodeId = OPTIONAL
        objectId: Runtime.RemoteObjectId = OPTIONAL
    
    @dataclass
    class getChildAXNodes(ProtocolCommand):
        """Fetches a particular accessibility node by AXNodeId.
Requires `enable()` to have been called previously."""
        id: Accessibility.AXNodeId
        frameId: Page.FrameId = OPTIONAL
    
    @dataclass
    class queryAXTree(ProtocolCommand):
        """Query a DOM node's accessibility subtree for accessible name and role.
This command computes the name and role for all nodes in the subtree, including those that are
ignored for accessibility, and returns those that mactch the specified name and role. If no DOM
node is specified, or the DOM node does not exist, the command returns an error. If neither
`accessibleName` or `role` is specified, it returns all the accessibility nodes in the subtree."""
        nodeId: DOM.NodeId = OPTIONAL
        backendNodeId: DOM.BackendNodeId = OPTIONAL
        objectId: Runtime.RemoteObjectId = OPTIONAL
        accessibleName: str = OPTIONAL
        role: str = OPTIONAL
    

@domainclass
class Animation:
    class Animation:
        """Animation instance."""
        id: str
        name: str
        pausedState: bool
        playState: str
        playbackRate: int
        startTime: int
        currentTime: int
        type: str
        source: Animation.AnimationEffect
        cssId: str
        animationId: Animation.AnimationId
        cssAnimationName: str
        cssTransitionProperty: str
        effect: Animation.Effect
        stackTrace: Console.StackTrace
    
    class AnimationEffect:
        """AnimationEffect instance"""
        delay: int
        endDelay: int
        iterationStart: int
        iterations: int
        duration: int
        direction: str
        fill: str
        backendNodeId: DOM.BackendNodeId
        keyframesRule: Animation.KeyframesRule
        easing: str
    
    class KeyframesRule:
        """Keyframes Rule"""
        name: str
        keyframes: list
    
    class KeyframeStyle:
        """Keyframe Style"""
        offset: str
        easing: str
    
    AnimationId: str
    AnimationState: str
    PlaybackDirection: str
    FillMode: str
    class Effect:
        startDelay: int
        endDelay: int
        iterationCount: int
        iterationStart: int
        iterationDuration: int
        timingFunction: str
        playbackDirection: Animation.PlaybackDirection
        fillMode: Animation.FillMode
        keyframes: list
    
    class Keyframe:
        offset: int
        easing: str
        style: str
    
    class TrackingUpdate:
        trackingAnimationId: Animation.AnimationId
        animationState: Animation.AnimationState
        nodeId: DOM.NodeId
        animationName: str
        transitionProperty: str
    
    class animationCanceled(BaseEvent):
        """Event for when an animation has been cancelled."""
        id: str
    
    class animationCreated(BaseEvent):
        """Event for each animation that has been created."""
        id: str
        animation: Animation.Animation
    
    class animationStarted(BaseEvent):
        """Event for animation that has been started."""
        animation: Animation.Animation
    
    class nameChanged(BaseEvent):
        """Dispatched whenever `Animation.prototype.set id` is called."""
        animationId: Animation.AnimationId
        name: str
    
    class effectChanged(BaseEvent):
        """Dispatched whenever the effect of any animation is changed in any way."""
        animationId: Animation.AnimationId
        effect: Animation.Effect
    
    class targetChanged(BaseEvent):
        """Dispatched whenever the target of any effect of any animation is changed in any way."""
        animationId: Animation.AnimationId
    
    class animationDestroyed(BaseEvent):
        """Dispatched whenever a `WebAnimation` is destroyed."""
        animationId: Animation.AnimationId
    
    class trackingStart(BaseEvent):
        """Dispatched after `startTracking` command."""
        timestamp: int
    
    class trackingUpdate(BaseEvent):
        """Fired for each phase of Web Animation."""
        timestamp: int
        event: Animation.TrackingUpdate
    
    class trackingComplete(BaseEvent):
        """Dispatched after `stopTracking` command."""
        timestamp: int
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables animation domain notifications."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables animation domain notifications."""
        pass
    
    @dataclass
    class getCurrentTime(ProtocolCommand):
        """[Just CDP] Returns the current time of the an animation."""
        id: str
    
    @dataclass
    class getPlaybackRate(ProtocolCommand):
        """[Just CDP] Gets the playback rate of the document timeline."""
        pass
    
    @dataclass
    class releaseAnimations(ProtocolCommand):
        """[Just CDP] Releases a set of animations to no longer be manipulated."""
        animations: list
    
    @dataclass
    class resolveAnimation(ProtocolCommand):
        """Gets the remote object of the Animation."""
        animationId: str
        objectGroup: str = OPTIONAL
    
    @dataclass
    class seekAnimations(ProtocolCommand):
        """[Just CDP] Seek a set of animations to a particular time within each animation."""
        animations: list
        currentTime: int
    
    @dataclass
    class setPaused(ProtocolCommand):
        """[Just CDP] Sets the paused state of a set of animations."""
        animations: list
        paused: bool
    
    @dataclass
    class setPlaybackRate(ProtocolCommand):
        """[Just CDP] Sets the playback rate of the document timeline."""
        playbackRate: int
    
    @dataclass
    class setTiming(ProtocolCommand):
        """[Just CDP] Sets the timing of an animation node."""
        animationId: str
        duration: int
        delay: int
    
    @dataclass
    class requestEffectTarget(ProtocolCommand):
        """[Just WIP] Gets the `DOM.NodeId` for the target of the effect of the animation with the given `AnimationId`."""
        animationId: Animation.AnimationId
    
    @dataclass
    class startTracking(ProtocolCommand):
        """[Just WIP] Start tracking animations. This will produce a `trackingStart` event."""
        pass
    
    @dataclass
    class stopTracking(ProtocolCommand):
        """[Just WIP] Stop tracking animations. This will produce a `trackingComplete` event."""
        pass
    

@domainclass
class Audits:
    """[Just CDP][Experimental] Audits domain allows investigation of page violations and possible improvements."""
    class AffectedCookie:
        """Information about a cookie that is affected by an inspector issue."""
        name: str
        path: str
        domain: str
    
    class AffectedRequest:
        """Information about a request that is affected by an inspector issue."""
        requestId: Network.RequestId
        url: str
    
    class AffectedFrame:
        """Information about the frame affected by an inspector issue."""
        frameId: Page.FrameId
    
    CookieExclusionReason: str
    CookieWarningReason: str
    CookieOperation: str
    class CookieIssueDetails:
        """This information is currently necessary, as the front-end has a difficult
time finding a specific cookie. With this, we can convey specific error
information without the cookie."""
        cookie: Audits.AffectedCookie
        rawCookieLine: str
        cookieWarningReasons: list
        cookieExclusionReasons: list
        operation: Audits.CookieOperation
        siteForCookies: str
        cookieUrl: str
        request: Audits.AffectedRequest
    
    MixedContentResolutionStatus: str
    MixedContentResourceType: str
    class MixedContentIssueDetails:
        resourceType: Audits.MixedContentResourceType
        resolutionStatus: Audits.MixedContentResolutionStatus
        insecureURL: str
        mainResourceURL: str
        request: Audits.AffectedRequest
        frame: Audits.AffectedFrame
    
    BlockedByResponseReason: str
    class BlockedByResponseIssueDetails:
        """Details for a request that has been blocked with the BLOCKED_BY_RESPONSE
code. Currently only used for COEP/COOP, but may be extended to include
some CSP errors in the future."""
        request: Audits.AffectedRequest
        parentFrame: Audits.AffectedFrame
        blockedFrame: Audits.AffectedFrame
        reason: Audits.BlockedByResponseReason
    
    HeavyAdResolutionStatus: str
    HeavyAdReason: str
    class HeavyAdIssueDetails:
        resolution: Audits.HeavyAdResolutionStatus
        reason: Audits.HeavyAdReason
        frame: Audits.AffectedFrame
    
    ContentSecurityPolicyViolationType: str
    class SourceCodeLocation:
        scriptId: Runtime.ScriptId
        url: str
        lineNumber: int
        columnNumber: int
    
    class ContentSecurityPolicyIssueDetails:
        blockedURL: str
        violatedDirective: str
        isReportOnly: bool
        contentSecurityPolicyViolationType: Audits.ContentSecurityPolicyViolationType
        frameAncestor: Audits.AffectedFrame
        sourceCodeLocation: Audits.SourceCodeLocation
        violatingNodeId: DOM.BackendNodeId
    
    SharedArrayBufferIssueType: str
    class SharedArrayBufferIssueDetails:
        """Details for a issue arising from an SAB being instantiated in, or
transferred to a context that is not cross-origin isolated."""
        sourceCodeLocation: Audits.SourceCodeLocation
        isWarning: bool
        type: Audits.SharedArrayBufferIssueType
    
    class LowTextContrastIssueDetails:
        violatingNodeId: DOM.BackendNodeId
        violatingNodeSelector: str
        contrastRatio: int
        thresholdAA: int
        thresholdAAA: int
        fontSize: str
        fontWeight: str
    
    class CorsIssueDetails:
        """Details for a CORS related issue, e.g. a warning or error related to
CORS RFC1918 enforcement."""
        corsErrorStatus: Network.CorsErrorStatus
        isWarning: bool
        request: Audits.AffectedRequest
        location: Audits.SourceCodeLocation
        initiatorOrigin: str
        resourceIPAddressSpace: Network.IPAddressSpace
        clientSecurityState: Network.ClientSecurityState
    
    AttributionReportingIssueType: str
    class AttributionReportingIssueDetails:
        """Details for issues around "Attribution Reporting API" usage.
Explainer: https://github.com/WICG/attribution-reporting-api"""
        violationType: Audits.AttributionReportingIssueType
        request: Audits.AffectedRequest
        violatingNodeId: DOM.BackendNodeId
        invalidParameter: str
    
    class QuirksModeIssueDetails:
        """Details for issues about documents in Quirks Mode
or Limited Quirks Mode that affects page layouting."""
        isLimitedQuirksMode: bool
        documentNodeId: DOM.BackendNodeId
        url: str
        frameId: Page.FrameId
        loaderId: Network.LoaderId
    
    class NavigatorUserAgentIssueDetails:
        url: str
        location: Audits.SourceCodeLocation
    
    GenericIssueErrorType: str
    class GenericIssueDetails:
        """Depending on the concrete errorType, different properties are set."""
        errorType: Audits.GenericIssueErrorType
        frameId: Page.FrameId
        violatingNodeId: DOM.BackendNodeId
        violatingNodeAttribute: str
        request: Audits.AffectedRequest
    
    class DeprecationIssueDetails:
        """This issue tracks information needed to print a deprecation message.
https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/frame/third_party/blink/renderer/core/frame/deprecation/README.md"""
        affectedFrame: Audits.AffectedFrame
        sourceCodeLocation: Audits.SourceCodeLocation
        type: str
    
    class BounceTrackingIssueDetails:
        """This issue warns about sites in the redirect chain of a finished navigation
that may be flagged as trackers and have their state cleared if they don't
receive a user interaction. Note that in this context 'site' means eTLD+1.
For example, if the URL `https://example.test:80/bounce` was in the
redirect chain, the site reported would be `example.test`."""
        trackingSites: list
    
    ClientHintIssueReason: str
    class FederatedAuthRequestIssueDetails:
        federatedAuthRequestIssueReason: Audits.FederatedAuthRequestIssueReason
    
    FederatedAuthRequestIssueReason: str
    class FederatedAuthUserInfoRequestIssueDetails:
        federatedAuthUserInfoRequestIssueReason: Audits.FederatedAuthUserInfoRequestIssueReason
    
    FederatedAuthUserInfoRequestIssueReason: str
    class ClientHintIssueDetails:
        """This issue tracks client hints related issues. It's used to deprecate old
features, encourage the use of new ones, and provide general guidance."""
        sourceCodeLocation: Audits.SourceCodeLocation
        clientHintIssueReason: Audits.ClientHintIssueReason
    
    class FailedRequestInfo:
        url: str
        failureMessage: str
        requestId: Network.RequestId
    
    StyleSheetLoadingIssueReason: str
    class StylesheetLoadingIssueDetails:
        """This issue warns when a referenced stylesheet couldn't be loaded."""
        sourceCodeLocation: Audits.SourceCodeLocation
        styleSheetLoadingIssueReason: Audits.StyleSheetLoadingIssueReason
        failedRequestInfo: Audits.FailedRequestInfo
    
    InspectorIssueCode: str
    class InspectorIssueDetails:
        """This struct holds a list of optional fields with additional information
specific to the kind of issue. When adding a new issue code, please also
add a new optional field to this type."""
        cookieIssueDetails: Audits.CookieIssueDetails
        mixedContentIssueDetails: Audits.MixedContentIssueDetails
        blockedByResponseIssueDetails: Audits.BlockedByResponseIssueDetails
        heavyAdIssueDetails: Audits.HeavyAdIssueDetails
        contentSecurityPolicyIssueDetails: Audits.ContentSecurityPolicyIssueDetails
        sharedArrayBufferIssueDetails: Audits.SharedArrayBufferIssueDetails
        lowTextContrastIssueDetails: Audits.LowTextContrastIssueDetails
        corsIssueDetails: Audits.CorsIssueDetails
        attributionReportingIssueDetails: Audits.AttributionReportingIssueDetails
        quirksModeIssueDetails: Audits.QuirksModeIssueDetails
        navigatorUserAgentIssueDetails: Audits.NavigatorUserAgentIssueDetails
        genericIssueDetails: Audits.GenericIssueDetails
        deprecationIssueDetails: Audits.DeprecationIssueDetails
        clientHintIssueDetails: Audits.ClientHintIssueDetails
        federatedAuthRequestIssueDetails: Audits.FederatedAuthRequestIssueDetails
        bounceTrackingIssueDetails: Audits.BounceTrackingIssueDetails
        stylesheetLoadingIssueDetails: Audits.StylesheetLoadingIssueDetails
        federatedAuthUserInfoRequestIssueDetails: Audits.FederatedAuthUserInfoRequestIssueDetails
    
    IssueId: str
    class InspectorIssue:
        """An inspector issue reported from the back-end."""
        code: Audits.InspectorIssueCode
        details: Audits.InspectorIssueDetails
        issueId: Audits.IssueId
    
    class issueAdded(BaseEvent):
        issue: Audits.InspectorIssue
    
    @dataclass
    class getEncodedResponse(ProtocolCommand):
        """Returns the response body and size if it were re-encoded with the specified settings. Only
applies to images."""
        requestId: Network.RequestId
        encoding: str
        quality: int = OPTIONAL
        sizeOnly: bool = OPTIONAL
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables issues domain, prevents further issues from being reported to the client."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables issues domain, sends the issues collected so far to the client by means of the
`issueAdded` event."""
        pass
    
    @dataclass
    class checkContrast(ProtocolCommand):
        """Runs the contrast check for the target page. Found issues are reported
using Audits.issueAdded event."""
        reportAAA: bool = OPTIONAL
    
    @dataclass
    class checkFormsIssues(ProtocolCommand):
        """Runs the form issues check for the target page. Found issues are reported
using Audits.issueAdded event."""
        pass
    

@domainclass
class Autofill:
    """[Just CDP][Experimental] Defines commands and events for Autofill."""
    class CreditCard:
        number: str
        name: str
        expiryMonth: str
        expiryYear: str
        cvc: str
    
    class AddressField:
        name: str
        value: str
    
    class AddressFields:
        """A list of address fields."""
        fields: list
    
    class Address:
        fields: list
    
    class AddressUI:
        """Defines how an address can be displayed like in chrome://settings/addresses.
Address UI is a two dimensional array, each inner array is an "address information line", and when rendered in a UI surface should be displayed as such.
The following address UI for instance:
[[{name: "GIVE_NAME", value: "Jon"}, {name: "FAMILY_NAME", value: "Doe"}], [{name: "CITY", value: "Munich"}, {name: "ZIP", value: "81456"}]]
should allow the receiver to render:
Jon Doe
Munich 81456"""
        addressFields: list
    
    FillingStrategy: str
    class FilledField:
        htmlType: str
        id: str
        name: str
        value: str
        autofillType: str
        fillingStrategy: Autofill.FillingStrategy
    
    class addressFormFilled(BaseEvent):
        """Emitted when an address form is filled."""
        filledFields: list
        addressUi: Autofill.AddressUI
    
    @dataclass
    class trigger(ProtocolCommand):
        """Trigger autofill on a form identified by the fieldId.
If the field and related form cannot be autofilled, returns an error."""
        fieldId: DOM.BackendNodeId
        card: Autofill.CreditCard
        frameId: Page.FrameId = OPTIONAL
    
    @dataclass
    class setAddresses(ProtocolCommand):
        """Set addresses so that developers can verify their forms implementation."""
        addresses: list
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables autofill domain notifications."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables autofill domain notifications."""
        pass
    

@domainclass
class BackgroundService:
    """[Just CDP][Experimental] Defines events for background web platform features."""
    ServiceName: str
    class EventMetadata:
        """A key-value pair for additional event information to pass along."""
        key: str
        value: str
    
    class BackgroundServiceEvent:
        timestamp: Network.TimeSinceEpoch
        origin: str
        serviceWorkerRegistrationId: ServiceWorker.RegistrationID
        service: BackgroundService.ServiceName
        eventName: str
        instanceId: str
        eventMetadata: list
        storageKey: str
    
    class recordingStateChanged(BaseEvent):
        """Called when the recording state for the service has been updated."""
        isRecording: bool
        service: BackgroundService.ServiceName
    
    class backgroundServiceEventReceived(BaseEvent):
        """Called with all existing backgroundServiceEvents when enabled, and all new
events afterwards if enabled and recording."""
        backgroundServiceEvent: BackgroundService.BackgroundServiceEvent
    
    @dataclass
    class startObserving(ProtocolCommand):
        """Enables event updates for the service."""
        service: BackgroundService.ServiceName
    
    @dataclass
    class stopObserving(ProtocolCommand):
        """Disables event updates for the service."""
        service: BackgroundService.ServiceName
    
    @dataclass
    class setRecording(ProtocolCommand):
        """Set the recording state for the service."""
        shouldRecord: bool
        service: BackgroundService.ServiceName
    
    @dataclass
    class clearEvents(ProtocolCommand):
        """Clears all stored data for the service."""
        service: BackgroundService.ServiceName
    

@domainclass
class Browser:
    """The Browser domain defines methods and events for browser managing."""
    BrowserContextID: str
    WindowID: int
    WindowState: str
    class Bounds:
        """Browser window bounds information"""
        left: int
        top: int
        width: int
        height: int
        windowState: Browser.WindowState
    
    PermissionType: str
    PermissionSetting: str
    class PermissionDescriptor:
        """Definition of PermissionDescriptor defined in the Permissions API:
https://w3c.github.io/permissions/#dictdef-permissiondescriptor."""
        name: str
        sysex: bool
        userVisibleOnly: bool
        allowWithoutSanitization: bool
        panTiltZoom: bool
    
    BrowserCommandId: str
    class Bucket:
        """Chrome histogram bucket."""
        low: int
        high: int
        count: int
    
    class Histogram:
        """Chrome histogram."""
        name: str
        sum: int
        count: int
        buckets: list
    
    ExtensionId: str
    class Extension:
        """Information about an extension."""
        extensionId: Browser.ExtensionId
        name: str
    
    class downloadWillBegin(BaseEvent):
        """Fired when page is about to start a download."""
        frameId: Page.FrameId
        guid: str
        url: str
        suggestedFilename: str
    
    class downloadProgress(BaseEvent):
        """Fired when download makes progress. Last call has |done| == true."""
        guid: str
        totalBytes: int
        receivedBytes: int
        state: str
    
    class extensionsEnabled(BaseEvent):
        extensions: list
    
    class extensionsDisabled(BaseEvent):
        extensionIds: list
    
    @dataclass
    class setPermission(ProtocolCommand):
        """[Just CDP] Set permission settings for given origin."""
        permission: Browser.PermissionDescriptor
        setting: Browser.PermissionSetting
        origin: str = OPTIONAL
        browserContextId: Browser.BrowserContextID = OPTIONAL
    
    @dataclass
    class grantPermissions(ProtocolCommand):
        """[Just CDP] Grant specific permissions to the given origin and reject all others."""
        permissions: list
        origin: str = OPTIONAL
        browserContextId: Browser.BrowserContextID = OPTIONAL
    
    @dataclass
    class resetPermissions(ProtocolCommand):
        """[Just CDP] Reset all permission management for all origins."""
        browserContextId: Browser.BrowserContextID = OPTIONAL
    
    @dataclass
    class setDownloadBehavior(ProtocolCommand):
        """[Just CDP] Set the behavior when downloading a file."""
        behavior: str
        browserContextId: Browser.BrowserContextID = OPTIONAL
        downloadPath: str = OPTIONAL
        eventsEnabled: bool = OPTIONAL
    
    @dataclass
    class cancelDownload(ProtocolCommand):
        """[Just CDP] Cancel a download if in progress"""
        guid: str
        browserContextId: Browser.BrowserContextID = OPTIONAL
    
    @dataclass
    class close(ProtocolCommand):
        """[Just CDP] Close browser gracefully."""
        pass
    
    @dataclass
    class crash(ProtocolCommand):
        """[Just CDP] Crashes browser on the main thread."""
        pass
    
    @dataclass
    class crashGpuProcess(ProtocolCommand):
        """[Just CDP] Crashes GPU process."""
        pass
    
    @dataclass
    class getVersion(ProtocolCommand):
        """[Just CDP] Returns version information."""
        pass
    
    @dataclass
    class getBrowserCommandLine(ProtocolCommand):
        """[Just CDP] Returns the command line switches for the browser process if, and only if
--enable-automation is on the commandline."""
        pass
    
    @dataclass
    class getHistograms(ProtocolCommand):
        """[Just CDP] Get Chrome histograms."""
        query: str = OPTIONAL
        delta: bool = OPTIONAL
    
    @dataclass
    class getHistogram(ProtocolCommand):
        """[Just CDP] Get a Chrome histogram by name."""
        name: str
        delta: bool = OPTIONAL
    
    @dataclass
    class getWindowBounds(ProtocolCommand):
        """[Just CDP] Get position and size of the browser window."""
        windowId: Browser.WindowID
    
    @dataclass
    class getWindowForTarget(ProtocolCommand):
        """[Just CDP] Get the browser window that contains the devtools target."""
        targetId: Target.TargetID = OPTIONAL
    
    @dataclass
    class setWindowBounds(ProtocolCommand):
        """[Just CDP] Set position and/or size of the browser window."""
        windowId: Browser.WindowID
        bounds: Browser.Bounds
    
    @dataclass
    class setDockTile(ProtocolCommand):
        """[Just CDP] Set dock tile details, platform-specific."""
        badgeLabel: str = OPTIONAL
        image: str = OPTIONAL
    
    @dataclass
    class executeBrowserCommand(ProtocolCommand):
        """[Just CDP] Invoke custom browser commands used by telemetry."""
        commandId: Browser.BrowserCommandId
    
    @dataclass
    class addPrivacySandboxEnrollmentOverride(ProtocolCommand):
        """[Just CDP] Allows a site to use privacy sandbox features that require enrollment
without the site actually being enrolled. Only supported on page targets."""
        url: str
    
    @dataclass
    class enable(ProtocolCommand):
        """[Just WIP] Enables Browser domain events."""
        pass
    
    @dataclass
    class disable(ProtocolCommand):
        """[Just WIP] Disables Browser domain events."""
        pass
    

@domainclass
class CSS:
    """This domain exposes CSS read/write operations. All CSS objects (stylesheets, rules, and styles)
have an associated `id` used in subsequent operations on the related object. Each object type has
a specific `id` structure, and those are not interchangeable between objects of different kinds.
CSS objects can be loaded using the `get*ForNode()` calls (which accept a DOM node id). A client
can also keep track of stylesheets via the `styleSheetAdded`/`styleSheetRemoved` events and
subsequently load the required stylesheet contents using the `getStyleSheet[Text]()` methods."""
    StyleSheetId: str
    StyleSheetOrigin: str
    class PseudoElementMatches:
        """CSS rule collection for a single pseudo style."""
        pseudoType: DOM.PseudoType
        pseudoIdentifier: str
        matches: list
    
    class InheritedStyleEntry:
        """Inherited CSS rule collection from ancestor node."""
        inlineStyle: CSS.CSSStyle
        matchedCSSRules: list
    
    class InheritedPseudoElementMatches:
        """Inherited pseudo element matches from pseudos of an ancestor node."""
        pseudoElements: list
    
    class RuleMatch:
        """Match data for a CSS rule."""
        rule: CSS.CSSRule
        matchingSelectors: list
    
    class Value:
        """Data for a simple selector (these are delimited by commas in a selector list)."""
        text: str
        range: CSS.SourceRange
        specificity: CSS.Specificity
    
    class Specificity:
        """Specificity:
https://drafts.csswg.org/selectors/#specificity-rules"""
        a: int
        b: int
        c: int
    
    class SelectorList:
        """Selector list data."""
        selectors: list
        text: str
        range: CSS.SourceRange
    
    class CSSStyleSheetHeader:
        """CSS stylesheet metainformation."""
        styleSheetId: CSS.StyleSheetId
        frameId: Page.FrameId
        sourceURL: str
        sourceMapURL: str
        origin: CSS.StyleSheetOrigin
        title: str
        ownerNode: DOM.BackendNodeId
        disabled: bool
        hasSourceURL: bool
        isInline: bool
        isMutable: bool
        isConstructed: bool
        startLine: int
        startColumn: int
        length: int
        endLine: int
        endColumn: int
        loadingFailed: bool
    
    class CSSRule:
        """CSS rule representation."""
        styleSheetId: CSS.StyleSheetId
        selectorList: CSS.SelectorList
        nestingSelectors: list
        origin: CSS.StyleSheetOrigin
        style: CSS.CSSStyle
        media: list
        containerQueries: list
        supports: list
        layers: list
        scopes: list
        ruleTypes: list
        ruleId: CSS.CSSRuleId
        sourceURL: str
        sourceLine: int
        groupings: list
        isImplicitlyNested: bool
    
    CSSRuleType: str
    class RuleUsage:
        """CSS coverage information."""
        styleSheetId: CSS.StyleSheetId
        startOffset: int
        endOffset: int
        used: bool
    
    class SourceRange:
        """Text range within a resource. All numbers are zero-based."""
        startLine: int
        startColumn: int
        endLine: int
        endColumn: int
    
    class ShorthandEntry:
        name: str
        value: str
        important: bool
    
    class CSSComputedStyleProperty:
        name: str
        value: str
    
    class CSSStyle:
        """CSS style representation."""
        styleSheetId: CSS.StyleSheetId
        cssProperties: list
        shorthandEntries: list
        cssText: str
        range: CSS.SourceRange
        styleId: CSS.CSSStyleId
        width: str
        height: str
    
    class CSSProperty:
        """CSS property declaration data."""
        name: str
        value: str
        important: bool
        implicit: bool
        text: str
        parsedOk: bool
        disabled: bool
        range: CSS.SourceRange
        longhandProperties: list
        priority: str
        status: CSS.CSSPropertyStatus
    
    class CSSMedia:
        """CSS media rule descriptor."""
        text: str
        source: str
        sourceURL: str
        range: CSS.SourceRange
        styleSheetId: CSS.StyleSheetId
        mediaList: list
    
    class MediaQuery:
        """Media query descriptor."""
        expressions: list
        active: bool
    
    class MediaQueryExpression:
        """Media query expression descriptor."""
        value: int
        unit: str
        feature: str
        valueRange: CSS.SourceRange
        computedLength: int
    
    class CSSContainerQuery:
        """CSS container query rule descriptor."""
        text: str
        range: CSS.SourceRange
        styleSheetId: CSS.StyleSheetId
        name: str
        physicalAxes: DOM.PhysicalAxes
        logicalAxes: DOM.LogicalAxes
    
    class CSSSupports:
        """CSS Supports at-rule descriptor."""
        text: str
        active: bool
        range: CSS.SourceRange
        styleSheetId: CSS.StyleSheetId
    
    class CSSScope:
        """CSS Scope at-rule descriptor."""
        text: str
        range: CSS.SourceRange
        styleSheetId: CSS.StyleSheetId
    
    class CSSLayer:
        """CSS Layer at-rule descriptor."""
        text: str
        range: CSS.SourceRange
        styleSheetId: CSS.StyleSheetId
    
    class CSSLayerData:
        """CSS Layer data."""
        name: str
        subLayers: list
        order: int
    
    class PlatformFontUsage:
        """Information about amount of glyphs that were rendered with given font."""
        familyName: str
        isCustomFont: bool
        glyphCount: int
    
    class FontVariationAxis:
        """Information about font variation axes for variable fonts"""
        tag: str
        name: str
        minValue: int
        maxValue: int
        defaultValue: int
        minimumValue: int
        maximumValue: int
    
    class FontFace:
        """Properties of a web font: https://www.w3.org/TR/2008/REC-CSS2-20080411/fonts.html#font-descriptions
and additional information such as platformFontFamily and fontVariationAxes."""
        fontFamily: str
        fontStyle: str
        fontVariant: str
        fontWeight: str
        fontStretch: str
        fontDisplay: str
        unicodeRange: str
        src: str
        platformFontFamily: str
        fontVariationAxes: list
    
    class CSSTryRule:
        """CSS try rule representation."""
        styleSheetId: CSS.StyleSheetId
        origin: CSS.StyleSheetOrigin
        style: CSS.CSSStyle
    
    class CSSPositionFallbackRule:
        """CSS position-fallback rule representation."""
        name: CSS.Value
        tryRules: list
    
    class CSSKeyframesRule:
        """CSS keyframes rule representation."""
        animationName: CSS.Value
        keyframes: list
    
    class CSSPropertyRegistration:
        """Representation of a custom property registration through CSS.registerProperty"""
        propertyName: str
        initialValue: CSS.Value
        inherits: bool
        syntax: str
    
    class CSSPropertyRule:
        """CSS property at-rule representation."""
        styleSheetId: CSS.StyleSheetId
        origin: CSS.StyleSheetOrigin
        propertyName: CSS.Value
        style: CSS.CSSStyle
    
    class CSSKeyframeRule:
        """CSS keyframe rule representation."""
        styleSheetId: CSS.StyleSheetId
        origin: CSS.StyleSheetOrigin
        keyText: CSS.Value
        style: CSS.CSSStyle
    
    class StyleDeclarationEdit:
        """A descriptor of operation to mutate style declaration text."""
        styleSheetId: CSS.StyleSheetId
        range: CSS.SourceRange
        text: str
    
    class CSSStyleId:
        """This object identifies a CSS style in a unique way."""
        styleSheetId: CSS.StyleSheetId
        ordinal: int
    
    class CSSRuleId:
        """This object identifies a CSS rule in a unique way."""
        styleSheetId: CSS.StyleSheetId
        ordinal: int
    
    PseudoId: str
    ForceablePseudoClass: str
    class PseudoIdMatches:
        """CSS rule collection for a single pseudo style."""
        pseudoId: CSS.PseudoId
        matches: list
    
    class CSSSelector:
        """CSS selector."""
        text: str
        specificity: list
        dynamic: bool
    
    class CSSStyleAttribute:
        """CSS style information for a DOM style attribute."""
        name: str
        style: CSS.CSSStyle
    
    class CSSStyleSheetBody:
        """CSS stylesheet contents."""
        styleSheetId: CSS.StyleSheetId
        rules: list
        text: str
    
    class CSSPropertyInfo:
        name: str
        aliases: list
        longhands: list
        values: list
        inherited: bool
    
    CSSPropertyStatus: str
    class Grouping:
        """CSS @media (as well as other users of media queries, like @import, <style>, <link>, etc.), @supports, and @layer descriptor."""
        type: str
        ruleId: CSS.CSSRuleId
        text: str
        sourceURL: str
        range: CSS.SourceRange
    
    class Font:
        """A representation of WebCore::Font. Conceptually this is backed by either a font file on disk or from the network."""
        displayName: str
        variationAxes: list
        synthesizedBold: bool
        synthesizedOblique: bool
    
    LayoutFlag: str
    LayoutContextTypeChangedMode: str
    class fontsUpdated(BaseEvent):
        """Fires whenever a web font is updated.  A non-empty font parameter indicates a successfully loaded
web font."""
        font: CSS.FontFace
    
    class mediaQueryResultChanged(BaseEvent):
        """Fires whenever a MediaQuery result changes (for example, after a browser window has been
resized.) The current implementation considers only viewport-dependent media features."""
        pass
    
    class styleSheetAdded(BaseEvent):
        """Fired whenever an active document stylesheet is added."""
        header: CSS.CSSStyleSheetHeader
    
    class styleSheetChanged(BaseEvent):
        """Fired whenever a stylesheet is changed as a result of the client operation."""
        styleSheetId: CSS.StyleSheetId
    
    class styleSheetRemoved(BaseEvent):
        """Fired whenever an active document stylesheet is removed."""
        styleSheetId: CSS.StyleSheetId
    
    class nodeLayoutFlagsChanged(BaseEvent):
        """Called when the layout of a node changes in a way that is important to Web Inspector."""
        nodeId: DOM.NodeId
        layoutFlags: list
    
    @dataclass
    class addRule(ProtocolCommand):
        """Inserts a new rule with the given `ruleText` in a stylesheet with given `styleSheetId`, at the
position specified by `location`."""
        styleSheetId: CSS.StyleSheetId
        ruleText: str
        location: CSS.SourceRange
        selector: str
    
    @dataclass
    class collectClassNames(ProtocolCommand):
        """[Just CDP] Returns all class names from specified stylesheet."""
        styleSheetId: CSS.StyleSheetId
    
    @dataclass
    class createStyleSheet(ProtocolCommand):
        """Creates a new special "via-inspector" stylesheet in the frame with given `frameId`."""
        frameId: Page.FrameId
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables the CSS agent for the given page."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables the CSS agent for the given page. Clients should not assume that the CSS agent has been
enabled until the result of this command is received."""
        pass
    
    @dataclass
    class forcePseudoState(ProtocolCommand):
        """Ensures that the given node will have specified pseudo-classes whenever its style is computed by
the browser."""
        nodeId: DOM.NodeId
        forcedPseudoClasses: list
    
    @dataclass
    class getBackgroundColors(ProtocolCommand):
        """[Just CDP]"""
        nodeId: DOM.NodeId
    
    @dataclass
    class getComputedStyleForNode(ProtocolCommand):
        """Returns the computed style for a DOM node identified by `nodeId`."""
        nodeId: DOM.NodeId
    
    @dataclass
    class getInlineStylesForNode(ProtocolCommand):
        """Returns the styles defined inline (explicitly in the "style" attribute and implicitly, using DOM
attributes) for a DOM node identified by `nodeId`."""
        nodeId: DOM.NodeId
    
    @dataclass
    class getMatchedStylesForNode(ProtocolCommand):
        """Returns requested styles for a DOM node identified by `nodeId`."""
        nodeId: DOM.NodeId
        includePseudo: bool = OPTIONAL
        includeInherited: bool = OPTIONAL
    
    @dataclass
    class getMediaQueries(ProtocolCommand):
        """[Just CDP] Returns all media queries parsed by the rendering engine."""
        pass
    
    @dataclass
    class getPlatformFontsForNode(ProtocolCommand):
        """[Just CDP] Requests information about platform fonts which we used to render child TextNodes in the given
node."""
        nodeId: DOM.NodeId
    
    @dataclass
    class getStyleSheetText(ProtocolCommand):
        """Returns the current textual content for a stylesheet."""
        styleSheetId: CSS.StyleSheetId
    
    @dataclass
    class getLayersForNode(ProtocolCommand):
        """[Just CDP] Returns all layers parsed by the rendering engine for the tree scope of a node.
Given a DOM element identified by nodeId, getLayersForNode returns the root
layer for the nearest ancestor document or shadow root. The layer root contains
the full layer tree for the tree scope and their ordering."""
        nodeId: DOM.NodeId
    
    @dataclass
    class trackComputedStyleUpdates(ProtocolCommand):
        """[Just CDP] Starts tracking the given computed styles for updates. The specified array of properties
replaces the one previously specified. Pass empty array to disable tracking.
Use takeComputedStyleUpdates to retrieve the list of nodes that had properties modified.
The changes to computed style properties are only tracked for nodes pushed to the front-end
by the DOM agent. If no changes to the tracked properties occur after the node has been pushed
to the front-end, no updates will be issued for the node."""
        propertiesToTrack: list
    
    @dataclass
    class takeComputedStyleUpdates(ProtocolCommand):
        """[Just CDP] Polls the next batch of computed style updates."""
        pass
    
    @dataclass
    class setEffectivePropertyValueForNode(ProtocolCommand):
        """[Just CDP] Find a rule with the given active property for the given node and set the new value for this
property"""
        nodeId: DOM.NodeId
        propertyName: str
        value: str
    
    @dataclass
    class setKeyframeKey(ProtocolCommand):
        """[Just CDP] Modifies the keyframe rule key text."""
        styleSheetId: CSS.StyleSheetId
        range: CSS.SourceRange
        keyText: str
    
    @dataclass
    class setMediaText(ProtocolCommand):
        """[Just CDP] Modifies the rule selector."""
        styleSheetId: CSS.StyleSheetId
        range: CSS.SourceRange
        text: str
    
    @dataclass
    class setContainerQueryText(ProtocolCommand):
        """[Just CDP] Modifies the expression of a container query."""
        styleSheetId: CSS.StyleSheetId
        range: CSS.SourceRange
        text: str
    
    @dataclass
    class setSupportsText(ProtocolCommand):
        """[Just CDP] Modifies the expression of a supports at-rule."""
        styleSheetId: CSS.StyleSheetId
        range: CSS.SourceRange
        text: str
    
    @dataclass
    class setScopeText(ProtocolCommand):
        """[Just CDP] Modifies the expression of a scope at-rule."""
        styleSheetId: CSS.StyleSheetId
        range: CSS.SourceRange
        text: str
    
    @dataclass
    class setRuleSelector(ProtocolCommand):
        """Modifies the rule selector."""
        styleSheetId: CSS.StyleSheetId
        range: CSS.SourceRange
        selector: str
        ruleId: CSS.CSSRuleId
    
    @dataclass
    class setStyleSheetText(ProtocolCommand):
        """Sets the new stylesheet text."""
        styleSheetId: CSS.StyleSheetId
        text: str
    
    @dataclass
    class setStyleTexts(ProtocolCommand):
        """[Just CDP] Applies specified style edits one after another in the given order."""
        edits: list
    
    @dataclass
    class startRuleUsageTracking(ProtocolCommand):
        """[Just CDP] Enables the selector recording."""
        pass
    
    @dataclass
    class stopRuleUsageTracking(ProtocolCommand):
        """[Just CDP] Stop tracking rule usage and return the list of rules that were used since last call to
`takeCoverageDelta` (or since start of coverage instrumentation)."""
        pass
    
    @dataclass
    class takeCoverageDelta(ProtocolCommand):
        """[Just CDP] Obtain list of rules that became used since last call to this method (or since start of coverage
instrumentation)."""
        pass
    
    @dataclass
    class setLocalFontsEnabled(ProtocolCommand):
        """[Just CDP] Enables/disables rendering of local CSS fonts (enabled by default)."""
        enabled: bool
    
    @dataclass
    class getFontDataForNode(ProtocolCommand):
        """[Just WIP] Returns the primary font of the computed font cascade for a DOM node identified by <code>nodeId</code>."""
        nodeId: DOM.NodeId
    
    @dataclass
    class getAllStyleSheets(ProtocolCommand):
        """[Just WIP] Returns metainfo entries for all known stylesheets."""
        pass
    
    @dataclass
    class getStyleSheet(ProtocolCommand):
        """[Just WIP] Returns stylesheet data for the specified <code>styleSheetId</code>."""
        styleSheetId: CSS.StyleSheetId
    
    @dataclass
    class setStyleText(ProtocolCommand):
        """[Just WIP] Sets the new <code>text</code> for the respective style."""
        styleId: CSS.CSSStyleId
        text: str
    
    @dataclass
    class setGroupingHeaderText(ProtocolCommand):
        """[Just WIP] Modifies an @rule grouping's header text."""
        ruleId: CSS.CSSRuleId
        headerText: str
    
    @dataclass
    class getSupportedCSSProperties(ProtocolCommand):
        """[Just WIP] Returns all supported CSS property names."""
        pass
    
    @dataclass
    class getSupportedSystemFontFamilyNames(ProtocolCommand):
        """[Just WIP] Returns all supported system font family names."""
        pass
    
    @dataclass
    class setLayoutContextTypeChangedMode(ProtocolCommand):
        """[Just WIP] Change how layout context type changes are handled for nodes. When the new mode would observe nodes the frontend has not yet recieved, those nodes will be sent to the frontend immediately."""
        mode: CSS.LayoutContextTypeChangedMode
    

@domainclass
class CacheStorage:
    """[Just CDP][Experimental]"""
    CacheId: str
    CachedResponseType: str
    class DataEntry:
        """Data entry."""
        requestURL: str
        requestMethod: str
        requestHeaders: list
        responseTime: int
        responseStatus: int
        responseStatusText: str
        responseType: CacheStorage.CachedResponseType
        responseHeaders: list
    
    class Cache:
        """Cache identifier."""
        cacheId: CacheStorage.CacheId
        securityOrigin: str
        storageKey: str
        storageBucket: Storage.StorageBucket
        cacheName: str
    
    class Header:
        name: str
        value: str
    
    class CachedResponse:
        """Cached response"""
        body: str
    

    @dataclass
    class deleteCache(ProtocolCommand):
        """Deletes a cache."""
        cacheId: CacheStorage.CacheId
    
    @dataclass
    class deleteEntry(ProtocolCommand):
        """Deletes a cache entry."""
        cacheId: CacheStorage.CacheId
        request: str
    
    @dataclass
    class requestCacheNames(ProtocolCommand):
        """Requests cache names."""
        securityOrigin: str = OPTIONAL
        storageKey: str = OPTIONAL
        storageBucket: Storage.StorageBucket = OPTIONAL
    
    @dataclass
    class requestCachedResponse(ProtocolCommand):
        """Fetches cache entry."""
        cacheId: CacheStorage.CacheId
        requestURL: str
        requestHeaders: list
    
    @dataclass
    class requestEntries(ProtocolCommand):
        """Requests data from cache."""
        cacheId: CacheStorage.CacheId
        skipCount: int = OPTIONAL
        pageSize: int = OPTIONAL
        pathFilter: str = OPTIONAL
    

@domainclass
class Cast:
    """[Just CDP][Experimental] A domain for interacting with Cast, Presentation API, and Remote Playback API
functionalities."""
    class Sink:
        name: str
        id: str
        session: str
    
    class sinksUpdated(BaseEvent):
        """This is fired whenever the list of available sinks changes. A sink is a
device or a software surface that you can cast to."""
        sinks: list
    
    class issueUpdated(BaseEvent):
        """This is fired whenever the outstanding issue/error message changes.
|issueMessage| is empty if there is no issue."""
        issueMessage: str
    
    @dataclass
    class enable(ProtocolCommand):
        """Starts observing for sinks that can be used for tab mirroring, and if set,
sinks compatible with |presentationUrl| as well. When sinks are found, a
|sinksUpdated| event is fired.
Also starts observing for issue messages. When an issue is added or removed,
an |issueUpdated| event is fired."""
        presentationUrl: str = OPTIONAL
    
    @dataclass
    class disable(ProtocolCommand):
        """Stops observing for sinks and issues."""
        pass
    
    @dataclass
    class setSinkToUse(ProtocolCommand):
        """Sets a sink to be used when the web page requests the browser to choose a
sink via Presentation API, Remote Playback API, or Cast SDK."""
        sinkName: str
    
    @dataclass
    class startDesktopMirroring(ProtocolCommand):
        """Starts mirroring the desktop to the sink."""
        sinkName: str
    
    @dataclass
    class startTabMirroring(ProtocolCommand):
        """Starts mirroring the tab to the sink."""
        sinkName: str
    
    @dataclass
    class stopCasting(ProtocolCommand):
        """Stops the active Cast session on the sink."""
        sinkName: str
    

@domainclass
class DOM:
    """This domain exposes DOM read/write operations. Each DOM Node is represented with its mirror object
that has an `id`. This `id` can be used to get additional information on the Node, resolve it into
the JavaScript object wrapper, etc. It is important that client receives DOM events only for the
nodes that are known to the client. Backend keeps track of the nodes that were sent to the client
and never sends the same node twice. It is client's responsibility to collect information about
the nodes that were sent to the client. Note that `iframe` owner elements will return
corresponding document elements as their child nodes."""
    NodeId: int
    BackendNodeId: int
    class BackendNode:
        """Backend node with a friendly name."""
        nodeType: int
        nodeName: str
        backendNodeId: DOM.BackendNodeId
    
    PseudoType: str
    ShadowRootType: str
    CompatibilityMode: str
    PhysicalAxes: str
    LogicalAxes: str
    class Node:
        """DOM interaction is implemented in terms of mirror objects that represent the actual DOM nodes.
DOMNode is a base node mirror type."""
        nodeId: DOM.NodeId
        parentId: DOM.NodeId
        backendNodeId: DOM.BackendNodeId
        nodeType: int
        nodeName: str
        localName: str
        nodeValue: str
        childNodeCount: int
        children: list
        attributes: list
        documentURL: str
        baseURL: str
        publicId: str
        systemId: str
        internalSubset: str
        xmlVersion: str
        name: str
        value: str
        pseudoType: DOM.PseudoType
        pseudoIdentifier: str
        shadowRootType: DOM.ShadowRootType
        frameId: Page.FrameId
        contentDocument: DOM.Node
        shadowRoots: list
        templateContent: DOM.Node
        pseudoElements: list
        importedDocument: DOM.Node
        distributedNodes: list
        isSVG: bool
        compatibilityMode: DOM.CompatibilityMode
        assignedSlot: DOM.BackendNode
        customElementState: DOM.CustomElementState
        contentSecurityPolicyHash: str
        layoutFlags: list
    
    class RGBA:
        """A structure holding an RGBA color."""
        r: int
        g: int
        b: int
        a: int
    
    Quad: list
    class BoxModel:
        """Box model."""
        content: DOM.Quad
        padding: DOM.Quad
        border: DOM.Quad
        margin: DOM.Quad
        width: int
        height: int
        shapeOutside: DOM.ShapeOutsideInfo
    
    class ShapeOutsideInfo:
        """CSS Shape Outside details."""
        bounds: DOM.Quad
        shape: list
        marginShape: list
    
    class Rect:
        """Rectangle."""
        x: int
        y: int
        width: int
        height: int
    
    class CSSComputedStyleProperty:
        name: str
        value: str
    
    EventListenerId: int
    CustomElementState: str
    LiveRegionRelevant: str
    class DataBinding:
        """Relationship between data that is associated with a node and the node itself."""
        binding: str
        type: str
        value: str
    
    class EventListener:
        """A structure holding event listener properties."""
        eventListenerId: DOM.EventListenerId
        type: str
        useCapture: bool
        isAttribute: bool
        nodeId: DOM.NodeId
        onWindow: bool
        location: Debugger.Location
        handlerName: str
        passive: bool
        once: bool
        disabled: bool
        hasBreakpoint: bool
    
    class AccessibilityProperties:
        """A structure holding accessibility properties."""
        activeDescendantNodeId: DOM.NodeId
        busy: bool
        checked: str
        childNodeIds: list
        controlledNodeIds: list
        current: str
        disabled: bool
        headingLevel: int
        hierarchyLevel: int
        isPopUpButton: bool
        exists: bool
        expanded: bool
        flowedNodeIds: list
        focused: bool
        ignored: bool
        ignoredByDefault: bool
        invalid: str
        hidden: bool
        label: str
        liveRegionAtomic: bool
        liveRegionRelevant: list
        liveRegionStatus: str
        mouseEventNodeId: DOM.NodeId
        nodeId: DOM.NodeId
        ownedNodeIds: list
        parentNodeId: DOM.NodeId
        pressed: bool
        readonly: bool
        required: bool
        role: str
        selected: bool
        selectedChildNodeIds: list
    
    class RGBAColor:
        """A structure holding an RGBA color."""
        r: int
        g: int
        b: int
        a: int
    
    class HighlightConfig:
        """Configuration data for the highlighting of page elements."""
        showInfo: bool
        contentColor: DOM.RGBAColor
        paddingColor: DOM.RGBAColor
        borderColor: DOM.RGBAColor
        marginColor: DOM.RGBAColor
    
    class GridOverlayConfig:
        """Configuration data for grid overlays."""
        gridColor: DOM.RGBAColor
        showLineNames: bool
        showLineNumbers: bool
        showExtendedGridLines: bool
        showTrackSizes: bool
        showAreaNames: bool
    
    class FlexOverlayConfig:
        """Configuration data for flex overlays."""
        flexColor: DOM.RGBAColor
        showOrderNumbers: bool
    
    class Styleable:
        """An object referencing a node and a pseudo-element, primarily used to identify an animation effect target."""
        nodeId: DOM.NodeId
        pseudoId: CSS.PseudoId
    
    class attributeModified(BaseEvent):
        """Fired when `Element`'s attribute is modified."""
        nodeId: DOM.NodeId
        name: str
        value: str
    
    class attributeRemoved(BaseEvent):
        """Fired when `Element`'s attribute is removed."""
        nodeId: DOM.NodeId
        name: str
    
    class characterDataModified(BaseEvent):
        """Mirrors `DOMCharacterDataModified` event."""
        nodeId: DOM.NodeId
        characterData: str
    
    class childNodeCountUpdated(BaseEvent):
        """Fired when `Container`'s child node count has changed."""
        nodeId: DOM.NodeId
        childNodeCount: int
    
    class childNodeInserted(BaseEvent):
        """Mirrors `DOMNodeInserted` event."""
        parentNodeId: DOM.NodeId
        previousNodeId: DOM.NodeId
        node: DOM.Node
    
    class childNodeRemoved(BaseEvent):
        """Mirrors `DOMNodeRemoved` event."""
        parentNodeId: DOM.NodeId
        nodeId: DOM.NodeId
    
    class distributedNodesUpdated(BaseEvent):
        """Called when distribution is changed."""
        insertionPointId: DOM.NodeId
        distributedNodes: list
    
    class documentUpdated(BaseEvent):
        """Fired when `Document` has been totally updated. Node ids are no longer valid."""
        pass
    
    class inlineStyleInvalidated(BaseEvent):
        """Fired when `Element`'s inline style is modified via a CSS property modification."""
        nodeIds: list
    
    class pseudoElementAdded(BaseEvent):
        """Called when a pseudo element is added to an element."""
        parentId: DOM.NodeId
        pseudoElement: DOM.Node
    
    class topLayerElementsUpdated(BaseEvent):
        """Called when top layer elements are changed."""
        pass
    
    class pseudoElementRemoved(BaseEvent):
        """Called when a pseudo element is removed from an element."""
        parentId: DOM.NodeId
        pseudoElementId: DOM.NodeId
    
    class setChildNodes(BaseEvent):
        """Fired when backend wants to provide client with the missing DOM structure. This happens upon
most of the calls requesting node ids."""
        parentId: DOM.NodeId
        nodes: list
    
    class shadowRootPopped(BaseEvent):
        """Called when shadow root is popped from the element."""
        hostId: DOM.NodeId
        rootId: DOM.NodeId
    
    class shadowRootPushed(BaseEvent):
        """Called when shadow root is pushed into the element."""
        hostId: DOM.NodeId
        root: DOM.Node
    
    class inspect(BaseEvent):
        """Inspect a particular node."""
        nodeId: DOM.NodeId
    
    class willDestroyDOMNode(BaseEvent):
        """Fired when a detached DOM node is about to be destroyed. Currently, this event will only be fired when a DOM node that is detached is about to be destructed."""
        nodeId: DOM.NodeId
    
    class customElementStateChanged(BaseEvent):
        """Called when the custom element state is changed."""
        nodeId: DOM.NodeId
        customElementState: DOM.CustomElementState
    
    class didAddEventListener(BaseEvent):
        """Called when an event listener is added to a node."""
        nodeId: DOM.NodeId
    
    class willRemoveEventListener(BaseEvent):
        """Called after a request has been made to remove an event listener from a node."""
        nodeId: DOM.NodeId
    
    class didFireEvent(BaseEvent):
        """Called when an event is fired on a node."""
        nodeId: DOM.NodeId
        eventName: str
        timestamp: Network.Timestamp
        data: Any
    
    class powerEfficientPlaybackStateChanged(BaseEvent):
        """Called when an element enters/exits a power efficient playback state."""
        nodeId: DOM.NodeId
        timestamp: Network.Timestamp
        isPowerEfficient: bool
    
    @dataclass
    class collectClassNamesFromSubtree(ProtocolCommand):
        """[Just CDP] Collects class names for the node with given id and all of it's child nodes."""
        nodeId: DOM.NodeId
    
    @dataclass
    class copyTo(ProtocolCommand):
        """[Just CDP] Creates a deep copy of the specified node and places it into the target container before the
given anchor."""
        nodeId: DOM.NodeId
        targetNodeId: DOM.NodeId
        insertBeforeNodeId: DOM.NodeId = OPTIONAL
    
    @dataclass
    class describeNode(ProtocolCommand):
        """[Just CDP] Describes node given its id, does not require domain to be enabled. Does not start tracking any
objects, can be used for automation."""
        nodeId: DOM.NodeId = OPTIONAL
        backendNodeId: DOM.BackendNodeId = OPTIONAL
        objectId: Runtime.RemoteObjectId = OPTIONAL
        depth: int = OPTIONAL
        pierce: bool = OPTIONAL
    
    @dataclass
    class scrollIntoViewIfNeeded(ProtocolCommand):
        """[Just CDP] Scrolls the specified rect of the given node into view if not already visible.
Note: exactly one between nodeId, backendNodeId and objectId should be passed
to identify the node."""
        nodeId: DOM.NodeId = OPTIONAL
        backendNodeId: DOM.BackendNodeId = OPTIONAL
        objectId: Runtime.RemoteObjectId = OPTIONAL
        rect: DOM.Rect = OPTIONAL
    
    @dataclass
    class disable(ProtocolCommand):
        """[Just CDP] Disables DOM agent for the given page."""
        pass
    
    @dataclass
    class discardSearchResults(ProtocolCommand):
        """Discards search results from the session with the given id. `getSearchResults` should no longer
be called for that search."""
        searchId: str
    
    @dataclass
    class enable(ProtocolCommand):
        """[Just CDP] Enables DOM agent for the given page."""
        includeWhitespace: str = OPTIONAL
    
    @dataclass
    class focus(ProtocolCommand):
        """Focuses the given element."""
        nodeId: DOM.NodeId = OPTIONAL
        backendNodeId: DOM.BackendNodeId = OPTIONAL
        objectId: Runtime.RemoteObjectId = OPTIONAL
    
    @dataclass
    class getAttributes(ProtocolCommand):
        """Returns attributes for the specified node."""
        nodeId: DOM.NodeId
    
    @dataclass
    class getBoxModel(ProtocolCommand):
        """[Just CDP] Returns boxes for the given node."""
        nodeId: DOM.NodeId = OPTIONAL
        backendNodeId: DOM.BackendNodeId = OPTIONAL
        objectId: Runtime.RemoteObjectId = OPTIONAL
    
    @dataclass
    class getContentQuads(ProtocolCommand):
        """[Just CDP] Returns quads that describe node position on the page. This method
might return multiple quads for inline nodes."""
        nodeId: DOM.NodeId = OPTIONAL
        backendNodeId: DOM.BackendNodeId = OPTIONAL
        objectId: Runtime.RemoteObjectId = OPTIONAL
    
    @dataclass
    class getDocument(ProtocolCommand):
        """Returns the root DOM node (and optionally the subtree) to the caller.
Implicitly enables the DOM domain events for the current target."""
        depth: int = OPTIONAL
        pierce: bool = OPTIONAL
    
    @dataclass
    class getFlattenedDocument(ProtocolCommand):
        """[Just CDP] Returns the root DOM node (and optionally the subtree) to the caller.
Deprecated, as it is not designed to work well with the rest of the DOM agent.
Use DOMSnapshot.captureSnapshot instead."""
        depth: int = OPTIONAL
        pierce: bool = OPTIONAL
    
    @dataclass
    class getNodesForSubtreeByStyle(ProtocolCommand):
        """[Just CDP] Finds nodes with a given computed style in a subtree."""
        nodeId: DOM.NodeId
        computedStyles: list
        pierce: bool = OPTIONAL
    
    @dataclass
    class getNodeForLocation(ProtocolCommand):
        """[Just CDP] Returns node id at given location. Depending on whether DOM domain is enabled, nodeId is
either returned or not."""
        x: int
        y: int
        includeUserAgentShadowDOM: bool = OPTIONAL
        ignorePointerEventsNone: bool = OPTIONAL
    
    @dataclass
    class getOuterHTML(ProtocolCommand):
        """Returns node's HTML markup."""
        nodeId: DOM.NodeId = OPTIONAL
        backendNodeId: DOM.BackendNodeId = OPTIONAL
        objectId: Runtime.RemoteObjectId = OPTIONAL
    
    @dataclass
    class getRelayoutBoundary(ProtocolCommand):
        """[Just CDP] Returns the id of the nearest ancestor that is a relayout boundary."""
        nodeId: DOM.NodeId
    
    @dataclass
    class getSearchResults(ProtocolCommand):
        """Returns search results from given `fromIndex` to given `toIndex` from the search with the given
identifier."""
        searchId: str
        fromIndex: int
        toIndex: int
    
    @dataclass
    class hideHighlight(ProtocolCommand):
        """Hides any highlight."""
        pass
    
    @dataclass
    class highlightNode(ProtocolCommand):
        """Highlights DOM node."""
        highlightConfig: DOM.HighlightConfig
        nodeId: DOM.NodeId = OPTIONAL
        objectId: Runtime.RemoteObjectId = OPTIONAL
        gridOverlayConfig: DOM.GridOverlayConfig = OPTIONAL
        flexOverlayConfig: DOM.FlexOverlayConfig = OPTIONAL
        showRulers: bool = OPTIONAL
    
    @dataclass
    class highlightRect(ProtocolCommand):
        """Highlights given rectangle."""
        x: int
        y: int
        width: int
        height: int
        color: DOM.RGBAColor = OPTIONAL
        outlineColor: DOM.RGBAColor = OPTIONAL
        usePageCoordinates: bool = OPTIONAL
    
    @dataclass
    class markUndoableState(ProtocolCommand):
        """Marks last undoable state."""
        pass
    
    @dataclass
    class moveTo(ProtocolCommand):
        """Moves node into the new container, places it before the given anchor."""
        nodeId: DOM.NodeId
        targetNodeId: DOM.NodeId
        insertBeforeNodeId: DOM.NodeId = OPTIONAL
    
    @dataclass
    class performSearch(ProtocolCommand):
        """Searches for a given string in the DOM tree. Use `getSearchResults` to access search results or
`cancelSearch` to end this search session."""
        query: str
        includeUserAgentShadowDOM: bool = OPTIONAL
        nodeIds: list = OPTIONAL
        caseSensitive: bool = OPTIONAL
    
    @dataclass
    class pushNodeByPathToFrontend(ProtocolCommand):
        """Requests that the node is sent to the caller given its path. // FIXME, use XPath"""
        path: str
    
    @dataclass
    class pushNodesByBackendIdsToFrontend(ProtocolCommand):
        """[Just CDP] Requests that a batch of nodes is sent to the caller given their backend node ids."""
        backendNodeIds: list
    
    @dataclass
    class querySelector(ProtocolCommand):
        """Executes `querySelector` on a given node."""
        nodeId: DOM.NodeId
        selector: str
    
    @dataclass
    class querySelectorAll(ProtocolCommand):
        """Executes `querySelectorAll` on a given node."""
        nodeId: DOM.NodeId
        selector: str
    
    @dataclass
    class getTopLayerElements(ProtocolCommand):
        """[Just CDP] Returns NodeIds of current top layer elements.
Top layer is rendered closest to the user within a viewport, therefore its elements always
appear on top of all other content."""
        pass
    
    @dataclass
    class redo(ProtocolCommand):
        """Re-does the last undone action."""
        pass
    
    @dataclass
    class removeAttribute(ProtocolCommand):
        """Removes attribute with given name from an element with given id."""
        nodeId: DOM.NodeId
        name: str
    
    @dataclass
    class removeNode(ProtocolCommand):
        """Removes node with given id."""
        nodeId: DOM.NodeId
    
    @dataclass
    class requestChildNodes(ProtocolCommand):
        """Requests that children of the node with given id are returned to the caller in form of
`setChildNodes` events where not only immediate children are retrieved, but all children down to
the specified depth."""
        nodeId: DOM.NodeId
        depth: int = OPTIONAL
        pierce: bool = OPTIONAL
    
    @dataclass
    class requestNode(ProtocolCommand):
        """Requests that the node is sent to the caller given the JavaScript node object reference. All
nodes that form the path from the node to the root are also sent to the client as a series of
`setChildNodes` notifications."""
        objectId: Runtime.RemoteObjectId
    
    @dataclass
    class resolveNode(ProtocolCommand):
        """Resolves the JavaScript node object for a given NodeId or BackendNodeId."""
        nodeId: DOM.NodeId = OPTIONAL
        backendNodeId: DOM.BackendNodeId = OPTIONAL
        objectGroup: str = OPTIONAL
        executionContextId: Runtime.ExecutionContextId = OPTIONAL
    
    @dataclass
    class setAttributeValue(ProtocolCommand):
        """Sets attribute for an element with given id."""
        nodeId: DOM.NodeId
        name: str
        value: str
    
    @dataclass
    class setAttributesAsText(ProtocolCommand):
        """Sets attributes on element with given id. This method is useful when user edits some existing
attribute value and types in several attribute name/value pairs."""
        nodeId: DOM.NodeId
        text: str
        name: str = OPTIONAL
    
    @dataclass
    class setFileInputFiles(ProtocolCommand):
        """[Just CDP] Sets files for the given file input element."""
        files: list
        nodeId: DOM.NodeId = OPTIONAL
        backendNodeId: DOM.BackendNodeId = OPTIONAL
        objectId: Runtime.RemoteObjectId = OPTIONAL
    
    @dataclass
    class setNodeStackTracesEnabled(ProtocolCommand):
        """[Just CDP] Sets if stack traces should be captured for Nodes. See `Node.getNodeStackTraces`. Default is disabled."""
        enable: bool
    
    @dataclass
    class getNodeStackTraces(ProtocolCommand):
        """[Just CDP] Gets stack traces associated with a Node. As of now, only provides stack trace for Node creation."""
        nodeId: DOM.NodeId
    
    @dataclass
    class getFileInfo(ProtocolCommand):
        """[Just CDP] Returns file information for the given
File wrapper."""
        objectId: Runtime.RemoteObjectId
    
    @dataclass
    class setInspectedNode(ProtocolCommand):
        """Enables console to refer to the node with given id via $x (see Command Line API for more details
$x functions)."""
        nodeId: DOM.NodeId
    
    @dataclass
    class setNodeName(ProtocolCommand):
        """Sets node name for a node with given id."""
        nodeId: DOM.NodeId
        name: str
    
    @dataclass
    class setNodeValue(ProtocolCommand):
        """Sets node value for a node with given id."""
        nodeId: DOM.NodeId
        value: str
    
    @dataclass
    class setOuterHTML(ProtocolCommand):
        """Sets node HTML markup, returns new node id."""
        nodeId: DOM.NodeId
        outerHTML: str
    
    @dataclass
    class undo(ProtocolCommand):
        """Undoes the last performed action."""
        pass
    
    @dataclass
    class getFrameOwner(ProtocolCommand):
        """[Just CDP] Returns iframe node that owns iframe with the given domain."""
        frameId: Page.FrameId
    
    @dataclass
    class getContainerForNode(ProtocolCommand):
        """[Just CDP] Returns the query container of the given node based on container query
conditions: containerName, physical, and logical axes. If no axes are
provided, the style container is returned, which is the direct parent or the
closest element with a matching container-name."""
        nodeId: DOM.NodeId
        containerName: str = OPTIONAL
        physicalAxes: DOM.PhysicalAxes = OPTIONAL
        logicalAxes: DOM.LogicalAxes = OPTIONAL
    
    @dataclass
    class getQueryingDescendantsForContainer(ProtocolCommand):
        """[Just CDP] Returns the descendants of a container query container that have
container queries against this container."""
        nodeId: DOM.NodeId
    
    @dataclass
    class getSupportedEventNames(ProtocolCommand):
        """[Just WIP] Gets the list of builtin DOM event names."""
        pass
    
    @dataclass
    class getDataBindingsForNode(ProtocolCommand):
        """[Just WIP] Returns all data binding relationships between data that is associated with the node and the node itself."""
        nodeId: DOM.NodeId
    
    @dataclass
    class getAssociatedDataForNode(ProtocolCommand):
        """[Just WIP] Returns all data that has been associated with the node and is available for data binding."""
        nodeId: DOM.NodeId
    
    @dataclass
    class getEventListenersForNode(ProtocolCommand):
        """[Just WIP] Returns event listeners relevant to the node."""
        nodeId: DOM.NodeId
        includeAncestors: bool = OPTIONAL
    
    @dataclass
    class setEventListenerDisabled(ProtocolCommand):
        """[Just WIP] Enable/disable the given event listener. A disabled event listener will not fire."""
        eventListenerId: DOM.EventListenerId
        disabled: bool
    
    @dataclass
    class setBreakpointForEventListener(ProtocolCommand):
        """[Just WIP] Set a breakpoint on the given event listener."""
        eventListenerId: DOM.EventListenerId
        options: Debugger.BreakpointOptions = OPTIONAL
    
    @dataclass
    class removeBreakpointForEventListener(ProtocolCommand):
        """[Just WIP] Remove any breakpoints on the given event listener."""
        eventListenerId: DOM.EventListenerId
    
    @dataclass
    class getAccessibilityPropertiesForNode(ProtocolCommand):
        """[Just WIP] Returns a dictionary of accessibility properties for the node."""
        nodeId: DOM.NodeId
    
    @dataclass
    class insertAdjacentHTML(ProtocolCommand):
        """[Just WIP]"""
        nodeId: DOM.NodeId
        position: str
        html: str
    
    @dataclass
    class setInspectModeEnabled(ProtocolCommand):
        """[Just WIP] Enters the 'inspect' mode. In this mode, elements that user is hovering over are highlighted. Backend then generates 'inspect' command upon element selection."""
        enabled: bool
        highlightConfig: DOM.HighlightConfig = OPTIONAL
        gridOverlayConfig: DOM.GridOverlayConfig = OPTIONAL
        flexOverlayConfig: DOM.FlexOverlayConfig = OPTIONAL
    
    @dataclass
    class setInspectModeEnabled(ProtocolCommand):
        """[Just WIP] Enters the 'inspect' mode. In this mode, elements that user is hovering over are highlighted. Backend then generates 'inspect' command upon element selection."""
        enabled: bool
        highlightConfig: DOM.HighlightConfig = OPTIONAL
        gridOverlayConfig: DOM.GridOverlayConfig = OPTIONAL
        flexOverlayConfig: DOM.FlexOverlayConfig = OPTIONAL
        showRulers: bool = OPTIONAL
    
    @dataclass
    class highlightQuad(ProtocolCommand):
        """[Just WIP] Highlights given quad. Coordinates are absolute with respect to the main frame viewport."""
        quad: DOM.Quad
        color: DOM.RGBAColor = OPTIONAL
        outlineColor: DOM.RGBAColor = OPTIONAL
        usePageCoordinates: bool = OPTIONAL
    
    @dataclass
    class highlightSelector(ProtocolCommand):
        """[Just WIP] Highlights all DOM nodes that match a given selector. A string containing a CSS selector must be specified."""
        selectorString: str
        highlightConfig: DOM.HighlightConfig
        frameId: str = OPTIONAL
        gridOverlayConfig: DOM.GridOverlayConfig = OPTIONAL
        flexOverlayConfig: DOM.FlexOverlayConfig = OPTIONAL
    
    @dataclass
    class highlightSelector(ProtocolCommand):
        """[Just WIP] Highlights all DOM nodes that match a given selector. A string containing a CSS selector must be specified."""
        selectorString: str
        highlightConfig: DOM.HighlightConfig
        frameId: str = OPTIONAL
        gridOverlayConfig: DOM.GridOverlayConfig = OPTIONAL
        flexOverlayConfig: DOM.FlexOverlayConfig = OPTIONAL
        showRulers: bool = OPTIONAL
    
    @dataclass
    class highlightNodeList(ProtocolCommand):
        """[Just WIP] Highlights each DOM node in the given list."""
        nodeIds: list
        highlightConfig: DOM.HighlightConfig
        gridOverlayConfig: DOM.GridOverlayConfig = OPTIONAL
        flexOverlayConfig: DOM.FlexOverlayConfig = OPTIONAL
    
    @dataclass
    class highlightNodeList(ProtocolCommand):
        """[Just WIP] Highlights each DOM node in the given list."""
        nodeIds: list
        highlightConfig: DOM.HighlightConfig
        gridOverlayConfig: DOM.GridOverlayConfig = OPTIONAL
        flexOverlayConfig: DOM.FlexOverlayConfig = OPTIONAL
        showRulers: bool = OPTIONAL
    
    @dataclass
    class highlightFrame(ProtocolCommand):
        """[Just WIP] Highlights owner element of the frame with given id."""
        frameId: Network.FrameId
        contentColor: DOM.RGBAColor = OPTIONAL
        contentOutlineColor: DOM.RGBAColor = OPTIONAL
    
    @dataclass
    class showGridOverlay(ProtocolCommand):
        """[Just WIP] Shows a grid overlay for a node that begins a 'grid' layout context. The command has no effect if <code>nodeId</code> is invalid or the associated node does not begin a 'grid' layout context. A node can only have one grid overlay at a time; subsequent calls with the same <code>nodeId</code> will override earlier calls."""
        nodeId: DOM.NodeId
        gridOverlayConfig: DOM.GridOverlayConfig
    
    @dataclass
    class hideGridOverlay(ProtocolCommand):
        """[Just WIP] Hides a grid overlay for a node that begins a 'grid' layout context. The command has no effect if <code>nodeId</code> is specified and invalid, or if there is not currently an overlay set for the <code>nodeId</code>."""
        nodeId: DOM.NodeId = OPTIONAL
    
    @dataclass
    class showFlexOverlay(ProtocolCommand):
        """[Just WIP] Shows a flex overlay for a node that begins a 'flex' layout context. The command has no effect if <code>nodeId</code> is invalid or the associated node does not begin a 'flex' layout context. A node can only have one flex overlay at a time; subsequent calls with the same <code>nodeId</code> will override earlier calls."""
        nodeId: DOM.NodeId
        flexOverlayConfig: DOM.FlexOverlayConfig
    
    @dataclass
    class hideFlexOverlay(ProtocolCommand):
        """[Just WIP] Hides a flex overlay for a node that begins a 'flex' layout context. The command has no effect if <code>nodeId</code> is specified and invalid, or if there is not currently an overlay set for the <code>nodeId</code>."""
        nodeId: DOM.NodeId = OPTIONAL
    
    @dataclass
    class setAllowEditingUserAgentShadowTrees(ProtocolCommand):
        """[Just WIP] Controls whether any DOM commands work for nodes inside a UserAgent shadow tree."""
        allow: bool
    

@domainclass
class DOMDebugger:
    """DOM debugging allows setting breakpoints on particular DOM operations and events. JavaScript
execution will stop on these operations as if there was a regular breakpoint set."""
    DOMBreakpointType: str
    CSPViolationType: str
    class EventListener:
        """Object event listener."""
        type: str
        useCapture: bool
        passive: bool
        once: bool
        scriptId: Runtime.ScriptId
        lineNumber: int
        columnNumber: int
        handler: Runtime.RemoteObject
        originalHandler: Runtime.RemoteObject
        backendNodeId: DOM.BackendNodeId
    
    EventBreakpointType: str

    @dataclass
    class getEventListeners(ProtocolCommand):
        """[Just CDP] Returns event listeners of the given object."""
        objectId: Runtime.RemoteObjectId
        depth: int = OPTIONAL
        pierce: bool = OPTIONAL
    
    @dataclass
    class removeDOMBreakpoint(ProtocolCommand):
        """Removes DOM breakpoint that was set using `setDOMBreakpoint`."""
        nodeId: DOM.NodeId
        type: DOMDebugger.DOMBreakpointType
    
    @dataclass
    class removeEventListenerBreakpoint(ProtocolCommand):
        """[Just CDP] Removes breakpoint on particular DOM event."""
        eventName: str
        targetName: str = OPTIONAL
    
    @dataclass
    class removeInstrumentationBreakpoint(ProtocolCommand):
        """[Just CDP] Removes breakpoint on particular native event."""
        eventName: str
    
    @dataclass
    class removeXHRBreakpoint(ProtocolCommand):
        """[Just CDP] Removes breakpoint from XMLHttpRequest."""
        url: str
    
    @dataclass
    class setBreakOnCSPViolation(ProtocolCommand):
        """[Just CDP] Sets breakpoint on particular CSP violations."""
        violationTypes: list
    
    @dataclass
    class setDOMBreakpoint(ProtocolCommand):
        """Sets breakpoint on particular operation with DOM."""
        nodeId: DOM.NodeId
        type: DOMDebugger.DOMBreakpointType
        options: Debugger.BreakpointOptions = OPTIONAL
    
    @dataclass
    class setEventListenerBreakpoint(ProtocolCommand):
        """[Just CDP] Sets breakpoint on particular DOM event."""
        eventName: str
        targetName: str = OPTIONAL
    
    @dataclass
    class setInstrumentationBreakpoint(ProtocolCommand):
        """[Just CDP] Sets breakpoint on particular native event."""
        eventName: str
    
    @dataclass
    class setXHRBreakpoint(ProtocolCommand):
        """[Just CDP] Sets breakpoint on XMLHttpRequest."""
        url: str
    
    @dataclass
    class setEventBreakpoint(ProtocolCommand):
        """[Just WIP] Sets breakpoint on particular event of given type."""
        breakpointType: DOMDebugger.EventBreakpointType
        eventName: str = OPTIONAL
        caseSensitive: bool = OPTIONAL
        isRegex: bool = OPTIONAL
        options: Debugger.BreakpointOptions = OPTIONAL
    
    @dataclass
    class removeEventBreakpoint(ProtocolCommand):
        """[Just WIP] Removes breakpoint on particular event of given type."""
        breakpointType: DOMDebugger.EventBreakpointType
        eventName: str = OPTIONAL
        caseSensitive: bool = OPTIONAL
        isRegex: bool = OPTIONAL
    
    @dataclass
    class setURLBreakpoint(ProtocolCommand):
        """[Just WIP] Sets breakpoint on network activity for the given URL."""
        url: str
        isRegex: bool = OPTIONAL
        options: Debugger.BreakpointOptions = OPTIONAL
    
    @dataclass
    class removeURLBreakpoint(ProtocolCommand):
        """[Just WIP] Removes breakpoint from network activity for the given URL."""
        url: str
        isRegex: bool = OPTIONAL
    

@domainclass
class DOMSnapshot:
    """[Just CDP][Experimental] This domain facilitates obtaining document snapshots with DOM, layout, and style information."""
    class DOMNode:
        """A Node in the DOM tree."""
        nodeType: int
        nodeName: str
        nodeValue: str
        textValue: str
        inputValue: str
        inputChecked: bool
        optionSelected: bool
        backendNodeId: DOM.BackendNodeId
        childNodeIndexes: list
        attributes: list
        pseudoElementIndexes: list
        layoutNodeIndex: int
        documentURL: str
        baseURL: str
        contentLanguage: str
        documentEncoding: str
        publicId: str
        systemId: str
        frameId: Page.FrameId
        contentDocumentIndex: int
        pseudoType: DOM.PseudoType
        shadowRootType: DOM.ShadowRootType
        isClickable: bool
        eventListeners: list
        currentSourceURL: str
        originURL: str
        scrollOffsetX: int
        scrollOffsetY: int
    
    class InlineTextBox:
        """Details of post layout rendered text positions. The exact layout should not be regarded as
stable and may change between versions."""
        boundingBox: DOM.Rect
        startCharacterIndex: int
        numCharacters: int
    
    class LayoutTreeNode:
        """Details of an element in the DOM tree with a LayoutObject."""
        domNodeIndex: int
        boundingBox: DOM.Rect
        layoutText: str
        inlineTextNodes: list
        styleIndex: int
        paintOrder: int
        isStackingContext: bool
    
    class ComputedStyle:
        """A subset of the full ComputedStyle as defined by the request whitelist."""
        properties: list
    
    class NameValue:
        """A name/value pair."""
        name: str
        value: str
    
    StringIndex: int
    ArrayOfStrings: list
    class RareStringData:
        """Data that is only present on rare nodes."""
        index: list
        value: list
    
    class RareBooleanData:
        index: list
    
    class RareIntegerData:
        index: list
        value: list
    
    Rectangle: list
    class DocumentSnapshot:
        """Document snapshot."""
        documentURL: DOMSnapshot.StringIndex
        title: DOMSnapshot.StringIndex
        baseURL: DOMSnapshot.StringIndex
        contentLanguage: DOMSnapshot.StringIndex
        encodingName: DOMSnapshot.StringIndex
        publicId: DOMSnapshot.StringIndex
        systemId: DOMSnapshot.StringIndex
        frameId: DOMSnapshot.StringIndex
        nodes: DOMSnapshot.NodeTreeSnapshot
        layout: DOMSnapshot.LayoutTreeSnapshot
        textBoxes: DOMSnapshot.TextBoxSnapshot
        scrollOffsetX: int
        scrollOffsetY: int
        contentWidth: int
        contentHeight: int
    
    class NodeTreeSnapshot:
        """Table containing nodes."""
        parentIndex: list
        nodeType: list
        shadowRootType: DOMSnapshot.RareStringData
        nodeName: list
        nodeValue: list
        backendNodeId: list
        attributes: list
        textValue: DOMSnapshot.RareStringData
        inputValue: DOMSnapshot.RareStringData
        inputChecked: DOMSnapshot.RareBooleanData
        optionSelected: DOMSnapshot.RareBooleanData
        contentDocumentIndex: DOMSnapshot.RareIntegerData
        pseudoType: DOMSnapshot.RareStringData
        pseudoIdentifier: DOMSnapshot.RareStringData
        isClickable: DOMSnapshot.RareBooleanData
        currentSourceURL: DOMSnapshot.RareStringData
        originURL: DOMSnapshot.RareStringData
    
    class LayoutTreeSnapshot:
        """Table of details of an element in the DOM tree with a LayoutObject."""
        nodeIndex: list
        styles: list
        bounds: list
        text: list
        stackingContexts: DOMSnapshot.RareBooleanData
        paintOrders: list
        offsetRects: list
        scrollRects: list
        clientRects: list
        blendedBackgroundColors: list
        textColorOpacities: list
    
    class TextBoxSnapshot:
        """Table of details of the post layout rendered text positions. The exact layout should not be regarded as
stable and may change between versions."""
        layoutIndex: list
        bounds: list
        start: list
        length: list
    

    @dataclass
    class disable(ProtocolCommand):
        """Disables DOM snapshot agent for the given page."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables DOM snapshot agent for the given page."""
        pass
    
    @dataclass
    class getSnapshot(ProtocolCommand):
        """Returns a document snapshot, including the full DOM tree of the root node (including iframes,
template contents, and imported documents) in a flattened array, as well as layout and
white-listed computed style information for the nodes. Shadow DOM in the returned DOM tree is
flattened."""
        computedStyleWhitelist: list
        includeEventListeners: bool = OPTIONAL
        includePaintOrder: bool = OPTIONAL
        includeUserAgentShadowTree: bool = OPTIONAL
    
    @dataclass
    class captureSnapshot(ProtocolCommand):
        """Returns a document snapshot, including the full DOM tree of the root node (including iframes,
template contents, and imported documents) in a flattened array, as well as layout and
white-listed computed style information for the nodes. Shadow DOM in the returned DOM tree is
flattened."""
        computedStyles: list
        includePaintOrder: bool = OPTIONAL
        includeDOMRects: bool = OPTIONAL
        includeBlendedBackgroundColors: bool = OPTIONAL
        includeTextColorOpacities: bool = OPTIONAL
    

@domainclass
class DOMStorage:
    """Query and modify DOM storage."""
    SerializedStorageKey: str
    class StorageId:
        """DOM Storage identifier."""
        securityOrigin: str
        storageKey: DOMStorage.SerializedStorageKey
        isLocalStorage: bool
    
    Item: list
    class domStorageItemAdded(BaseEvent):
        storageId: DOMStorage.StorageId
        key: str
        newValue: str
    
    class domStorageItemRemoved(BaseEvent):
        storageId: DOMStorage.StorageId
        key: str
    
    class domStorageItemUpdated(BaseEvent):
        storageId: DOMStorage.StorageId
        key: str
        oldValue: str
        newValue: str
    
    class domStorageItemsCleared(BaseEvent):
        storageId: DOMStorage.StorageId
    
    @dataclass
    class clear(ProtocolCommand):
        """[Just CDP]"""
        storageId: DOMStorage.StorageId
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables storage tracking, prevents storage events from being sent to the client."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables storage tracking, storage events will now be delivered to the client."""
        pass
    
    @dataclass
    class getDOMStorageItems(ProtocolCommand):
        storageId: DOMStorage.StorageId
    
    @dataclass
    class removeDOMStorageItem(ProtocolCommand):
        storageId: DOMStorage.StorageId
        key: str
    
    @dataclass
    class setDOMStorageItem(ProtocolCommand):
        storageId: DOMStorage.StorageId
        key: str
        value: str
    
    @dataclass
    class clearDOMStorageItems(ProtocolCommand):
        """[Just WIP]"""
        storageId: DOMStorage.StorageId
    

@domainclass
class Database:
    DatabaseId: str
    class Database:
        """Database object."""
        id: Database.DatabaseId
        domain: str
        name: str
        version: str
    
    class Error:
        """Database error."""
        message: str
        code: int
    
    class addDatabase(BaseEvent):
        database: Database.Database
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables database tracking, prevents database events from being sent to the client."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables database tracking, database events will now be delivered to the client."""
        pass
    
    @dataclass
    class executeSQL(ProtocolCommand):
        databaseId: Database.DatabaseId
        query: str
    
    @dataclass
    class getDatabaseTableNames(ProtocolCommand):
        databaseId: Database.DatabaseId
    

@domainclass
class Emulation:
    """[Just CDP] This domain emulates different environments for the page."""
    class ScreenOrientation:
        """Screen orientation."""
        type: str
        angle: int
    
    class DisplayFeature:
        orientation: str
        offset: int
        maskLength: int
    
    class MediaFeature:
        name: str
        value: str
    
    VirtualTimePolicy: str
    class UserAgentBrandVersion:
        """Used to specify User Agent Cient Hints to emulate. See https://wicg.github.io/ua-client-hints"""
        brand: str
        version: str
    
    class UserAgentMetadata:
        """Used to specify User Agent Cient Hints to emulate. See https://wicg.github.io/ua-client-hints
Missing optional values will be filled in by the target with what it would normally use."""
        brands: list
        fullVersionList: list
        fullVersion: str
        platform: str
        platformVersion: str
        architecture: str
        model: str
        mobile: bool
        bitness: str
        wow64: bool
    
    DisabledImageType: str
    class virtualTimeBudgetExpired(BaseEvent):
        """Notification sent after the virtual time budget for the current VirtualTimePolicy has run out."""
        pass
    
    @dataclass
    class canEmulate(ProtocolCommand):
        """Tells whether emulation is supported."""
        pass
    
    @dataclass
    class clearDeviceMetricsOverride(ProtocolCommand):
        """Clears the overridden device metrics."""
        pass
    
    @dataclass
    class clearGeolocationOverride(ProtocolCommand):
        """Clears the overridden Geolocation Position and Error."""
        pass
    
    @dataclass
    class resetPageScaleFactor(ProtocolCommand):
        """Requests that page scale factor is reset to initial values."""
        pass
    
    @dataclass
    class setFocusEmulationEnabled(ProtocolCommand):
        """Enables or disables simulating a focused and active page."""
        enabled: bool
    
    @dataclass
    class setAutoDarkModeOverride(ProtocolCommand):
        """Automatically render all web contents using a dark theme."""
        enabled: bool = OPTIONAL
    
    @dataclass
    class setCPUThrottlingRate(ProtocolCommand):
        """Enables CPU throttling to emulate slow CPUs."""
        rate: int
    
    @dataclass
    class setDefaultBackgroundColorOverride(ProtocolCommand):
        """Sets or clears an override of the default background color of the frame. This override is used
if the content does not specify one."""
        color: DOM.RGBA = OPTIONAL
    
    @dataclass
    class setDeviceMetricsOverride(ProtocolCommand):
        """Overrides the values of device screen dimensions (window.screen.width, window.screen.height,
window.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media
query results)."""
        width: int
        height: int
        deviceScaleFactor: int
        mobile: bool
        scale: int = OPTIONAL
        screenWidth: int = OPTIONAL
        screenHeight: int = OPTIONAL
        positionX: int = OPTIONAL
        positionY: int = OPTIONAL
        dontSetVisibleSize: bool = OPTIONAL
        screenOrientation: Emulation.ScreenOrientation = OPTIONAL
        viewport: Page.Viewport = OPTIONAL
        displayFeature: Emulation.DisplayFeature = OPTIONAL
    
    @dataclass
    class setScrollbarsHidden(ProtocolCommand):
        hidden: bool
    
    @dataclass
    class setDocumentCookieDisabled(ProtocolCommand):
        disabled: bool
    
    @dataclass
    class setEmitTouchEventsForMouse(ProtocolCommand):
        enabled: bool
        configuration: str = OPTIONAL
    
    @dataclass
    class setEmulatedMedia(ProtocolCommand):
        """Emulates the given media type or media feature for CSS media queries."""
        media: str = OPTIONAL
        features: list = OPTIONAL
    
    @dataclass
    class setEmulatedVisionDeficiency(ProtocolCommand):
        """Emulates the given vision deficiency."""
        type: str
    
    @dataclass
    class setGeolocationOverride(ProtocolCommand):
        """Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position
unavailable."""
        latitude: int = OPTIONAL
        longitude: int = OPTIONAL
        accuracy: int = OPTIONAL
    
    @dataclass
    class setIdleOverride(ProtocolCommand):
        """Overrides the Idle state."""
        isUserActive: bool
        isScreenUnlocked: bool
    
    @dataclass
    class clearIdleOverride(ProtocolCommand):
        """Clears Idle state overrides."""
        pass
    
    @dataclass
    class setNavigatorOverrides(ProtocolCommand):
        """Overrides value returned by the javascript navigator object."""
        platform: str
    
    @dataclass
    class setPageScaleFactor(ProtocolCommand):
        """Sets a specified page scale factor."""
        pageScaleFactor: int
    
    @dataclass
    class setScriptExecutionDisabled(ProtocolCommand):
        """Switches script execution in the page."""
        value: bool
    
    @dataclass
    class setTouchEmulationEnabled(ProtocolCommand):
        """Enables touch on platforms which do not support them."""
        enabled: bool
        maxTouchPoints: int = OPTIONAL
    
    @dataclass
    class setVirtualTimePolicy(ProtocolCommand):
        """Turns on virtual time for all frames (replacing real-time with a synthetic time source) and sets
the current virtual time policy.  Note this supersedes any previous time budget."""
        policy: Emulation.VirtualTimePolicy
        budget: int = OPTIONAL
        maxVirtualTimeTaskStarvationCount: int = OPTIONAL
        initialVirtualTime: Network.TimeSinceEpoch = OPTIONAL
    
    @dataclass
    class setLocaleOverride(ProtocolCommand):
        """Overrides default host system locale with the specified one."""
        locale: str = OPTIONAL
    
    @dataclass
    class setTimezoneOverride(ProtocolCommand):
        """Overrides default host system timezone with the specified one."""
        timezoneId: str
    
    @dataclass
    class setVisibleSize(ProtocolCommand):
        """Resizes the frame/viewport of the page. Note that this does not affect the frame's container
(e.g. browser window). Can be used to produce screenshots of the specified size. Not supported
on Android."""
        width: int
        height: int
    
    @dataclass
    class setDisabledImageTypes(ProtocolCommand):
        imageTypes: list
    
    @dataclass
    class setHardwareConcurrencyOverride(ProtocolCommand):
        hardwareConcurrency: int
    
    @dataclass
    class setUserAgentOverride(ProtocolCommand):
        """Allows overriding user agent with the given string."""
        userAgent: str
        acceptLanguage: str = OPTIONAL
        platform: str = OPTIONAL
        userAgentMetadata: Emulation.UserAgentMetadata = OPTIONAL
    
    @dataclass
    class setAutomationOverride(ProtocolCommand):
        """Allows overriding the automation flag."""
        enabled: bool
    

@domainclass
class HeadlessExperimental:
    """[Just CDP][Experimental] This domain provides experimental commands only supported in headless mode."""
    class ScreenshotParams:
        """Encoding options for a screenshot."""
        format: str
        quality: int
        optimizeForSpeed: bool
    

    @dataclass
    class beginFrame(ProtocolCommand):
        """Sends a BeginFrame to the target and returns when the frame was completed. Optionally captures a
screenshot from the resulting frame. Requires that the target was created with enabled
BeginFrameControl. Designed for use with --run-all-compositor-stages-before-draw, see also
https://goo.gle/chrome-headless-rendering for more background."""
        frameTimeTicks: int = OPTIONAL
        interval: int = OPTIONAL
        noDisplayUpdates: bool = OPTIONAL
        screenshot: HeadlessExperimental.ScreenshotParams = OPTIONAL
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables headless events for the target."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables headless events for the target."""
        pass
    

@domainclass
class IO:
    """[Just CDP] Input/Output operations for streams produced by DevTools."""
    StreamHandle: str

    @dataclass
    class close(ProtocolCommand):
        """Close the stream, discard any temporary backing storage."""
        handle: IO.StreamHandle
    
    @dataclass
    class read(ProtocolCommand):
        """Read a chunk of the stream"""
        handle: IO.StreamHandle
        offset: int = OPTIONAL
        size: int = OPTIONAL
    
    @dataclass
    class resolveBlob(ProtocolCommand):
        """Return UUID of Blob object specified by a remote object id."""
        objectId: Runtime.RemoteObjectId
    

@domainclass
class IndexedDB:
    class DatabaseWithObjectStores:
        """Database with an array of object stores."""
        name: str
        version: int
        objectStores: list
    
    class ObjectStore:
        """Object store."""
        name: str
        keyPath: IndexedDB.KeyPath
        autoIncrement: bool
        indexes: list
    
    class ObjectStoreIndex:
        """Object store index."""
        name: str
        keyPath: IndexedDB.KeyPath
        unique: bool
        multiEntry: bool
    
    class Key:
        """Key."""
        type: str
        number: int
        string: str
        date: int
        array: list
    
    class KeyRange:
        """Key range."""
        lower: IndexedDB.Key
        upper: IndexedDB.Key
        lowerOpen: bool
        upperOpen: bool
    
    class DataEntry:
        """Data entry."""
        key: Runtime.RemoteObject
        primaryKey: Runtime.RemoteObject
        value: Runtime.RemoteObject
    
    class KeyPath:
        """Key path."""
        type: str
        string: str
        array: list
    

    @dataclass
    class clearObjectStore(ProtocolCommand):
        """Clears all entries from an object store."""
        databaseName: str
        objectStoreName: str
        securityOrigin: str = OPTIONAL
        storageKey: str = OPTIONAL
        storageBucket: Storage.StorageBucket = OPTIONAL
    
    @dataclass
    class deleteDatabase(ProtocolCommand):
        """[Just CDP] Deletes a database."""
        databaseName: str
        securityOrigin: str = OPTIONAL
        storageKey: str = OPTIONAL
        storageBucket: Storage.StorageBucket = OPTIONAL
    
    @dataclass
    class deleteObjectStoreEntries(ProtocolCommand):
        """[Just CDP] Delete a range of entries from an object store"""
        databaseName: str
        objectStoreName: str
        keyRange: IndexedDB.KeyRange
        securityOrigin: str = OPTIONAL
        storageKey: str = OPTIONAL
        storageBucket: Storage.StorageBucket = OPTIONAL
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables events from backend."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables events from backend."""
        pass
    
    @dataclass
    class requestData(ProtocolCommand):
        """Requests data from object store or index."""
        databaseName: str
        objectStoreName: str
        indexName: str
        skipCount: int
        pageSize: int
        securityOrigin: str = OPTIONAL
        storageKey: str = OPTIONAL
        storageBucket: Storage.StorageBucket = OPTIONAL
        keyRange: IndexedDB.KeyRange = OPTIONAL
    
    @dataclass
    class getMetadata(ProtocolCommand):
        """[Just CDP] Gets metadata of an object store."""
        databaseName: str
        objectStoreName: str
        securityOrigin: str = OPTIONAL
        storageKey: str = OPTIONAL
        storageBucket: Storage.StorageBucket = OPTIONAL
    
    @dataclass
    class requestDatabase(ProtocolCommand):
        """Requests database with given name in given frame."""
        databaseName: str
        securityOrigin: str = OPTIONAL
        storageKey: str = OPTIONAL
        storageBucket: Storage.StorageBucket = OPTIONAL
    
    @dataclass
    class requestDatabaseNames(ProtocolCommand):
        """Requests database names for given security origin."""
        securityOrigin: str = OPTIONAL
        storageKey: str = OPTIONAL
        storageBucket: Storage.StorageBucket = OPTIONAL
    

@domainclass
class Input:
    """[Just CDP]"""
    class TouchPoint:
        x: int
        y: int
        radiusX: int
        radiusY: int
        rotationAngle: int
        force: int
        tangentialPressure: int
        tiltX: int
        tiltY: int
        twist: int
        id: int
    
    GestureSourceType: str
    MouseButton: str
    TimeSinceEpoch: int
    class DragDataItem:
        mimeType: str
        data: str
        title: str
        baseURL: str
    
    class DragData:
        items: list
        files: list
        dragOperationsMask: int
    
    class dragIntercepted(BaseEvent):
        """Emitted only when `Input.setInterceptDrags` is enabled. Use this data with `Input.dispatchDragEvent` to
restore normal drag and drop behavior."""
        data: Input.DragData
    
    @dataclass
    class dispatchDragEvent(ProtocolCommand):
        """Dispatches a drag event into the page."""
        type: str
        x: int
        y: int
        data: Input.DragData
        modifiers: int = OPTIONAL
    
    @dataclass
    class dispatchKeyEvent(ProtocolCommand):
        """Dispatches a key event to the page."""
        type: str
        modifiers: int = OPTIONAL
        timestamp: Input.TimeSinceEpoch = OPTIONAL
        text: str = OPTIONAL
        unmodifiedText: str = OPTIONAL
        keyIdentifier: str = OPTIONAL
        code: str = OPTIONAL
        key: str = OPTIONAL
        windowsVirtualKeyCode: int = OPTIONAL
        nativeVirtualKeyCode: int = OPTIONAL
        autoRepeat: bool = OPTIONAL
        isKeypad: bool = OPTIONAL
        isSystemKey: bool = OPTIONAL
        location: int = OPTIONAL
        commands: list = OPTIONAL
    
    @dataclass
    class insertText(ProtocolCommand):
        """This method emulates inserting text that doesn't come from a key press,
for example an emoji keyboard or an IME."""
        text: str
    
    @dataclass
    class imeSetComposition(ProtocolCommand):
        """This method sets the current candidate text for ime.
Use imeCommitComposition to commit the final text.
Use imeSetComposition with empty string as text to cancel composition."""
        text: str
        selectionStart: int
        selectionEnd: int
        replacementStart: int = OPTIONAL
        replacementEnd: int = OPTIONAL
    
    @dataclass
    class dispatchMouseEvent(ProtocolCommand):
        """Dispatches a mouse event to the page."""
        type: str
        x: int
        y: int
        modifiers: int = OPTIONAL
        timestamp: Input.TimeSinceEpoch = OPTIONAL
        button: Input.MouseButton = OPTIONAL
        buttons: int = OPTIONAL
        clickCount: int = OPTIONAL
        force: int = OPTIONAL
        tangentialPressure: int = OPTIONAL
        tiltX: int = OPTIONAL
        tiltY: int = OPTIONAL
        twist: int = OPTIONAL
        deltaX: int = OPTIONAL
        deltaY: int = OPTIONAL
        pointerType: str = OPTIONAL
    
    @dataclass
    class dispatchTouchEvent(ProtocolCommand):
        """Dispatches a touch event to the page."""
        type: str
        touchPoints: list
        modifiers: int = OPTIONAL
        timestamp: Input.TimeSinceEpoch = OPTIONAL
    
    @dataclass
    class cancelDragging(ProtocolCommand):
        """Cancels any active dragging in the page."""
        pass
    
    @dataclass
    class emulateTouchFromMouseEvent(ProtocolCommand):
        """Emulates touch event from the mouse event parameters."""
        type: str
        x: int
        y: int
        button: Input.MouseButton
        timestamp: Input.TimeSinceEpoch = OPTIONAL
        deltaX: int = OPTIONAL
        deltaY: int = OPTIONAL
        modifiers: int = OPTIONAL
        clickCount: int = OPTIONAL
    
    @dataclass
    class setIgnoreInputEvents(ProtocolCommand):
        """Ignores input events (useful while auditing page)."""
        ignore: bool
    
    @dataclass
    class setInterceptDrags(ProtocolCommand):
        """Prevents default drag and drop behavior and instead emits `Input.dragIntercepted` events.
Drag and drop behavior can be directly controlled via `Input.dispatchDragEvent`."""
        enabled: bool
    
    @dataclass
    class synthesizePinchGesture(ProtocolCommand):
        """Synthesizes a pinch gesture over a time period by issuing appropriate touch events."""
        x: int
        y: int
        scaleFactor: int
        relativeSpeed: int = OPTIONAL
        gestureSourceType: Input.GestureSourceType = OPTIONAL
    
    @dataclass
    class synthesizeScrollGesture(ProtocolCommand):
        """Synthesizes a scroll gesture over a time period by issuing appropriate touch events."""
        x: int
        y: int
        xDistance: int = OPTIONAL
        yDistance: int = OPTIONAL
        xOverscroll: int = OPTIONAL
        yOverscroll: int = OPTIONAL
        preventFling: bool = OPTIONAL
        speed: int = OPTIONAL
        gestureSourceType: Input.GestureSourceType = OPTIONAL
        repeatCount: int = OPTIONAL
        repeatDelayMs: int = OPTIONAL
        interactionMarkerName: str = OPTIONAL
    
    @dataclass
    class synthesizeTapGesture(ProtocolCommand):
        """Synthesizes a tap gesture over a time period by issuing appropriate touch events."""
        x: int
        y: int
        duration: int = OPTIONAL
        tapCount: int = OPTIONAL
        gestureSourceType: Input.GestureSourceType = OPTIONAL
    

@domainclass
class Inspector:

    class detached(BaseEvent):
        """Fired when remote debugging connection is about to be terminated. Contains detach reason."""
        reason: str
    
    class targetCrashed(BaseEvent):
        """Fired when debugging target has crashed"""
        pass
    
    class targetReloadedAfterCrash(BaseEvent):
        """Fired when debugging target has reloaded after crash"""
        pass
    
    class evaluateForTestInFrontend(BaseEvent):
        script: str
    
    class inspect(BaseEvent):
        object: Runtime.RemoteObject
        hints: Any
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables inspector domain notifications."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables inspector domain notifications."""
        pass
    
    @dataclass
    class initialized(ProtocolCommand):
        """[Just WIP] Sent by the frontend after all initialization messages have been sent."""
        pass
    

@domainclass
class LayerTree:
    LayerId: str
    SnapshotId: str
    class ScrollRect:
        """Rectangle where scrolling happens on the main thread."""
        rect: DOM.Rect
        type: str
    
    class StickyPositionConstraint:
        """Sticky position constraints."""
        stickyBoxRect: DOM.Rect
        containingBlockRect: DOM.Rect
        nearestLayerShiftingStickyBox: LayerTree.LayerId
        nearestLayerShiftingContainingBlock: LayerTree.LayerId
    
    class PictureTile:
        """Serialized fragment of layer picture along with its offset within the layer."""
        x: int
        y: int
        picture: str
    
    class Layer:
        """Information about a compositing layer."""
        layerId: LayerTree.LayerId
        parentLayerId: LayerTree.LayerId
        backendNodeId: DOM.BackendNodeId
        offsetX: int
        offsetY: int
        width: int
        height: int
        transform: list
        anchorX: int
        anchorY: int
        anchorZ: int
        paintCount: int
        drawsContent: bool
        invisible: bool
        scrollRects: list
        stickyPositionConstraint: LayerTree.StickyPositionConstraint
        nodeId: DOM.NodeId
        bounds: LayerTree.IntRect
        memory: int
        compositedBounds: LayerTree.IntRect
        isInShadowTree: bool
        isReflection: bool
        isGeneratedContent: bool
        isAnonymous: bool
        pseudoElementId: LayerTree.PseudoElementId
        pseudoElement: str
    
    PaintProfile: list
    PseudoElementId: str
    class IntRect:
        """A rectangle."""
        x: int
        y: int
        width: int
        height: int
    
    class CompositingReasons:
        """An object containing the reasons why the layer was composited as properties."""
        transform3D: bool
        video: bool
        canvas: bool
        plugin: bool
        iFrame: bool
        model: bool
        backfaceVisibilityHidden: bool
        clipsCompositingDescendants: bool
        animation: bool
        filters: bool
        positionFixed: bool
        positionSticky: bool
        overflowScrollingTouch: bool
        stacking: bool
        overlap: bool
        negativeZIndexChildren: bool
        transformWithCompositedDescendants: bool
        opacityWithCompositedDescendants: bool
        maskWithCompositedDescendants: bool
        reflectionWithCompositedDescendants: bool
        filterWithCompositedDescendants: bool
        blendingWithCompositedDescendants: bool
        isolatesCompositedBlendingDescendants: bool
        perspective: bool
        preserve3D: bool
        willChange: bool
        root: bool
        blending: bool
    
    class layerPainted(BaseEvent):
        layerId: LayerTree.LayerId
        clip: DOM.Rect
    
    class layerTreeDidChange(BaseEvent):
        layers: list
    
    @dataclass
    class compositingReasons(ProtocolCommand):
        """[Just CDP] Provides the reasons why the given layer was composited."""
        layerId: LayerTree.LayerId
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables compositing tree inspection."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables compositing tree inspection."""
        pass
    
    @dataclass
    class loadSnapshot(ProtocolCommand):
        """[Just CDP] Returns the snapshot identifier."""
        tiles: list
    
    @dataclass
    class makeSnapshot(ProtocolCommand):
        """[Just CDP] Returns the layer snapshot identifier."""
        layerId: LayerTree.LayerId
    
    @dataclass
    class profileSnapshot(ProtocolCommand):
        """[Just CDP]"""
        snapshotId: LayerTree.SnapshotId
        minRepeatCount: int = OPTIONAL
        minDuration: int = OPTIONAL
        clipRect: DOM.Rect = OPTIONAL
    
    @dataclass
    class releaseSnapshot(ProtocolCommand):
        """[Just CDP] Releases layer snapshot captured by the back-end."""
        snapshotId: LayerTree.SnapshotId
    
    @dataclass
    class replaySnapshot(ProtocolCommand):
        """[Just CDP] Replays the layer snapshot and returns the resulting bitmap."""
        snapshotId: LayerTree.SnapshotId
        fromStep: int = OPTIONAL
        toStep: int = OPTIONAL
        scale: int = OPTIONAL
    
    @dataclass
    class snapshotCommandLog(ProtocolCommand):
        """[Just CDP] Replays the layer snapshot and returns canvas log."""
        snapshotId: LayerTree.SnapshotId
    
    @dataclass
    class layersForNode(ProtocolCommand):
        """[Just WIP] Returns the layer tree structure of the current page."""
        nodeId: DOM.NodeId
    
    @dataclass
    class reasonsForCompositingLayer(ProtocolCommand):
        """[Just WIP] Provides the reasons why the given layer was composited."""
        layerId: LayerTree.LayerId
    

@domainclass
class Log:
    """[Just CDP] Provides access to log entries."""
    class LogEntry:
        """Log entry."""
        source: str
        level: str
        text: str
        category: str
        timestamp: Runtime.Timestamp
        url: str
        lineNumber: int
        stackTrace: Runtime.StackTrace
        networkRequestId: Network.RequestId
        workerId: str
        args: list
    
    class ViolationSetting:
        """Violation configuration setting."""
        name: str
        threshold: int
    
    class entryAdded(BaseEvent):
        """Issued when new message was logged."""
        entry: Log.LogEntry
    
    @dataclass
    class clear(ProtocolCommand):
        """Clears the log."""
        pass
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables log domain, prevents further log entries from being reported to the client."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables log domain, sends the entries collected so far to the client by means of the
`entryAdded` notification."""
        pass
    
    @dataclass
    class startViolationsReport(ProtocolCommand):
        """start violation reporting."""
        config: list
    
    @dataclass
    class stopViolationsReport(ProtocolCommand):
        """Stop violation reporting."""
        pass
    

@domainclass
class Memory:
    PressureLevel: str
    class SamplingProfileNode:
        """Heap profile sample."""
        size: int
        total: int
        stack: list
    
    class SamplingProfile:
        """Array of heap profile samples."""
        samples: list
        modules: list
    
    class Module:
        """Executable module information"""
        name: str
        uuid: str
        baseAddress: str
        size: int
    
    class Event:
        timestamp: int
        categories: list
    
    class CategoryData:
        type: str
        size: int
    
    class memoryPressure(BaseEvent):
        """Memory pressure was encountered."""
        timestamp: int
        severity: str
    
    class trackingStart(BaseEvent):
        """Tracking started."""
        timestamp: int
    
    class trackingUpdate(BaseEvent):
        """Periodic tracking updates with event data."""
        event: Memory.Event
    
    class trackingComplete(BaseEvent):
        """Tracking stopped."""
        timestamp: int
    
    @dataclass
    class getDOMCounters(ProtocolCommand):
        """[Just CDP]"""
        pass
    
    @dataclass
    class prepareForLeakDetection(ProtocolCommand):
        """[Just CDP]"""
        pass
    
    @dataclass
    class forciblyPurgeJavaScriptMemory(ProtocolCommand):
        """[Just CDP] Simulate OomIntervention by purging V8 memory."""
        pass
    
    @dataclass
    class setPressureNotificationsSuppressed(ProtocolCommand):
        """[Just CDP] Enable/disable suppressing memory pressure notifications in all processes."""
        suppressed: bool
    
    @dataclass
    class simulatePressureNotification(ProtocolCommand):
        """[Just CDP] Simulate a memory pressure notification in all processes."""
        level: Memory.PressureLevel
    
    @dataclass
    class startSampling(ProtocolCommand):
        """[Just CDP] Start collecting native memory profile."""
        samplingInterval: int = OPTIONAL
        suppressRandomness: bool = OPTIONAL
    
    @dataclass
    class stopSampling(ProtocolCommand):
        """[Just CDP] Stop collecting native memory profile."""
        pass
    
    @dataclass
    class getAllTimeSamplingProfile(ProtocolCommand):
        """[Just CDP] Retrieve native memory allocations profile
collected since renderer process startup."""
        pass
    
    @dataclass
    class getBrowserSamplingProfile(ProtocolCommand):
        """[Just CDP] Retrieve native memory allocations profile
collected since browser process startup."""
        pass
    
    @dataclass
    class getSamplingProfile(ProtocolCommand):
        """[Just CDP] Retrieve native memory allocations profile collected since last
`startSampling` call."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """[Just WIP] Enables Memory domain events."""
        pass
    
    @dataclass
    class disable(ProtocolCommand):
        """[Just WIP] Disables Memory domain events."""
        pass
    
    @dataclass
    class startTracking(ProtocolCommand):
        """[Just WIP] Start tracking memory. This will produce a `trackingStart` event."""
        pass
    
    @dataclass
    class stopTracking(ProtocolCommand):
        """[Just WIP] Stop tracking memory. This will produce a `trackingComplete` event."""
        pass
    

@domainclass
class Network:
    """Network domain allows tracking network activities of the page. It exposes information about http,
file, data and other requests and responses, their headers, bodies, timing, etc."""
    ResourceType: str
    LoaderId: str
    RequestId: str
    InterceptionId: str
    ErrorReason: str
    TimeSinceEpoch: int
    MonotonicTime: int
    Headers: Any
    ConnectionType: str
    CookieSameSite: str
    CookiePriority: str
    CookieSourceScheme: str
    class ResourceTiming:
        """Timing information for the request."""
        requestTime: int
        proxyStart: int
        proxyEnd: int
        dnsStart: int
        dnsEnd: int
        connectStart: int
        connectEnd: int
        sslStart: int
        sslEnd: int
        workerStart: int
        workerReady: int
        workerFetchStart: int
        workerRespondWithSettled: int
        sendStart: int
        sendEnd: int
        pushStart: int
        pushEnd: int
        receiveHeadersStart: int
        receiveHeadersEnd: int
        startTime: Network.Timestamp
        redirectStart: Network.Timestamp
        redirectEnd: Network.Timestamp
        fetchStart: Network.Timestamp
        domainLookupStart: int
        domainLookupEnd: int
        secureConnectionStart: int
        requestStart: int
        responseStart: int
        responseEnd: int
    
    ResourcePriority: str
    class PostDataEntry:
        """Post data entry for HTTP request"""
        bytes: str
    
    class Request:
        """HTTP request data."""
        url: str
        urlFragment: str
        method: str
        headers: Network.Headers
        postData: str
        hasPostData: bool
        postDataEntries: list
        mixedContentType: Security.MixedContentType
        initialPriority: Network.ResourcePriority
        referrerPolicy: str
        isLinkPreload: bool
        trustTokenParams: Network.TrustTokenParams
        isSameSite: bool
        integrity: str
    
    class SignedCertificateTimestamp:
        """Details of a signed certificate timestamp (SCT)."""
        status: str
        origin: str
        logDescription: str
        logId: str
        timestamp: int
        hashAlgorithm: str
        signatureAlgorithm: str
        signatureData: str
    
    class SecurityDetails:
        """Security details about a request."""
        protocol: str
        keyExchange: str
        keyExchangeGroup: str
        cipher: str
        mac: str
        certificateId: Security.CertificateId
        subjectName: str
        sanList: list
        issuer: str
        validFrom: Network.TimeSinceEpoch
        validTo: Network.TimeSinceEpoch
        signedCertificateTimestampList: list
        certificateTransparencyCompliance: Network.CertificateTransparencyCompliance
        serverSignatureAlgorithm: int
        encryptedClientHello: bool
    
    CertificateTransparencyCompliance: str
    BlockedReason: str
    CorsError: str
    class CorsErrorStatus:
        corsError: Network.CorsError
        failedParameter: str
    
    ServiceWorkerResponseSource: str
    class TrustTokenParams:
        """Determines what type of Trust Token operation is executed and
depending on the type, some additional parameters. The values
are specified in third_party/blink/renderer/core/fetch/trust_token.idl."""
        operation: Network.TrustTokenOperationType
        refreshPolicy: str
        issuers: list
    
    TrustTokenOperationType: str
    AlternateProtocolUsage: str
    class Response:
        """HTTP response data."""
        url: str
        status: int
        statusText: str
        headers: Network.Headers
        headersText: str
        mimeType: str
        requestHeaders: Network.Headers
        requestHeadersText: str
        connectionReused: bool
        connectionId: int
        remoteIPAddress: str
        remotePort: int
        fromDiskCache: bool
        fromServiceWorker: bool
        fromPrefetchCache: bool
        encodedDataLength: int
        timing: Network.ResourceTiming
        serviceWorkerResponseSource: Network.ServiceWorkerResponseSource
        responseTime: Network.TimeSinceEpoch
        cacheStorageCacheName: str
        protocol: str
        alternateProtocolUsage: Network.AlternateProtocolUsage
        securityState: Security.SecurityState
        securityDetails: Network.SecurityDetails
        source: str
        security: Security.Security
    
    class WebSocketRequest:
        """WebSocket request data."""
        headers: Network.Headers
    
    class WebSocketResponse:
        """WebSocket response data."""
        status: int
        statusText: str
        headers: Network.Headers
        headersText: str
        requestHeaders: Network.Headers
        requestHeadersText: str
    
    class WebSocketFrame:
        """WebSocket message data. This represents an entire WebSocket message, not just a fragmented frame as the name suggests."""
        opcode: int
        mask: bool
        payloadData: str
        payloadLength: int
    
    class CachedResource:
        """Information about the cached resource."""
        url: str
        type: Network.ResourceType
        response: Network.Response
        bodySize: int
        sourceMapURL: str
    
    class Initiator:
        """Information about the request initiator."""
        type: str
        stack: Runtime.StackTrace
        url: str
        lineNumber: int
        columnNumber: int
        requestId: Network.RequestId
        stackTrace: Console.StackTrace
        nodeId: DOM.NodeId
    
    class Cookie:
        """Cookie object"""
        name: str
        value: str
        domain: str
        path: str
        expires: int
        size: int
        httpOnly: bool
        secure: bool
        session: bool
        sameSite: Network.CookieSameSite
        priority: Network.CookiePriority
        sameParty: bool
        sourceScheme: Network.CookieSourceScheme
        sourcePort: int
        partitionKey: str
        partitionKeyOpaque: bool
    
    SetCookieBlockedReason: str
    CookieBlockedReason: str
    class BlockedSetCookieWithReason:
        """A cookie which was not stored from a response with the corresponding reason."""
        blockedReasons: list
        cookieLine: str
        cookie: Network.Cookie
    
    class BlockedCookieWithReason:
        """A cookie with was not sent with a request with the corresponding reason."""
        blockedReasons: list
        cookie: Network.Cookie
    
    class CookieParam:
        """Cookie parameter object"""
        name: str
        value: str
        url: str
        domain: str
        path: str
        secure: bool
        httpOnly: bool
        sameSite: Network.CookieSameSite
        expires: Network.TimeSinceEpoch
        priority: Network.CookiePriority
        sameParty: bool
        sourceScheme: Network.CookieSourceScheme
        sourcePort: int
        partitionKey: str
    
    class AuthChallenge:
        """Authorization challenge for HTTP status code 401 or 407."""
        source: str
        origin: str
        scheme: str
        realm: str
    
    class AuthChallengeResponse:
        """Response to an AuthChallenge."""
        response: str
        username: str
        password: str
    
    InterceptionStage: str
    class RequestPattern:
        """Request pattern for interception."""
        urlPattern: str
        resourceType: Network.ResourceType
        interceptionStage: Network.InterceptionStage
    
    class SignedExchangeSignature:
        """Information about a signed exchange signature.
https://wicg.github.io/webpackage/draft-yasskin-httpbis-origin-signed-exchanges-impl.html#rfc.section.3.1"""
        label: str
        signature: str
        integrity: str
        certUrl: str
        certSha256: str
        validityUrl: str
        date: int
        expires: int
        certificates: list
    
    class SignedExchangeHeader:
        """Information about a signed exchange header.
https://wicg.github.io/webpackage/draft-yasskin-httpbis-origin-signed-exchanges-impl.html#cbor-representation"""
        requestUrl: str
        responseCode: int
        responseHeaders: Network.Headers
        signatures: list
        headerIntegrity: str
    
    SignedExchangeErrorField: str
    class SignedExchangeError:
        """Information about a signed exchange response."""
        message: str
        signatureIndex: int
        errorField: Network.SignedExchangeErrorField
    
    class SignedExchangeInfo:
        """Information about a signed exchange response."""
        outerResponse: Network.Response
        header: Network.SignedExchangeHeader
        securityDetails: Network.SecurityDetails
        errors: list
    
    ContentEncoding: str
    PrivateNetworkRequestPolicy: str
    IPAddressSpace: str
    class ConnectTiming:
        requestTime: int
    
    class ClientSecurityState:
        initiatorIsSecureContext: bool
        initiatorIPAddressSpace: Network.IPAddressSpace
        privateNetworkRequestPolicy: Network.PrivateNetworkRequestPolicy
    
    CrossOriginOpenerPolicyValue: str
    class CrossOriginOpenerPolicyStatus:
        value: Network.CrossOriginOpenerPolicyValue
        reportOnlyValue: Network.CrossOriginOpenerPolicyValue
        reportingEndpoint: str
        reportOnlyReportingEndpoint: str
    
    CrossOriginEmbedderPolicyValue: str
    class CrossOriginEmbedderPolicyStatus:
        value: Network.CrossOriginEmbedderPolicyValue
        reportOnlyValue: Network.CrossOriginEmbedderPolicyValue
        reportingEndpoint: str
        reportOnlyReportingEndpoint: str
    
    ContentSecurityPolicySource: str
    class ContentSecurityPolicyStatus:
        effectiveDirectives: str
        isEnforced: bool
        source: Network.ContentSecurityPolicySource
    
    class SecurityIsolationStatus:
        coop: Network.CrossOriginOpenerPolicyStatus
        coep: Network.CrossOriginEmbedderPolicyStatus
        csp: list
    
    ReportStatus: str
    ReportId: str
    class ReportingApiReport:
        """An object representing a report generated by the Reporting API."""
        id: Network.ReportId
        initiatorUrl: str
        destination: str
        type: str
        timestamp: Network.TimeSinceEpoch
        depth: int
        completedAttempts: int
        body: Any
        status: Network.ReportStatus
    
    class ReportingApiEndpoint:
        url: str
        groupName: str
    
    class LoadNetworkResourcePageResult:
        """An object providing the result of a network resource load."""
        success: bool
        netError: int
        netErrorName: str
        httpStatusCode: int
        stream: IO.StreamHandle
        headers: Network.Headers
    
    class LoadNetworkResourceOptions:
        """An options object that may be extended later to better support CORS,
CORB and streaming."""
        disableCache: bool
        includeCredentials: bool
    
    FrameId: str
    Timestamp: int
    Walltime: int
    ReferrerPolicy: str
    class Metrics:
        """Network load metrics."""
        protocol: str
        priority: str
        connectionIdentifier: str
        remoteAddress: str
        requestHeaders: Network.Headers
        requestHeaderBytesSent: int
        requestBodyBytesSent: int
        responseHeaderBytesReceived: int
        responseBodyBytesReceived: int
        responseBodyDecodedSize: int
        securityConnection: Security.Connection
        isProxyConnection: bool
    
    NetworkStage: str
    ResourceErrorType: str
    class dataReceived(BaseEvent):
        """Fired when data chunk was received over the network."""
        requestId: Network.RequestId
        timestamp: Network.MonotonicTime
        dataLength: int
        encodedDataLength: int
    
    class eventSourceMessageReceived(BaseEvent):
        """Fired when EventSource message is received."""
        requestId: Network.RequestId
        timestamp: Network.MonotonicTime
        eventName: str
        eventId: str
        data: str
    
    class loadingFailed(BaseEvent):
        """Fired when HTTP request has failed to load."""
        requestId: Network.RequestId
        timestamp: Network.MonotonicTime
        type: Network.ResourceType
        errorText: str
        canceled: bool
        blockedReason: Network.BlockedReason
        corsErrorStatus: Network.CorsErrorStatus
    
    class loadingFinished(BaseEvent):
        """Fired when HTTP request has finished loading."""
        requestId: Network.RequestId
        timestamp: Network.MonotonicTime
        encodedDataLength: int
        sourceMapURL: str
        metrics: Network.Metrics
    
    class requestIntercepted(BaseEvent):
        """Details of an intercepted HTTP request, which must be either allowed, blocked, modified or
mocked.
Deprecated, use Fetch.requestPaused instead."""
        interceptionId: Network.InterceptionId
        request: Network.Request
        frameId: Page.FrameId
        resourceType: Network.ResourceType
        isNavigationRequest: bool
        isDownload: bool
        redirectUrl: str
        authChallenge: Network.AuthChallenge
        responseErrorReason: Network.ErrorReason
        responseStatusCode: int
        responseHeaders: Network.Headers
        requestId: Network.RequestId
    
    class requestServedFromCache(BaseEvent):
        """Fired if request ended up loading from cache."""
        requestId: Network.RequestId
    
    class requestWillBeSent(BaseEvent):
        """Fired when page is about to send HTTP request."""
        requestId: Network.RequestId
        loaderId: Network.LoaderId
        documentURL: str
        request: Network.Request
        timestamp: Network.MonotonicTime
        wallTime: Network.TimeSinceEpoch
        initiator: Network.Initiator
        redirectHasExtraInfo: bool
        redirectResponse: Network.Response
        type: Network.ResourceType
        frameId: Page.FrameId
        hasUserGesture: bool
        walltime: Network.Walltime
        targetId: str
    
    class resourceChangedPriority(BaseEvent):
        """Fired when resource loading priority is changed"""
        requestId: Network.RequestId
        newPriority: Network.ResourcePriority
        timestamp: Network.MonotonicTime
    
    class signedExchangeReceived(BaseEvent):
        """Fired when a signed exchange was received over the network"""
        requestId: Network.RequestId
        info: Network.SignedExchangeInfo
    
    class responseReceived(BaseEvent):
        """Fired when HTTP response is available."""
        requestId: Network.RequestId
        loaderId: Network.LoaderId
        timestamp: Network.MonotonicTime
        type: Network.ResourceType
        response: Network.Response
        hasExtraInfo: bool
        frameId: Page.FrameId
    
    class webSocketClosed(BaseEvent):
        """Fired when WebSocket is closed."""
        requestId: Network.RequestId
        timestamp: Network.MonotonicTime
    
    class webSocketCreated(BaseEvent):
        """Fired upon WebSocket creation."""
        requestId: Network.RequestId
        url: str
        initiator: Network.Initiator
    
    class webSocketFrameError(BaseEvent):
        """Fired when WebSocket message error occurs."""
        requestId: Network.RequestId
        timestamp: Network.MonotonicTime
        errorMessage: str
    
    class webSocketFrameReceived(BaseEvent):
        """Fired when WebSocket message is received."""
        requestId: Network.RequestId
        timestamp: Network.MonotonicTime
        response: Network.WebSocketFrame
    
    class webSocketFrameSent(BaseEvent):
        """Fired when WebSocket message is sent."""
        requestId: Network.RequestId
        timestamp: Network.MonotonicTime
        response: Network.WebSocketFrame
    
    class webSocketHandshakeResponseReceived(BaseEvent):
        """Fired when WebSocket handshake response becomes available."""
        requestId: Network.RequestId
        timestamp: Network.MonotonicTime
        response: Network.WebSocketResponse
    
    class webSocketWillSendHandshakeRequest(BaseEvent):
        """Fired when WebSocket is about to initiate handshake."""
        requestId: Network.RequestId
        timestamp: Network.MonotonicTime
        wallTime: Network.TimeSinceEpoch
        request: Network.WebSocketRequest
        walltime: Network.Walltime
    
    class webTransportCreated(BaseEvent):
        """Fired upon WebTransport creation."""
        transportId: Network.RequestId
        url: str
        timestamp: Network.MonotonicTime
        initiator: Network.Initiator
    
    class webTransportConnectionEstablished(BaseEvent):
        """Fired when WebTransport handshake is finished."""
        transportId: Network.RequestId
        timestamp: Network.MonotonicTime
    
    class webTransportClosed(BaseEvent):
        """Fired when WebTransport is disposed."""
        transportId: Network.RequestId
        timestamp: Network.MonotonicTime
    
    class requestWillBeSentExtraInfo(BaseEvent):
        """Fired when additional information about a requestWillBeSent event is available from the
network stack. Not every requestWillBeSent event will have an additional
requestWillBeSentExtraInfo fired for it, and there is no guarantee whether requestWillBeSent
or requestWillBeSentExtraInfo will be fired first for the same request."""
        requestId: Network.RequestId
        associatedCookies: list
        headers: Network.Headers
        connectTiming: Network.ConnectTiming
        clientSecurityState: Network.ClientSecurityState
        siteHasCookieInOtherPartition: bool
    
    class responseReceivedExtraInfo(BaseEvent):
        """Fired when additional information about a responseReceived event is available from the network
stack. Not every responseReceived event will have an additional responseReceivedExtraInfo for
it, and responseReceivedExtraInfo may be fired before or after responseReceived."""
        requestId: Network.RequestId
        blockedCookies: list
        headers: Network.Headers
        resourceIPAddressSpace: Network.IPAddressSpace
        statusCode: int
        headersText: str
        cookiePartitionKey: str
        cookiePartitionKeyOpaque: bool
    
    class trustTokenOperationDone(BaseEvent):
        """Fired exactly once for each Trust Token operation. Depending on
the type of the operation and whether the operation succeeded or
failed, the event is fired before the corresponding request was sent
or after the response was received."""
        status: str
        type: Network.TrustTokenOperationType
        requestId: Network.RequestId
        topLevelOrigin: str
        issuerOrigin: str
        issuedTokenCount: int
    
    class subresourceWebBundleMetadataReceived(BaseEvent):
        """Fired once when parsing the .wbn file has succeeded.
The event contains the information about the web bundle contents."""
        requestId: Network.RequestId
        urls: list
    
    class subresourceWebBundleMetadataError(BaseEvent):
        """Fired once when parsing the .wbn file has failed."""
        requestId: Network.RequestId
        errorMessage: str
    
    class subresourceWebBundleInnerResponseParsed(BaseEvent):
        """Fired when handling requests for resources within a .wbn file.
Note: this will only be fired for resources that are requested by the webpage."""
        innerRequestId: Network.RequestId
        innerRequestURL: str
        bundleRequestId: Network.RequestId
    
    class subresourceWebBundleInnerResponseError(BaseEvent):
        """Fired when request for resources within a .wbn file failed."""
        innerRequestId: Network.RequestId
        innerRequestURL: str
        errorMessage: str
        bundleRequestId: Network.RequestId
    
    class reportingApiReportAdded(BaseEvent):
        """Is sent whenever a new report is added.
And after 'enableReportingApi' for all existing reports."""
        report: Network.ReportingApiReport
    
    class reportingApiReportUpdated(BaseEvent):
        report: Network.ReportingApiReport
    
    class reportingApiEndpointsChangedForOrigin(BaseEvent):
        origin: str
        endpoints: list
    
    class requestServedFromMemoryCache(BaseEvent):
        """Fired when HTTP request has been served from memory cache."""
        requestId: Network.RequestId
        frameId: Network.FrameId
        loaderId: Network.LoaderId
        documentURL: str
        timestamp: Network.Timestamp
        initiator: Network.Initiator
        resource: Network.CachedResource
    
    class responseIntercepted(BaseEvent):
        """Fired when HTTP response has been intercepted. The frontend must response with <code>Network.interceptContinue</code> or <code>Network.interceptWithResponse</code>` to continue this response."""
        requestId: Network.RequestId
        response: Network.Response
    
    @dataclass
    class setAcceptedEncodings(ProtocolCommand):
        """[Just CDP] Sets a list of content encodings that will be accepted. Empty list means no encoding is accepted."""
        encodings: list
    
    @dataclass
    class clearAcceptedEncodingsOverride(ProtocolCommand):
        """[Just CDP] Clears accepted encodings set by setAcceptedEncodings"""
        pass
    
    @dataclass
    class canClearBrowserCache(ProtocolCommand):
        """[Just CDP] Tells whether clearing browser cache is supported."""
        pass
    
    @dataclass
    class canClearBrowserCookies(ProtocolCommand):
        """[Just CDP] Tells whether clearing browser cookies is supported."""
        pass
    
    @dataclass
    class canEmulateNetworkConditions(ProtocolCommand):
        """[Just CDP] Tells whether emulation of network conditions is supported."""
        pass
    
    @dataclass
    class clearBrowserCache(ProtocolCommand):
        """[Just CDP] Clears browser cache."""
        pass
    
    @dataclass
    class clearBrowserCookies(ProtocolCommand):
        """[Just CDP] Clears browser cookies."""
        pass
    
    @dataclass
    class continueInterceptedRequest(ProtocolCommand):
        """[Just CDP] Response to Network.requestIntercepted which either modifies the request to continue with any
modifications, or blocks it, or completes it with the provided response bytes. If a network
fetch occurs as a result which encounters a redirect an additional Network.requestIntercepted
event will be sent with the same InterceptionId.
Deprecated, use Fetch.continueRequest, Fetch.fulfillRequest and Fetch.failRequest instead."""
        interceptionId: Network.InterceptionId
        errorReason: Network.ErrorReason = OPTIONAL
        rawResponse: str = OPTIONAL
        url: str = OPTIONAL
        method: str = OPTIONAL
        postData: str = OPTIONAL
        headers: Network.Headers = OPTIONAL
        authChallengeResponse: Network.AuthChallengeResponse = OPTIONAL
    
    @dataclass
    class deleteCookies(ProtocolCommand):
        """[Just CDP] Deletes browser cookies with matching name and url or domain/path pair."""
        name: str
        url: str = OPTIONAL
        domain: str = OPTIONAL
        path: str = OPTIONAL
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables network tracking, prevents network events from being sent to the client."""
        pass
    
    @dataclass
    class emulateNetworkConditions(ProtocolCommand):
        """[Just CDP] Activates emulation of network conditions."""
        offline: bool
        latency: int
        downloadThroughput: int
        uploadThroughput: int
        connectionType: Network.ConnectionType = OPTIONAL
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables network tracking, network events will now be delivered to the client."""
        maxTotalBufferSize: int = OPTIONAL
        maxResourceBufferSize: int = OPTIONAL
        maxPostDataSize: int = OPTIONAL
    
    @dataclass
    class getAllCookies(ProtocolCommand):
        """[Just CDP] Returns all browser cookies. Depending on the backend support, will return detailed cookie
information in the `cookies` field.
Deprecated. Use Storage.getCookies instead."""
        pass
    
    @dataclass
    class getCertificate(ProtocolCommand):
        """[Just CDP] Returns the DER-encoded certificate."""
        origin: str
    
    @dataclass
    class getCookies(ProtocolCommand):
        """[Just CDP] Returns all browser cookies for the current URL. Depending on the backend support, will return
detailed cookie information in the `cookies` field."""
        urls: list = OPTIONAL
    
    @dataclass
    class getResponseBody(ProtocolCommand):
        """Returns content served for the given request."""
        requestId: Network.RequestId
    
    @dataclass
    class getRequestPostData(ProtocolCommand):
        """[Just CDP] Returns post data sent with the request. Returns an error when no data was sent with the request."""
        requestId: Network.RequestId
    
    @dataclass
    class getResponseBodyForInterception(ProtocolCommand):
        """[Just CDP] Returns content served for the given currently intercepted request."""
        interceptionId: Network.InterceptionId
    
    @dataclass
    class takeResponseBodyForInterceptionAsStream(ProtocolCommand):
        """[Just CDP] Returns a handle to the stream representing the response body. Note that after this command,
the intercepted request can't be continued as is -- you either need to cancel it or to provide
the response body. The stream only supports sequential read, IO.read will fail if the position
is specified."""
        interceptionId: Network.InterceptionId
    
    @dataclass
    class replayXHR(ProtocolCommand):
        """[Just CDP] This method sends a new XMLHttpRequest which is identical to the original one. The following
parameters should be identical: method, url, async, request body, extra headers, withCredentials
attribute, user, password."""
        requestId: Network.RequestId
    
    @dataclass
    class searchInResponseBody(ProtocolCommand):
        """[Just CDP] Searches for given string in response content."""
        requestId: Network.RequestId
        query: str
        caseSensitive: bool = OPTIONAL
        isRegex: bool = OPTIONAL
    
    @dataclass
    class setBlockedURLs(ProtocolCommand):
        """[Just CDP] Blocks URLs from loading."""
        urls: list
    
    @dataclass
    class setBypassServiceWorker(ProtocolCommand):
        """[Just CDP] Toggles ignoring of service worker for each request."""
        bypass: bool
    
    @dataclass
    class setCacheDisabled(ProtocolCommand):
        """[Just CDP] Toggles ignoring cache for each request. If `true`, cache will not be used."""
        cacheDisabled: bool
    
    @dataclass
    class setCookie(ProtocolCommand):
        """[Just CDP] Sets a cookie with the given cookie data; may overwrite equivalent cookies if they exist."""
        name: str
        value: str
        url: str = OPTIONAL
        domain: str = OPTIONAL
        path: str = OPTIONAL
        secure: bool = OPTIONAL
        httpOnly: bool = OPTIONAL
        sameSite: Network.CookieSameSite = OPTIONAL
        expires: Network.TimeSinceEpoch = OPTIONAL
        priority: Network.CookiePriority = OPTIONAL
        sameParty: bool = OPTIONAL
        sourceScheme: Network.CookieSourceScheme = OPTIONAL
        sourcePort: int = OPTIONAL
        partitionKey: str = OPTIONAL
    
    @dataclass
    class setCookies(ProtocolCommand):
        """[Just CDP] Sets given cookies."""
        cookies: list
    
    @dataclass
    class setExtraHTTPHeaders(ProtocolCommand):
        """Specifies whether to always send extra HTTP headers with the requests from this page."""
        headers: Network.Headers
    
    @dataclass
    class setAttachDebugStack(ProtocolCommand):
        """[Just CDP] Specifies whether to attach a page script stack id in requests"""
        enabled: bool
    
    @dataclass
    class setRequestInterception(ProtocolCommand):
        """[Just CDP] Sets the requests to intercept that match the provided patterns and optionally resource types.
Deprecated, please use Fetch.enable instead."""
        patterns: list
    
    @dataclass
    class setUserAgentOverride(ProtocolCommand):
        """[Just CDP] Allows overriding user agent with the given string."""
        userAgent: str
        acceptLanguage: str = OPTIONAL
        platform: str = OPTIONAL
        userAgentMetadata: Emulation.UserAgentMetadata = OPTIONAL
    
    @dataclass
    class getSecurityIsolationStatus(ProtocolCommand):
        """[Just CDP] Returns information about the COEP/COOP isolation status."""
        frameId: Page.FrameId = OPTIONAL
    
    @dataclass
    class enableReportingApi(ProtocolCommand):
        """[Just CDP] Enables tracking for the Reporting API, events generated by the Reporting API will now be delivered to the client.
Enabling triggers 'reportingApiReportAdded' for all existing reports."""
        enable: bool
    
    @dataclass
    class loadNetworkResource(ProtocolCommand):
        """[Just CDP] Fetches the resource and returns the content."""
        url: str
        options: Network.LoadNetworkResourceOptions
        frameId: Page.FrameId = OPTIONAL
    
    @dataclass
    class setResourceCachingDisabled(ProtocolCommand):
        """[Just WIP] Toggles whether the resource cache may be used when loading resources in the inspected page. If <code>true</code>, the resource cache will not be used when loading resources."""
        disabled: bool
    
    @dataclass
    class loadResource(ProtocolCommand):
        """[Just WIP] Loads a resource in the context of a frame on the inspected page without cross origin checks."""
        frameId: Network.FrameId
        url: str
    
    @dataclass
    class getSerializedCertificate(ProtocolCommand):
        """[Just WIP] Fetches a serialized secure certificate for the given requestId to be displayed via InspectorFrontendHost.showCertificate."""
        requestId: Network.RequestId
    
    @dataclass
    class resolveWebSocket(ProtocolCommand):
        """[Just WIP] Resolves JavaScript WebSocket object for given request id."""
        requestId: Network.RequestId
        objectGroup: str = OPTIONAL
    
    @dataclass
    class setInterceptionEnabled(ProtocolCommand):
        """[Just WIP] Enable interception of network requests."""
        enabled: bool
    
    @dataclass
    class addInterception(ProtocolCommand):
        """[Just WIP] Add an interception."""
        url: str
        stage: Network.NetworkStage
        caseSensitive: bool = OPTIONAL
        isRegex: bool = OPTIONAL
    
    @dataclass
    class removeInterception(ProtocolCommand):
        """[Just WIP] Remove an interception."""
        url: str
        stage: Network.NetworkStage
        caseSensitive: bool = OPTIONAL
        isRegex: bool = OPTIONAL
    
    @dataclass
    class interceptContinue(ProtocolCommand):
        """[Just WIP] Continue request or response without modifications."""
        requestId: Network.RequestId
        stage: Network.NetworkStage
    
    @dataclass
    class interceptWithRequest(ProtocolCommand):
        """[Just WIP] Replace intercepted request with the provided one."""
        requestId: Network.RequestId
        url: str = OPTIONAL
        method: str = OPTIONAL
        headers: Network.Headers = OPTIONAL
        postData: str = OPTIONAL
    
    @dataclass
    class interceptWithResponse(ProtocolCommand):
        """[Just WIP] Provide response content for an intercepted response."""
        requestId: Network.RequestId
        content: str
        base64Encoded: bool
        mimeType: str = OPTIONAL
        status: int = OPTIONAL
        statusText: str = OPTIONAL
        headers: Network.Headers = OPTIONAL
    
    @dataclass
    class interceptRequestWithResponse(ProtocolCommand):
        """[Just WIP] Provide response for an intercepted request. Request completely bypasses the network in this case and is immediately fulfilled with the provided data."""
        requestId: Network.RequestId
        content: str
        base64Encoded: bool
        mimeType: str
        status: int
        statusText: str
        headers: Network.Headers
    
    @dataclass
    class interceptRequestWithError(ProtocolCommand):
        """[Just WIP] Fail request with given error type."""
        requestId: Network.RequestId
        errorType: Network.ResourceErrorType
    
    @dataclass
    class setEmulatedConditions(ProtocolCommand):
        """[Just WIP] Emulate various network conditions (e.g. bytes per second, latency, etc.)."""
        bytesPerSecondLimit: int = OPTIONAL
    

@domainclass
class Overlay:
    """[Just CDP][Experimental] This domain provides various functionality related to drawing atop the inspected page."""
    class SourceOrderConfig:
        """Configuration data for drawing the source order of an elements children."""
        parentOutlineColor: DOM.RGBA
        childOutlineColor: DOM.RGBA
    
    class GridHighlightConfig:
        """Configuration data for the highlighting of Grid elements."""
        showGridExtensionLines: bool
        showPositiveLineNumbers: bool
        showNegativeLineNumbers: bool
        showAreaNames: bool
        showLineNames: bool
        showTrackSizes: bool
        gridBorderColor: DOM.RGBA
        cellBorderColor: DOM.RGBA
        rowLineColor: DOM.RGBA
        columnLineColor: DOM.RGBA
        gridBorderDash: bool
        cellBorderDash: bool
        rowLineDash: bool
        columnLineDash: bool
        rowGapColor: DOM.RGBA
        rowHatchColor: DOM.RGBA
        columnGapColor: DOM.RGBA
        columnHatchColor: DOM.RGBA
        areaBorderColor: DOM.RGBA
        gridBackgroundColor: DOM.RGBA
    
    class FlexContainerHighlightConfig:
        """Configuration data for the highlighting of Flex container elements."""
        containerBorder: Overlay.LineStyle
        lineSeparator: Overlay.LineStyle
        itemSeparator: Overlay.LineStyle
        mainDistributedSpace: Overlay.BoxStyle
        crossDistributedSpace: Overlay.BoxStyle
        rowGapSpace: Overlay.BoxStyle
        columnGapSpace: Overlay.BoxStyle
        crossAlignment: Overlay.LineStyle
    
    class FlexItemHighlightConfig:
        """Configuration data for the highlighting of Flex item elements."""
        baseSizeBox: Overlay.BoxStyle
        baseSizeBorder: Overlay.LineStyle
        flexibilityArrow: Overlay.LineStyle
    
    class LineStyle:
        """Style information for drawing a line."""
        color: DOM.RGBA
        pattern: str
    
    class BoxStyle:
        """Style information for drawing a box."""
        fillColor: DOM.RGBA
        hatchColor: DOM.RGBA
    
    ContrastAlgorithm: str
    class HighlightConfig:
        """Configuration data for the highlighting of page elements."""
        showInfo: bool
        showStyles: bool
        showRulers: bool
        showAccessibilityInfo: bool
        showExtensionLines: bool
        contentColor: DOM.RGBA
        paddingColor: DOM.RGBA
        borderColor: DOM.RGBA
        marginColor: DOM.RGBA
        eventTargetColor: DOM.RGBA
        shapeColor: DOM.RGBA
        shapeMarginColor: DOM.RGBA
        cssGridColor: DOM.RGBA
        colorFormat: Overlay.ColorFormat
        gridHighlightConfig: Overlay.GridHighlightConfig
        flexContainerHighlightConfig: Overlay.FlexContainerHighlightConfig
        flexItemHighlightConfig: Overlay.FlexItemHighlightConfig
        contrastAlgorithm: Overlay.ContrastAlgorithm
        containerQueryContainerHighlightConfig: Overlay.ContainerQueryContainerHighlightConfig
    
    ColorFormat: str
    class GridNodeHighlightConfig:
        """Configurations for Persistent Grid Highlight"""
        gridHighlightConfig: Overlay.GridHighlightConfig
        nodeId: DOM.NodeId
    
    class FlexNodeHighlightConfig:
        flexContainerHighlightConfig: Overlay.FlexContainerHighlightConfig
        nodeId: DOM.NodeId
    
    class ScrollSnapContainerHighlightConfig:
        snapportBorder: Overlay.LineStyle
        snapAreaBorder: Overlay.LineStyle
        scrollMarginColor: DOM.RGBA
        scrollPaddingColor: DOM.RGBA
    
    class ScrollSnapHighlightConfig:
        scrollSnapContainerHighlightConfig: Overlay.ScrollSnapContainerHighlightConfig
        nodeId: DOM.NodeId
    
    class HingeConfig:
        """Configuration for dual screen hinge"""
        rect: DOM.Rect
        contentColor: DOM.RGBA
        outlineColor: DOM.RGBA
    
    class ContainerQueryHighlightConfig:
        containerQueryContainerHighlightConfig: Overlay.ContainerQueryContainerHighlightConfig
        nodeId: DOM.NodeId
    
    class ContainerQueryContainerHighlightConfig:
        containerBorder: Overlay.LineStyle
        descendantBorder: Overlay.LineStyle
    
    class IsolatedElementHighlightConfig:
        isolationModeHighlightConfig: Overlay.IsolationModeHighlightConfig
        nodeId: DOM.NodeId
    
    class IsolationModeHighlightConfig:
        resizerColor: DOM.RGBA
        resizerHandleColor: DOM.RGBA
        maskColor: DOM.RGBA
    
    InspectMode: str
    class inspectNodeRequested(BaseEvent):
        """Fired when the node should be inspected. This happens after call to `setInspectMode` or when
user manually inspects an element."""
        backendNodeId: DOM.BackendNodeId
    
    class nodeHighlightRequested(BaseEvent):
        """Fired when the node should be highlighted. This happens after call to `setInspectMode`."""
        nodeId: DOM.NodeId
    
    class screenshotRequested(BaseEvent):
        """Fired when user asks to capture screenshot of some area on the page."""
        viewport: Page.Viewport
    
    class inspectModeCanceled(BaseEvent):
        """Fired when user cancels the inspect mode."""
        pass
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables domain notifications."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables domain notifications."""
        pass
    
    @dataclass
    class getHighlightObjectForTest(ProtocolCommand):
        """For testing."""
        nodeId: DOM.NodeId
        includeDistance: bool = OPTIONAL
        includeStyle: bool = OPTIONAL
        colorFormat: Overlay.ColorFormat = OPTIONAL
        showAccessibilityInfo: bool = OPTIONAL
    
    @dataclass
    class getGridHighlightObjectsForTest(ProtocolCommand):
        """For Persistent Grid testing."""
        nodeIds: list
    
    @dataclass
    class getSourceOrderHighlightObjectForTest(ProtocolCommand):
        """For Source Order Viewer testing."""
        nodeId: DOM.NodeId
    
    @dataclass
    class hideHighlight(ProtocolCommand):
        """Hides any highlight."""
        pass
    
    @dataclass
    class highlightFrame(ProtocolCommand):
        """Highlights owner element of the frame with given id.
Deprecated: Doesn't work reliablity and cannot be fixed due to process
separatation (the owner node might be in a different process). Determine
the owner node in the client and use highlightNode."""
        frameId: Page.FrameId
        contentColor: DOM.RGBA = OPTIONAL
        contentOutlineColor: DOM.RGBA = OPTIONAL
    
    @dataclass
    class highlightNode(ProtocolCommand):
        """Highlights DOM node with given id or with the given JavaScript object wrapper. Either nodeId or
objectId must be specified."""
        highlightConfig: Overlay.HighlightConfig
        nodeId: DOM.NodeId = OPTIONAL
        backendNodeId: DOM.BackendNodeId = OPTIONAL
        objectId: Runtime.RemoteObjectId = OPTIONAL
        selector: str = OPTIONAL
    
    @dataclass
    class highlightQuad(ProtocolCommand):
        """Highlights given quad. Coordinates are absolute with respect to the main frame viewport."""
        quad: DOM.Quad
        color: DOM.RGBA = OPTIONAL
        outlineColor: DOM.RGBA = OPTIONAL
    
    @dataclass
    class highlightRect(ProtocolCommand):
        """Highlights given rectangle. Coordinates are absolute with respect to the main frame viewport."""
        x: int
        y: int
        width: int
        height: int
        color: DOM.RGBA = OPTIONAL
        outlineColor: DOM.RGBA = OPTIONAL
    
    @dataclass
    class highlightSourceOrder(ProtocolCommand):
        """Highlights the source order of the children of the DOM node with given id or with the given
JavaScript object wrapper. Either nodeId or objectId must be specified."""
        sourceOrderConfig: Overlay.SourceOrderConfig
        nodeId: DOM.NodeId = OPTIONAL
        backendNodeId: DOM.BackendNodeId = OPTIONAL
        objectId: Runtime.RemoteObjectId = OPTIONAL
    
    @dataclass
    class setInspectMode(ProtocolCommand):
        """Enters the 'inspect' mode. In this mode, elements that user is hovering over are highlighted.
Backend then generates 'inspectNodeRequested' event upon element selection."""
        mode: Overlay.InspectMode
        highlightConfig: Overlay.HighlightConfig = OPTIONAL
    
    @dataclass
    class setShowAdHighlights(ProtocolCommand):
        """Highlights owner element of all frames detected to be ads."""
        show: bool
    
    @dataclass
    class setPausedInDebuggerMessage(ProtocolCommand):
        message: str = OPTIONAL
    
    @dataclass
    class setShowDebugBorders(ProtocolCommand):
        """Requests that backend shows debug borders on layers"""
        show: bool
    
    @dataclass
    class setShowFPSCounter(ProtocolCommand):
        """Requests that backend shows the FPS counter"""
        show: bool
    
    @dataclass
    class setShowGridOverlays(ProtocolCommand):
        """Highlight multiple elements with the CSS Grid overlay."""
        gridNodeHighlightConfigs: list
    
    @dataclass
    class setShowFlexOverlays(ProtocolCommand):
        flexNodeHighlightConfigs: list
    
    @dataclass
    class setShowScrollSnapOverlays(ProtocolCommand):
        scrollSnapHighlightConfigs: list
    
    @dataclass
    class setShowContainerQueryOverlays(ProtocolCommand):
        containerQueryHighlightConfigs: list
    
    @dataclass
    class setShowPaintRects(ProtocolCommand):
        """Requests that backend shows paint rectangles"""
        result: bool
    
    @dataclass
    class setShowLayoutShiftRegions(ProtocolCommand):
        """Requests that backend shows layout shift regions"""
        result: bool
    
    @dataclass
    class setShowScrollBottleneckRects(ProtocolCommand):
        """Requests that backend shows scroll bottleneck rects"""
        show: bool
    
    @dataclass
    class setShowHitTestBorders(ProtocolCommand):
        """Deprecated, no longer has any effect."""
        show: bool
    
    @dataclass
    class setShowWebVitals(ProtocolCommand):
        """Request that backend shows an overlay with web vital metrics."""
        show: bool
    
    @dataclass
    class setShowViewportSizeOnResize(ProtocolCommand):
        """Paints viewport size upon main frame resize."""
        show: bool
    
    @dataclass
    class setShowHinge(ProtocolCommand):
        """Add a dual screen device hinge"""
        hingeConfig: Overlay.HingeConfig = OPTIONAL
    
    @dataclass
    class setShowIsolatedElements(ProtocolCommand):
        """Show elements in isolation mode with overlays."""
        isolatedElementHighlightConfigs: list
    

@domainclass
class Page:
    """Actions and events related to the inspected page belong to the page domain."""
    FrameId: str
    AdFrameType: str
    AdFrameExplanation: str
    class AdFrameStatus:
        """Indicates whether a frame has been identified as an ad and why."""
        adFrameType: Page.AdFrameType
        explanations: list
    
    class AdScriptId:
        """Identifies the bottom-most script which caused the frame to be labelled
as an ad."""
        scriptId: Runtime.ScriptId
        debuggerId: Runtime.UniqueDebuggerId
    
    SecureContextType: str
    CrossOriginIsolatedContextType: str
    GatedAPIFeatures: str
    PermissionsPolicyFeature: str
    PermissionsPolicyBlockReason: str
    class PermissionsPolicyBlockLocator:
        frameId: Page.FrameId
        blockReason: Page.PermissionsPolicyBlockReason
    
    class PermissionsPolicyFeatureState:
        feature: Page.PermissionsPolicyFeature
        allowed: bool
        locator: Page.PermissionsPolicyBlockLocator
    
    OriginTrialTokenStatus: str
    OriginTrialStatus: str
    OriginTrialUsageRestriction: str
    class OriginTrialToken:
        origin: str
        matchSubDomains: bool
        trialName: str
        expiryTime: Network.TimeSinceEpoch
        isThirdParty: bool
        usageRestriction: Page.OriginTrialUsageRestriction
    
    class OriginTrialTokenWithStatus:
        rawTokenText: str
        parsedToken: Page.OriginTrialToken
        status: Page.OriginTrialTokenStatus
    
    class OriginTrial:
        trialName: str
        status: Page.OriginTrialStatus
        tokensWithStatus: list
    
    class Frame:
        """Information about the Frame on the page."""
        id: Page.FrameId
        parentId: Page.FrameId
        loaderId: Network.LoaderId
        name: str
        url: str
        urlFragment: str
        domainAndRegistry: str
        securityOrigin: str
        mimeType: str
        unreachableUrl: str
        adFrameStatus: Page.AdFrameStatus
        secureContextType: Page.SecureContextType
        crossOriginIsolatedContextType: Page.CrossOriginIsolatedContextType
        gatedAPIFeatures: list
    
    class FrameResource:
        """Information about the Resource on the page."""
        url: str
        type: Network.ResourceType
        mimeType: str
        lastModified: Network.TimeSinceEpoch
        contentSize: int
        failed: bool
        canceled: bool
        sourceMapURL: str
        targetId: str
    
    class FrameResourceTree:
        """Information about the Frame hierarchy along with their cached resources."""
        frame: Page.Frame
        childFrames: list
        resources: list
    
    class FrameTree:
        """Information about the Frame hierarchy."""
        frame: Page.Frame
        childFrames: list
    
    ScriptIdentifier: str
    TransitionType: str
    class NavigationEntry:
        """Navigation history entry."""
        id: int
        url: str
        userTypedURL: str
        title: str
        transitionType: Page.TransitionType
    
    class ScreencastFrameMetadata:
        """Screencast frame metadata."""
        offsetTop: int
        pageScaleFactor: int
        deviceWidth: int
        deviceHeight: int
        scrollOffsetX: int
        scrollOffsetY: int
        timestamp: Network.TimeSinceEpoch
    
    DialogType: str
    class AppManifestError:
        """Error while paring app manifest."""
        message: str
        critical: int
        line: int
        column: int
    
    class AppManifestParsedProperties:
        """Parsed app manifest properties."""
        scope: str
    
    class LayoutViewport:
        """Layout viewport position and dimensions."""
        pageX: int
        pageY: int
        clientWidth: int
        clientHeight: int
    
    class VisualViewport:
        """Visual viewport position, dimensions, and scale."""
        offsetX: int
        offsetY: int
        pageX: int
        pageY: int
        clientWidth: int
        clientHeight: int
        scale: int
        zoom: int
    
    class Viewport:
        """Viewport for capturing screenshot."""
        x: int
        y: int
        width: int
        height: int
        scale: int
    
    class FontFamilies:
        """Generic font families collection."""
        standard: str
        fixed: str
        serif: str
        sansSerif: str
        cursive: str
        fantasy: str
        math: str
    
    class ScriptFontFamilies:
        """Font families collection for a script."""
        script: str
        fontFamilies: Page.FontFamilies
    
    class FontSizes:
        """Default font sizes."""
        standard: int
        fixed: int
    
    ClientNavigationReason: str
    ClientNavigationDisposition: str
    class InstallabilityErrorArgument:
        name: str
        value: str
    
    class InstallabilityError:
        """The installability error"""
        errorId: str
        errorArguments: list
    
    ReferrerPolicy: str
    class CompilationCacheParams:
        """Per-script compilation cache parameters for `Page.produceCompilationCache`"""
        url: str
        eager: bool
    
    AutoResponseMode: str
    NavigationType: str
    BackForwardCacheNotRestoredReason: str
    BackForwardCacheNotRestoredReasonType: str
    class BackForwardCacheNotRestoredExplanation:
        type: Page.BackForwardCacheNotRestoredReasonType
        reason: Page.BackForwardCacheNotRestoredReason
        context: str
    
    class BackForwardCacheNotRestoredExplanationTree:
        url: str
        explanations: list
        children: list
    
    Setting: str
    class UserPreference:
        """A user preference that can be overriden by Web Inspector, like an accessibility preference."""
        name: Page.UserPreferenceName
        value: Page.UserPreferenceValue
    
    UserPreferenceName: str
    UserPreferenceValue: str
    ResourceType: str
    CoordinateSystem: str
    CookieSameSitePolicy: str
    class SearchResult:
        """Search result for resource."""
        url: str
        frameId: Network.FrameId
        matchesCount: int
        requestId: Network.RequestId
    
    class Cookie:
        """Cookie object"""
        name: str
        value: str
        domain: str
        path: str
        expires: int
        session: bool
        httpOnly: bool
        secure: bool
        sameSite: Page.CookieSameSitePolicy
    
    class domContentEventFired(BaseEvent):
        timestamp: Network.MonotonicTime
    
    class fileChooserOpened(BaseEvent):
        """Emitted only when `page.interceptFileChooser` is enabled."""
        frameId: Page.FrameId
        mode: str
        backendNodeId: DOM.BackendNodeId
    
    class frameAttached(BaseEvent):
        """Fired when frame has been attached to its parent."""
        frameId: Page.FrameId
        parentFrameId: Page.FrameId
        stack: Runtime.StackTrace
    
    class frameClearedScheduledNavigation(BaseEvent):
        """Fired when frame no longer has a scheduled navigation."""
        frameId: Page.FrameId
    
    class frameDetached(BaseEvent):
        """Fired when frame has been detached from its parent."""
        frameId: Page.FrameId
        reason: str
    
    class frameNavigated(BaseEvent):
        """Fired once navigation of the frame has completed. Frame is now associated with the new loader."""
        frame: Page.Frame
        type: Page.NavigationType
    
    class documentOpened(BaseEvent):
        """Fired when opening document to write to."""
        frame: Page.Frame
    
    class frameResized(BaseEvent):
        pass
    
    class frameRequestedNavigation(BaseEvent):
        """Fired when a renderer-initiated navigation is requested.
Navigation may still be cancelled after the event is issued."""
        frameId: Page.FrameId
        reason: Page.ClientNavigationReason
        url: str
        disposition: Page.ClientNavigationDisposition
    
    class frameScheduledNavigation(BaseEvent):
        """Fired when frame schedules a potential navigation."""
        frameId: Page.FrameId
        delay: int
        reason: Page.ClientNavigationReason
        url: str
    
    class frameStartedLoading(BaseEvent):
        """Fired when frame has started loading."""
        frameId: Page.FrameId
    
    class frameStoppedLoading(BaseEvent):
        """Fired when frame has stopped loading."""
        frameId: Page.FrameId
    
    class downloadWillBegin(BaseEvent):
        """Fired when page is about to start a download.
Deprecated. Use Browser.downloadWillBegin instead."""
        frameId: Page.FrameId
        guid: str
        url: str
        suggestedFilename: str
    
    class downloadProgress(BaseEvent):
        """Fired when download makes progress. Last call has |done| == true.
Deprecated. Use Browser.downloadProgress instead."""
        guid: str
        totalBytes: int
        receivedBytes: int
        state: str
    
    class interstitialHidden(BaseEvent):
        """Fired when interstitial page was hidden"""
        pass
    
    class interstitialShown(BaseEvent):
        """Fired when interstitial page was shown"""
        pass
    
    class javascriptDialogClosed(BaseEvent):
        """Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) has been
closed."""
        result: bool
        userInput: str
    
    class javascriptDialogOpening(BaseEvent):
        """Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) is about to
open."""
        url: str
        message: str
        type: Page.DialogType
        hasBrowserHandler: bool
        defaultPrompt: str
    
    class lifecycleEvent(BaseEvent):
        """Fired for top level page lifecycle events such as navigation, load, paint, etc."""
        frameId: Page.FrameId
        loaderId: Network.LoaderId
        name: str
        timestamp: Network.MonotonicTime
    
    class backForwardCacheNotUsed(BaseEvent):
        """Fired for failed bfcache history navigations if BackForwardCache feature is enabled. Do
not assume any ordering with the Page.frameNavigated event. This event is fired only for
main-frame history navigation where the document changes (non-same-document navigations),
when bfcache navigation fails."""
        loaderId: Network.LoaderId
        frameId: Page.FrameId
        notRestoredExplanations: list
        notRestoredExplanationsTree: Page.BackForwardCacheNotRestoredExplanationTree
    
    class loadEventFired(BaseEvent):
        timestamp: Network.MonotonicTime
    
    class navigatedWithinDocument(BaseEvent):
        """Fired when same-document navigation happens, e.g. due to history API usage or anchor navigation."""
        frameId: Page.FrameId
        url: str
    
    class screencastFrame(BaseEvent):
        """Compressed image data requested by the `startScreencast`."""
        data: str
        metadata: Page.ScreencastFrameMetadata
        sessionId: int
    
    class screencastVisibilityChanged(BaseEvent):
        """Fired when the page with currently enabled screencast was shown or hidden `."""
        visible: bool
    
    class windowOpen(BaseEvent):
        """Fired when a new window is going to be opened, via window.open(), link click, form submission,
etc."""
        url: str
        windowName: str
        windowFeatures: list
        userGesture: bool
    
    class compilationCacheProduced(BaseEvent):
        """Issued for every compilation cache generated. Is only available
if Page.setGenerateCompilationCache is enabled."""
        url: str
        data: str
    
    class defaultUserPreferencesDidChange(BaseEvent):
        """Fired when the default value of a user preference changes at the system level."""
        preferences: list
    
    @dataclass
    class addScriptToEvaluateOnLoad(ProtocolCommand):
        """[Just CDP] Deprecated, please use addScriptToEvaluateOnNewDocument instead."""
        scriptSource: str
    
    @dataclass
    class addScriptToEvaluateOnNewDocument(ProtocolCommand):
        """[Just CDP] Evaluates given script in every frame upon creation (before loading frame's scripts)."""
        source: str
        worldName: str = OPTIONAL
        includeCommandLineAPI: bool = OPTIONAL
        runImmediately: bool = OPTIONAL
    
    @dataclass
    class bringToFront(ProtocolCommand):
        """[Just CDP] Brings page to front (activates tab)."""
        pass
    
    @dataclass
    class captureScreenshot(ProtocolCommand):
        """[Just CDP] Capture page screenshot."""
        format: str = OPTIONAL
        quality: int = OPTIONAL
        clip: Page.Viewport = OPTIONAL
        fromSurface: bool = OPTIONAL
        captureBeyondViewport: bool = OPTIONAL
        optimizeForSpeed: bool = OPTIONAL
    
    @dataclass
    class captureSnapshot(ProtocolCommand):
        """[Just CDP] Returns a snapshot of the page as a string. For MHTML format, the serialization includes
iframes, shadow DOM, external resources, and element-inline styles."""
        format: str = OPTIONAL
    
    @dataclass
    class clearDeviceMetricsOverride(ProtocolCommand):
        """[Just CDP] Clears the overridden device metrics."""
        pass
    
    @dataclass
    class clearDeviceOrientationOverride(ProtocolCommand):
        """[Just CDP] Clears the overridden Device Orientation."""
        pass
    
    @dataclass
    class clearGeolocationOverride(ProtocolCommand):
        """[Just CDP] Clears the overridden Geolocation Position and Error."""
        pass
    
    @dataclass
    class createIsolatedWorld(ProtocolCommand):
        """[Just CDP] Creates an isolated world for the given frame."""
        frameId: Page.FrameId
        worldName: str = OPTIONAL
        grantUniveralAccess: bool = OPTIONAL
    
    @dataclass
    class deleteCookie(ProtocolCommand):
        """Deletes browser cookie with given name, domain and path."""
        cookieName: str
        url: str
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables page domain notifications."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables page domain notifications."""
        pass
    
    @dataclass
    class getAppManifest(ProtocolCommand):
        """[Just CDP]"""
        pass
    
    @dataclass
    class getInstallabilityErrors(ProtocolCommand):
        """[Just CDP]"""
        pass
    
    @dataclass
    class getManifestIcons(ProtocolCommand):
        """[Just CDP] Deprecated because it's not guaranteed that the returned icon is in fact the one used for PWA installation."""
        pass
    
    @dataclass
    class getAppId(ProtocolCommand):
        """[Just CDP] Returns the unique (PWA) app id.
Only returns values if the feature flag 'WebAppEnableManifestId' is enabled"""
        pass
    
    @dataclass
    class getAdScriptId(ProtocolCommand):
        """[Just CDP]"""
        frameId: Page.FrameId
    
    @dataclass
    class getCookies(ProtocolCommand):
        """Returns all browser cookies for the page and all of its subframes. Depending
on the backend support, will return detailed cookie information in the
`cookies` field."""
        pass
    
    @dataclass
    class getFrameTree(ProtocolCommand):
        """[Just CDP] Returns present frame tree structure."""
        pass
    
    @dataclass
    class getLayoutMetrics(ProtocolCommand):
        """[Just CDP] Returns metrics relating to the layouting of the page, such as viewport bounds/scale."""
        pass
    
    @dataclass
    class getNavigationHistory(ProtocolCommand):
        """[Just CDP] Returns navigation history for the current page."""
        pass
    
    @dataclass
    class resetNavigationHistory(ProtocolCommand):
        """[Just CDP] Resets navigation history for the current page."""
        pass
    
    @dataclass
    class getResourceContent(ProtocolCommand):
        """Returns content of the given resource."""
        frameId: Page.FrameId
        url: str
    
    @dataclass
    class getResourceTree(ProtocolCommand):
        """Returns present frame / resource tree structure."""
        pass
    
    @dataclass
    class handleJavaScriptDialog(ProtocolCommand):
        """[Just CDP] Accepts or dismisses a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload)."""
        accept: bool
        promptText: str = OPTIONAL
    
    @dataclass
    class navigate(ProtocolCommand):
        """Navigates current page to the given URL."""
        url: str
        referrer: str = OPTIONAL
        transitionType: Page.TransitionType = OPTIONAL
        frameId: Page.FrameId = OPTIONAL
        referrerPolicy: Page.ReferrerPolicy = OPTIONAL
    
    @dataclass
    class navigateToHistoryEntry(ProtocolCommand):
        """[Just CDP] Navigates current page to the given history entry."""
        entryId: int
    
    @dataclass
    class printToPDF(ProtocolCommand):
        """[Just CDP] Print page as PDF."""
        landscape: bool = OPTIONAL
        displayHeaderFooter: bool = OPTIONAL
        printBackground: bool = OPTIONAL
        scale: int = OPTIONAL
        paperWidth: int = OPTIONAL
        paperHeight: int = OPTIONAL
        marginTop: int = OPTIONAL
        marginBottom: int = OPTIONAL
        marginLeft: int = OPTIONAL
        marginRight: int = OPTIONAL
        pageRanges: str = OPTIONAL
        headerTemplate: str = OPTIONAL
        footerTemplate: str = OPTIONAL
        preferCSSPageSize: bool = OPTIONAL
        transferMode: str = OPTIONAL
        generateTaggedPDF: bool = OPTIONAL
    
    @dataclass
    class reload(ProtocolCommand):
        """Reloads given page optionally ignoring the cache."""
        ignoreCache: bool = OPTIONAL
        scriptToEvaluateOnLoad: str = OPTIONAL
        revalidateAllResources: bool = OPTIONAL
    
    @dataclass
    class removeScriptToEvaluateOnLoad(ProtocolCommand):
        """[Just CDP] Deprecated, please use removeScriptToEvaluateOnNewDocument instead."""
        identifier: Page.ScriptIdentifier
    
    @dataclass
    class removeScriptToEvaluateOnNewDocument(ProtocolCommand):
        """[Just CDP] Removes given script from the list."""
        identifier: Page.ScriptIdentifier
    
    @dataclass
    class screencastFrameAck(ProtocolCommand):
        """[Just CDP] Acknowledges that a screencast frame has been received by the frontend."""
        sessionId: int
    
    @dataclass
    class searchInResource(ProtocolCommand):
        """Searches for given string in resource content."""
        frameId: Page.FrameId
        url: str
        query: str
        caseSensitive: bool = OPTIONAL
        isRegex: bool = OPTIONAL
        requestId: Network.RequestId = OPTIONAL
    
    @dataclass
    class setAdBlockingEnabled(ProtocolCommand):
        """[Just CDP] Enable Chrome's experimental ad filter on all sites."""
        enabled: bool
    
    @dataclass
    class setBypassCSP(ProtocolCommand):
        """[Just CDP] Enable page Content Security Policy by-passing."""
        enabled: bool
    
    @dataclass
    class getPermissionsPolicyState(ProtocolCommand):
        """[Just CDP] Get Permissions Policy state on given frame."""
        frameId: Page.FrameId
    
    @dataclass
    class getOriginTrials(ProtocolCommand):
        """[Just CDP] Get Origin Trials on given frame."""
        frameId: Page.FrameId
    
    @dataclass
    class setDeviceMetricsOverride(ProtocolCommand):
        """[Just CDP] Overrides the values of device screen dimensions (window.screen.width, window.screen.height,
window.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media
query results)."""
        width: int
        height: int
        deviceScaleFactor: int
        mobile: bool
        scale: int = OPTIONAL
        screenWidth: int = OPTIONAL
        screenHeight: int = OPTIONAL
        positionX: int = OPTIONAL
        positionY: int = OPTIONAL
        dontSetVisibleSize: bool = OPTIONAL
        screenOrientation: Emulation.ScreenOrientation = OPTIONAL
        viewport: Page.Viewport = OPTIONAL
    
    @dataclass
    class setDeviceOrientationOverride(ProtocolCommand):
        """[Just CDP] Overrides the Device Orientation."""
        alpha: int
        beta: int
        gamma: int
    
    @dataclass
    class setFontFamilies(ProtocolCommand):
        """[Just CDP] Set generic font families."""
        fontFamilies: Page.FontFamilies
        forScripts: list = OPTIONAL
    
    @dataclass
    class setFontSizes(ProtocolCommand):
        """[Just CDP] Set default font sizes."""
        fontSizes: Page.FontSizes
    
    @dataclass
    class setDocumentContent(ProtocolCommand):
        """[Just CDP] Sets given markup as the document's HTML."""
        frameId: Page.FrameId
        html: str
    
    @dataclass
    class setDownloadBehavior(ProtocolCommand):
        """[Just CDP] Set the behavior when downloading a file."""
        behavior: str
        downloadPath: str = OPTIONAL
    
    @dataclass
    class setGeolocationOverride(ProtocolCommand):
        """[Just CDP] Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position
unavailable."""
        latitude: int = OPTIONAL
        longitude: int = OPTIONAL
        accuracy: int = OPTIONAL
    
    @dataclass
    class setLifecycleEventsEnabled(ProtocolCommand):
        """[Just CDP] Controls whether page will emit lifecycle events."""
        enabled: bool
    
    @dataclass
    class setTouchEmulationEnabled(ProtocolCommand):
        """[Just CDP] Toggles mouse event-based touch event emulation."""
        enabled: bool
        configuration: str = OPTIONAL
    
    @dataclass
    class startScreencast(ProtocolCommand):
        """[Just CDP] Starts sending each frame using the `screencastFrame` event."""
        format: str = OPTIONAL
        quality: int = OPTIONAL
        maxWidth: int = OPTIONAL
        maxHeight: int = OPTIONAL
        everyNthFrame: int = OPTIONAL
    
    @dataclass
    class stopLoading(ProtocolCommand):
        """[Just CDP] Force the page stop all navigations and pending resource fetches."""
        pass
    
    @dataclass
    class crash(ProtocolCommand):
        """[Just CDP] Crashes renderer on the IO thread, generates minidumps."""
        pass
    
    @dataclass
    class close(ProtocolCommand):
        """[Just CDP] Tries to close page, running its beforeunload hooks, if any."""
        pass
    
    @dataclass
    class setWebLifecycleState(ProtocolCommand):
        """[Just CDP] Tries to update the web lifecycle state of the page.
It will transition the page to the given state according to:
https://github.com/WICG/web-lifecycle/"""
        state: str
    
    @dataclass
    class stopScreencast(ProtocolCommand):
        """[Just CDP] Stops sending each frame in the `screencastFrame`."""
        pass
    
    @dataclass
    class produceCompilationCache(ProtocolCommand):
        """[Just CDP] Requests backend to produce compilation cache for the specified scripts.
`scripts` are appeneded to the list of scripts for which the cache
would be produced. The list may be reset during page navigation.
When script with a matching URL is encountered, the cache is optionally
produced upon backend discretion, based on internal heuristics.
See also: `Page.compilationCacheProduced`."""
        scripts: list
    
    @dataclass
    class addCompilationCache(ProtocolCommand):
        """[Just CDP] Seeds compilation cache for given url. Compilation cache does not survive
cross-process navigation."""
        url: str
        data: str
    
    @dataclass
    class clearCompilationCache(ProtocolCommand):
        """[Just CDP] Clears seeded compilation cache."""
        pass
    
    @dataclass
    class setSPCTransactionMode(ProtocolCommand):
        """[Just CDP] Sets the Secure Payment Confirmation transaction mode.
https://w3c.github.io/secure-payment-confirmation/#sctn-automation-set-spc-transaction-mode"""
        mode: Page.AutoResponseMode
    
    @dataclass
    class setRPHRegistrationMode(ProtocolCommand):
        """[Just CDP] Extensions for Custom Handlers API:
https://html.spec.whatwg.org/multipage/system-state.html#rph-automation"""
        mode: Page.AutoResponseMode
    
    @dataclass
    class generateTestReport(ProtocolCommand):
        """[Just CDP] Generates a report for testing."""
        message: str
        group: str = OPTIONAL
    
    @dataclass
    class waitForDebugger(ProtocolCommand):
        """[Just CDP] Pauses page execution. Can be resumed using generic Runtime.runIfWaitingForDebugger."""
        pass
    
    @dataclass
    class setInterceptFileChooserDialog(ProtocolCommand):
        """[Just CDP] Intercept file chooser requests and transfer control to protocol clients.
When file chooser interception is enabled, native file chooser dialog is not shown.
Instead, a protocol event `Page.fileChooserOpened` is emitted."""
        enabled: bool
    
    @dataclass
    class setPrerenderingAllowed(ProtocolCommand):
        """[Just CDP] Enable/disable prerendering manually.

This command is a short-term solution for https://crbug.com/1440085.
See https://docs.google.com/document/d/12HVmFxYj5Jc-eJr5OmWsa2bqTJsbgGLKI6ZIyx0_wpA
for more details.

TODO(https://crbug.com/1440085): Remove this once Puppeteer supports tab targets."""
        isAllowed: bool
    
    @dataclass
    class overrideUserAgent(ProtocolCommand):
        """[Just WIP] Override's the user agent of the inspected page"""
        value: str = OPTIONAL
    
    @dataclass
    class overrideSetting(ProtocolCommand):
        """[Just WIP] Allows the frontend to override the inspected page's settings."""
        setting: Page.Setting
        value: bool = OPTIONAL
    
    @dataclass
    class overrideUserPreference(ProtocolCommand):
        """[Just WIP] Allows the frontend to override the user's preferences on the inspected page."""
        name: Page.UserPreferenceName
        value: Page.UserPreferenceValue = OPTIONAL
    
    @dataclass
    class setCookie(ProtocolCommand):
        """[Just WIP] Sets a new browser cookie with the given name, domain, and path."""
        cookie: Page.Cookie
    
    @dataclass
    class setBootstrapScript(ProtocolCommand):
        """[Just WIP]"""
        source: str = OPTIONAL
    
    @dataclass
    class searchInResources(ProtocolCommand):
        """[Just WIP] Searches for given string in frame / resource tree structure."""
        text: str
        caseSensitive: bool = OPTIONAL
        isRegex: bool = OPTIONAL
    
    @dataclass
    class setShowRulers(ProtocolCommand):
        """[Just WIP] Requests that backend draw rulers in the inspector overlay"""
        result: bool
    
    @dataclass
    class setShowPaintRects(ProtocolCommand):
        """[Just WIP] Requests that backend shows paint rectangles"""
        result: bool
    
    @dataclass
    class setEmulatedMedia(ProtocolCommand):
        """[Just WIP] Emulates the given media for CSS media queries."""
        media: str
    
    @dataclass
    class snapshotNode(ProtocolCommand):
        """[Just WIP] Capture a snapshot of the specified node that does not include unrelated layers."""
        nodeId: DOM.NodeId
    
    @dataclass
    class snapshotRect(ProtocolCommand):
        """[Just WIP] Capture a snapshot of the page within the specified rectangle and coordinate system."""
        x: int
        y: int
        width: int
        height: int
        coordinateSystem: Page.CoordinateSystem
    
    @dataclass
    class archive(ProtocolCommand):
        """[Just WIP] Grab an archive of the page."""
        pass
    
    @dataclass
    class setScreenSizeOverride(ProtocolCommand):
        """[Just WIP] Overrides screen size exposed to DOM and used in media queries for testing with provided values."""
        width: int = OPTIONAL
        height: int = OPTIONAL
    

@domainclass
class Performance:
    """[Just CDP]"""
    class Metric:
        """Run-time execution metric."""
        name: str
        value: int
    
    class metrics(BaseEvent):
        """Current values of the metrics."""
        metrics: list
        title: str
    
    @dataclass
    class disable(ProtocolCommand):
        """Disable collecting and reporting metrics."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """Enable collecting and reporting metrics."""
        timeDomain: str = OPTIONAL
    
    @dataclass
    class setTimeDomain(ProtocolCommand):
        """Sets time domain to use for collecting and reporting duration metrics.
Note that this must be called before enabling metrics collection. Calling
this method while metrics collection is enabled returns an error."""
        timeDomain: str
    
    @dataclass
    class getMetrics(ProtocolCommand):
        """Retrieve current values of run-time metrics."""
        pass
    

@domainclass
class PerformanceTimeline:
    """[Just CDP][Experimental] Reporting of performance timeline events, as specified in
https://w3c.github.io/performance-timeline/#dom-performanceobserver."""
    class LargestContentfulPaint:
        """See https://github.com/WICG/LargestContentfulPaint and largest_contentful_paint.idl"""
        renderTime: Network.TimeSinceEpoch
        loadTime: Network.TimeSinceEpoch
        size: int
        elementId: str
        url: str
        nodeId: DOM.BackendNodeId
    
    class LayoutShiftAttribution:
        previousRect: DOM.Rect
        currentRect: DOM.Rect
        nodeId: DOM.BackendNodeId
    
    class LayoutShift:
        """See https://wicg.github.io/layout-instability/#sec-layout-shift and layout_shift.idl"""
        value: int
        hadRecentInput: bool
        lastInputTime: Network.TimeSinceEpoch
        sources: list
    
    class TimelineEvent:
        frameId: Page.FrameId
        type: str
        name: str
        time: Network.TimeSinceEpoch
        duration: int
        lcpDetails: PerformanceTimeline.LargestContentfulPaint
        layoutShiftDetails: PerformanceTimeline.LayoutShift
    
    class timelineEventAdded(BaseEvent):
        """Sent when a performance timeline event is added. See reportPerformanceTimeline method."""
        event: PerformanceTimeline.TimelineEvent
    
    @dataclass
    class enable(ProtocolCommand):
        """Previously buffered events would be reported before method returns.
See also: timelineEventAdded"""
        eventTypes: list
    

@domainclass
class Security:
    """Security"""
    CertificateId: int
    MixedContentType: str
    SecurityState: str
    class CertificateSecurityState:
        """Details about the security state of the page certificate."""
        protocol: str
        keyExchange: str
        keyExchangeGroup: str
        cipher: str
        mac: str
        certificate: list
        subjectName: str
        issuer: str
        validFrom: Network.TimeSinceEpoch
        validTo: Network.TimeSinceEpoch
        certificateNetworkError: str
        certificateHasWeakSignature: bool
        certificateHasSha1Signature: bool
        modernSSL: bool
        obsoleteSslProtocol: bool
        obsoleteSslKeyExchange: bool
        obsoleteSslCipher: bool
        obsoleteSslSignature: bool
    
    SafetyTipStatus: str
    class SafetyTipInfo:
        safetyTipStatus: Security.SafetyTipStatus
        safeUrl: str
    
    class VisibleSecurityState:
        """Security state information about the page."""
        securityState: Security.SecurityState
        certificateSecurityState: Security.CertificateSecurityState
        safetyTipInfo: Security.SafetyTipInfo
        securityStateIssueIds: list
    
    class SecurityStateExplanation:
        """An explanation of an factor contributing to the security state."""
        securityState: Security.SecurityState
        title: str
        summary: str
        description: str
        mixedContentType: Security.MixedContentType
        certificate: list
        recommendations: list
    
    class InsecureContentStatus:
        """Information about insecure content on the page."""
        ranMixedContent: bool
        displayedMixedContent: bool
        containedMixedForm: bool
        ranContentWithCertErrors: bool
        displayedContentWithCertErrors: bool
        ranInsecureContentStyle: Security.SecurityState
        displayedInsecureContentStyle: Security.SecurityState
    
    CertificateErrorAction: str
    class Connection:
        """Information about a SSL connection to display in the frontend."""
        protocol: str
        cipher: str
    
    class Certificate:
        """Information about a SSL certificate to display in the frontend."""
        subject: str
        validFrom: Network.Walltime
        validUntil: Network.Walltime
        dnsNames: list
        ipAddresses: list
    
    class Security:
        """Security information for a given Network.Response."""
        connection: Security.Connection
        certificate: Security.Certificate
    
    class certificateError(BaseEvent):
        """There is a certificate error. If overriding certificate errors is enabled, then it should be
handled with the `handleCertificateError` command. Note: this event does not fire if the
certificate error has been allowed internally. Only one client per target should override
certificate errors at the same time."""
        eventId: int
        errorType: str
        requestURL: str
    
    class visibleSecurityStateChanged(BaseEvent):
        """The security state of the page changed."""
        visibleSecurityState: Security.VisibleSecurityState
    
    class securityStateChanged(BaseEvent):
        """The security state of the page changed. No longer being sent."""
        securityState: Security.SecurityState
        schemeIsCryptographic: bool
        explanations: list
        insecureContentStatus: Security.InsecureContentStatus
        summary: str
    
    @dataclass
    class disable(ProtocolCommand):
        """[Just CDP] Disables tracking security state changes."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """[Just CDP] Enables tracking security state changes."""
        pass
    
    @dataclass
    class setIgnoreCertificateErrors(ProtocolCommand):
        """[Just CDP][Experimental] Enable/disable whether all certificate errors should be ignored."""
        ignore: bool
    
    @dataclass
    class handleCertificateError(ProtocolCommand):
        """[Just CDP] Handles a certificate error that fired a certificateError event."""
        eventId: int
        action: Security.CertificateErrorAction
    
    @dataclass
    class setOverrideCertificateErrors(ProtocolCommand):
        """[Just CDP] Enable/disable overriding certificate errors. If enabled, all certificate error events need to
be handled by the DevTools client and should be answered with `handleCertificateError` commands."""
        override: bool
    

@domainclass
class ServiceWorker:
    RegistrationID: str
    class ServiceWorkerRegistration:
        """ServiceWorker registration."""
        registrationId: ServiceWorker.RegistrationID
        scopeURL: str
        isDeleted: bool
    
    ServiceWorkerVersionRunningStatus: str
    ServiceWorkerVersionStatus: str
    class ServiceWorkerVersion:
        """ServiceWorker version."""
        versionId: str
        registrationId: ServiceWorker.RegistrationID
        scriptURL: str
        runningStatus: ServiceWorker.ServiceWorkerVersionRunningStatus
        status: ServiceWorker.ServiceWorkerVersionStatus
        scriptLastModified: int
        scriptResponseTime: int
        controlledClients: list
        targetId: Target.TargetID
    
    class ServiceWorkerErrorMessage:
        """ServiceWorker error message."""
        errorMessage: str
        registrationId: ServiceWorker.RegistrationID
        versionId: str
        sourceURL: str
        lineNumber: int
        columnNumber: int
    
    class Configuration:
        """ServiceWorker metadata and initial state."""
        targetId: str
        securityOrigin: str
        url: str
        content: str
    
    class workerErrorReported(BaseEvent):
        errorMessage: ServiceWorker.ServiceWorkerErrorMessage
    
    class workerRegistrationUpdated(BaseEvent):
        registrations: list
    
    class workerVersionUpdated(BaseEvent):
        versions: list
    
    @dataclass
    class deliverPushMessage(ProtocolCommand):
        """[Just CDP]"""
        origin: str
        registrationId: ServiceWorker.RegistrationID
        data: str
    
    @dataclass
    class disable(ProtocolCommand):
        """[Just CDP]"""
        pass
    
    @dataclass
    class dispatchSyncEvent(ProtocolCommand):
        """[Just CDP]"""
        origin: str
        registrationId: ServiceWorker.RegistrationID
        tag: str
        lastChance: bool
    
    @dataclass
    class dispatchPeriodicSyncEvent(ProtocolCommand):
        """[Just CDP]"""
        origin: str
        registrationId: ServiceWorker.RegistrationID
        tag: str
    
    @dataclass
    class enable(ProtocolCommand):
        """[Just CDP]"""
        pass
    
    @dataclass
    class inspectWorker(ProtocolCommand):
        """[Just CDP]"""
        versionId: str
    
    @dataclass
    class setForceUpdateOnPageLoad(ProtocolCommand):
        """[Just CDP]"""
        forceUpdateOnPageLoad: bool
    
    @dataclass
    class skipWaiting(ProtocolCommand):
        """[Just CDP]"""
        scopeURL: str
    
    @dataclass
    class startWorker(ProtocolCommand):
        """[Just CDP]"""
        scopeURL: str
    
    @dataclass
    class stopAllWorkers(ProtocolCommand):
        """[Just CDP]"""
        pass
    
    @dataclass
    class stopWorker(ProtocolCommand):
        """[Just CDP]"""
        versionId: str
    
    @dataclass
    class unregister(ProtocolCommand):
        """[Just CDP]"""
        scopeURL: str
    
    @dataclass
    class updateRegistration(ProtocolCommand):
        """[Just CDP]"""
        scopeURL: str
    
    @dataclass
    class getInitializationInfo(ProtocolCommand):
        """[Just WIP] Returns the initialization information for this target."""
        pass
    

@domainclass
class Storage:
    """[Just CDP][Experimental]"""
    SerializedStorageKey: str
    StorageType: str
    class UsageForType:
        """Usage for a storage type."""
        storageType: Storage.StorageType
        usage: int
    
    class TrustTokens:
        """Pair of issuer origin and number of available (signed, but not used) Trust
Tokens from that issuer."""
        issuerOrigin: str
        count: int
    
    InterestGroupAccessType: str
    class InterestGroupAd:
        """Ad advertising element inside an interest group."""
        renderUrl: str
        metadata: str
    
    class InterestGroupDetails:
        """The full details of an interest group."""
        ownerOrigin: str
        name: str
        expirationTime: Network.TimeSinceEpoch
        joiningOrigin: str
        biddingUrl: str
        biddingWasmHelperUrl: str
        updateUrl: str
        trustedBiddingSignalsUrl: str
        trustedBiddingSignalsKeys: list
        userBiddingSignals: str
        ads: list
        adComponents: list
    
    SharedStorageAccessType: str
    class SharedStorageEntry:
        """Struct for a single key-value pair in an origin's shared storage."""
        key: str
        value: str
    
    class SharedStorageMetadata:
        """Details for an origin's shared storage."""
        creationTime: Network.TimeSinceEpoch
        length: int
        remainingBudget: int
    
    class SharedStorageReportingMetadata:
        """Pair of reporting metadata details for a candidate URL for `selectURL()`."""
        eventType: str
        reportingUrl: str
    
    class SharedStorageUrlWithMetadata:
        """Bundles a candidate URL with its reporting metadata."""
        url: str
        reportingMetadata: list
    
    class SharedStorageAccessParams:
        """Bundles the parameters for shared storage access events whose
presence/absence can vary according to SharedStorageAccessType."""
        scriptSourceUrl: str
        operationName: str
        serializedData: str
        urlsWithMetadata: list
        key: str
        value: str
        ignoreIfPresent: bool
    
    StorageBucketsDurability: str
    class StorageBucket:
        storageKey: Storage.SerializedStorageKey
        name: str
    
    class StorageBucketInfo:
        bucket: Storage.StorageBucket
        id: str
        expiration: Network.TimeSinceEpoch
        quota: int
        persistent: bool
        durability: Storage.StorageBucketsDurability
    
    AttributionReportingSourceType: str
    UnsignedInt64AsBase10: str
    UnsignedInt128AsBase16: str
    SignedInt64AsBase10: str
    class AttributionReportingFilterDataEntry:
        key: str
        values: list
    
    class AttributionReportingAggregationKeysEntry:
        key: str
        value: Storage.UnsignedInt128AsBase16
    
    class AttributionReportingEventReportWindows:
        start: int
        ends: list
    
    class AttributionReportingSourceRegistration:
        time: Network.TimeSinceEpoch
        expiry: int
        eventReportWindow: int
        eventReportWindows: Storage.AttributionReportingEventReportWindows
        aggregatableReportWindow: int
        type: Storage.AttributionReportingSourceType
        sourceOrigin: str
        reportingOrigin: str
        destinationSites: list
        eventId: Storage.UnsignedInt64AsBase10
        priority: Storage.SignedInt64AsBase10
        filterData: list
        aggregationKeys: list
        debugKey: Storage.UnsignedInt64AsBase10
    
    AttributionReportingSourceRegistrationResult: str
    class cacheStorageContentUpdated(BaseEvent):
        """A cache's contents have been modified."""
        origin: str
        storageKey: str
        bucketId: str
        cacheName: str
    
    class cacheStorageListUpdated(BaseEvent):
        """A cache has been added/deleted."""
        origin: str
        storageKey: str
        bucketId: str
    
    class indexedDBContentUpdated(BaseEvent):
        """The origin's IndexedDB object store has been modified."""
        origin: str
        storageKey: str
        bucketId: str
        databaseName: str
        objectStoreName: str
    
    class indexedDBListUpdated(BaseEvent):
        """The origin's IndexedDB database list has been modified."""
        origin: str
        storageKey: str
        bucketId: str
    
    class interestGroupAccessed(BaseEvent):
        """One of the interest groups was accessed by the associated page."""
        accessTime: Network.TimeSinceEpoch
        type: Storage.InterestGroupAccessType
        ownerOrigin: str
        name: str
    
    class sharedStorageAccessed(BaseEvent):
        """Shared storage was accessed by the associated page.
The following parameters are included in all events."""
        accessTime: Network.TimeSinceEpoch
        type: Storage.SharedStorageAccessType
        mainFrameId: Page.FrameId
        ownerOrigin: str
        params: Storage.SharedStorageAccessParams
    
    class storageBucketCreatedOrUpdated(BaseEvent):
        bucketInfo: Storage.StorageBucketInfo
    
    class storageBucketDeleted(BaseEvent):
        bucketId: str
    
    class attributionReportingSourceRegistered(BaseEvent):
        """TODO(crbug.com/1458532): Add other Attribution Reporting events, e.g.
trigger registration."""
        registration: Storage.AttributionReportingSourceRegistration
        result: Storage.AttributionReportingSourceRegistrationResult
    
    @dataclass
    class getStorageKeyForFrame(ProtocolCommand):
        """Returns a storage key given a frame id."""
        frameId: Page.FrameId
    
    @dataclass
    class clearDataForOrigin(ProtocolCommand):
        """Clears storage for origin."""
        origin: str
        storageTypes: str
    
    @dataclass
    class clearDataForStorageKey(ProtocolCommand):
        """Clears storage for storage key."""
        storageKey: str
        storageTypes: str
    
    @dataclass
    class getCookies(ProtocolCommand):
        """Returns all browser cookies."""
        browserContextId: Browser.BrowserContextID = OPTIONAL
    
    @dataclass
    class setCookies(ProtocolCommand):
        """Sets given cookies."""
        cookies: list
        browserContextId: Browser.BrowserContextID = OPTIONAL
    
    @dataclass
    class clearCookies(ProtocolCommand):
        """Clears cookies."""
        browserContextId: Browser.BrowserContextID = OPTIONAL
    
    @dataclass
    class getUsageAndQuota(ProtocolCommand):
        """Returns usage and quota in bytes."""
        origin: str
    
    @dataclass
    class overrideQuotaForOrigin(ProtocolCommand):
        """Override quota for the specified origin"""
        origin: str
        quotaSize: int = OPTIONAL
    
    @dataclass
    class trackCacheStorageForOrigin(ProtocolCommand):
        """Registers origin to be notified when an update occurs to its cache storage list."""
        origin: str
    
    @dataclass
    class trackCacheStorageForStorageKey(ProtocolCommand):
        """Registers storage key to be notified when an update occurs to its cache storage list."""
        storageKey: str
    
    @dataclass
    class trackIndexedDBForOrigin(ProtocolCommand):
        """Registers origin to be notified when an update occurs to its IndexedDB."""
        origin: str
    
    @dataclass
    class trackIndexedDBForStorageKey(ProtocolCommand):
        """Registers storage key to be notified when an update occurs to its IndexedDB."""
        storageKey: str
    
    @dataclass
    class untrackCacheStorageForOrigin(ProtocolCommand):
        """Unregisters origin from receiving notifications for cache storage."""
        origin: str
    
    @dataclass
    class untrackCacheStorageForStorageKey(ProtocolCommand):
        """Unregisters storage key from receiving notifications for cache storage."""
        storageKey: str
    
    @dataclass
    class untrackIndexedDBForOrigin(ProtocolCommand):
        """Unregisters origin from receiving notifications for IndexedDB."""
        origin: str
    
    @dataclass
    class untrackIndexedDBForStorageKey(ProtocolCommand):
        """Unregisters storage key from receiving notifications for IndexedDB."""
        storageKey: str
    
    @dataclass
    class getTrustTokens(ProtocolCommand):
        """Returns the number of stored Trust Tokens per issuer for the
current browsing context."""
        pass
    
    @dataclass
    class clearTrustTokens(ProtocolCommand):
        """Removes all Trust Tokens issued by the provided issuerOrigin.
Leaves other stored data, including the issuer's Redemption Records, intact."""
        issuerOrigin: str
    
    @dataclass
    class getInterestGroupDetails(ProtocolCommand):
        """Gets details for a named interest group."""
        ownerOrigin: str
        name: str
    
    @dataclass
    class setInterestGroupTracking(ProtocolCommand):
        """Enables/Disables issuing of interestGroupAccessed events."""
        enable: bool
    
    @dataclass
    class getSharedStorageMetadata(ProtocolCommand):
        """Gets metadata for an origin's shared storage."""
        ownerOrigin: str
    
    @dataclass
    class getSharedStorageEntries(ProtocolCommand):
        """Gets the entries in an given origin's shared storage."""
        ownerOrigin: str
    
    @dataclass
    class setSharedStorageEntry(ProtocolCommand):
        """Sets entry with `key` and `value` for a given origin's shared storage."""
        ownerOrigin: str
        key: str
        value: str
        ignoreIfPresent: bool = OPTIONAL
    
    @dataclass
    class deleteSharedStorageEntry(ProtocolCommand):
        """Deletes entry for `key` (if it exists) for a given origin's shared storage."""
        ownerOrigin: str
        key: str
    
    @dataclass
    class clearSharedStorageEntries(ProtocolCommand):
        """Clears all entries for a given origin's shared storage."""
        ownerOrigin: str
    
    @dataclass
    class resetSharedStorageBudget(ProtocolCommand):
        """Resets the budget for `ownerOrigin` by clearing all budget withdrawals."""
        ownerOrigin: str
    
    @dataclass
    class setSharedStorageTracking(ProtocolCommand):
        """Enables/disables issuing of sharedStorageAccessed events."""
        enable: bool
    
    @dataclass
    class setStorageBucketTracking(ProtocolCommand):
        """Set tracking for a storage key's buckets."""
        storageKey: str
        enable: bool
    
    @dataclass
    class deleteStorageBucket(ProtocolCommand):
        """Deletes the Storage Bucket with the given storage key and bucket name."""
        bucket: Storage.StorageBucket
    
    @dataclass
    class runBounceTrackingMitigations(ProtocolCommand):
        """Deletes state for sites identified as potential bounce trackers, immediately."""
        pass
    
    @dataclass
    class setAttributionReportingLocalTestingMode(ProtocolCommand):
        """https://wicg.github.io/attribution-reporting-api/"""
        enabled: bool
    
    @dataclass
    class setAttributionReportingTracking(ProtocolCommand):
        """Enables/disables issuing of Attribution Reporting events."""
        enable: bool
    

@domainclass
class SystemInfo:
    """[Just CDP][Experimental] The SystemInfo domain defines methods and events for querying low-level system information."""
    class GPUDevice:
        """Describes a single graphics processor (GPU)."""
        vendorId: int
        deviceId: int
        subSysId: int
        revision: int
        vendorString: str
        deviceString: str
        driverVendor: str
        driverVersion: str
    
    class Size:
        """Describes the width and height dimensions of an entity."""
        width: int
        height: int
    
    class VideoDecodeAcceleratorCapability:
        """Describes a supported video decoding profile with its associated minimum and
maximum resolutions."""
        profile: str
        maxResolution: SystemInfo.Size
        minResolution: SystemInfo.Size
    
    class VideoEncodeAcceleratorCapability:
        """Describes a supported video encoding profile with its associated maximum
resolution and maximum framerate."""
        profile: str
        maxResolution: SystemInfo.Size
        maxFramerateNumerator: int
        maxFramerateDenominator: int
    
    SubsamplingFormat: str
    ImageType: str
    class ImageDecodeAcceleratorCapability:
        """Describes a supported image decoding profile with its associated minimum and
maximum resolutions and subsampling."""
        imageType: SystemInfo.ImageType
        maxDimensions: SystemInfo.Size
        minDimensions: SystemInfo.Size
        subsamplings: list
    
    class GPUInfo:
        """Provides information about the GPU(s) on the system."""
        devices: list
        auxAttributes: Any
        featureStatus: Any
        driverBugWorkarounds: list
        videoDecoding: list
        videoEncoding: list
        imageDecoding: list
    
    class ProcessInfo:
        """Represents process info."""
        type: str
        id: int
        cpuTime: int
    

    @dataclass
    class getInfo(ProtocolCommand):
        """Returns information about the system."""
        pass
    
    @dataclass
    class getFeatureState(ProtocolCommand):
        """Returns information about the feature state."""
        featureState: str
    
    @dataclass
    class getProcessInfo(ProtocolCommand):
        """Returns information about all running processes."""
        pass
    

@domainclass
class Target:
    """Supports additional targets discovery and allows to attach to them."""
    TargetID: str
    SessionID: str
    class TargetInfo:
        targetId: Target.TargetID
        type: str
        title: str
        url: str
        attached: bool
        openerId: Target.TargetID
        canAccessOpener: bool
        openerFrameId: Page.FrameId
        browserContextId: Browser.BrowserContextID
        subtype: str
        isProvisional: bool
        isPaused: bool
    
    class FilterEntry:
        """A filter used by target query/discovery/auto-attach operations."""
        exclude: bool
        type: str
    
    TargetFilter: list
    class RemoteLocation:
        host: str
        port: int
    
    class attachedToTarget(BaseEvent):
        """Issued when attached to target because of auto-attach or `attachToTarget` command."""
        sessionId: Target.SessionID
        targetInfo: Target.TargetInfo
        waitingForDebugger: bool
    
    class detachedFromTarget(BaseEvent):
        """Issued when detached from target for any reason (including `detachFromTarget` command). Can be
issued multiple times per target if multiple sessions have been attached to it."""
        sessionId: Target.SessionID
        targetId: Target.TargetID
    
    class receivedMessageFromTarget(BaseEvent):
        """Notifies about a new protocol message received from the session (as reported in
`attachedToTarget` event)."""
        sessionId: Target.SessionID
        message: str
        targetId: Target.TargetID
    
    class targetCreated(BaseEvent):
        """Issued when a possible inspection target is created."""
        targetInfo: Target.TargetInfo
    
    class targetDestroyed(BaseEvent):
        """Issued when a target is destroyed."""
        targetId: Target.TargetID
    
    class targetCrashed(BaseEvent):
        """Issued when a target has crashed."""
        targetId: Target.TargetID
        status: str
        errorCode: int
    
    class targetInfoChanged(BaseEvent):
        """Issued when some information about a target has changed. This only happens between
`targetCreated` and `targetDestroyed`."""
        targetInfo: Target.TargetInfo
    
    class didCommitProvisionalTarget(BaseEvent):
        """This event is fired when provisional load is committed. Provisional target swaps with the current target."""
        oldTargetId: str
        newTargetId: str
    
    class dispatchMessageFromTarget(BaseEvent):
        targetId: str
        message: str
    
    @dataclass
    class activateTarget(ProtocolCommand):
        """[Just CDP] Activates (focuses) the target."""
        targetId: Target.TargetID
    
    @dataclass
    class attachToTarget(ProtocolCommand):
        """[Just CDP] Attaches to the target with given id."""
        targetId: Target.TargetID
        flatten: bool = OPTIONAL
    
    @dataclass
    class attachToBrowserTarget(ProtocolCommand):
        """[Just CDP] Attaches to the browser target, only uses flat sessionId mode."""
        pass
    
    @dataclass
    class closeTarget(ProtocolCommand):
        """[Just CDP] Closes the target. If the target is a page that gets closed too."""
        targetId: Target.TargetID
    
    @dataclass
    class exposeDevToolsProtocol(ProtocolCommand):
        """[Just CDP] Inject object to the target's main frame that provides a communication
channel with browser target.

Injected object will be available as `window[bindingName]`.

The object has the follwing API:
- `binding.send(json)` - a method to send messages over the remote debugging protocol
- `binding.onmessage = json => handleMessage(json)` - a callback that will be called for the protocol notifications and command responses."""
        targetId: Target.TargetID
        bindingName: str = OPTIONAL
    
    @dataclass
    class createBrowserContext(ProtocolCommand):
        """[Just CDP] Creates a new empty BrowserContext. Similar to an incognito profile but you can have more than
one."""
        disposeOnDetach: bool = OPTIONAL
        proxyServer: str = OPTIONAL
        proxyBypassList: str = OPTIONAL
        originsWithUniversalNetworkAccess: list = OPTIONAL
    
    @dataclass
    class getBrowserContexts(ProtocolCommand):
        """[Just CDP] Returns all browser contexts created with `Target.createBrowserContext` method."""
        pass
    
    @dataclass
    class createTarget(ProtocolCommand):
        """[Just CDP] Creates a new page."""
        url: str
        width: int = OPTIONAL
        height: int = OPTIONAL
        browserContextId: Browser.BrowserContextID = OPTIONAL
        enableBeginFrameControl: bool = OPTIONAL
        newWindow: bool = OPTIONAL
        background: bool = OPTIONAL
        forTab: bool = OPTIONAL
    
    @dataclass
    class detachFromTarget(ProtocolCommand):
        """[Just CDP] Detaches session with given id."""
        sessionId: Target.SessionID = OPTIONAL
        targetId: Target.TargetID = OPTIONAL
    
    @dataclass
    class disposeBrowserContext(ProtocolCommand):
        """[Just CDP] Deletes a BrowserContext. All the belonging pages will be closed without calling their
beforeunload hooks."""
        browserContextId: Browser.BrowserContextID
    
    @dataclass
    class getTargetInfo(ProtocolCommand):
        """[Just CDP] Returns information about a target."""
        targetId: Target.TargetID = OPTIONAL
    
    @dataclass
    class getTargets(ProtocolCommand):
        """[Just CDP] Retrieves a list of available targets."""
        filter: Target.TargetFilter = OPTIONAL
    
    @dataclass
    class sendMessageToTarget(ProtocolCommand):
        """Sends protocol message over session with given id.
Consider using flat mode instead; see commands attachToTarget, setAutoAttach,
and crbug.com/991325."""
        message: str
        sessionId: Target.SessionID = OPTIONAL
        targetId: Target.TargetID = OPTIONAL
    
    @dataclass
    class setAutoAttach(ProtocolCommand):
        """[Just CDP] Controls whether to automatically attach to new targets which are considered to be related to
this one. When turned on, attaches to all existing related targets as well. When turned off,
automatically detaches from all currently attached targets.
This also clears all targets added by `autoAttachRelated` from the list of targets to watch
for creation of related targets."""
        autoAttach: bool
        waitForDebuggerOnStart: bool
        flatten: bool = OPTIONAL
        filter: Target.TargetFilter = OPTIONAL
    
    @dataclass
    class autoAttachRelated(ProtocolCommand):
        """[Just CDP] Adds the specified target to the list of targets that will be monitored for any related target
creation (such as child frames, child workers and new versions of service worker) and reported
through `attachedToTarget`. The specified target is also auto-attached.
This cancels the effect of any previous `setAutoAttach` and is also cancelled by subsequent
`setAutoAttach`. Only available at the Browser target."""
        targetId: Target.TargetID
        waitForDebuggerOnStart: bool
        filter: Target.TargetFilter = OPTIONAL
    
    @dataclass
    class setDiscoverTargets(ProtocolCommand):
        """[Just CDP] Controls whether to discover available targets and notify via
`targetCreated/targetInfoChanged/targetDestroyed` events."""
        discover: bool
        filter: Target.TargetFilter = OPTIONAL
    
    @dataclass
    class setRemoteLocations(ProtocolCommand):
        """[Just CDP] Enables target discovery for the specified locations, when `setDiscoverTargets` was set to
`true`."""
        locations: list
    
    @dataclass
    class setPauseOnStart(ProtocolCommand):
        """[Just WIP] If set to true, new targets will be paused on start waiting for resume command. Other commands can be dispatched on the target before it is resumed."""
        pauseOnStart: bool
    
    @dataclass
    class resume(ProtocolCommand):
        """[Just WIP] Will resume target if it was paused on start."""
        targetId: str
    

@domainclass
class Tethering:
    """[Just CDP][Experimental] The Tethering domain defines methods and events for browser port binding."""

    class accepted(BaseEvent):
        """Informs that port was successfully bound and got a specified connection id."""
        port: int
        connectionId: str
    
    @dataclass
    class bind(ProtocolCommand):
        """Request browser port binding."""
        port: int
    
    @dataclass
    class unbind(ProtocolCommand):
        """Request browser port unbinding."""
        port: int
    

@domainclass
class Tracing:
    """[Just CDP][Experimental]"""
    MemoryDumpConfig: Any
    class TraceConfig:
        recordMode: str
        traceBufferSizeInKb: int
        enableSampling: bool
        enableSystrace: bool
        enableArgumentFilter: bool
        includedCategories: list
        excludedCategories: list
        syntheticDelays: list
        memoryDumpConfig: Tracing.MemoryDumpConfig
    
    StreamFormat: str
    StreamCompression: str
    MemoryDumpLevelOfDetail: str
    TracingBackend: str
    class bufferUsage(BaseEvent):
        percentFull: int
        eventCount: int
        value: int
    
    class dataCollected(BaseEvent):
        """Contains a bucket of collected trace events. When tracing is stopped collected events will be
sent as a sequence of dataCollected events followed by tracingComplete event."""
        value: list
    
    class tracingComplete(BaseEvent):
        """Signals that tracing is stopped and there is no trace buffers pending flush, all data were
delivered via dataCollected events."""
        dataLossOccurred: bool
        stream: IO.StreamHandle
        traceFormat: Tracing.StreamFormat
        streamCompression: Tracing.StreamCompression
    
    @dataclass
    class end(ProtocolCommand):
        """Stop trace events collection."""
        pass
    
    @dataclass
    class getCategories(ProtocolCommand):
        """Gets supported tracing categories."""
        pass
    
    @dataclass
    class recordClockSyncMarker(ProtocolCommand):
        """Record a clock sync marker in the trace."""
        syncId: str
    
    @dataclass
    class requestMemoryDump(ProtocolCommand):
        """Request a global memory dump."""
        deterministic: bool = OPTIONAL
        levelOfDetail: Tracing.MemoryDumpLevelOfDetail = OPTIONAL
    
    @dataclass
    class start(ProtocolCommand):
        """Start trace events collection."""
        categories: str = OPTIONAL
        options: str = OPTIONAL
        bufferUsageReportingInterval: int = OPTIONAL
        transferMode: str = OPTIONAL
        streamFormat: Tracing.StreamFormat = OPTIONAL
        streamCompression: Tracing.StreamCompression = OPTIONAL
        traceConfig: Tracing.TraceConfig = OPTIONAL
        perfettoConfig: str = OPTIONAL
        tracingBackend: Tracing.TracingBackend = OPTIONAL
    

@domainclass
class Fetch:
    """[Just CDP] A domain for letting clients substitute browser's network layer with client code."""
    RequestId: str
    RequestStage: str
    class RequestPattern:
        urlPattern: str
        resourceType: Network.ResourceType
        requestStage: Fetch.RequestStage
    
    class HeaderEntry:
        """Response HTTP header entry"""
        name: str
        value: str
    
    class AuthChallenge:
        """Authorization challenge for HTTP status code 401 or 407."""
        source: str
        origin: str
        scheme: str
        realm: str
    
    class AuthChallengeResponse:
        """Response to an AuthChallenge."""
        response: str
        username: str
        password: str
    
    class requestPaused(BaseEvent):
        """Issued when the domain is enabled and the request URL matches the
specified filter. The request is paused until the client responds
with one of continueRequest, failRequest or fulfillRequest.
The stage of the request can be determined by presence of responseErrorReason
and responseStatusCode -- the request is at the response stage if either
of these fields is present and in the request stage otherwise.
Redirect responses and subsequent requests are reported similarly to regular
responses and requests. Redirect responses may be distinguished by the value
of `responseStatusCode` (which is one of 301, 302, 303, 307, 308) along with
presence of the `location` header. Requests resulting from a redirect will
have `redirectedRequestId` field set."""
        requestId: Fetch.RequestId
        request: Network.Request
        frameId: Page.FrameId
        resourceType: Network.ResourceType
        responseErrorReason: Network.ErrorReason
        responseStatusCode: int
        responseStatusText: str
        responseHeaders: list
        networkId: Network.RequestId
        redirectedRequestId: Fetch.RequestId
    
    class authRequired(BaseEvent):
        """Issued when the domain is enabled with handleAuthRequests set to true.
The request is paused until client responds with continueWithAuth."""
        requestId: Fetch.RequestId
        request: Network.Request
        frameId: Page.FrameId
        resourceType: Network.ResourceType
        authChallenge: Fetch.AuthChallenge
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables the fetch domain."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables issuing of requestPaused events. A request will be paused until client
calls one of failRequest, fulfillRequest or continueRequest/continueWithAuth."""
        patterns: list = OPTIONAL
        handleAuthRequests: bool = OPTIONAL
    
    @dataclass
    class failRequest(ProtocolCommand):
        """Causes the request to fail with specified reason."""
        requestId: Fetch.RequestId
        errorReason: Network.ErrorReason
    
    @dataclass
    class fulfillRequest(ProtocolCommand):
        """Provides response to the request."""
        requestId: Fetch.RequestId
        responseCode: int
        responseHeaders: list = OPTIONAL
        binaryResponseHeaders: str = OPTIONAL
        body: str = OPTIONAL
        responsePhrase: str = OPTIONAL
    
    @dataclass
    class continueRequest(ProtocolCommand):
        """Continues the request, optionally modifying some of its parameters."""
        requestId: Fetch.RequestId
        url: str = OPTIONAL
        method: str = OPTIONAL
        postData: str = OPTIONAL
        headers: list = OPTIONAL
        interceptResponse: bool = OPTIONAL
    
    @dataclass
    class continueWithAuth(ProtocolCommand):
        """Continues a request supplying authChallengeResponse following authRequired event."""
        requestId: Fetch.RequestId
        authChallengeResponse: Fetch.AuthChallengeResponse
    
    @dataclass
    class continueResponse(ProtocolCommand):
        """Continues loading of the paused response, optionally modifying the
response headers. If either responseCode or headers are modified, all of them
must be present."""
        requestId: Fetch.RequestId
        responseCode: int = OPTIONAL
        responsePhrase: str = OPTIONAL
        responseHeaders: list = OPTIONAL
        binaryResponseHeaders: str = OPTIONAL
    
    @dataclass
    class getResponseBody(ProtocolCommand):
        """Causes the body of the response to be received from the server and
returned as a single string. May only be issued for a request that
is paused in the Response stage and is mutually exclusive with
takeResponseBodyForInterceptionAsStream. Calling other methods that
affect the request or disabling fetch domain before body is received
results in an undefined behavior.
Note that the response body is not available for redirects. Requests
paused in the _redirect received_ state may be differentiated by
`responseCode` and presence of `location` response header, see
comments to `requestPaused` for details."""
        requestId: Fetch.RequestId
    
    @dataclass
    class takeResponseBodyAsStream(ProtocolCommand):
        """Returns a handle to the stream representing the response body.
The request must be paused in the HeadersReceived stage.
Note that after this command the request can't be continued
as is -- client either needs to cancel it or to provide the
response body.
The stream only supports sequential read, IO.read will fail if the position
is specified.
This method is mutually exclusive with getResponseBody.
Calling other methods that affect the request or disabling fetch
domain before body is received results in an undefined behavior."""
        requestId: Fetch.RequestId
    

@domainclass
class WebAudio:
    """[Just CDP][Experimental] This domain allows inspection of Web Audio API.
https://webaudio.github.io/web-audio-api/"""
    GraphObjectId: str
    ContextType: str
    ContextState: str
    NodeType: str
    ChannelCountMode: str
    ChannelInterpretation: str
    ParamType: str
    AutomationRate: str
    class ContextRealtimeData:
        """Fields in AudioContext that change in real-time."""
        currentTime: int
        renderCapacity: int
        callbackIntervalMean: int
        callbackIntervalVariance: int
    
    class BaseAudioContext:
        """Protocol object for BaseAudioContext"""
        contextId: WebAudio.GraphObjectId
        contextType: WebAudio.ContextType
        contextState: WebAudio.ContextState
        realtimeData: WebAudio.ContextRealtimeData
        callbackBufferSize: int
        maxOutputChannelCount: int
        sampleRate: int
    
    class AudioListener:
        """Protocol object for AudioListener"""
        listenerId: WebAudio.GraphObjectId
        contextId: WebAudio.GraphObjectId
    
    class AudioNode:
        """Protocol object for AudioNode"""
        nodeId: WebAudio.GraphObjectId
        contextId: WebAudio.GraphObjectId
        nodeType: WebAudio.NodeType
        numberOfInputs: int
        numberOfOutputs: int
        channelCount: int
        channelCountMode: WebAudio.ChannelCountMode
        channelInterpretation: WebAudio.ChannelInterpretation
    
    class AudioParam:
        """Protocol object for AudioParam"""
        paramId: WebAudio.GraphObjectId
        nodeId: WebAudio.GraphObjectId
        contextId: WebAudio.GraphObjectId
        paramType: WebAudio.ParamType
        rate: WebAudio.AutomationRate
        defaultValue: int
        minValue: int
        maxValue: int
    
    class contextCreated(BaseEvent):
        """Notifies that a new BaseAudioContext has been created."""
        context: WebAudio.BaseAudioContext
    
    class contextWillBeDestroyed(BaseEvent):
        """Notifies that an existing BaseAudioContext will be destroyed."""
        contextId: WebAudio.GraphObjectId
    
    class contextChanged(BaseEvent):
        """Notifies that existing BaseAudioContext has changed some properties (id stays the same).."""
        context: WebAudio.BaseAudioContext
    
    class audioListenerCreated(BaseEvent):
        """Notifies that the construction of an AudioListener has finished."""
        listener: WebAudio.AudioListener
    
    class audioListenerWillBeDestroyed(BaseEvent):
        """Notifies that a new AudioListener has been created."""
        contextId: WebAudio.GraphObjectId
        listenerId: WebAudio.GraphObjectId
    
    class audioNodeCreated(BaseEvent):
        """Notifies that a new AudioNode has been created."""
        node: WebAudio.AudioNode
    
    class audioNodeWillBeDestroyed(BaseEvent):
        """Notifies that an existing AudioNode has been destroyed."""
        contextId: WebAudio.GraphObjectId
        nodeId: WebAudio.GraphObjectId
    
    class audioParamCreated(BaseEvent):
        """Notifies that a new AudioParam has been created."""
        param: WebAudio.AudioParam
    
    class audioParamWillBeDestroyed(BaseEvent):
        """Notifies that an existing AudioParam has been destroyed."""
        contextId: WebAudio.GraphObjectId
        nodeId: WebAudio.GraphObjectId
        paramId: WebAudio.GraphObjectId
    
    class nodesConnected(BaseEvent):
        """Notifies that two AudioNodes are connected."""
        contextId: WebAudio.GraphObjectId
        sourceId: WebAudio.GraphObjectId
        destinationId: WebAudio.GraphObjectId
        sourceOutputIndex: int
        destinationInputIndex: int
    
    class nodesDisconnected(BaseEvent):
        """Notifies that AudioNodes are disconnected. The destination can be null, and it means all the outgoing connections from the source are disconnected."""
        contextId: WebAudio.GraphObjectId
        sourceId: WebAudio.GraphObjectId
        destinationId: WebAudio.GraphObjectId
        sourceOutputIndex: int
        destinationInputIndex: int
    
    class nodeParamConnected(BaseEvent):
        """Notifies that an AudioNode is connected to an AudioParam."""
        contextId: WebAudio.GraphObjectId
        sourceId: WebAudio.GraphObjectId
        destinationId: WebAudio.GraphObjectId
        sourceOutputIndex: int
    
    class nodeParamDisconnected(BaseEvent):
        """Notifies that an AudioNode is disconnected to an AudioParam."""
        contextId: WebAudio.GraphObjectId
        sourceId: WebAudio.GraphObjectId
        destinationId: WebAudio.GraphObjectId
        sourceOutputIndex: int
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables the WebAudio domain and starts sending context lifetime events."""
        pass
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables the WebAudio domain."""
        pass
    
    @dataclass
    class getRealtimeData(ProtocolCommand):
        """Fetch the realtime data from the registered contexts."""
        contextId: WebAudio.GraphObjectId
    

@domainclass
class WebAuthn:
    """[Just CDP][Experimental] This domain allows configuring virtual authenticators to test the WebAuthn
API."""
    AuthenticatorId: str
    AuthenticatorProtocol: str
    Ctap2Version: str
    AuthenticatorTransport: str
    class VirtualAuthenticatorOptions:
        protocol: WebAuthn.AuthenticatorProtocol
        ctap2Version: WebAuthn.Ctap2Version
        transport: WebAuthn.AuthenticatorTransport
        hasResidentKey: bool
        hasUserVerification: bool
        hasLargeBlob: bool
        hasCredBlob: bool
        hasMinPinLength: bool
        hasPrf: bool
        automaticPresenceSimulation: bool
        isUserVerified: bool
    
    class Credential:
        credentialId: str
        isResidentCredential: bool
        rpId: str
        privateKey: str
        userHandle: str
        signCount: int
        largeBlob: str
    
    class credentialAdded(BaseEvent):
        """Triggered when a credential is added to an authenticator."""
        authenticatorId: WebAuthn.AuthenticatorId
        credential: WebAuthn.Credential
    
    class credentialAsserted(BaseEvent):
        """Triggered when a credential is used in a webauthn assertion."""
        authenticatorId: WebAuthn.AuthenticatorId
        credential: WebAuthn.Credential
    
    @dataclass
    class enable(ProtocolCommand):
        """Enable the WebAuthn domain and start intercepting credential storage and
retrieval with a virtual authenticator."""
        enableUI: bool = OPTIONAL
    
    @dataclass
    class disable(ProtocolCommand):
        """Disable the WebAuthn domain."""
        pass
    
    @dataclass
    class addVirtualAuthenticator(ProtocolCommand):
        """Creates and adds a virtual authenticator."""
        options: WebAuthn.VirtualAuthenticatorOptions
    
    @dataclass
    class setResponseOverrideBits(ProtocolCommand):
        """Resets parameters isBogusSignature, isBadUV, isBadUP to false if they are not present."""
        authenticatorId: WebAuthn.AuthenticatorId
        isBogusSignature: bool = OPTIONAL
        isBadUV: bool = OPTIONAL
        isBadUP: bool = OPTIONAL
    
    @dataclass
    class removeVirtualAuthenticator(ProtocolCommand):
        """Removes the given authenticator."""
        authenticatorId: WebAuthn.AuthenticatorId
    
    @dataclass
    class addCredential(ProtocolCommand):
        """Adds the credential to the specified authenticator."""
        authenticatorId: WebAuthn.AuthenticatorId
        credential: WebAuthn.Credential
    
    @dataclass
    class getCredential(ProtocolCommand):
        """Returns a single credential stored in the given virtual authenticator that
matches the credential ID."""
        authenticatorId: WebAuthn.AuthenticatorId
        credentialId: str
    
    @dataclass
    class getCredentials(ProtocolCommand):
        """Returns all the credentials stored in the given virtual authenticator."""
        authenticatorId: WebAuthn.AuthenticatorId
    
    @dataclass
    class removeCredential(ProtocolCommand):
        """Removes a credential from the authenticator."""
        authenticatorId: WebAuthn.AuthenticatorId
        credentialId: str
    
    @dataclass
    class clearCredentials(ProtocolCommand):
        """Clears all the credentials from the specified device."""
        authenticatorId: WebAuthn.AuthenticatorId
    
    @dataclass
    class setUserVerified(ProtocolCommand):
        """Sets whether User Verification succeeds or fails for an authenticator.
The default is true."""
        authenticatorId: WebAuthn.AuthenticatorId
        isUserVerified: bool
    
    @dataclass
    class setAutomaticPresenceSimulation(ProtocolCommand):
        """Sets whether tests of user presence will succeed immediately (if true) or fail to resolve (if false) for an authenticator.
The default is true."""
        authenticatorId: WebAuthn.AuthenticatorId
        enabled: bool
    

@domainclass
class Media:
    """[Just CDP][Experimental] This domain allows detailed inspection of media elements"""
    PlayerId: str
    Timestamp: int
    class PlayerMessage:
        """Have one type per entry in MediaLogRecord::Type
Corresponds to kMessage"""
        level: str
        message: str
    
    class PlayerProperty:
        """Corresponds to kMediaPropertyChange"""
        name: str
        value: str
    
    class PlayerEvent:
        """Corresponds to kMediaEventTriggered"""
        timestamp: Media.Timestamp
        value: str
    
    class PlayerErrorSourceLocation:
        """Represents logged source line numbers reported in an error.
NOTE: file and line are from chromium c++ implementation code, not js."""
        file: str
        line: int
    
    class PlayerError:
        """Corresponds to kMediaError"""
        errorType: str
        code: int
        stack: list
        cause: list
        data: Any
    
    class playerPropertiesChanged(BaseEvent):
        """This can be called multiple times, and can be used to set / override /
remove player properties. A null propValue indicates removal."""
        playerId: Media.PlayerId
        properties: list
    
    class playerEventsAdded(BaseEvent):
        """Send events as a list, allowing them to be batched on the browser for less
congestion. If batched, events must ALWAYS be in chronological order."""
        playerId: Media.PlayerId
        events: list
    
    class playerMessagesLogged(BaseEvent):
        """Send a list of any messages that need to be delivered."""
        playerId: Media.PlayerId
        messages: list
    
    class playerErrorsRaised(BaseEvent):
        """Send a list of any errors that need to be delivered."""
        playerId: Media.PlayerId
        errors: list
    
    class playersCreated(BaseEvent):
        """Called whenever a player is created, or when a new agent joins and receives
a list of active players. If an agent is restored, it will receive the full
list of player ids and all events again."""
        players: list
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables the Media domain"""
        pass
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables the Media domain."""
        pass
    

@domainclass
class DeviceAccess:
    """[Just CDP][Experimental]"""
    RequestId: str
    DeviceId: str
    class PromptDevice:
        """Device information displayed in a user prompt to select a device."""
        id: DeviceAccess.DeviceId
        name: str
    
    class deviceRequestPrompted(BaseEvent):
        """A device request opened a user prompt to select a device. Respond with the
selectPrompt or cancelPrompt command."""
        id: DeviceAccess.RequestId
        devices: list
    
    @dataclass
    class enable(ProtocolCommand):
        """Enable events in this domain."""
        pass
    
    @dataclass
    class disable(ProtocolCommand):
        """Disable events in this domain."""
        pass
    
    @dataclass
    class selectPrompt(ProtocolCommand):
        """Select a device in response to a DeviceAccess.deviceRequestPrompted event."""
        id: DeviceAccess.RequestId
        deviceId: DeviceAccess.DeviceId
    
    @dataclass
    class cancelPrompt(ProtocolCommand):
        """Cancel a prompt in response to a DeviceAccess.deviceRequestPrompted event."""
        id: DeviceAccess.RequestId
    

@domainclass
class Preload:
    """[Just CDP][Experimental]"""
    RuleSetId: str
    class RuleSet:
        """Corresponds to SpeculationRuleSet"""
        id: Preload.RuleSetId
        loaderId: Network.LoaderId
        sourceText: str
        backendNodeId: DOM.BackendNodeId
        url: str
        requestId: Network.RequestId
        errorType: Preload.RuleSetErrorType
        errorMessage: str
    
    RuleSetErrorType: str
    SpeculationAction: str
    SpeculationTargetHint: str
    class PreloadingAttemptKey:
        """A key that identifies a preloading attempt.

The url used is the url specified by the trigger (i.e. the initial URL), and
not the final url that is navigated to. For example, prerendering allows
same-origin main frame navigations during the attempt, but the attempt is
still keyed with the initial URL."""
        loaderId: Network.LoaderId
        action: Preload.SpeculationAction
        url: str
        targetHint: Preload.SpeculationTargetHint
    
    class PreloadingAttemptSource:
        """Lists sources for a preloading attempt, specifically the ids of rule sets
that had a speculation rule that triggered the attempt, and the
BackendNodeIds of <a href> or <area href> elements that triggered the
attempt (in the case of attempts triggered by a document rule). It is
possible for mulitple rule sets and links to trigger a single attempt."""
        key: Preload.PreloadingAttemptKey
        ruleSetIds: list
        nodeIds: list
    
    PrerenderFinalStatus: str
    PreloadingStatus: str
    PrefetchStatus: str
    class ruleSetUpdated(BaseEvent):
        """Upsert. Currently, it is only emitted when a rule set added."""
        ruleSet: Preload.RuleSet
    
    class ruleSetRemoved(BaseEvent):
        id: Preload.RuleSetId
    
    class prerenderAttemptCompleted(BaseEvent):
        """Fired when a prerender attempt is completed."""
        key: Preload.PreloadingAttemptKey
        initiatingFrameId: Page.FrameId
        prerenderingUrl: str
        finalStatus: Preload.PrerenderFinalStatus
        disallowedApiMethod: str
    
    class preloadEnabledStateUpdated(BaseEvent):
        """Fired when a preload enabled state is updated."""
        disabledByPreference: bool
        disabledByDataSaver: bool
        disabledByBatterySaver: bool
        disabledByHoldbackPrefetchSpeculationRules: bool
        disabledByHoldbackPrerenderSpeculationRules: bool
    
    class prefetchStatusUpdated(BaseEvent):
        """Fired when a prefetch attempt is updated."""
        key: Preload.PreloadingAttemptKey
        initiatingFrameId: Page.FrameId
        prefetchUrl: str
        status: Preload.PreloadingStatus
        prefetchStatus: Preload.PrefetchStatus
        requestId: Network.RequestId
    
    class prerenderStatusUpdated(BaseEvent):
        """Fired when a prerender attempt is updated."""
        key: Preload.PreloadingAttemptKey
        status: Preload.PreloadingStatus
        prerenderStatus: Preload.PrerenderFinalStatus
        disallowedMojoInterface: str
    
    class preloadingAttemptSourcesUpdated(BaseEvent):
        """Send a list of sources for all preloading attempts in a document."""
        loaderId: Network.LoaderId
        preloadingAttemptSources: list
    
    @dataclass
    class enable(ProtocolCommand):
        pass
    
    @dataclass
    class disable(ProtocolCommand):
        pass
    

@domainclass
class FedCm:
    """[Just CDP][Experimental] This domain allows interacting with the FedCM dialog."""
    LoginState: str
    DialogType: str
    class Account:
        """Corresponds to IdentityRequestAccount"""
        accountId: str
        email: str
        name: str
        givenName: str
        pictureUrl: str
        idpConfigUrl: str
        idpSigninUrl: str
        loginState: FedCm.LoginState
        termsOfServiceUrl: str
        privacyPolicyUrl: str
    
    class dialogShown(BaseEvent):
        dialogId: str
        dialogType: FedCm.DialogType
        accounts: list
        title: str
        subtitle: str
    
    @dataclass
    class enable(ProtocolCommand):
        disableRejectionDelay: bool = OPTIONAL
    
    @dataclass
    class disable(ProtocolCommand):
        pass
    
    @dataclass
    class selectAccount(ProtocolCommand):
        dialogId: str
        accountIndex: int
    
    @dataclass
    class confirmIdpSignin(ProtocolCommand):
        """Only valid if the dialog type is ConfirmIdpSignin. Acts as if the user had
clicked the continue button."""
        dialogId: str
    
    @dataclass
    class dismissDialog(ProtocolCommand):
        dialogId: str
        triggerCooldown: bool = OPTIONAL
    
    @dataclass
    class resetCooldown(ProtocolCommand):
        """Resets the cooldown time, if any, to allow the next FedCM call to show
a dialog even if one was recently dismissed by the user."""
        pass
    

@domainclass
class Console:
    """This domain is deprecated - use Runtime or Log instead."""
    class ConsoleMessage:
        """Console message."""
        source: str
        level: str
        text: str
        url: str
        line: int
        column: int
        type: str
        repeatCount: int
        parameters: list
        stackTrace: Console.StackTrace
        networkRequestId: Network.RequestId
        timestamp: int
    
    ChannelSource: str
    ChannelLevel: str
    ClearReason: str
    class Channel:
        """Logging channel."""
        source: Console.ChannelSource
        level: Console.ChannelLevel
    
    class CallFrame:
        """Stack entry for console errors and assertions."""
        functionName: str
        url: str
        scriptId: Debugger.ScriptId
        lineNumber: int
        columnNumber: int
    
    class StackTrace:
        """Call frames for async function calls, console assertions, and error messages."""
        callFrames: list
        topCallFrameIsBoundary: bool
        truncated: bool
        parentStackTrace: Console.StackTrace
    
    class messageAdded(BaseEvent):
        """Issued when new console message is added."""
        message: Console.ConsoleMessage
    
    class messageRepeatCountUpdated(BaseEvent):
        """Issued when subsequent message(s) are equal to the previous one(s)."""
        count: int
        timestamp: int
    
    class messagesCleared(BaseEvent):
        """Issued when console is cleared. This happens either upon <code>clearMessages</code> command or after page navigation."""
        reason: Console.ClearReason
    
    class heapSnapshot(BaseEvent):
        """Issued from console.takeHeapSnapshot."""
        timestamp: int
        snapshotData: Heap.HeapSnapshotData
        title: str
    
    @dataclass
    class clearMessages(ProtocolCommand):
        """Does nothing."""
        pass
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables console domain, prevents further console messages from being reported to the client."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables console domain, sends the messages collected so far to the client by means of the
`messageAdded` notification."""
        pass
    
    @dataclass
    class getLoggingChannels(ProtocolCommand):
        """[Just WIP] List of the different message sources that are non-default logging channels."""
        pass
    
    @dataclass
    class setLoggingChannelLevel(ProtocolCommand):
        """[Just WIP] Modify the level of a channel."""
        source: Console.ChannelSource
        level: Console.ChannelLevel
    

@domainclass
class Debugger:
    """Debugger domain exposes JavaScript debugging capabilities. It allows setting and removing
breakpoints, stepping through execution, exploring stack traces, etc."""
    BreakpointId: str
    CallFrameId: str
    class Location:
        """Location in the source code."""
        scriptId: Runtime.ScriptId
        lineNumber: int
        columnNumber: int
    
    class ScriptPosition:
        """Location in the source code."""
        lineNumber: int
        columnNumber: int
    
    class LocationRange:
        """Location range within one script."""
        scriptId: Runtime.ScriptId
        start: Debugger.ScriptPosition
        end: Debugger.ScriptPosition
    
    class CallFrame:
        """JavaScript call frame. Array of call frames form the call stack."""
        callFrameId: Debugger.CallFrameId
        functionName: str
        functionLocation: Debugger.Location
        location: Debugger.Location
        url: str
        scopeChain: list
        this: Runtime.RemoteObject
        returnValue: Runtime.RemoteObject
        canBeRestarted: bool
        isTailDeleted: bool
    
    class Scope:
        """Scope description."""
        type: str
        object: Runtime.RemoteObject
        name: str
        startLocation: Debugger.Location
        endLocation: Debugger.Location
        location: Debugger.Location
        empty: bool
    
    class SearchMatch:
        """Search match for resource."""
        lineNumber: int
        lineContent: str
    
    class BreakLocation:
        scriptId: Runtime.ScriptId
        lineNumber: int
        columnNumber: int
        type: str
    
    class WasmDisassemblyChunk:
        lines: list
        bytecodeOffsets: list
    
    ScriptLanguage: str
    class DebugSymbols:
        """Debug symbols available for a wasm script."""
        type: str
        externalURL: str
    
    BreakpointActionIdentifier: int
    ScriptId: str
    class BreakpointAction:
        """Action to perform when a breakpoint is triggered."""
        type: str
        data: str
        id: Debugger.BreakpointActionIdentifier
        emulateUserGesture: bool
    
    class BreakpointOptions:
        """Extra options that modify breakpoint behavior."""
        condition: str
        actions: list
        autoContinue: bool
        ignoreCount: int
    
    class FunctionDetails:
        """Information about the function."""
        location: Debugger.Location
        name: str
        displayName: str
        scopeChain: list
    
    class ProbeSample:
        """A sample collected by evaluating a probe breakpoint action."""
        probeId: Debugger.BreakpointActionIdentifier
        sampleId: int
        batchId: int
        timestamp: int
        payload: Runtime.RemoteObject
    
    class AssertPauseReason:
        """The pause reason auxiliary data when paused because of an assertion."""
        message: str
    
    class BreakpointPauseReason:
        """The pause reason auxiliary data when paused because of hitting a breakpoint."""
        breakpointId: str
    
    class CSPViolationPauseReason:
        """The pause reason auxiliary data when paused because of a Content Security Policy directive."""
        directive: str
    
    class breakpointResolved(BaseEvent):
        """Fired when breakpoint is resolved to an actual script and location."""
        breakpointId: Debugger.BreakpointId
        location: Debugger.Location
    
    class paused(BaseEvent):
        """Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria."""
        callFrames: list
        reason: str
        data: Any
        hitBreakpoints: list
        asyncStackTrace: Runtime.StackTrace
        asyncStackTraceId: Runtime.StackTraceId
        asyncCallStackTraceId: Runtime.StackTraceId
    
    class resumed(BaseEvent):
        """Fired when the virtual machine resumed execution."""
        pass
    
    class scriptFailedToParse(BaseEvent):
        """Fired when virtual machine fails to parse the script."""
        scriptId: Runtime.ScriptId
        url: str
        startLine: int
        startColumn: int
        endLine: int
        endColumn: int
        executionContextId: Runtime.ExecutionContextId
        hash: str
        executionContextAuxData: Any
        sourceMapURL: str
        hasSourceURL: bool
        isModule: bool
        length: int
        stackTrace: Runtime.StackTrace
        codeOffset: int
        scriptLanguage: Debugger.ScriptLanguage
        embedderName: str
        scriptSource: str
        errorLine: int
        errorMessage: str
    
    class scriptParsed(BaseEvent):
        """Fired when virtual machine parses script. This event is also fired for all known and uncollected
scripts upon enabling debugger."""
        scriptId: Runtime.ScriptId
        url: str
        startLine: int
        startColumn: int
        endLine: int
        endColumn: int
        executionContextId: Runtime.ExecutionContextId
        hash: str
        executionContextAuxData: Any
        isLiveEdit: bool
        sourceMapURL: str
        hasSourceURL: bool
        isModule: bool
        length: int
        stackTrace: Runtime.StackTrace
        codeOffset: int
        scriptLanguage: Debugger.ScriptLanguage
        debugSymbols: Debugger.DebugSymbols
        embedderName: str
        isContentScript: bool
        sourceURL: str
        module: bool
    
    class globalObjectCleared(BaseEvent):
        """Called when global has been cleared and debugger client should reset its state. Happens upon navigation or reload."""
        pass
    
    class didSampleProbe(BaseEvent):
        """Fires when a new probe sample is collected."""
        sample: Debugger.ProbeSample
    
    class playBreakpointActionSound(BaseEvent):
        """Fired when a "sound" breakpoint action is triggered on a breakpoint."""
        breakpointActionId: Debugger.BreakpointActionIdentifier
    
    @dataclass
    class continueToLocation(ProtocolCommand):
        """Continues execution until specific location is reached."""
        location: Debugger.Location
        targetCallFrames: str = OPTIONAL
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables debugger for given page."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables debugger for the given page. Clients should not assume that the debugging has been
enabled until the result for this command is received."""
        maxScriptsCacheSize: int = OPTIONAL
    
    @dataclass
    class evaluateOnCallFrame(ProtocolCommand):
        """Evaluates expression on a given call frame."""
        callFrameId: Debugger.CallFrameId
        expression: str
        objectGroup: str = OPTIONAL
        includeCommandLineAPI: bool = OPTIONAL
        silent: bool = OPTIONAL
        returnByValue: bool = OPTIONAL
        generatePreview: bool = OPTIONAL
        throwOnSideEffect: bool = OPTIONAL
        timeout: Runtime.TimeDelta = OPTIONAL
        doNotPauseOnExceptionsAndMuteConsole: bool = OPTIONAL
        saveResult: bool = OPTIONAL
        emulateUserGesture: bool = OPTIONAL
    
    @dataclass
    class getPossibleBreakpoints(ProtocolCommand):
        """[Just CDP] Returns possible locations for breakpoint. scriptId in start and end range locations should be
the same."""
        start: Debugger.Location
        end: Debugger.Location = OPTIONAL
        restrictToFunction: bool = OPTIONAL
    
    @dataclass
    class getScriptSource(ProtocolCommand):
        """Returns source for the script with given id."""
        scriptId: Runtime.ScriptId
    
    @dataclass
    class disassembleWasmModule(ProtocolCommand):
        """[Just CDP]"""
        scriptId: Runtime.ScriptId
    
    @dataclass
    class nextWasmDisassemblyChunk(ProtocolCommand):
        """[Just CDP] Disassemble the next chunk of lines for the module corresponding to the
stream. If disassembly is complete, this API will invalidate the streamId
and return an empty chunk. Any subsequent calls for the now invalid stream
will return errors."""
        streamId: str
    
    @dataclass
    class getWasmBytecode(ProtocolCommand):
        """[Just CDP] This command is deprecated. Use getScriptSource instead."""
        scriptId: Runtime.ScriptId
    
    @dataclass
    class getStackTrace(ProtocolCommand):
        """[Just CDP] Returns stack trace with given `stackTraceId`."""
        stackTraceId: Runtime.StackTraceId
    
    @dataclass
    class pause(ProtocolCommand):
        """Stops on the next JavaScript statement."""
        pass
    
    @dataclass
    class pauseOnAsyncCall(ProtocolCommand):
        """[Just CDP]"""
        parentStackTraceId: Runtime.StackTraceId
    
    @dataclass
    class removeBreakpoint(ProtocolCommand):
        """Removes JavaScript breakpoint."""
        breakpointId: Debugger.BreakpointId
    
    @dataclass
    class restartFrame(ProtocolCommand):
        """[Just CDP] Restarts particular call frame from the beginning. The old, deprecated
behavior of `restartFrame` is to stay paused and allow further CDP commands
after a restart was scheduled. This can cause problems with restarting, so
we now continue execution immediatly after it has been scheduled until we
reach the beginning of the restarted frame.

To stay back-wards compatible, `restartFrame` now expects a `mode`
parameter to be present. If the `mode` parameter is missing, `restartFrame`
errors out.

The various return values are deprecated and `callFrames` is always empty.
Use the call frames from the `Debugger#paused` events instead, that fires
once V8 pauses at the beginning of the restarted function."""
        callFrameId: Debugger.CallFrameId
        mode: str = OPTIONAL
    
    @dataclass
    class resume(ProtocolCommand):
        """Resumes JavaScript execution."""
        terminateOnResume: bool = OPTIONAL
    
    @dataclass
    class searchInContent(ProtocolCommand):
        """Searches for given string in script content."""
        scriptId: Runtime.ScriptId
        query: str
        caseSensitive: bool = OPTIONAL
        isRegex: bool = OPTIONAL
    
    @dataclass
    class setAsyncCallStackDepth(ProtocolCommand):
        """[Just CDP] Enables or disables async call stacks tracking."""
        maxDepth: int
    
    @dataclass
    class setBlackboxPatterns(ProtocolCommand):
        """[Just CDP] Replace previous blackbox patterns with passed ones. Forces backend to skip stepping/pausing in
scripts with url matching one of the patterns. VM will try to leave blackboxed script by
performing 'step in' several times, finally resorting to 'step out' if unsuccessful."""
        patterns: list
    
    @dataclass
    class setBlackboxedRanges(ProtocolCommand):
        """[Just CDP] Makes backend skip steps in the script in blackboxed ranges. VM will try leave blacklisted
scripts by performing 'step in' several times, finally resorting to 'step out' if unsuccessful.
Positions array contains positions where blackbox state is changed. First interval isn't
blackboxed. Array should be sorted."""
        scriptId: Runtime.ScriptId
        positions: list
    
    @dataclass
    class setBreakpoint(ProtocolCommand):
        """Sets JavaScript breakpoint at a given location."""
        location: Debugger.Location
        condition: str = OPTIONAL
        options: Debugger.BreakpointOptions = OPTIONAL
    
    @dataclass
    class setInstrumentationBreakpoint(ProtocolCommand):
        """[Just CDP] Sets instrumentation breakpoint."""
        instrumentation: str
    
    @dataclass
    class setBreakpointByUrl(ProtocolCommand):
        """Sets JavaScript breakpoint at given location specified either by URL or URL regex. Once this
command is issued, all existing parsed scripts will have breakpoints resolved and returned in
`locations` property. Further matching script parsing will result in subsequent
`breakpointResolved` events issued. This logical breakpoint will survive page reloads."""
        lineNumber: int
        url: str = OPTIONAL
        urlRegex: str = OPTIONAL
        scriptHash: str = OPTIONAL
        columnNumber: int = OPTIONAL
        condition: str = OPTIONAL
        options: Debugger.BreakpointOptions = OPTIONAL
    
    @dataclass
    class setBreakpointOnFunctionCall(ProtocolCommand):
        """[Just CDP] Sets JavaScript breakpoint before each call to the given function.
If another function was created from the same source as a given one,
calling it will also trigger the breakpoint."""
        objectId: Runtime.RemoteObjectId
        condition: str = OPTIONAL
    
    @dataclass
    class setBreakpointsActive(ProtocolCommand):
        """Activates / deactivates all breakpoints on the page."""
        active: bool
    
    @dataclass
    class setPauseOnExceptions(ProtocolCommand):
        """Defines pause on exceptions state. Can be set to stop on all exceptions, uncaught exceptions,
or caught exceptions, no exceptions. Initial pause on exceptions state is `none`."""
        state: str
        options: Debugger.BreakpointOptions = OPTIONAL
    
    @dataclass
    class setReturnValue(ProtocolCommand):
        """[Just CDP] Changes return value in top frame. Available only at return break position."""
        newValue: Runtime.CallArgument
    
    @dataclass
    class setScriptSource(ProtocolCommand):
        """[Just CDP] Edits JavaScript source live.

In general, functions that are currently on the stack can not be edited with
a single exception: If the edited function is the top-most stack frame and
that is the only activation of that function on the stack. In this case
the live edit will be successful and a `Debugger.restartFrame` for the
top-most function is automatically triggered."""
        scriptId: Runtime.ScriptId
        scriptSource: str
        dryRun: bool = OPTIONAL
        allowTopFrameEditing: bool = OPTIONAL
    
    @dataclass
    class setSkipAllPauses(ProtocolCommand):
        """[Just CDP] Makes page not interrupt on any pauses (breakpoint, exception, dom exception etc)."""
        skip: bool
    
    @dataclass
    class setVariableValue(ProtocolCommand):
        """[Just CDP] Changes value of variable in a callframe. Object-based scopes are not supported and must be
mutated manually."""
        scopeNumber: int
        variableName: str
        newValue: Runtime.CallArgument
        callFrameId: Debugger.CallFrameId
    
    @dataclass
    class stepInto(ProtocolCommand):
        """Steps into the function call."""
        breakOnAsyncCall: bool = OPTIONAL
        skipList: list = OPTIONAL
    
    @dataclass
    class stepOut(ProtocolCommand):
        """Steps out of the function call."""
        pass
    
    @dataclass
    class stepOver(ProtocolCommand):
        """Steps over the statement."""
        skipList: list = OPTIONAL
    
    @dataclass
    class setAsyncStackTraceDepth(ProtocolCommand):
        """[Just WIP] Set the async stack trace depth for the page. A value of zero disables recording of async stack traces."""
        depth: int
    
    @dataclass
    class addSymbolicBreakpoint(ProtocolCommand):
        """[Just WIP] Adds a JavaScript breakpoint that pauses execution whenever a function with the given name is about to be called."""
        symbol: str
        caseSensitive: bool = OPTIONAL
        isRegex: bool = OPTIONAL
        options: Debugger.BreakpointOptions = OPTIONAL
    
    @dataclass
    class removeSymbolicBreakpoint(ProtocolCommand):
        """[Just WIP] Removes a previously added symbolic breakpoint."""
        symbol: str
        caseSensitive: bool = OPTIONAL
        isRegex: bool = OPTIONAL
    
    @dataclass
    class continueUntilNextRunLoop(ProtocolCommand):
        """[Just WIP] Continues execution until the current evaluation completes. This will trigger either a Debugger.paused or Debugger.resumed event."""
        pass
    
    @dataclass
    class stepNext(ProtocolCommand):
        """[Just WIP] Steps over the expression. This will trigger either a Debugger.paused or Debugger.resumed event."""
        pass
    
    @dataclass
    class getFunctionDetails(ProtocolCommand):
        """[Just WIP] Returns detailed information on given function."""
        functionId: Runtime.RemoteObjectId
    
    @dataclass
    class getBreakpointLocations(ProtocolCommand):
        """[Just WIP] Returns a list of valid breakpoint locations within the given location range."""
        start: Debugger.Location
        end: Debugger.Location
    
    @dataclass
    class setPauseOnDebuggerStatements(ProtocolCommand):
        """[Just WIP] Control whether the debugger pauses execution before `debugger` statements."""
        enabled: bool
        options: Debugger.BreakpointOptions = OPTIONAL
    
    @dataclass
    class setPauseOnAssertions(ProtocolCommand):
        """[Just WIP] Set pause on assertions state. Assertions are console.assert assertions."""
        enabled: bool
        options: Debugger.BreakpointOptions = OPTIONAL
    
    @dataclass
    class setPauseOnMicrotasks(ProtocolCommand):
        """[Just WIP] Pause when running the next JavaScript microtask."""
        enabled: bool
        options: Debugger.BreakpointOptions = OPTIONAL
    
    @dataclass
    class setPauseForInternalScripts(ProtocolCommand):
        """[Just WIP] Change whether to pause in the debugger for internal scripts. The default value is false."""
        shouldPause: bool
    
    @dataclass
    class setShouldBlackboxURL(ProtocolCommand):
        """[Just WIP] Sets whether the given URL should be in the list of blackboxed scripts, which are ignored when pausing/stepping/debugging."""
        url: str
        shouldBlackbox: bool
        caseSensitive: bool = OPTIONAL
        isRegex: bool = OPTIONAL
    
    @dataclass
    class setBlackboxBreakpointEvaluations(ProtocolCommand):
        """[Just WIP] Sets whether evaluation of breakpoint conditions, ignore counts, and actions happen at the location of the breakpoint or are deferred due to blackboxing."""
        blackboxBreakpointEvaluations: bool
    

@domainclass
class HeapProfiler:
    """[Just CDP][Experimental]"""
    HeapSnapshotObjectId: str
    class SamplingHeapProfileNode:
        """Sampling Heap Profile node. Holds callsite information, allocation statistics and child nodes."""
        callFrame: Runtime.CallFrame
        selfSize: int
        id: int
        children: list
    
    class SamplingHeapProfileSample:
        """A single sample from a sampling profile."""
        size: int
        nodeId: int
        ordinal: int
    
    class SamplingHeapProfile:
        """Sampling profile."""
        head: HeapProfiler.SamplingHeapProfileNode
        samples: list
    
    class addHeapSnapshotChunk(BaseEvent):
        chunk: str
    
    class heapStatsUpdate(BaseEvent):
        """If heap objects tracking has been started then backend may send update for one or more fragments"""
        statsUpdate: list
    
    class lastSeenObjectId(BaseEvent):
        """If heap objects tracking has been started then backend regularly sends a current value for last
seen object id and corresponding timestamp. If the were changes in the heap since last event
then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event."""
        lastSeenObjectId: int
        timestamp: int
    
    class reportHeapSnapshotProgress(BaseEvent):
        done: int
        total: int
        finished: bool
    
    class resetProfiles(BaseEvent):
        pass
    
    @dataclass
    class addInspectedHeapObject(ProtocolCommand):
        """Enables console to refer to the node with given id via $x (see Command Line API for more details
$x functions)."""
        heapObjectId: HeapProfiler.HeapSnapshotObjectId
    
    @dataclass
    class collectGarbage(ProtocolCommand):
        pass
    
    @dataclass
    class disable(ProtocolCommand):
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        pass
    
    @dataclass
    class getHeapObjectId(ProtocolCommand):
        objectId: Runtime.RemoteObjectId
    
    @dataclass
    class getObjectByHeapObjectId(ProtocolCommand):
        objectId: HeapProfiler.HeapSnapshotObjectId
        objectGroup: str = OPTIONAL
    
    @dataclass
    class getSamplingProfile(ProtocolCommand):
        pass
    
    @dataclass
    class startSampling(ProtocolCommand):
        samplingInterval: int = OPTIONAL
        includeObjectsCollectedByMajorGC: bool = OPTIONAL
        includeObjectsCollectedByMinorGC: bool = OPTIONAL
    
    @dataclass
    class startTrackingHeapObjects(ProtocolCommand):
        trackAllocations: bool = OPTIONAL
    
    @dataclass
    class stopSampling(ProtocolCommand):
        pass
    
    @dataclass
    class stopTrackingHeapObjects(ProtocolCommand):
        reportProgress: bool = OPTIONAL
        treatGlobalObjectsAsRoots: bool = OPTIONAL
        captureNumericValue: bool = OPTIONAL
        exposeInternals: bool = OPTIONAL
    
    @dataclass
    class takeHeapSnapshot(ProtocolCommand):
        reportProgress: bool = OPTIONAL
        treatGlobalObjectsAsRoots: bool = OPTIONAL
        captureNumericValue: bool = OPTIONAL
        exposeInternals: bool = OPTIONAL
    

@domainclass
class Profiler:
    """[Just CDP]"""
    class ProfileNode:
        """Profile node. Holds callsite information, execution statistics and child nodes."""
        id: int
        callFrame: Runtime.CallFrame
        hitCount: int
        children: list
        deoptReason: str
        positionTicks: list
    
    class Profile:
        """Profile."""
        nodes: list
        startTime: int
        endTime: int
        samples: list
        timeDeltas: list
    
    class PositionTickInfo:
        """Specifies a number of samples attributed to a certain source position."""
        line: int
        ticks: int
    
    class CoverageRange:
        """Coverage data for a source range."""
        startOffset: int
        endOffset: int
        count: int
    
    class FunctionCoverage:
        """Coverage data for a JavaScript function."""
        functionName: str
        ranges: list
        isBlockCoverage: bool
    
    class ScriptCoverage:
        """Coverage data for a JavaScript script."""
        scriptId: Runtime.ScriptId
        url: str
        functions: list
    
    class consoleProfileFinished(BaseEvent):
        id: str
        location: Debugger.Location
        profile: Profiler.Profile
        title: str
    
    class consoleProfileStarted(BaseEvent):
        """Sent when new profile recording is started using console.profile() call."""
        id: str
        location: Debugger.Location
        title: str
    
    class preciseCoverageDeltaUpdate(BaseEvent):
        """Reports coverage delta since the last poll (either from an event like this, or from
`takePreciseCoverage` for the current isolate. May only be sent if precise code
coverage has been started. This event can be trigged by the embedder to, for example,
trigger collection of coverage data immediately at a certain point in time."""
        timestamp: int
        occasion: str
        result: list
    
    @dataclass
    class disable(ProtocolCommand):
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        pass
    
    @dataclass
    class getBestEffortCoverage(ProtocolCommand):
        """Collect coverage data for the current isolate. The coverage data may be incomplete due to
garbage collection."""
        pass
    
    @dataclass
    class setSamplingInterval(ProtocolCommand):
        """Changes CPU profiler sampling interval. Must be called before CPU profiles recording started."""
        interval: int
    
    @dataclass
    class start(ProtocolCommand):
        pass
    
    @dataclass
    class startPreciseCoverage(ProtocolCommand):
        """Enable precise code coverage. Coverage data for JavaScript executed before enabling precise code
coverage may be incomplete. Enabling prevents running optimized code and resets execution
counters."""
        callCount: bool = OPTIONAL
        detailed: bool = OPTIONAL
        allowTriggeredUpdates: bool = OPTIONAL
    
    @dataclass
    class stop(ProtocolCommand):
        pass
    
    @dataclass
    class stopPreciseCoverage(ProtocolCommand):
        """Disable precise code coverage. Disabling releases unnecessary execution count records and allows
executing optimized code."""
        pass
    
    @dataclass
    class takePreciseCoverage(ProtocolCommand):
        """Collect coverage data for the current isolate, and resets execution counters. Precise code
coverage needs to have started."""
        pass
    

@domainclass
class Runtime:
    """Runtime domain exposes JavaScript runtime by means of remote evaluation and mirror objects.
Evaluation results are returned as mirror object that expose object type, string representation
and unique identifier that can be used for further object reference. Original objects are
maintained in memory unless they are either explicitly released or are released along with the
other objects in their object group."""
    ScriptId: str
    class SerializationOptions:
        """Represents options for serialization. Overrides `generatePreview`, `returnByValue` and
`generateWebDriverValue`."""
        serialization: str
        maxDepth: int
        additionalParameters: Any
    
    class DeepSerializedValue:
        """Represents deep serialized value."""
        type: str
        value: Any
        objectId: str
        weakLocalObjectReference: int
    
    RemoteObjectId: str
    UnserializableValue: str
    class RemoteObject:
        """Mirror object referencing original JavaScript object."""
        type: str
        subtype: str
        className: str
        value: Any
        unserializableValue: Runtime.UnserializableValue
        description: str
        webDriverValue: Runtime.DeepSerializedValue
        deepSerializedValue: Runtime.DeepSerializedValue
        objectId: Runtime.RemoteObjectId
        preview: Runtime.ObjectPreview
        customPreview: Runtime.CustomPreview
        size: int
        classPrototype: Runtime.RemoteObject
    
    class CustomPreview:
        header: str
        bodyGetterId: Runtime.RemoteObjectId
    
    class ObjectPreview:
        """Object containing abbreviated remote object value."""
        type: str
        subtype: str
        description: str
        overflow: bool
        properties: list
        entries: list
        lossless: bool
        size: int
    
    class PropertyPreview:
        name: str
        type: str
        value: str
        valuePreview: Runtime.ObjectPreview
        subtype: str
        isPrivate: bool
        internal: bool
    
    class EntryPreview:
        key: Runtime.ObjectPreview
        value: Runtime.ObjectPreview
    
    class PropertyDescriptor:
        """Object property descriptor."""
        name: str
        value: Runtime.RemoteObject
        writable: bool
        get: Runtime.RemoteObject
        set: Runtime.RemoteObject
        configurable: bool
        enumerable: bool
        wasThrown: bool
        isOwn: bool
        symbol: Runtime.RemoteObject
        isPrivate: Runtime.boolean
        nativeGetter: bool
    
    class InternalPropertyDescriptor:
        """Object internal property descriptor. This property isn't normally visible in JavaScript code."""
        name: str
        value: Runtime.RemoteObject
    
    class PrivatePropertyDescriptor:
        """Object private field descriptor."""
        name: str
        value: Runtime.RemoteObject
        get: Runtime.RemoteObject
        set: Runtime.RemoteObject
    
    class CallArgument:
        """Represents function call argument. Either remote object id `objectId`, primitive `value`,
unserializable primitive value or neither of (for undefined) them should be specified."""
        value: Any
        unserializableValue: Runtime.UnserializableValue
        objectId: Runtime.RemoteObjectId
    
    ExecutionContextId: int
    class ExecutionContextDescription:
        """Description of an isolated world."""
        id: Runtime.ExecutionContextId
        origin: str
        name: str
        uniqueId: str
        auxData: Any
        type: Runtime.ExecutionContextType
        frameId: Network.FrameId
    
    class ExceptionDetails:
        """Detailed information about exception (or error) that was thrown during script compilation or
execution."""
        exceptionId: int
        text: str
        lineNumber: int
        columnNumber: int
        scriptId: Runtime.ScriptId
        url: str
        stackTrace: Runtime.StackTrace
        exception: Runtime.RemoteObject
        executionContextId: Runtime.ExecutionContextId
        exceptionMetaData: Any
    
    Timestamp: int
    TimeDelta: int
    class CallFrame:
        """Stack entry for runtime errors and assertions."""
        functionName: str
        scriptId: Runtime.ScriptId
        url: str
        lineNumber: int
        columnNumber: int
    
    class StackTrace:
        """Call frames for assertions or error messages."""
        description: str
        callFrames: list
        parent: Runtime.StackTrace
        parentId: Runtime.StackTraceId
    
    UniqueDebuggerId: str
    class StackTraceId:
        """If `debuggerId` is set stack trace comes from another debugger and can be resolved there. This
allows to track cross-debugger calls. See `Runtime.StackTrace` and `Debugger.paused` for usages."""
        id: str
        debuggerId: Runtime.UniqueDebuggerId
    
    class CollectionEntry:
        key: Runtime.RemoteObject
        value: Runtime.RemoteObject
    
    ExecutionContextType: str
    SyntaxErrorType: str
    class ErrorRange:
        """Range of an error in source code."""
        startOffset: int
        endOffset: int
    
    class StructureDescription:
        fields: list
        optionalFields: list
        constructorName: str
        prototypeStructure: Runtime.StructureDescription
        isImprecise: bool
    
    class TypeSet:
        isFunction: bool
        isUndefined: bool
        isNull: bool
        isBoolean: bool
        isInteger: bool
        isNumber: bool
        isString: bool
        isObject: bool
        isSymbol: bool
        isBigInt: bool
    
    class TypeDescription:
        """Container for type information that has been gathered."""
        isValid: bool
        leastCommonAncestor: str
        typeSet: Runtime.TypeSet
        structures: list
        isTruncated: bool
    
    class TypeLocation:
        """Describes the location of an expression we want type information for."""
        typeInformationDescriptor: int
        sourceID: str
        divot: int
    
    class BasicBlock:
        """From Wikipedia: a basic block is a portion of the code within a program with only one entry point and only one exit point. This type gives the location of a basic block and if that basic block has executed."""
        startOffset: int
        endOffset: int
        hasExecuted: bool
        executionCount: int
    
    class bindingCalled(BaseEvent):
        """Notification is issued every time when binding is called."""
        name: str
        payload: str
        executionContextId: Runtime.ExecutionContextId
    
    class consoleAPICalled(BaseEvent):
        """Issued when console API was called."""
        type: str
        args: list
        executionContextId: Runtime.ExecutionContextId
        timestamp: Runtime.Timestamp
        stackTrace: Runtime.StackTrace
        context: str
    
    class exceptionRevoked(BaseEvent):
        """Issued when unhandled exception was revoked."""
        reason: str
        exceptionId: int
    
    class exceptionThrown(BaseEvent):
        """Issued when exception was thrown and unhandled."""
        timestamp: Runtime.Timestamp
        exceptionDetails: Runtime.ExceptionDetails
    
    class executionContextCreated(BaseEvent):
        """Issued when new execution context is created."""
        context: Runtime.ExecutionContextDescription
    
    class executionContextDestroyed(BaseEvent):
        """Issued when execution context is destroyed."""
        executionContextId: Runtime.ExecutionContextId
        executionContextUniqueId: str
    
    class executionContextsCleared(BaseEvent):
        """Issued when all executionContexts were cleared in browser"""
        pass
    
    class inspectRequested(BaseEvent):
        """Issued when object should be inspected (for example, as a result of inspect() command line API
call)."""
        object: Runtime.RemoteObject
        hints: Any
        executionContextId: Runtime.ExecutionContextId
    
    @dataclass
    class awaitPromise(ProtocolCommand):
        """Add handler to promise with given promise object id."""
        promiseObjectId: Runtime.RemoteObjectId
        returnByValue: bool = OPTIONAL
        generatePreview: bool = OPTIONAL
        saveResult: bool = OPTIONAL
    
    @dataclass
    class callFunctionOn(ProtocolCommand):
        """Calls function with given declaration on the given object. Object group of the result is
inherited from the target object."""
        functionDeclaration: str
        objectId: Runtime.RemoteObjectId = OPTIONAL
        arguments: list = OPTIONAL
        silent: bool = OPTIONAL
        returnByValue: bool = OPTIONAL
        generatePreview: bool = OPTIONAL
        userGesture: bool = OPTIONAL
        awaitPromise: bool = OPTIONAL
        executionContextId: Runtime.ExecutionContextId = OPTIONAL
        objectGroup: str = OPTIONAL
        throwOnSideEffect: bool = OPTIONAL
        uniqueContextId: str = OPTIONAL
        generateWebDriverValue: bool = OPTIONAL
        serializationOptions: Runtime.SerializationOptions = OPTIONAL
        doNotPauseOnExceptionsAndMuteConsole: bool = OPTIONAL
        emulateUserGesture: bool = OPTIONAL
    
    @dataclass
    class compileScript(ProtocolCommand):
        """[Just CDP] Compiles expression."""
        expression: str
        sourceURL: str
        persistScript: bool
        executionContextId: Runtime.ExecutionContextId = OPTIONAL
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables reporting of execution contexts creation."""
        pass
    
    @dataclass
    class discardConsoleEntries(ProtocolCommand):
        """[Just CDP] Discards collected exceptions and console API calls."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables reporting of execution contexts creation by means of `executionContextCreated` event.
When the reporting gets enabled the event will be sent immediately for each existing execution
context."""
        pass
    
    @dataclass
    class evaluate(ProtocolCommand):
        """Evaluates expression on global object."""
        expression: str
        objectGroup: str = OPTIONAL
        includeCommandLineAPI: bool = OPTIONAL
        silent: bool = OPTIONAL
        contextId: Runtime.ExecutionContextId = OPTIONAL
        returnByValue: bool = OPTIONAL
        generatePreview: bool = OPTIONAL
        userGesture: bool = OPTIONAL
        awaitPromise: bool = OPTIONAL
        throwOnSideEffect: bool = OPTIONAL
        timeout: Runtime.TimeDelta = OPTIONAL
        disableBreaks: bool = OPTIONAL
        replMode: bool = OPTIONAL
        allowUnsafeEvalBlockedByCSP: bool = OPTIONAL
        uniqueContextId: str = OPTIONAL
        generateWebDriverValue: bool = OPTIONAL
        serializationOptions: Runtime.SerializationOptions = OPTIONAL
        doNotPauseOnExceptionsAndMuteConsole: bool = OPTIONAL
        saveResult: bool = OPTIONAL
        emulateUserGesture: bool = OPTIONAL
    
    @dataclass
    class getIsolateId(ProtocolCommand):
        """[Just CDP] Returns the isolate id."""
        pass
    
    @dataclass
    class getHeapUsage(ProtocolCommand):
        """[Just CDP] Returns the JavaScript heap usage.
It is the total usage of the corresponding isolate not scoped to a particular Runtime."""
        pass
    
    @dataclass
    class getProperties(ProtocolCommand):
        """Returns properties of a given object. Object group of the result is inherited from the target
object."""
        objectId: Runtime.RemoteObjectId
        ownProperties: bool = OPTIONAL
        accessorPropertiesOnly: bool = OPTIONAL
        generatePreview: bool = OPTIONAL
        nonIndexedPropertiesOnly: bool = OPTIONAL
        fetchStart: int = OPTIONAL
        fetchCount: int = OPTIONAL
    
    @dataclass
    class globalLexicalScopeNames(ProtocolCommand):
        """[Just CDP] Returns all let, const and class variables from global scope."""
        executionContextId: Runtime.ExecutionContextId = OPTIONAL
    
    @dataclass
    class queryObjects(ProtocolCommand):
        """[Just CDP]"""
        prototypeObjectId: Runtime.RemoteObjectId
        objectGroup: str = OPTIONAL
    
    @dataclass
    class releaseObject(ProtocolCommand):
        """Releases remote object with given id."""
        objectId: Runtime.RemoteObjectId
    
    @dataclass
    class releaseObjectGroup(ProtocolCommand):
        """Releases all remote objects that belong to a given group."""
        objectGroup: str
    
    @dataclass
    class runIfWaitingForDebugger(ProtocolCommand):
        """[Just CDP] Tells inspected instance to run if it was waiting for debugger to attach."""
        pass
    
    @dataclass
    class runScript(ProtocolCommand):
        """[Just CDP] Runs script with given id in a given context."""
        scriptId: Runtime.ScriptId
        executionContextId: Runtime.ExecutionContextId = OPTIONAL
        objectGroup: str = OPTIONAL
        silent: bool = OPTIONAL
        includeCommandLineAPI: bool = OPTIONAL
        returnByValue: bool = OPTIONAL
        generatePreview: bool = OPTIONAL
        awaitPromise: bool = OPTIONAL
    
    @dataclass
    class setAsyncCallStackDepth(ProtocolCommand):
        """[Just CDP] Enables or disables async call stacks tracking."""
        maxDepth: int
    
    @dataclass
    class setCustomObjectFormatterEnabled(ProtocolCommand):
        """[Just CDP]"""
        enabled: bool
    
    @dataclass
    class setMaxCallStackSizeToCapture(ProtocolCommand):
        """[Just CDP]"""
        size: int
    
    @dataclass
    class terminateExecution(ProtocolCommand):
        """[Just CDP] Terminate current or next JavaScript execution.
Will cancel the termination when the outer-most script execution ends."""
        pass
    
    @dataclass
    class addBinding(ProtocolCommand):
        """[Just CDP] If executionContextId is empty, adds binding with the given name on the
global objects of all inspected contexts, including those created later,
bindings survive reloads.
Binding function takes exactly one argument, this argument should be string,
in case of any other input, function throws an exception.
Each binding function call produces Runtime.bindingCalled notification."""
        name: str
        executionContextId: Runtime.ExecutionContextId = OPTIONAL
        executionContextName: str = OPTIONAL
    
    @dataclass
    class removeBinding(ProtocolCommand):
        """[Just CDP] This method does not remove binding function from global object but
unsubscribes current runtime agent from Runtime.bindingCalled notifications."""
        name: str
    
    @dataclass
    class getExceptionDetails(ProtocolCommand):
        """[Just CDP] This method tries to lookup and populate exception details for a
JavaScript Error object.
Note that the stackTrace portion of the resulting exceptionDetails will
only be populated if the Runtime domain was enabled at the time when the
Error was thrown."""
        errorObjectId: Runtime.RemoteObjectId
    
    @dataclass
    class parse(ProtocolCommand):
        """[Just WIP] Parses JavaScript source code for errors."""
        source: str
    
    @dataclass
    class getPreview(ProtocolCommand):
        """[Just WIP] Returns a preview for the given object."""
        objectId: Runtime.RemoteObjectId
    
    @dataclass
    class getDisplayableProperties(ProtocolCommand):
        """[Just WIP] Returns displayable properties of a given object. Object group of the result is inherited from the target object. Displayable properties are own properties, internal properties, and native getters in the prototype chain (assumed to be bindings and treated like own properties for the frontend)."""
        objectId: Runtime.RemoteObjectId
        fetchStart: int = OPTIONAL
        fetchCount: int = OPTIONAL
        generatePreview: bool = OPTIONAL
    
    @dataclass
    class getCollectionEntries(ProtocolCommand):
        """[Just WIP] Returns entries of given Map / Set collection."""
        objectId: Runtime.RemoteObjectId
        objectGroup: str = OPTIONAL
        fetchStart: int = OPTIONAL
        fetchCount: int = OPTIONAL
    
    @dataclass
    class saveResult(ProtocolCommand):
        """[Just WIP] Assign a saved result index to this value."""
        value: Runtime.CallArgument
        contextId: Runtime.ExecutionContextId = OPTIONAL
    
    @dataclass
    class setSavedResultAlias(ProtocolCommand):
        """[Just WIP] Creates an additional reference to all saved values in the Console using the the given string as a prefix instead of $."""
        alias: str = OPTIONAL
    
    @dataclass
    class getRuntimeTypesForVariablesAtOffsets(ProtocolCommand):
        """[Just WIP] Returns detailed information on the given function."""
        locations: list
    
    @dataclass
    class enableTypeProfiler(ProtocolCommand):
        """[Just WIP] Enables type profiling on the VM."""
        pass
    
    @dataclass
    class disableTypeProfiler(ProtocolCommand):
        """[Just WIP] Disables type profiling on the VM."""
        pass
    
    @dataclass
    class enableControlFlowProfiler(ProtocolCommand):
        """[Just WIP] Enables control flow profiling on the VM."""
        pass
    
    @dataclass
    class disableControlFlowProfiler(ProtocolCommand):
        """[Just WIP] Disables control flow profiling on the VM."""
        pass
    
    @dataclass
    class getBasicBlocks(ProtocolCommand):
        """[Just WIP] Returns a list of basic blocks for the given sourceID with information about their text ranges and whether or not they have executed."""
        sourceID: str
    

@domainclass
class Schema:
    """[Just CDP] This domain is deprecated."""
    class Domain:
        """Description of the protocol domain."""
        name: str
        version: str
    

    @dataclass
    class getDomains(ProtocolCommand):
        """Returns supported domains."""
        pass
    

@domainclass
class Canvas:
    """[Just WIP] Canvas domain allows tracking of canvases that have an associated graphics context. Tracks canvases in the DOM and CSS canvases created with -webkit-canvas."""
    CanvasId: str
    ProgramId: str
    ColorSpace: str
    ContextType: str
    ProgramType: str
    ShaderType: str
    class ContextAttributes:
        """Drawing surface attributes."""
        alpha: bool
        colorSpace: Canvas.ColorSpace
        desynchronized: bool
        depth: bool
        stencil: bool
        antialias: bool
        premultipliedAlpha: bool
        preserveDrawingBuffer: bool
        failIfMajorPerformanceCaveat: bool
        powerPreference: str
    
    class Canvas:
        """Information about a canvas for which a rendering context has been created."""
        canvasId: Canvas.CanvasId
        contextType: Canvas.ContextType
        width: int
        height: int
        nodeId: DOM.NodeId
        cssCanvasName: str
        contextAttributes: Canvas.ContextAttributes
        memoryCost: int
        stackTrace: Console.StackTrace
    
    class ShaderProgram:
        """Information about a WebGL/WebGL2 shader program."""
        programId: Canvas.ProgramId
        programType: Canvas.ProgramType
        canvasId: Canvas.CanvasId
    
    class canvasAdded(BaseEvent):
        canvas: Canvas.Canvas
    
    class canvasRemoved(BaseEvent):
        canvasId: Canvas.CanvasId
    
    class canvasSizeChanged(BaseEvent):
        canvasId: Canvas.CanvasId
        width: int
        height: int
    
    class canvasMemoryChanged(BaseEvent):
        canvasId: Canvas.CanvasId
        memoryCost: int
    
    class extensionEnabled(BaseEvent):
        canvasId: Canvas.CanvasId
        extension: str
    
    class clientNodesChanged(BaseEvent):
        canvasId: Canvas.CanvasId
    
    class recordingStarted(BaseEvent):
        canvasId: Canvas.CanvasId
        initiator: Recording.Initiator
    
    class recordingProgress(BaseEvent):
        canvasId: Canvas.CanvasId
        frames: list
        bufferUsed: int
    
    class recordingFinished(BaseEvent):
        canvasId: Canvas.CanvasId
        recording: Recording.Recording
    
    class programCreated(BaseEvent):
        shaderProgram: Canvas.ShaderProgram
    
    class programDeleted(BaseEvent):
        programId: Canvas.ProgramId
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables Canvas domain events."""
        pass
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables Canvas domain events."""
        pass
    
    @dataclass
    class requestNode(ProtocolCommand):
        """Gets the NodeId for the canvas node with the given CanvasId."""
        canvasId: Canvas.CanvasId
    
    @dataclass
    class requestContent(ProtocolCommand):
        """Gets the data for the canvas node with the given CanvasId."""
        canvasId: Canvas.CanvasId
    
    @dataclass
    class requestClientNodes(ProtocolCommand):
        """Gets all <code>-webkit-canvas</code> nodes or active <code>HTMLCanvasElement</code> for a <code>WebGPUDevice</code>."""
        canvasId: Canvas.CanvasId
    
    @dataclass
    class resolveContext(ProtocolCommand):
        """Resolves JavaScript canvas/device context object for given canvasId."""
        canvasId: Canvas.CanvasId
        objectGroup: str = OPTIONAL
    
    @dataclass
    class setRecordingAutoCaptureFrameCount(ProtocolCommand):
        """Tells the backend to record `count` frames whenever a new context is created."""
        count: int
    
    @dataclass
    class startRecording(ProtocolCommand):
        """Record the next frame, or up to the given number of bytes of data, for the given canvas."""
        canvasId: Canvas.CanvasId
        frameCount: int = OPTIONAL
        memoryLimit: int = OPTIONAL
    
    @dataclass
    class stopRecording(ProtocolCommand):
        """Stop recording the given canvas."""
        canvasId: Canvas.CanvasId
    
    @dataclass
    class requestShaderSource(ProtocolCommand):
        """Requests the source of the shader of the given type from the program with the given id."""
        programId: Canvas.ProgramId
        shaderType: Canvas.ShaderType
    
    @dataclass
    class updateShader(ProtocolCommand):
        """Compiles and links the shader with identifier and type with the given source code."""
        programId: Canvas.ProgramId
        shaderType: Canvas.ShaderType
        source: str
    
    @dataclass
    class setShaderProgramDisabled(ProtocolCommand):
        """Enable/disable the visibility of the given shader program."""
        programId: Canvas.ProgramId
        disabled: bool
    
    @dataclass
    class setShaderProgramHighlighted(ProtocolCommand):
        """Enable/disable highlighting of the given shader program."""
        programId: Canvas.ProgramId
        highlighted: bool
    

@domainclass
class Recording:
    """[Just WIP] General types used for recordings of actions performed in the inspected page."""
    Type: str
    Initiator: str
    class InitialState:
        """Information about the initial state of the recorded object."""
        attributes: Any
        states: list
        parameters: list
        content: str
    
    class Frame:
        """Container object for a single frame of the recording."""
        actions: list
        duration: int
        incomplete: bool
    
    class Recording:
        version: int
        type: Recording.Type
        initialState: Recording.InitialState
        data: list
        name: str
    



@domainclass
class Heap:
    """[Just WIP] Heap domain exposes JavaScript heap attributes and capabilities."""
    class GarbageCollection:
        """Information about a garbage collection."""
        type: str
        startTime: int
        endTime: int
    
    HeapSnapshotData: str
    class garbageCollected(BaseEvent):
        """Information about the garbage collection."""
        collection: Heap.GarbageCollection
    
    class trackingStart(BaseEvent):
        """Tracking started."""
        timestamp: int
        snapshotData: Heap.HeapSnapshotData
    
    class trackingComplete(BaseEvent):
        """Tracking stopped."""
        timestamp: int
        snapshotData: Heap.HeapSnapshotData
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables Heap domain events."""
        pass
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables Heap domain events."""
        pass
    
    @dataclass
    class gc(ProtocolCommand):
        """Trigger a full garbage collection."""
        pass
    
    @dataclass
    class snapshot(ProtocolCommand):
        """Take a heap snapshot."""
        pass
    
    @dataclass
    class startTracking(ProtocolCommand):
        """Start tracking heap changes. This will produce a `trackingStart` event."""
        pass
    
    @dataclass
    class stopTracking(ProtocolCommand):
        """Stop tracking heap changes. This will produce a `trackingComplete` event."""
        pass
    
    @dataclass
    class getPreview(ProtocolCommand):
        """Returns a preview (string, Debugger.FunctionDetails, or Runtime.ObjectPreview) for a Heap.HeapObjectId."""
        heapObjectId: int
    
    @dataclass
    class getRemoteObject(ProtocolCommand):
        """Returns the strongly referenced Runtime.RemoteObject for a Heap.HeapObjectId."""
        heapObjectId: int
        objectGroup: str = OPTIONAL
    

@domainclass
class Worker:
    """[Just WIP]"""

    class workerCreated(BaseEvent):
        workerId: str
        url: str
        name: str
    
    class workerTerminated(BaseEvent):
        workerId: str
    
    class dispatchMessageFromWorker(BaseEvent):
        workerId: str
        message: str
    
    @dataclass
    class enable(ProtocolCommand):
        """Enable Worker domain events."""
        pass
    
    @dataclass
    class disable(ProtocolCommand):
        """Disable Worker domain events."""
        pass
    
    @dataclass
    class initialized(ProtocolCommand):
        """Sent after the frontend has sent all initialization messages and can resume this worker. This command is required to allow execution in the worker."""
        workerId: str
    
    @dataclass
    class sendMessageToWorker(ProtocolCommand):
        """Send an Inspector Protocol message to be dispatched to a Worker's agents."""
        workerId: str
        message: str
    

@domainclass
class CPUProfiler:
    """[Just WIP] CPUProfiler domain exposes cpu usage tracking."""
    class ThreadInfo:
        """CPU usage for an individual thread."""
        name: str
        usage: int
        type: str
        targetId: str
    
    class Event:
        timestamp: int
        usage: int
        threads: list
    
    class trackingStart(BaseEvent):
        """Tracking started."""
        timestamp: int
    
    class trackingUpdate(BaseEvent):
        """Periodic tracking updates with event data."""
        event: CPUProfiler.Event
    
    class trackingComplete(BaseEvent):
        """Tracking stopped."""
        timestamp: int
    
    @dataclass
    class startTracking(ProtocolCommand):
        """Start tracking cpu usage."""
        pass
    
    @dataclass
    class stopTracking(ProtocolCommand):
        """Stop tracking cpu usage. This will produce a `trackingComplete` event."""
        pass
    

@domainclass
class Timeline:
    """[Just WIP] Timeline provides its clients with instrumentation records that are generated during the page runtime. Timeline instrumentation can be started and stopped using corresponding commands. While timeline is started, it is generating timeline event records."""
    EventType: str
    Instrument: str
    class TimelineEvent:
        """Timeline record contains information about the recorded activity."""
        type: Timeline.EventType
        data: Any
        children: list
    
    class eventRecorded(BaseEvent):
        """Fired for every instrumentation event while timeline is started."""
        record: Timeline.TimelineEvent
    
    class recordingStarted(BaseEvent):
        """Fired when recording has started."""
        startTime: int
    
    class recordingStopped(BaseEvent):
        """Fired when recording has stopped."""
        endTime: int
    
    class autoCaptureStarted(BaseEvent):
        """Fired when auto capture started."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables Timeline domain events."""
        pass
    
    @dataclass
    class disable(ProtocolCommand):
        """Disables Timeline domain events."""
        pass
    
    @dataclass
    class start(ProtocolCommand):
        """Starts capturing instrumentation events."""
        maxCallStackDepth: int = OPTIONAL
    
    @dataclass
    class stop(ProtocolCommand):
        """Stops capturing instrumentation events."""
        pass
    
    @dataclass
    class setAutoCaptureEnabled(ProtocolCommand):
        """Toggle auto capture state. If <code>true</code> the backend will disable breakpoints and start capturing on navigation. The backend will fire the <code>autoCaptureStarted</code> event when an auto capture starts. The frontend should stop the auto capture when appropriate and re-enable breakpoints."""
        enabled: bool
    
    @dataclass
    class setInstruments(ProtocolCommand):
        """Instruments to enable when capture starts on the backend (e.g. auto capture or programmatic capture)."""
        instruments: list
    

@domainclass
class ScriptProfiler:
    """[Just WIP] Profiler domain exposes JavaScript evaluation timing and profiling."""
    EventType: str
    class Event:
        startTime: int
        endTime: int
        type: ScriptProfiler.EventType
    
    class ExpressionLocation:
        line: int
        column: int
    
    class StackFrame:
        sourceID: Debugger.ScriptId
        name: str
        line: int
        column: int
        url: str
        expressionLocation: ScriptProfiler.ExpressionLocation
    
    class StackTrace:
        timestamp: int
        stackFrames: list
    
    class Samples:
        stackTraces: list
    
    class trackingStart(BaseEvent):
        """Tracking started."""
        timestamp: int
    
    class trackingUpdate(BaseEvent):
        """Periodic tracking updates with event data."""
        event: ScriptProfiler.Event
    
    class trackingComplete(BaseEvent):
        """Tracking stopped. Includes any buffered data during tracking, such as profiling information."""
        timestamp: int
        samples: ScriptProfiler.Samples
    
    @dataclass
    class startTracking(ProtocolCommand):
        """Start tracking script evaluations."""
        includeSamples: bool = OPTIONAL
    
    @dataclass
    class stopTracking(ProtocolCommand):
        """Stop tracking script evaluations. This will produce a `trackingComplete` event."""
        pass
    

@domainclass
class GenericTypes:
    """[Just WIP] Exposes generic types to be used by any domain."""
    class SearchMatch:
        """Search match in a resource."""
        lineNumber: int
        lineContent: str
    



@domainclass
class ApplicationCache:
    """[Just WIP]"""
    class ApplicationCacheResource:
        """Detailed application cache resource information."""
        url: str
        size: int
        type: str
    
    class ApplicationCache:
        """Detailed application cache information."""
        manifestURL: str
        size: int
        creationTime: int
        updateTime: int
        resources: list
    
    class FrameWithManifest:
        """Frame identifier - manifest URL pair."""
        frameId: Network.FrameId
        manifestURL: str
        status: int
    
    class applicationCacheStatusUpdated(BaseEvent):
        frameId: Network.FrameId
        manifestURL: str
        status: int
    
    class networkStateUpdated(BaseEvent):
        isNowOnline: bool
    
    @dataclass
    class getFramesWithManifests(ProtocolCommand):
        """Returns array of frame identifiers with manifest urls for each frame containing a document associated with some application cache."""
        pass
    
    @dataclass
    class enable(ProtocolCommand):
        """Enables application cache domain notifications."""
        pass
    
    @dataclass
    class disable(ProtocolCommand):
        """Disable application cache domain notifications."""
        pass
    
    @dataclass
    class getManifestForFrame(ProtocolCommand):
        """Returns manifest URL for document in the given frame."""
        frameId: Network.FrameId
    
    @dataclass
    class getApplicationCacheForFrame(ProtocolCommand):
        """Returns relevant application cache data for the document in given frame."""
        frameId: Network.FrameId
    

EventTypes = Union[Accessibility.loadComplete, Accessibility.nodesUpdated, Animation.animationCanceled, Animation.animationCreated, Animation.animationStarted, Animation.nameChanged, Animation.effectChanged, Animation.targetChanged, Animation.animationDestroyed, Animation.trackingStart, Animation.trackingUpdate, Animation.trackingComplete, Audits.issueAdded, Autofill.addressFormFilled, BackgroundService.recordingStateChanged, BackgroundService.backgroundServiceEventReceived, Browser.downloadWillBegin, Browser.downloadProgress, Browser.extensionsEnabled, Browser.extensionsDisabled, CSS.fontsUpdated, CSS.mediaQueryResultChanged, CSS.styleSheetAdded, CSS.styleSheetChanged, CSS.styleSheetRemoved, CSS.nodeLayoutFlagsChanged, Cast.sinksUpdated, Cast.issueUpdated, DOM.attributeModified, DOM.attributeRemoved, DOM.characterDataModified, DOM.childNodeCountUpdated, DOM.childNodeInserted, DOM.childNodeRemoved, DOM.distributedNodesUpdated, DOM.documentUpdated, DOM.inlineStyleInvalidated, DOM.pseudoElementAdded, DOM.topLayerElementsUpdated, DOM.pseudoElementRemoved, DOM.setChildNodes, DOM.shadowRootPopped, DOM.shadowRootPushed, DOM.inspect, DOM.willDestroyDOMNode, DOM.customElementStateChanged, DOM.didAddEventListener, DOM.willRemoveEventListener, DOM.didFireEvent, DOM.powerEfficientPlaybackStateChanged, DOMStorage.domStorageItemAdded, DOMStorage.domStorageItemRemoved, DOMStorage.domStorageItemUpdated, DOMStorage.domStorageItemsCleared, Database.addDatabase, Emulation.virtualTimeBudgetExpired, Input.dragIntercepted, Inspector.detached, Inspector.targetCrashed, Inspector.targetReloadedAfterCrash, Inspector.evaluateForTestInFrontend, Inspector.inspect, LayerTree.layerPainted, LayerTree.layerTreeDidChange, Log.entryAdded, Memory.memoryPressure, Memory.trackingStart, Memory.trackingUpdate, Memory.trackingComplete, Network.dataReceived, Network.eventSourceMessageReceived, Network.loadingFailed, Network.loadingFinished, Network.requestIntercepted, Network.requestServedFromCache, Network.requestWillBeSent, Network.resourceChangedPriority, Network.signedExchangeReceived, Network.responseReceived, Network.webSocketClosed, Network.webSocketCreated, Network.webSocketFrameError, Network.webSocketFrameReceived, Network.webSocketFrameSent, Network.webSocketHandshakeResponseReceived, Network.webSocketWillSendHandshakeRequest, Network.webTransportCreated, Network.webTransportConnectionEstablished, Network.webTransportClosed, Network.requestWillBeSentExtraInfo, Network.responseReceivedExtraInfo, Network.trustTokenOperationDone, Network.subresourceWebBundleMetadataReceived, Network.subresourceWebBundleMetadataError, Network.subresourceWebBundleInnerResponseParsed, Network.subresourceWebBundleInnerResponseError, Network.reportingApiReportAdded, Network.reportingApiReportUpdated, Network.reportingApiEndpointsChangedForOrigin, Network.requestServedFromMemoryCache, Network.responseIntercepted, Overlay.inspectNodeRequested, Overlay.nodeHighlightRequested, Overlay.screenshotRequested, Overlay.inspectModeCanceled, Page.domContentEventFired, Page.fileChooserOpened, Page.frameAttached, Page.frameClearedScheduledNavigation, Page.frameDetached, Page.frameNavigated, Page.documentOpened, Page.frameResized, Page.frameRequestedNavigation, Page.frameScheduledNavigation, Page.frameStartedLoading, Page.frameStoppedLoading, Page.downloadWillBegin, Page.downloadProgress, Page.interstitialHidden, Page.interstitialShown, Page.javascriptDialogClosed, Page.javascriptDialogOpening, Page.lifecycleEvent, Page.backForwardCacheNotUsed, Page.loadEventFired, Page.navigatedWithinDocument, Page.screencastFrame, Page.screencastVisibilityChanged, Page.windowOpen, Page.compilationCacheProduced, Page.defaultUserPreferencesDidChange, Performance.metrics, PerformanceTimeline.timelineEventAdded, Security.certificateError, Security.visibleSecurityStateChanged, Security.securityStateChanged, ServiceWorker.workerErrorReported, ServiceWorker.workerRegistrationUpdated, ServiceWorker.workerVersionUpdated, Storage.cacheStorageContentUpdated, Storage.cacheStorageListUpdated, Storage.indexedDBContentUpdated, Storage.indexedDBListUpdated, Storage.interestGroupAccessed, Storage.sharedStorageAccessed, Storage.storageBucketCreatedOrUpdated, Storage.storageBucketDeleted, Storage.attributionReportingSourceRegistered, Target.attachedToTarget, Target.detachedFromTarget, Target.receivedMessageFromTarget, Target.targetCreated, Target.targetDestroyed, Target.targetCrashed, Target.targetInfoChanged, Target.didCommitProvisionalTarget, Target.dispatchMessageFromTarget, Tethering.accepted, Tracing.bufferUsage, Tracing.dataCollected, Tracing.tracingComplete, Fetch.requestPaused, Fetch.authRequired, WebAudio.contextCreated, WebAudio.contextWillBeDestroyed, WebAudio.contextChanged, WebAudio.audioListenerCreated, WebAudio.audioListenerWillBeDestroyed, WebAudio.audioNodeCreated, WebAudio.audioNodeWillBeDestroyed, WebAudio.audioParamCreated, WebAudio.audioParamWillBeDestroyed, WebAudio.nodesConnected, WebAudio.nodesDisconnected, WebAudio.nodeParamConnected, WebAudio.nodeParamDisconnected, WebAuthn.credentialAdded, WebAuthn.credentialAsserted, Media.playerPropertiesChanged, Media.playerEventsAdded, Media.playerMessagesLogged, Media.playerErrorsRaised, Media.playersCreated, DeviceAccess.deviceRequestPrompted, Preload.ruleSetUpdated, Preload.ruleSetRemoved, Preload.prerenderAttemptCompleted, Preload.preloadEnabledStateUpdated, Preload.prefetchStatusUpdated, Preload.prerenderStatusUpdated, Preload.preloadingAttemptSourcesUpdated, FedCm.dialogShown, Console.messageAdded, Console.messageRepeatCountUpdated, Console.messagesCleared, Console.heapSnapshot, Debugger.breakpointResolved, Debugger.paused, Debugger.resumed, Debugger.scriptFailedToParse, Debugger.scriptParsed, Debugger.globalObjectCleared, Debugger.didSampleProbe, Debugger.playBreakpointActionSound, HeapProfiler.addHeapSnapshotChunk, HeapProfiler.heapStatsUpdate, HeapProfiler.lastSeenObjectId, HeapProfiler.reportHeapSnapshotProgress, HeapProfiler.resetProfiles, Profiler.consoleProfileFinished, Profiler.consoleProfileStarted, Profiler.preciseCoverageDeltaUpdate, Runtime.bindingCalled, Runtime.consoleAPICalled, Runtime.exceptionRevoked, Runtime.exceptionThrown, Runtime.executionContextCreated, Runtime.executionContextDestroyed, Runtime.executionContextsCleared, Runtime.inspectRequested, Canvas.canvasAdded, Canvas.canvasRemoved, Canvas.canvasSizeChanged, Canvas.canvasMemoryChanged, Canvas.extensionEnabled, Canvas.clientNodesChanged, Canvas.recordingStarted, Canvas.recordingProgress, Canvas.recordingFinished, Canvas.programCreated, Canvas.programDeleted, Heap.garbageCollected, Heap.trackingStart, Heap.trackingComplete, Worker.workerCreated, Worker.workerTerminated, Worker.dispatchMessageFromWorker, CPUProfiler.trackingStart, CPUProfiler.trackingUpdate, CPUProfiler.trackingComplete, Timeline.eventRecorded, Timeline.recordingStarted, Timeline.recordingStopped, Timeline.autoCaptureStarted, ScriptProfiler.trackingStart, ScriptProfiler.trackingUpdate, ScriptProfiler.trackingComplete, ApplicationCache.applicationCacheStatusUpdated, ApplicationCache.networkStateUpdated]
EventList: List[EventTypes] = [Accessibility.loadComplete, Accessibility.nodesUpdated, Animation.animationCanceled, Animation.animationCreated, Animation.animationStarted, Animation.nameChanged, Animation.effectChanged, Animation.targetChanged, Animation.animationDestroyed, Animation.trackingStart, Animation.trackingUpdate, Animation.trackingComplete, Audits.issueAdded, Autofill.addressFormFilled, BackgroundService.recordingStateChanged, BackgroundService.backgroundServiceEventReceived, Browser.downloadWillBegin, Browser.downloadProgress, Browser.extensionsEnabled, Browser.extensionsDisabled, CSS.fontsUpdated, CSS.mediaQueryResultChanged, CSS.styleSheetAdded, CSS.styleSheetChanged, CSS.styleSheetRemoved, CSS.nodeLayoutFlagsChanged, Cast.sinksUpdated, Cast.issueUpdated, DOM.attributeModified, DOM.attributeRemoved, DOM.characterDataModified, DOM.childNodeCountUpdated, DOM.childNodeInserted, DOM.childNodeRemoved, DOM.distributedNodesUpdated, DOM.documentUpdated, DOM.inlineStyleInvalidated, DOM.pseudoElementAdded, DOM.topLayerElementsUpdated, DOM.pseudoElementRemoved, DOM.setChildNodes, DOM.shadowRootPopped, DOM.shadowRootPushed, DOM.inspect, DOM.willDestroyDOMNode, DOM.customElementStateChanged, DOM.didAddEventListener, DOM.willRemoveEventListener, DOM.didFireEvent, DOM.powerEfficientPlaybackStateChanged, DOMStorage.domStorageItemAdded, DOMStorage.domStorageItemRemoved, DOMStorage.domStorageItemUpdated, DOMStorage.domStorageItemsCleared, Database.addDatabase, Emulation.virtualTimeBudgetExpired, Input.dragIntercepted, Inspector.detached, Inspector.targetCrashed, Inspector.targetReloadedAfterCrash, Inspector.evaluateForTestInFrontend, Inspector.inspect, LayerTree.layerPainted, LayerTree.layerTreeDidChange, Log.entryAdded, Memory.memoryPressure, Memory.trackingStart, Memory.trackingUpdate, Memory.trackingComplete, Network.dataReceived, Network.eventSourceMessageReceived, Network.loadingFailed, Network.loadingFinished, Network.requestIntercepted, Network.requestServedFromCache, Network.requestWillBeSent, Network.resourceChangedPriority, Network.signedExchangeReceived, Network.responseReceived, Network.webSocketClosed, Network.webSocketCreated, Network.webSocketFrameError, Network.webSocketFrameReceived, Network.webSocketFrameSent, Network.webSocketHandshakeResponseReceived, Network.webSocketWillSendHandshakeRequest, Network.webTransportCreated, Network.webTransportConnectionEstablished, Network.webTransportClosed, Network.requestWillBeSentExtraInfo, Network.responseReceivedExtraInfo, Network.trustTokenOperationDone, Network.subresourceWebBundleMetadataReceived, Network.subresourceWebBundleMetadataError, Network.subresourceWebBundleInnerResponseParsed, Network.subresourceWebBundleInnerResponseError, Network.reportingApiReportAdded, Network.reportingApiReportUpdated, Network.reportingApiEndpointsChangedForOrigin, Network.requestServedFromMemoryCache, Network.responseIntercepted, Overlay.inspectNodeRequested, Overlay.nodeHighlightRequested, Overlay.screenshotRequested, Overlay.inspectModeCanceled, Page.domContentEventFired, Page.fileChooserOpened, Page.frameAttached, Page.frameClearedScheduledNavigation, Page.frameDetached, Page.frameNavigated, Page.documentOpened, Page.frameResized, Page.frameRequestedNavigation, Page.frameScheduledNavigation, Page.frameStartedLoading, Page.frameStoppedLoading, Page.downloadWillBegin, Page.downloadProgress, Page.interstitialHidden, Page.interstitialShown, Page.javascriptDialogClosed, Page.javascriptDialogOpening, Page.lifecycleEvent, Page.backForwardCacheNotUsed, Page.loadEventFired, Page.navigatedWithinDocument, Page.screencastFrame, Page.screencastVisibilityChanged, Page.windowOpen, Page.compilationCacheProduced, Page.defaultUserPreferencesDidChange, Performance.metrics, PerformanceTimeline.timelineEventAdded, Security.certificateError, Security.visibleSecurityStateChanged, Security.securityStateChanged, ServiceWorker.workerErrorReported, ServiceWorker.workerRegistrationUpdated, ServiceWorker.workerVersionUpdated, Storage.cacheStorageContentUpdated, Storage.cacheStorageListUpdated, Storage.indexedDBContentUpdated, Storage.indexedDBListUpdated, Storage.interestGroupAccessed, Storage.sharedStorageAccessed, Storage.storageBucketCreatedOrUpdated, Storage.storageBucketDeleted, Storage.attributionReportingSourceRegistered, Target.attachedToTarget, Target.detachedFromTarget, Target.receivedMessageFromTarget, Target.targetCreated, Target.targetDestroyed, Target.targetCrashed, Target.targetInfoChanged, Target.didCommitProvisionalTarget, Target.dispatchMessageFromTarget, Tethering.accepted, Tracing.bufferUsage, Tracing.dataCollected, Tracing.tracingComplete, Fetch.requestPaused, Fetch.authRequired, WebAudio.contextCreated, WebAudio.contextWillBeDestroyed, WebAudio.contextChanged, WebAudio.audioListenerCreated, WebAudio.audioListenerWillBeDestroyed, WebAudio.audioNodeCreated, WebAudio.audioNodeWillBeDestroyed, WebAudio.audioParamCreated, WebAudio.audioParamWillBeDestroyed, WebAudio.nodesConnected, WebAudio.nodesDisconnected, WebAudio.nodeParamConnected, WebAudio.nodeParamDisconnected, WebAuthn.credentialAdded, WebAuthn.credentialAsserted, Media.playerPropertiesChanged, Media.playerEventsAdded, Media.playerMessagesLogged, Media.playerErrorsRaised, Media.playersCreated, DeviceAccess.deviceRequestPrompted, Preload.ruleSetUpdated, Preload.ruleSetRemoved, Preload.prerenderAttemptCompleted, Preload.preloadEnabledStateUpdated, Preload.prefetchStatusUpdated, Preload.prerenderStatusUpdated, Preload.preloadingAttemptSourcesUpdated, FedCm.dialogShown, Console.messageAdded, Console.messageRepeatCountUpdated, Console.messagesCleared, Console.heapSnapshot, Debugger.breakpointResolved, Debugger.paused, Debugger.resumed, Debugger.scriptFailedToParse, Debugger.scriptParsed, Debugger.globalObjectCleared, Debugger.didSampleProbe, Debugger.playBreakpointActionSound, HeapProfiler.addHeapSnapshotChunk, HeapProfiler.heapStatsUpdate, HeapProfiler.lastSeenObjectId, HeapProfiler.reportHeapSnapshotProgress, HeapProfiler.resetProfiles, Profiler.consoleProfileFinished, Profiler.consoleProfileStarted, Profiler.preciseCoverageDeltaUpdate, Runtime.bindingCalled, Runtime.consoleAPICalled, Runtime.exceptionRevoked, Runtime.exceptionThrown, Runtime.executionContextCreated, Runtime.executionContextDestroyed, Runtime.executionContextsCleared, Runtime.inspectRequested, Canvas.canvasAdded, Canvas.canvasRemoved, Canvas.canvasSizeChanged, Canvas.canvasMemoryChanged, Canvas.extensionEnabled, Canvas.clientNodesChanged, Canvas.recordingStarted, Canvas.recordingProgress, Canvas.recordingFinished, Canvas.programCreated, Canvas.programDeleted, Heap.garbageCollected, Heap.trackingStart, Heap.trackingComplete, Worker.workerCreated, Worker.workerTerminated, Worker.dispatchMessageFromWorker, CPUProfiler.trackingStart, CPUProfiler.trackingUpdate, CPUProfiler.trackingComplete, Timeline.eventRecorded, Timeline.recordingStarted, Timeline.recordingStopped, Timeline.autoCaptureStarted, ScriptProfiler.trackingStart, ScriptProfiler.trackingUpdate, ScriptProfiler.trackingComplete, ApplicationCache.applicationCacheStatusUpdated, ApplicationCache.networkStateUpdated]
EventMap = {event.__name__: event for event in EventList }

def create_event(event_name, params):
    if event_name in EventMap:
        return EventMap[event_name](event_name, params)
    return BaseEvent(event_name, params)
