	var __wxAppData = __wxAppData || {}; 	var __wxRoute = __wxRoute || ""; 	var __wxRouteBegin = __wxRouteBegin || ""; 	var __wxAppCode__ = __wxAppCode__ || {};	var global = global || {};	var __WXML_GLOBAL__=__WXML_GLOBAL__ || {};	var __wxAppCurrentFile__=__wxAppCurrentFile__||""; 	var Component = Component || function(){};	var definePlugin = definePlugin || function(){};	var requirePlugin = requirePlugin || function(){};	var Behavior = Behavior || function(){};	var __vd_version_info__ = __vd_version_info__ || {};
	/*v0.5vv_20211229_syb_scopedata*/global.__wcc_version__='v0.5vv_20211229_syb_scopedata';global.__wcc_version_info__={"customComponents":true,"fixZeroRpx":true,"propValueDeepCopy":false};
var $gwxc
var $gaic={}
$gwx=function(path,global){
if(typeof global === 'undefined') global={};if(typeof __WXML_GLOBAL__ === 'undefined') {__WXML_GLOBAL__={};
}__WXML_GLOBAL__.modules = __WXML_GLOBAL__.modules || {};
function _(a,b){if(typeof(b)!='undefined')a.children.push(b);}
function _v(k){if(typeof(k)!='undefined')return {tag:'virtual','wxKey':k,children:[]};return {tag:'virtual',children:[]};}
function _n(tag){$gwxc++;if($gwxc>=16000){throw 'Dom limit exceeded, please check if there\'s any mistake you\'ve made.'};return {tag:'wx-'+tag,attr:{},children:[],n:[],raw:{},generics:{}}}
function _p(a,b){b&&a.properities.push(b);}
function _s(scope,env,key){return typeof(scope[key])!='undefined'?scope[key]:env[key]}
function _wp(m){console.warn("WXMLRT_$gwx:"+m)}
function _wl(tname,prefix){_wp(prefix+':-1:-1:-1: Template `' + tname + '` is being called recursively, will be stop.')}
$gwn=console.warn;
$gwl=console.log;
function $gwh()
{
function x()
{
}
x.prototype = 
{
hn: function( obj, all )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && ( all || obj.__wxspec__ !== 'm' || this.hn(obj.__value__) === 'h' ) ? "h" : "n";
}
return "n";
},
nh: function( obj, special )
{
return { __value__: obj, __wxspec__: special ? special : true }
},
rv: function( obj )
{
return this.hn(obj,true)==='n'?obj:this.rv(obj.__value__);
},
hm: function( obj )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && (obj.__wxspec__ === 'm' || this.hm(obj.__value__) );
}
return false;
}
}
return new x;
}
wh=$gwh();
function $gstack(s){
var tmp=s.split('\n '+' '+' '+' ');
for(var i=0;i<tmp.length;++i){
if(0==i) continue;
if(")"===tmp[i][tmp[i].length-1])
tmp[i]=tmp[i].replace(/\s\(.*\)$/,"");
else
tmp[i]="at anonymous function";
}
return tmp.join('\n '+' '+' '+' ');
}
function $gwrt( should_pass_type_info )
{
function ArithmeticEv( ops, e, s, g, o )
{
var _f = false;
var rop = ops[0][1];
var _a,_b,_c,_d, _aa, _bb;
switch( rop )
{
case '?:':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : rev( ops[3], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '&&':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : wh.rv( _a );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '||':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? wh.rv(_a) : rev( ops[2], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '+':
case '*':
case '/':
case '%':
case '|':
case '^':
case '&':
case '===':
case '==':
case '!=':
case '!==':
case '>=':
case '<=':
case '>':
case '<':
case '<<':
case '>>':
_a = rev( ops[1], e, s, g, o, _f );
_b = rev( ops[2], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
switch( rop )
{
case '+':
_d = wh.rv( _a ) + wh.rv( _b );
break;
case '*':
_d = wh.rv( _a ) * wh.rv( _b );
break;
case '/':
_d = wh.rv( _a ) / wh.rv( _b );
break;
case '%':
_d = wh.rv( _a ) % wh.rv( _b );
break;
case '|':
_d = wh.rv( _a ) | wh.rv( _b );
break;
case '^':
_d = wh.rv( _a ) ^ wh.rv( _b );
break;
case '&':
_d = wh.rv( _a ) & wh.rv( _b );
break;
case '===':
_d = wh.rv( _a ) === wh.rv( _b );
break;
case '==':
_d = wh.rv( _a ) == wh.rv( _b );
break;
case '!=':
_d = wh.rv( _a ) != wh.rv( _b );
break;
case '!==':
_d = wh.rv( _a ) !== wh.rv( _b );
break;
case '>=':
_d = wh.rv( _a ) >= wh.rv( _b );
break;
case '<=':
_d = wh.rv( _a ) <= wh.rv( _b );
break;
case '>':
_d = wh.rv( _a ) > wh.rv( _b );
break;
case '<':
_d = wh.rv( _a ) < wh.rv( _b );
break;
case '<<':
_d = wh.rv( _a ) << wh.rv( _b );
break;
case '>>':
_d = wh.rv( _a ) >> wh.rv( _b );
break;
default:
break;
}
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '-':
_a = ops.length === 3 ? rev( ops[1], e, s, g, o, _f ) : 0;
_b = ops.length === 3 ? rev( ops[2], e, s, g, o, _f ) : rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
_d = _c ? wh.rv( _a ) - wh.rv( _b ) : _a - _b;
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '!':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = !wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
case '~':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = ~wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
default:
$gwn('unrecognized op' + rop );
}
}
function rev( ops, e, s, g, o, newap )
{
var op = ops[0];
var _f = false;
if ( typeof newap !== "undefined" ) o.ap = newap;
if( typeof(op)==='object' )
{
var vop=op[0];
var _a, _aa, _b, _bb, _c, _d, _s, _e, _ta, _tb, _td;
switch(vop)
{
case 2:
return ArithmeticEv(ops,e,s,g,o);
break;
case 4: 
return rev( ops[1], e, s, g, o, _f );
break;
case 5: 
switch( ops.length )
{
case 2: 
_a = rev( ops[1],e,s,g,o,_f );
return should_pass_type_info?[_a]:[wh.rv(_a)];
return [_a];
break;
case 1: 
return [];
break;
default:
_a = rev( ops[1],e,s,g,o,_f );
_b = rev( ops[2],e,s,g,o,_f );
_a.push( 
should_pass_type_info ?
_b :
wh.rv( _b )
);
return _a;
break;
}
break;
case 6:
_a = rev(ops[1],e,s,g,o);
var ap = o.ap;
_ta = wh.hn(_a)==='h';
_aa = _ta ? wh.rv(_a) : _a;
o.is_affected |= _ta;
if( should_pass_type_info )
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return _ta ? wh.nh(undefined, 'e') : undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return (_ta || _tb) ? wh.nh(undefined, 'e') : undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return (_ta || _tb) ? (_td ? _d : wh.nh(_d, 'e')) : _d;
}
else
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return _td ? wh.rv(_d) : _d;
}
case 7: 
switch(ops[1][0])
{
case 11:
o.is_affected |= wh.hn(g)==='h';
return g;
case 3:
_s = wh.rv( s );
_e = wh.rv( e );
_b = ops[1][1];
if (g && g.f && g.f.hasOwnProperty(_b) )
{
_a = g.f;
o.ap = true;
}
else
{
_a = _s && _s.hasOwnProperty(_b) ? 
s : (_e && _e.hasOwnProperty(_b) ? e : undefined );
}
if( should_pass_type_info )
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
_d = _ta && !_td ? wh.nh(_d,'e') : _d;
return _d;
}
}
else
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
return wh.rv(_d);
}
}
return undefined;
}
break;
case 8: 
_a = {};
_a[ops[1]] = rev(ops[2],e,s,g,o,_f);
return _a;
break;
case 9: 
_a = rev(ops[1],e,s,g,o,_f);
_b = rev(ops[2],e,s,g,o,_f);
function merge( _a, _b, _ow )
{
var ka, _bbk;
_ta = wh.hn(_a)==='h';
_tb = wh.hn(_b)==='h';
_aa = wh.rv(_a);
_bb = wh.rv(_b);
for(var k in _bb)
{
if ( _ow || !_aa.hasOwnProperty(k) )
{
_aa[k] = should_pass_type_info ? (_tb ? wh.nh(_bb[k],'e') : _bb[k]) : wh.rv(_bb[k]);
}
}
return _a;
}
var _c = _a
var _ow = true
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
_a = _b
_b = _c
_ow = false
}
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
var _r = {}
return merge( merge( _r, _a, _ow ), _b, _ow );
}
else
return merge( _a, _b, _ow );
break;
case 10:
_a = rev(ops[1],e,s,g,o,_f);
_a = should_pass_type_info ? _a : wh.rv( _a );
return _a ;
break;
case 12:
var _r;
_a = rev(ops[1],e,s,g,o);
if ( !o.ap )
{
return should_pass_type_info && wh.hn(_a)==='h' ? wh.nh( _r, 'f' ) : _r;
}
var ap = o.ap;
_b = rev(ops[2],e,s,g,o,_f);
o.ap = ap;
_ta = wh.hn(_a)==='h';
_tb = _ca(_b);
_aa = wh.rv(_a);	
_bb = wh.rv(_b); snap_bb=$gdc(_bb,"nv_");
try{
_r = typeof _aa === "function" ? $gdc(_aa.apply(null, snap_bb)) : undefined;
} catch (e){
e.message = e.message.replace(/nv_/g,"");
e.stack = e.stack.substring(0,e.stack.indexOf("\n", e.stack.lastIndexOf("at nv_")));
e.stack = e.stack.replace(/\snv_/g," "); 
e.stack = $gstack(e.stack);	
if(g.debugInfo)
{
e.stack += "\n "+" "+" "+" at "+g.debugInfo[0]+":"+g.debugInfo[1]+":"+g.debugInfo[2];
console.error(e);
}
_r = undefined;
}
return should_pass_type_info && (_tb || _ta) ? wh.nh( _r, 'f' ) : _r;
}
}
else
{
if( op === 3 || op === 1) return ops[1];
else if( op === 11 ) 
{
var _a='';
for( var i = 1 ; i < ops.length ; i++ )
{
var xp = wh.rv(rev(ops[i],e,s,g,o,_f));
_a += typeof(xp) === 'undefined' ? '' : xp;
}
return _a;
}
}
}
function wrapper( ops, e, s, g, o, newap )
{
if( ops[0] == '11182016' )
{
g.debugInfo = ops[2];
return rev( ops[1], e, s, g, o, newap );
}
else
{
g.debugInfo = null;
return rev( ops, e, s, g, o, newap );
}
}
return wrapper;
}
gra=$gwrt(true); 
grb=$gwrt(false); 
function TestTest( expr, ops, e,s,g, expect_a, expect_b, expect_affected )
{
{
var o = {is_affected:false};
var a = gra( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_a )
|| o.is_affected != expect_affected )
{
console.warn( "A. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_a ) + ", " + expect_affected + " is expected" );
}
}
{
var o = {is_affected:false};
var a = grb( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_b )
|| o.is_affected != expect_affected )
{
console.warn( "B. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_b ) + ", " + expect_affected + " is expected" );
}
}
}

function wfor( to_iter, func, env, _s, global, father, itemname, indexname, keyname )
{
var _n = wh.hn( to_iter ) === 'n'; 
var scope = wh.rv( _s ); 
var has_old_item = scope.hasOwnProperty(itemname);
var has_old_index = scope.hasOwnProperty(indexname);
var old_item = scope[itemname];
var old_index = scope[indexname];
var full = Object.prototype.toString.call(wh.rv(to_iter));
var type = full[8]; 
if( type === 'N' && full[10] === 'l' ) type = 'X'; 
var _y;
if( _n )
{
if( type === 'A' ) 
{
var r_iter_item;
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
r_iter_item = wh.rv(to_iter[i]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i = 0;
var r_iter_item;
for( var k in to_iter )
{
scope[itemname] = to_iter[k];
scope[indexname] = _n ? k : wh.nh(k, 'h');
r_iter_item = wh.rv(to_iter[k]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env,scope,_y,global );
i++;
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env,scope,_y,global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < to_iter ; i++ )
{
scope[itemname] = i;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
else
{
var r_to_iter = wh.rv(to_iter);
var r_iter_item, iter_item;
if( type === 'A' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = r_to_iter[i];
iter_item = wh.hn(iter_item)==='n' ? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item
scope[indexname] = _n ? i : wh.nh(i, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i=0;
for( var k in r_to_iter )
{
iter_item = r_to_iter[k];
iter_item = wh.hn(iter_item)==='n'? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item;
scope[indexname] = _n ? k : wh.nh(k, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y=_v(key);
_(father,_y);
func( env, scope, _y, global );
i++
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = wh.nh(r_to_iter[i],'h');
scope[itemname] = iter_item;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < r_to_iter ; i++ )
{
iter_item = wh.nh(i,'h');
scope[itemname] = iter_item;
scope[indexname]= _n ? i : wh.nh(i,'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
if(has_old_item)
{
scope[itemname]=old_item;
}
else
{
delete scope[itemname];
}
if(has_old_index)
{
scope[indexname]=old_index;
}
else
{
delete scope[indexname];
}
}

function _ca(o)
{ 
if ( wh.hn(o) == 'h' ) return true;
if ( typeof o !== "object" ) return false;
for(var i in o){ 
if ( o.hasOwnProperty(i) ){
if (_ca(o[i])) return true;
}
}
return false;
}
function _da( node, attrname, opindex, raw, o )
{
var isaffected = false;
var value = $gdc( raw, "", 2 );
if ( o.ap && value && value.constructor===Function ) 
{
attrname = "$wxs:" + attrname; 
node.attr["$gdc"] = $gdc;
}
if ( o.is_affected || _ca(raw) ) 
{
node.n.push( attrname );
node.raw[attrname] = raw;
}
node.attr[attrname] = value;
}
function _r( node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _rz( z, node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _o( opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _oz( z, opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _1( opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _1z( z, opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _2( opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1( opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}
function _2z( z, opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1z( z, opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}


function _m(tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_r(tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}
function _mz(z,tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_rz(z, tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}

var nf_init=function(){
if(typeof __WXML_GLOBAL__==="undefined"||undefined===__WXML_GLOBAL__.wxs_nf_init){
nf_init_Object();nf_init_Function();nf_init_Array();nf_init_String();nf_init_Boolean();nf_init_Number();nf_init_Math();nf_init_Date();nf_init_RegExp();
}
if(typeof __WXML_GLOBAL__!=="undefined") __WXML_GLOBAL__.wxs_nf_init=true;
};
var nf_init_Object=function(){
Object.defineProperty(Object.prototype,"nv_constructor",{writable:true,value:"Object"})
Object.defineProperty(Object.prototype,"nv_toString",{writable:true,value:function(){return "[object Object]"}})
}
var nf_init_Function=function(){
Object.defineProperty(Function.prototype,"nv_constructor",{writable:true,value:"Function"})
Object.defineProperty(Function.prototype,"nv_length",{get:function(){return this.length;},set:function(){}});
Object.defineProperty(Function.prototype,"nv_toString",{writable:true,value:function(){return "[function Function]"}})
}
var nf_init_Array=function(){
Object.defineProperty(Array.prototype,"nv_toString",{writable:true,value:function(){return this.nv_join();}})
Object.defineProperty(Array.prototype,"nv_join",{writable:true,value:function(s){
s=undefined==s?',':s;
var r="";
for(var i=0;i<this.length;++i){
if(0!=i) r+=s;
if(null==this[i]||undefined==this[i]) r+='';	
else if(typeof this[i]=='function') r+=this[i].nv_toString();
else if(typeof this[i]=='object'&&this[i].nv_constructor==="Array") r+=this[i].nv_join();
else r+=this[i].toString();
}
return r;
}})
Object.defineProperty(Array.prototype,"nv_constructor",{writable:true,value:"Array"})
Object.defineProperty(Array.prototype,"nv_concat",{writable:true,value:Array.prototype.concat})
Object.defineProperty(Array.prototype,"nv_pop",{writable:true,value:Array.prototype.pop})
Object.defineProperty(Array.prototype,"nv_push",{writable:true,value:Array.prototype.push})
Object.defineProperty(Array.prototype,"nv_reverse",{writable:true,value:Array.prototype.reverse})
Object.defineProperty(Array.prototype,"nv_shift",{writable:true,value:Array.prototype.shift})
Object.defineProperty(Array.prototype,"nv_slice",{writable:true,value:Array.prototype.slice})
Object.defineProperty(Array.prototype,"nv_sort",{writable:true,value:Array.prototype.sort})
Object.defineProperty(Array.prototype,"nv_splice",{writable:true,value:Array.prototype.splice})
Object.defineProperty(Array.prototype,"nv_unshift",{writable:true,value:Array.prototype.unshift})
Object.defineProperty(Array.prototype,"nv_indexOf",{writable:true,value:Array.prototype.indexOf})
Object.defineProperty(Array.prototype,"nv_lastIndexOf",{writable:true,value:Array.prototype.lastIndexOf})
Object.defineProperty(Array.prototype,"nv_every",{writable:true,value:Array.prototype.every})
Object.defineProperty(Array.prototype,"nv_some",{writable:true,value:Array.prototype.some})
Object.defineProperty(Array.prototype,"nv_forEach",{writable:true,value:Array.prototype.forEach})
Object.defineProperty(Array.prototype,"nv_map",{writable:true,value:Array.prototype.map})
Object.defineProperty(Array.prototype,"nv_filter",{writable:true,value:Array.prototype.filter})
Object.defineProperty(Array.prototype,"nv_reduce",{writable:true,value:Array.prototype.reduce})
Object.defineProperty(Array.prototype,"nv_reduceRight",{writable:true,value:Array.prototype.reduceRight})
Object.defineProperty(Array.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_String=function(){
Object.defineProperty(String.prototype,"nv_constructor",{writable:true,value:"String"})
Object.defineProperty(String.prototype,"nv_toString",{writable:true,value:String.prototype.toString})
Object.defineProperty(String.prototype,"nv_valueOf",{writable:true,value:String.prototype.valueOf})
Object.defineProperty(String.prototype,"nv_charAt",{writable:true,value:String.prototype.charAt})
Object.defineProperty(String.prototype,"nv_charCodeAt",{writable:true,value:String.prototype.charCodeAt})
Object.defineProperty(String.prototype,"nv_concat",{writable:true,value:String.prototype.concat})
Object.defineProperty(String.prototype,"nv_indexOf",{writable:true,value:String.prototype.indexOf})
Object.defineProperty(String.prototype,"nv_lastIndexOf",{writable:true,value:String.prototype.lastIndexOf})
Object.defineProperty(String.prototype,"nv_localeCompare",{writable:true,value:String.prototype.localeCompare})
Object.defineProperty(String.prototype,"nv_match",{writable:true,value:String.prototype.match})
Object.defineProperty(String.prototype,"nv_replace",{writable:true,value:String.prototype.replace})
Object.defineProperty(String.prototype,"nv_search",{writable:true,value:String.prototype.search})
Object.defineProperty(String.prototype,"nv_slice",{writable:true,value:String.prototype.slice})
Object.defineProperty(String.prototype,"nv_split",{writable:true,value:String.prototype.split})
Object.defineProperty(String.prototype,"nv_substring",{writable:true,value:String.prototype.substring})
Object.defineProperty(String.prototype,"nv_toLowerCase",{writable:true,value:String.prototype.toLowerCase})
Object.defineProperty(String.prototype,"nv_toLocaleLowerCase",{writable:true,value:String.prototype.toLocaleLowerCase})
Object.defineProperty(String.prototype,"nv_toUpperCase",{writable:true,value:String.prototype.toUpperCase})
Object.defineProperty(String.prototype,"nv_toLocaleUpperCase",{writable:true,value:String.prototype.toLocaleUpperCase})
Object.defineProperty(String.prototype,"nv_trim",{writable:true,value:String.prototype.trim})
Object.defineProperty(String.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_Boolean=function(){
Object.defineProperty(Boolean.prototype,"nv_constructor",{writable:true,value:"Boolean"})
Object.defineProperty(Boolean.prototype,"nv_toString",{writable:true,value:Boolean.prototype.toString})
Object.defineProperty(Boolean.prototype,"nv_valueOf",{writable:true,value:Boolean.prototype.valueOf})
}
var nf_init_Number=function(){
Object.defineProperty(Number,"nv_MAX_VALUE",{writable:false,value:Number.MAX_VALUE})
Object.defineProperty(Number,"nv_MIN_VALUE",{writable:false,value:Number.MIN_VALUE})
Object.defineProperty(Number,"nv_NEGATIVE_INFINITY",{writable:false,value:Number.NEGATIVE_INFINITY})
Object.defineProperty(Number,"nv_POSITIVE_INFINITY",{writable:false,value:Number.POSITIVE_INFINITY})
Object.defineProperty(Number.prototype,"nv_constructor",{writable:true,value:"Number"})
Object.defineProperty(Number.prototype,"nv_toString",{writable:true,value:Number.prototype.toString})
Object.defineProperty(Number.prototype,"nv_toLocaleString",{writable:true,value:Number.prototype.toLocaleString})
Object.defineProperty(Number.prototype,"nv_valueOf",{writable:true,value:Number.prototype.valueOf})
Object.defineProperty(Number.prototype,"nv_toFixed",{writable:true,value:Number.prototype.toFixed})
Object.defineProperty(Number.prototype,"nv_toExponential",{writable:true,value:Number.prototype.toExponential})
Object.defineProperty(Number.prototype,"nv_toPrecision",{writable:true,value:Number.prototype.toPrecision})
}
var nf_init_Math=function(){
Object.defineProperty(Math,"nv_E",{writable:false,value:Math.E})
Object.defineProperty(Math,"nv_LN10",{writable:false,value:Math.LN10})
Object.defineProperty(Math,"nv_LN2",{writable:false,value:Math.LN2})
Object.defineProperty(Math,"nv_LOG2E",{writable:false,value:Math.LOG2E})
Object.defineProperty(Math,"nv_LOG10E",{writable:false,value:Math.LOG10E})
Object.defineProperty(Math,"nv_PI",{writable:false,value:Math.PI})
Object.defineProperty(Math,"nv_SQRT1_2",{writable:false,value:Math.SQRT1_2})
Object.defineProperty(Math,"nv_SQRT2",{writable:false,value:Math.SQRT2})
Object.defineProperty(Math,"nv_abs",{writable:false,value:Math.abs})
Object.defineProperty(Math,"nv_acos",{writable:false,value:Math.acos})
Object.defineProperty(Math,"nv_asin",{writable:false,value:Math.asin})
Object.defineProperty(Math,"nv_atan",{writable:false,value:Math.atan})
Object.defineProperty(Math,"nv_atan2",{writable:false,value:Math.atan2})
Object.defineProperty(Math,"nv_ceil",{writable:false,value:Math.ceil})
Object.defineProperty(Math,"nv_cos",{writable:false,value:Math.cos})
Object.defineProperty(Math,"nv_exp",{writable:false,value:Math.exp})
Object.defineProperty(Math,"nv_floor",{writable:false,value:Math.floor})
Object.defineProperty(Math,"nv_log",{writable:false,value:Math.log})
Object.defineProperty(Math,"nv_max",{writable:false,value:Math.max})
Object.defineProperty(Math,"nv_min",{writable:false,value:Math.min})
Object.defineProperty(Math,"nv_pow",{writable:false,value:Math.pow})
Object.defineProperty(Math,"nv_random",{writable:false,value:Math.random})
Object.defineProperty(Math,"nv_round",{writable:false,value:Math.round})
Object.defineProperty(Math,"nv_sin",{writable:false,value:Math.sin})
Object.defineProperty(Math,"nv_sqrt",{writable:false,value:Math.sqrt})
Object.defineProperty(Math,"nv_tan",{writable:false,value:Math.tan})
}
var nf_init_Date=function(){
Object.defineProperty(Date.prototype,"nv_constructor",{writable:true,value:"Date"})
Object.defineProperty(Date,"nv_parse",{writable:true,value:Date.parse})
Object.defineProperty(Date,"nv_UTC",{writable:true,value:Date.UTC})
Object.defineProperty(Date,"nv_now",{writable:true,value:Date.now})
Object.defineProperty(Date.prototype,"nv_toString",{writable:true,value:Date.prototype.toString})
Object.defineProperty(Date.prototype,"nv_toDateString",{writable:true,value:Date.prototype.toDateString})
Object.defineProperty(Date.prototype,"nv_toTimeString",{writable:true,value:Date.prototype.toTimeString})
Object.defineProperty(Date.prototype,"nv_toLocaleString",{writable:true,value:Date.prototype.toLocaleString})
Object.defineProperty(Date.prototype,"nv_toLocaleDateString",{writable:true,value:Date.prototype.toLocaleDateString})
Object.defineProperty(Date.prototype,"nv_toLocaleTimeString",{writable:true,value:Date.prototype.toLocaleTimeString})
Object.defineProperty(Date.prototype,"nv_valueOf",{writable:true,value:Date.prototype.valueOf})
Object.defineProperty(Date.prototype,"nv_getTime",{writable:true,value:Date.prototype.getTime})
Object.defineProperty(Date.prototype,"nv_getFullYear",{writable:true,value:Date.prototype.getFullYear})
Object.defineProperty(Date.prototype,"nv_getUTCFullYear",{writable:true,value:Date.prototype.getUTCFullYear})
Object.defineProperty(Date.prototype,"nv_getMonth",{writable:true,value:Date.prototype.getMonth})
Object.defineProperty(Date.prototype,"nv_getUTCMonth",{writable:true,value:Date.prototype.getUTCMonth})
Object.defineProperty(Date.prototype,"nv_getDate",{writable:true,value:Date.prototype.getDate})
Object.defineProperty(Date.prototype,"nv_getUTCDate",{writable:true,value:Date.prototype.getUTCDate})
Object.defineProperty(Date.prototype,"nv_getDay",{writable:true,value:Date.prototype.getDay})
Object.defineProperty(Date.prototype,"nv_getUTCDay",{writable:true,value:Date.prototype.getUTCDay})
Object.defineProperty(Date.prototype,"nv_getHours",{writable:true,value:Date.prototype.getHours})
Object.defineProperty(Date.prototype,"nv_getUTCHours",{writable:true,value:Date.prototype.getUTCHours})
Object.defineProperty(Date.prototype,"nv_getMinutes",{writable:true,value:Date.prototype.getMinutes})
Object.defineProperty(Date.prototype,"nv_getUTCMinutes",{writable:true,value:Date.prototype.getUTCMinutes})
Object.defineProperty(Date.prototype,"nv_getSeconds",{writable:true,value:Date.prototype.getSeconds})
Object.defineProperty(Date.prototype,"nv_getUTCSeconds",{writable:true,value:Date.prototype.getUTCSeconds})
Object.defineProperty(Date.prototype,"nv_getMilliseconds",{writable:true,value:Date.prototype.getMilliseconds})
Object.defineProperty(Date.prototype,"nv_getUTCMilliseconds",{writable:true,value:Date.prototype.getUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_getTimezoneOffset",{writable:true,value:Date.prototype.getTimezoneOffset})
Object.defineProperty(Date.prototype,"nv_setTime",{writable:true,value:Date.prototype.setTime})
Object.defineProperty(Date.prototype,"nv_setMilliseconds",{writable:true,value:Date.prototype.setMilliseconds})
Object.defineProperty(Date.prototype,"nv_setUTCMilliseconds",{writable:true,value:Date.prototype.setUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_setSeconds",{writable:true,value:Date.prototype.setSeconds})
Object.defineProperty(Date.prototype,"nv_setUTCSeconds",{writable:true,value:Date.prototype.setUTCSeconds})
Object.defineProperty(Date.prototype,"nv_setMinutes",{writable:true,value:Date.prototype.setMinutes})
Object.defineProperty(Date.prototype,"nv_setUTCMinutes",{writable:true,value:Date.prototype.setUTCMinutes})
Object.defineProperty(Date.prototype,"nv_setHours",{writable:true,value:Date.prototype.setHours})
Object.defineProperty(Date.prototype,"nv_setUTCHours",{writable:true,value:Date.prototype.setUTCHours})
Object.defineProperty(Date.prototype,"nv_setDate",{writable:true,value:Date.prototype.setDate})
Object.defineProperty(Date.prototype,"nv_setUTCDate",{writable:true,value:Date.prototype.setUTCDate})
Object.defineProperty(Date.prototype,"nv_setMonth",{writable:true,value:Date.prototype.setMonth})
Object.defineProperty(Date.prototype,"nv_setUTCMonth",{writable:true,value:Date.prototype.setUTCMonth})
Object.defineProperty(Date.prototype,"nv_setFullYear",{writable:true,value:Date.prototype.setFullYear})
Object.defineProperty(Date.prototype,"nv_setUTCFullYear",{writable:true,value:Date.prototype.setUTCFullYear})
Object.defineProperty(Date.prototype,"nv_toUTCString",{writable:true,value:Date.prototype.toUTCString})
Object.defineProperty(Date.prototype,"nv_toISOString",{writable:true,value:Date.prototype.toISOString})
Object.defineProperty(Date.prototype,"nv_toJSON",{writable:true,value:Date.prototype.toJSON})
}
var nf_init_RegExp=function(){
Object.defineProperty(RegExp.prototype,"nv_constructor",{writable:true,value:"RegExp"})
Object.defineProperty(RegExp.prototype,"nv_exec",{writable:true,value:RegExp.prototype.exec})
Object.defineProperty(RegExp.prototype,"nv_test",{writable:true,value:RegExp.prototype.test})
Object.defineProperty(RegExp.prototype,"nv_toString",{writable:true,value:RegExp.prototype.toString})
Object.defineProperty(RegExp.prototype,"nv_source",{get:function(){return this.source;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_global",{get:function(){return this.global;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_ignoreCase",{get:function(){return this.ignoreCase;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_multiline",{get:function(){return this.multiline;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_lastIndex",{get:function(){return this.lastIndex;},set:function(v){this.lastIndex=v;}});
}
nf_init();
var nv_getDate=function(){var args=Array.prototype.slice.call(arguments);args.unshift(Date);return new(Function.prototype.bind.apply(Date, args));}
var nv_getRegExp=function(){var args=Array.prototype.slice.call(arguments);args.unshift(RegExp);return new(Function.prototype.bind.apply(RegExp, args));}
var nv_console={}
nv_console.nv_log=function(){var res="WXSRT:";for(var i=0;i<arguments.length;++i)res+=arguments[i]+" ";console.log(res);}
var nv_parseInt = parseInt, nv_parseFloat = parseFloat, nv_isNaN = isNaN, nv_isFinite = isFinite, nv_decodeURI = decodeURI, nv_decodeURIComponent = decodeURIComponent, nv_encodeURI = encodeURI, nv_encodeURIComponent = encodeURIComponent;
function $gdc(o,p,r) {
o=wh.rv(o);
if(o===null||o===undefined) return o;
if(typeof o==="string"||typeof o==="boolean"||typeof o==="number") return o;
if(o.constructor===Object){
var copy={};
for(var k in o)
if(Object.prototype.hasOwnProperty.call(o,k))
if(undefined===p) copy[k.substring(3)]=$gdc(o[k],p,r);
else copy[p+k]=$gdc(o[k],p,r);
return copy;
}
if(o.constructor===Array){
var copy=[];
for(var i=0;i<o.length;i++) copy.push($gdc(o[i],p,r));
return copy;
}
if(o.constructor===Date){
var copy=new Date();
copy.setTime(o.getTime());
return copy;
}
if(o.constructor===RegExp){
var f="";
if(o.global) f+="g";
if(o.ignoreCase) f+="i";
if(o.multiline) f+="m";
return (new RegExp(o.source,f));
}
if(r&&typeof o==="function"){
if ( r == 1 ) return $gdc(o(),undefined, 2);
if ( r == 2 ) return o;
}
return null;
}
var nv_JSON={}
nv_JSON.nv_stringify=function(o){
JSON.stringify(o);
return JSON.stringify($gdc(o));
}
nv_JSON.nv_parse=function(o){
if(o===undefined) return undefined;
var t=JSON.parse(o);
return $gdc(t,'nv_');
}

function _af(p, a, r, c){
p.extraAttr = {"t_action": a, "t_rawid": r };
if ( typeof(c) != 'undefined' ) p.extraAttr.t_cid = c;
}

function _ai(i,p,e,me,r,c){var x=_grp(p,e,me);if(x)i.push(x);else{i.push('');_wp(me+':import:'+r+':'+c+': Path `'+p+'` not found from `'+me+'`.')}}
function _grp(p,e,me){if(p[0]!='/'){var mepart=me.split('/');mepart.pop();var ppart=p.split('/');for(var i=0;i<ppart.length;i++){if( ppart[i]=='..')mepart.pop();else if(!ppart[i]||ppart[i]=='.')continue;else mepart.push(ppart[i]);}p=mepart.join('/');}if(me[0]=='.'&&p[0]=='/')p='.'+p;if(e[p])return p;if(e[p+'.wxml'])return p+'.wxml';}
function _gd(p,c,e,d){if(!c)return;if(d[p][c])return d[p][c];for(var x=e[p].i.length-1;x>=0;x--){if(e[p].i[x]&&d[e[p].i[x]][c])return d[e[p].i[x]][c]};for(var x=e[p].ti.length-1;x>=0;x--){var q=_grp(e[p].ti[x],e,p);if(q&&d[q][c])return d[q][c]}var ii=_gapi(e,p);for(var x=0;x<ii.length;x++){if(ii[x]&&d[ii[x]][c])return d[ii[x]][c]}for(var k=e[p].j.length-1;k>=0;k--)if(e[p].j[k]){for(var q=e[e[p].j[k]].ti.length-1;q>=0;q--){var pp=_grp(e[e[p].j[k]].ti[q],e,p);if(pp&&d[pp][c]){return d[pp][c]}}}}
function _gapi(e,p){if(!p)return [];if($gaic[p]){return $gaic[p]};var ret=[],q=[],h=0,t=0,put={},visited={};q.push(p);visited[p]=true;t++;while(h<t){var a=q[h++];for(var i=0;i<e[a].ic.length;i++){var nd=e[a].ic[i];var np=_grp(nd,e,a);if(np&&!visited[np]){visited[np]=true;q.push(np);t++;}}for(var i=0;a!=p&&i<e[a].ti.length;i++){var ni=e[a].ti[i];var nm=_grp(ni,e,a);if(nm&&!put[nm]){put[nm]=true;ret.push(nm);}}}$gaic[p]=ret;return ret;}
var $ixc={};function _ic(p,ent,me,e,s,r,gg){var x=_grp(p,ent,me);ent[me].j.push(x);if(x){if($ixc[x]){_wp('-1:include:-1:-1: `'+p+'` is being included in a loop, will be stop.');return;}$ixc[x]=true;try{ent[x].f(e,s,r,gg)}catch(e){}$ixc[x]=false;}else{_wp(me+':include:-1:-1: Included path `'+p+'` not found from `'+me+'`.')}}
function _w(tn,f,line,c){_wp(f+':template:'+line+':'+c+': Template `'+tn+'` not found.');}function _ev(dom){var changed=false;delete dom.properities;delete dom.n;if(dom.children){do{changed=false;var newch = [];for(var i=0;i<dom.children.length;i++){var ch=dom.children[i];if( ch.tag=='virtual'){changed=true;for(var j=0;ch.children&&j<ch.children.length;j++){newch.push(ch.children[j]);}}else { newch.push(ch); } } dom.children = newch; }while(changed);for(var i=0;i<dom.children.length;i++){_ev(dom.children[i]);}} return dom; }
function _tsd( root )
{
if( root.tag == "wx-wx-scope" ) 
{
root.tag = "virtual";
root.wxCkey = "11";
root['wxScopeData'] = root.attr['wx:scope-data'];
delete root.n;
delete root.raw;
delete root.generics;
delete root.attr;
}
for( var i = 0 ; root.children && i < root.children.length ; i++ )
{
_tsd( root.children[i] );
}
return root;
}

var e_={}
if(typeof(global.entrys)==='undefined')global.entrys={};e_=global.entrys;
var d_={}
if(typeof(global.defines)==='undefined')global.defines={};d_=global.defines;
var f_={}
if(typeof(global.modules)==='undefined')global.modules={};f_=global.modules || {};
var p_={}
__WXML_GLOBAL__.ops_cached = __WXML_GLOBAL__.ops_cached || {}
__WXML_GLOBAL__.ops_set = __WXML_GLOBAL__.ops_set || {};
__WXML_GLOBAL__.ops_init = __WXML_GLOBAL__.ops_init || {};
var z=__WXML_GLOBAL__.ops_set.$gwx || [];
function gz$gwx_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_1)return __WXML_GLOBAL__.ops_cached.$gwx_1
__WXML_GLOBAL__.ops_cached.$gwx_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'custom-content data-v-08b8b056'])
Z([[2,'=='],[[6],[[7],[3,'card']],[3,'display_name']],[1,1]])
Z([[7],[3,'showBelow']])
})(__WXML_GLOBAL__.ops_cached.$gwx_1);return __WXML_GLOBAL__.ops_cached.$gwx_1
}
function gz$gwx_2(){
if( __WXML_GLOBAL__.ops_cached.$gwx_2)return __WXML_GLOBAL__.ops_cached.$gwx_2
__WXML_GLOBAL__.ops_cached.$gwx_2=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[6],[[7],[3,'$root']],[3,'g0']])
Z([3,'index'])
Z([3,'item'])
Z([[6],[[7],[3,'$root']],[3,'l0']])
Z(z[1])
Z([3,'item-info'])
Z([[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'platform']],[1,1]])
Z([[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'platform']],[1,2]])
Z([[6],[[6],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'plan_list']],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'max_index']]],[3,'ratio_ch']])
Z([3,'seizeOrders dis dis-ali'])
Z([[2,'=='],[[6],[[6],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'plan_list']],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'max_index']]],[3,'time_state']],[1,1]])
Z([[2,'=='],[[6],[[6],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'plan_list']],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'max_index']]],[3,'time_state']],[1,3]])
Z([[2,'=='],[[6],[[6],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'plan_list']],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'max_index']]],[3,'rest_stock']],[1,0]])
Z([[2,'!='],[[6],[[6],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'plan_list']],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'max_index']]],[3,'rest_stock']],[1,0]])
})(__WXML_GLOBAL__.ops_cached.$gwx_2);return __WXML_GLOBAL__.ops_cached.$gwx_2
}
function gz$gwx_3(){
if( __WXML_GLOBAL__.ops_cached.$gwx_3)return __WXML_GLOBAL__.ops_cached.$gwx_3
__WXML_GLOBAL__.ops_cached.$gwx_3=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'loadMore'])
Z([[7],[3,'loadLock']])
Z([[7],[3,'noLock']])
Z([3,'no'])
Z([[2,'!=='],[[7],[3,'type']],[1,1]])
Z(z[4])
})(__WXML_GLOBAL__.ops_cached.$gwx_3);return __WXML_GLOBAL__.ops_cached.$gwx_3
}
function gz$gwx_4(){
if( __WXML_GLOBAL__.ops_cached.$gwx_4)return __WXML_GLOBAL__.ops_cached.$gwx_4
__WXML_GLOBAL__.ops_cached.$gwx_4=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[7],[3,'showLogon']])
})(__WXML_GLOBAL__.ops_cached.$gwx_4);return __WXML_GLOBAL__.ops_cached.$gwx_4
}
function gz$gwx_5(){
if( __WXML_GLOBAL__.ops_cached.$gwx_5)return __WXML_GLOBAL__.ops_cached.$gwx_5
__WXML_GLOBAL__.ops_cached.$gwx_5=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'navBarBtn data-v-673b7377'])
Z([[2,'+'],[[2,'+'],[[2,'+'],[[2,'+'],[[2,'+'],[[2,'+'],[[2,'+'],[[2,'+'],[1,'height:'],[[7],[3,'navHeight']]],[1,'px;background:']],[[7],[3,'bgColor']]],[1,';padding-top:']],[[6],[[7],[3,'menuButtonObject']],[3,'top']]],[1,'px;background-image:']],[[7],[3,'bgImg']]],[1,'']])
Z([[2,'!'],[[7],[3,'custom']]])
Z([[7],[3,'backLcok']])
})(__WXML_GLOBAL__.ops_cached.$gwx_5);return __WXML_GLOBAL__.ops_cached.$gwx_5
}
function gz$gwx_6(){
if( __WXML_GLOBAL__.ops_cached.$gwx_6)return __WXML_GLOBAL__.ops_cached.$gwx_6
__WXML_GLOBAL__.ops_cached.$gwx_6=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[7],[3,'isShow']])
})(__WXML_GLOBAL__.ops_cached.$gwx_6);return __WXML_GLOBAL__.ops_cached.$gwx_6
}
function gz$gwx_7(){
if( __WXML_GLOBAL__.ops_cached.$gwx_7)return __WXML_GLOBAL__.ops_cached.$gwx_7
__WXML_GLOBAL__.ops_cached.$gwx_7=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_7);return __WXML_GLOBAL__.ops_cached.$gwx_7
}
function gz$gwx_8(){
if( __WXML_GLOBAL__.ops_cached.$gwx_8)return __WXML_GLOBAL__.ops_cached.$gwx_8
__WXML_GLOBAL__.ops_cached.$gwx_8=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[7],[3,'popupShow']])
Z([3,'content'])
})(__WXML_GLOBAL__.ops_cached.$gwx_8);return __WXML_GLOBAL__.ops_cached.$gwx_8
}
function gz$gwx_9(){
if( __WXML_GLOBAL__.ops_cached.$gwx_9)return __WXML_GLOBAL__.ops_cached.$gwx_9
__WXML_GLOBAL__.ops_cached.$gwx_9=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[2,'>'],[[6],[[7],[3,'$root']],[3,'g0']],[1,1]])
Z([3,'index'])
Z([3,'item'])
Z([[7],[3,'tabList']])
Z(z[1])
Z([3,'__e'])
Z([[4],[[5],[[5],[[5],[[5],[1,'flex-justify-content-y']],[1,'tabitem']],[1,'data-v-5dd584e8']],[[2,'?:'],[[2,'=='],[[7],[3,'current']],[[2,'&&'],[[6],[[7],[3,'item']],[3,'jump_config']],[[6],[[6],[[7],[3,'item']],[3,'jump_config']],[3,'current']]]],[1,'currentItem'],[1,'']]]])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[[5],[1,'handleBack']],[[4],[[5],[[5],[1,'$0']],[1,'$1']]]],[[4],[[5],[[5],[[4],[[5],[[4],[[5],[[5],[[5],[[5],[1,'tabList']],[1,'']],[[7],[3,'index']]],[1,'jump_config.current']]]]]],[[4],[[5],[[4],[[5],[[5],[[5],[1,'tabList']],[1,'']],[[7],[3,'index']]]]]]]]]]]]]]]])
Z([[2,'+'],[[2,'+'],[1,'color: '],[[2,'?:'],[[2,'=='],[[7],[3,'current']],[[2,'&&'],[[6],[[7],[3,'item']],[3,'jump_config']],[[6],[[6],[[7],[3,'item']],[3,'jump_config']],[3,'current']]]],[[2,'||'],[[6],[[7],[3,'item']],[3,'select_text_color']],[[7],[3,'bgColor']]],[[2,'||'],[[6],[[7],[3,'item']],[3,'unselect_text_color']],[1,'#999']]]],[1,';']])
Z([[2,'&&'],[[2,'&&'],[[2,'!'],[[7],[3,'phone']]],[[6],[[7],[3,'item']],[3,'jump_config']]],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'jump_config']],[3,'id']],[1,11]]])
})(__WXML_GLOBAL__.ops_cached.$gwx_9);return __WXML_GLOBAL__.ops_cached.$gwx_9
}
function gz$gwx_10(){
if( __WXML_GLOBAL__.ops_cached.$gwx_10)return __WXML_GLOBAL__.ops_cached.$gwx_10
__WXML_GLOBAL__.ops_cached.$gwx_10=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[2,'>'],[[7],[3,'scrollTop']],[[7],[3,'condition']]])
})(__WXML_GLOBAL__.ops_cached.$gwx_10);return __WXML_GLOBAL__.ops_cached.$gwx_10
}
function gz$gwx_11(){
if( __WXML_GLOBAL__.ops_cached.$gwx_11)return __WXML_GLOBAL__.ops_cached.$gwx_11
__WXML_GLOBAL__.ops_cached.$gwx_11=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'data-v-cc9b9d70'])
Z([[7],[3,'hasSlot']])
Z([3,'__e'])
Z(z[0])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'show']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([[4],[[5],[[5],[[5],[[5],[1,'xp-picker-container']],[1,'data-v-cc9b9d70']],[[2,'?:'],[[7],[3,'pickerVisible']],[1,'xp-picker-container--show'],[1,'']]],[[2,'?:'],[[7],[3,'animation']],[1,'xp-picker-animation'],[1,'']]]])
Z([[2,'==='],[[7],[3,'actionPosition']],[1,'top']])
Z([[2,'==='],[[7],[3,'actionPosition']],[1,'bottom']])
})(__WXML_GLOBAL__.ops_cached.$gwx_11);return __WXML_GLOBAL__.ops_cached.$gwx_11
}
function gz$gwx_12(){
if( __WXML_GLOBAL__.ops_cached.$gwx_12)return __WXML_GLOBAL__.ops_cached.$gwx_12
__WXML_GLOBAL__.ops_cached.$gwx_12=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'page data-v-3099f39f'])
Z([[2,'?:'],[[7],[3,'backLock']],[1,''],[1,'padding-bottom:150rpx']])
Z([[2,'!='],[[7],[3,'qrcode_type']],[[2,'-'],[1,1]]])
Z([3,'__e'])
Z([3,'customer data-v-3099f39f'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'getCode']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'font-size:0;'])
Z([[2,'=='],[[7],[3,'qrcode_type']],[1,2]])
Z([[7],[3,'isShowTips']])
Z([3,'_indexsM'])
Z([3,'_items'])
Z([[6],[[7],[3,'$root']],[3,'l1']])
Z(z[9])
Z([3,'data-v-3099f39f'])
Z([[2,'&&'],[[2,'=='],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'type']],[1,'banner']],[[2,'=='],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'status']],[1,1]]])
Z([[2,'&&'],[[2,'=='],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'type']],[1,'business']],[[2,'=='],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'status']],[1,1]]])
Z([3,'menu data-v-3099f39f'])
Z([[2,'>'],[[6],[[7],[3,'_items']],[3,'g2']],[1,1]])
Z([3,'index'])
Z([3,'itemB'])
Z([[7],[3,'iconList']])
Z(z[18])
Z([3,'indexss'])
Z([3,'itemC'])
Z([[7],[3,'itemB']])
Z(z[22])
Z(z[3])
Z([3,'menu-item data-v-3099f39f'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[[5],[1,'navMenu']],[[4],[[5],[1,'$0']]]],[[4],[[5],[[4],[[5],[[5],[[4],[[5],[[5],[[5],[1,'iconList']],[1,'']],[[7],[3,'index']]]]],[[4],[[5],[[5],[[5],[1,'']],[1,'']],[[7],[3,'indexss']]]]]]]]]]]]]]]])
Z([[2,'?:'],[[2,'!='],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'show_type']],[1,1]],[1,'width:25%'],[1,'width:20%']])
Z([[6],[[7],[3,'itemC']],[3,'icon_name']])
Z(z[18])
Z(z[19])
Z(z[20])
Z(z[18])
Z(z[22])
Z(z[23])
Z(z[24])
Z(z[22])
Z(z[3])
Z(z[27])
Z(z[28])
Z(z[29])
Z(z[30])
Z([[2,'&&'],[[2,'=='],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'type']],[1,'welfareGroup']],[[2,'=='],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'status']],[1,1]]])
Z([[2,'&&'],[[2,'=='],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'type']],[1,'customCard']],[[2,'=='],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'status']],[1,1]]])
Z([3,'__l'])
Z([[6],[[7],[3,'_items']],[3,'$orig']])
Z(z[13])
Z([[2,'+'],[1,'66282c7e-1-'],[[7],[3,'_indexsM']]])
Z([[2,'&&'],[[2,'&&'],[[2,'=='],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'type']],[1,'newUserGift']],[[2,'!='],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'listNum']],[1,0]]],[[2,'=='],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'status']],[1,1]]])
Z([3,'activity_model data-v-3099f39f'])
Z([[2,'&&'],[[2,'=='],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'config']],[3,'new_user_guide']],[1,1]],[[2,'=='],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'new_style']],[1,1]]])
Z([[2,'=='],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'new_style']],[1,1]])
Z(z[13])
Z([[2,'=='],[[6],[[7],[3,'_items']],[3,'g4']],[1,1]])
Z([[2,'=='],[[6],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'img']],[1,0]],[3,'index']],[1,4]])
Z([[7],[3,'autoplay']])
Z(z[3])
Z([1,true])
Z([3,'swiper data-v-3099f39f'])
Z([[4],[[5],[[4],[[5],[[5],[1,'change']],[[4],[[5],[[4],[[5],[[5],[1,'getCurrent']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([[7],[3,'duration']])
Z([1,false])
Z([[7],[3,'intervalGift']])
Z(z[18])
Z([3,'item'])
Z([[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'img']])
Z(z[18])
Z([[2,'=='],[[6],[[7],[3,'item']],[3,'index']],[1,4]])
Z([[2,'=='],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'new_style']],[1,2]])
Z(z[13])
Z([[2,'=='],[[6],[[7],[3,'_items']],[3,'g5']],[1,3]])
Z([3,'threeStyle data-v-3099f39f'])
Z([3,'left data-v-3099f39f'])
Z([[2,'=='],[[6],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'img']],[1,0]],[3,'new_user_guide']],[1,1]])
Z([[2,'=='],[[6],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'img']],[1,0]],[3,'credits_exchange']],[1,1]])
Z([[2,'=='],[[6],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'img']],[1,0]],[3,'topdining']],[1,1]])
Z([[2,'=='],[[6],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'img']],[1,0]],[3,'timed_challenge']],[1,1]])
Z([[2,'=='],[[6],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'img']],[1,0]],[3,'board']],[1,1]])
Z([3,'right data-v-3099f39f'])
Z([3,'one data-v-3099f39f'])
Z([[2,'=='],[[6],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'img']],[1,1]],[3,'new_user_guide']],[1,1]])
Z([[2,'=='],[[6],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'img']],[1,1]],[3,'credits_exchange']],[1,1]])
Z([[2,'=='],[[6],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'img']],[1,1]],[3,'topdining']],[1,1]])
Z([[2,'=='],[[6],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'img']],[1,1]],[3,'timed_challenge']],[1,1]])
Z([[2,'=='],[[6],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'img']],[1,1]],[3,'board']],[1,1]])
Z([3,'two data-v-3099f39f'])
Z([[2,'=='],[[6],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'img']],[1,2]],[3,'new_user_guide']],[1,1]])
Z([[2,'=='],[[6],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'img']],[1,2]],[3,'credits_exchange']],[1,1]])
Z([[2,'=='],[[6],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'img']],[1,2]],[3,'topdining']],[1,1]])
Z([[2,'=='],[[6],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'img']],[1,2]],[3,'timed_challenge']],[1,1]])
Z([[2,'=='],[[6],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'img']],[1,2]],[3,'board']],[1,1]])
Z([3,'moreStayle data-v-3099f39f'])
Z([[2,'=='],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'config']],[3,'new_user_guide']],[1,1]])
Z([[2,'=='],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'config']],[3,'credits_exchange']],[1,1]])
Z([[2,'=='],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'config']],[3,'timed_challenge']],[1,1]])
Z([[2,'=='],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'config']],[3,'topdining']],[1,1]])
Z([[2,'=='],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'config']],[3,'board']],[1,1]])
Z([[2,'&&'],[[2,'=='],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'type']],[1,'inviteReward']],[[2,'=='],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'status']],[1,1]]])
Z([[2,'&&'],[[2,'=='],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'type']],[1,'om_goods']],[[2,'=='],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'status']],[1,1]]])
Z([3,'bwclist data-v-3099f39f'])
Z([[6],[[7],[3,'_items']],[3,'g6']])
Z([3,'screenList dis dis-ali data-v-3099f39f'])
Z([[2,'=='],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'config']],[3,'all_city']],[1,1]])
Z([[2,'=='],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'config']],[3,'meituan']],[1,1]])
Z([[2,'=='],[[6],[[6],[[6],[[7],[3,'_items']],[3,'$orig']],[3,'config']],[3,'ele']],[1,1]])
Z([[6],[[7],[3,'_items']],[3,'g7']])
Z(z[104])
Z([[7],[3,'loadIcon']])
Z(z[46])
Z(z[13])
Z([[7],[3,'list']])
Z([[6],[[7],[3,'from']],[3,'map_lat']])
Z([[6],[[7],[3,'from']],[3,'map_lon']])
Z([[2,'?:'],[[2,'=='],[[6],[[7],[3,'_items']],[3,'g8']],[1,0]],[1,false],[1,true]])
Z([[2,'+'],[1,'66282c7e-2-'],[[7],[3,'_indexsM']]])
Z([[7],[3,'notTips']])
Z(z[117])
Z(z[46])
Z([3,'data-v-3099f39f vue-ref'])
Z([3,'popup'])
Z([3,'true'])
Z([3,'客服二维码'])
Z([3,'66282c7e-3'])
Z([[4],[[5],[1,'content']]])
Z(z[46])
Z(z[120])
Z([3,'sqpopup'])
Z(z[122])
Z([3,'66282c7e-4'])
Z(z[125])
Z([[7],[3,'guide']])
Z([[7],[3,'singleItemPop']])
Z([[7],[3,'tipsPop']])
Z(z[3])
Z([3,'tipsPop data-v-3099f39f'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'jumpUploadTips']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z(z[13])
Z([[2,'||'],[[2,'=='],[[7],[3,'tipsText']],[1,1]],[[2,'=='],[[7],[3,'tipsText']],[1,4]]])
Z([[2,'=='],[[7],[3,'tipsText']],[1,2]])
Z([[2,'=='],[[7],[3,'tipsText']],[1,3]])
Z([[2,'=='],[[7],[3,'tipsText']],[1,5]])
Z([3,'describe data-v-3099f39f'])
Z([[2,'=='],[[7],[3,'tipsText']],[1,1]])
Z(z[140])
Z(z[141])
Z([[2,'=='],[[7],[3,'tipsText']],[1,4]])
Z(z[142])
Z([[2,'!='],[[7],[3,'tipsText']],[1,5]])
Z(z[142])
Z([[7],[3,'OrderRejected']])
})(__WXML_GLOBAL__.ops_cached.$gwx_12);return __WXML_GLOBAL__.ops_cached.$gwx_12
}
function gz$gwx_13(){
if( __WXML_GLOBAL__.ops_cached.$gwx_13)return __WXML_GLOBAL__.ops_cached.$gwx_13
__WXML_GLOBAL__.ops_cached.$gwx_13=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'page data-v-0d5ef94d'])
Z([3,'__e'])
Z([3,'__l'])
Z([3,'data-v-0d5ef94d'])
Z([[7],[3,'current']])
Z([[4],[[5],[[4],[[5],[[5],[1,'^Callback']],[[4],[[5],[[4],[[5],[1,'navTab']]]]]]]]])
Z([[7],[3,'phone']])
Z([[7],[3,'tabList']])
Z([3,'6b3d36ea-1'])
Z([[7],[3,'bwcLock']])
Z(z[2])
Z([3,'data-v-0d5ef94d vue-ref'])
Z([3,'bwc'])
Z([3,'6b3d36ea-2'])
Z([[7],[3,'libraryLock']])
Z(z[2])
Z(z[11])
Z([3,'library'])
Z([3,'6b3d36ea-3'])
Z([[7],[3,'orderlistLock']])
Z(z[2])
Z(z[11])
Z([3,'orderlist'])
Z([[7],[3,'type']])
Z([3,'6b3d36ea-4'])
Z([[7],[3,'myLock']])
Z(z[2])
Z(z[11])
Z([3,'my'])
Z([3,'6b3d36ea-5'])
Z([[7],[3,'welfareLock']])
Z(z[2])
Z(z[11])
Z([3,'welfare'])
Z([3,'6b3d36ea-6'])
Z([[7],[3,'placeOrderLock']])
Z(z[2])
Z(z[11])
Z([3,'placeOrder'])
Z([3,'6b3d36ea-7'])
Z([[7],[3,'pullnewactivityLock']])
Z(z[2])
Z(z[11])
Z([3,'pullnewactivity'])
Z([3,'6b3d36ea-8'])
Z([[7],[3,'myFansLock']])
Z(z[2])
Z(z[11])
Z([3,'myFans'])
Z([3,'6b3d36ea-9'])
Z([[7],[3,'myPosterLock']])
Z(z[2])
Z(z[11])
Z([3,'myPoster'])
Z([3,'6b3d36ea-10'])
Z([[7],[3,'myOrderLock']])
Z(z[2])
Z(z[11])
Z([3,'myOrder'])
Z([1,1])
Z([3,'6b3d36ea-11'])
Z([[7],[3,'teamOrderLock']])
Z(z[2])
Z(z[11])
Z([3,'teamOrder'])
Z([1,2])
Z([3,'6b3d36ea-12'])
Z([[7],[3,'signReachLock']])
Z(z[2])
Z(z[11])
Z([3,'signReach'])
Z([3,'6b3d36ea-13'])
Z([[7],[3,'pointsMallLock']])
Z(z[2])
Z(z[11])
Z([3,'pointsMall'])
Z([3,'6b3d36ea-14'])
Z([[7],[3,'luckDrawLock']])
Z(z[2])
Z(z[11])
Z([3,'luckDraw'])
Z([3,'6b3d36ea-15'])
Z(z[2])
Z(z[11])
Z([3,'notPhone'])
Z([3,'6b3d36ea-16'])
Z([[7],[3,'jumppop']])
})(__WXML_GLOBAL__.ops_cached.$gwx_13);return __WXML_GLOBAL__.ops_cached.$gwx_13
}
function gz$gwx_14(){
if( __WXML_GLOBAL__.ops_cached.$gwx_14)return __WXML_GLOBAL__.ops_cached.$gwx_14
__WXML_GLOBAL__.ops_cached.$gwx_14=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'page data-v-5f01189a'])
Z([3,'__e'])
Z([3,'__l'])
Z([3,'data-v-5f01189a'])
Z([[7],[3,'current']])
Z([[4],[[5],[[4],[[5],[[5],[1,'^Callback']],[[4],[[5],[[4],[[5],[1,'navTab']]]]]]]]])
Z([[7],[3,'phone']])
Z([[7],[3,'tabList']])
Z([3,'fa368f40-1'])
Z([[7],[3,'bwcLock']])
Z(z[2])
Z([3,'data-v-5f01189a vue-ref'])
Z([3,'bwc'])
Z([3,'fa368f40-2'])
Z([[7],[3,'libraryLock']])
Z(z[2])
Z(z[11])
Z([3,'library'])
Z([3,'fa368f40-3'])
Z([[7],[3,'orderlistLock']])
Z(z[2])
Z(z[11])
Z([3,'orderlist'])
Z([[7],[3,'type']])
Z([3,'fa368f40-4'])
Z([[7],[3,'myLock']])
Z(z[2])
Z(z[11])
Z([3,'my'])
Z([3,'fa368f40-5'])
Z([[7],[3,'welfareLock']])
Z(z[2])
Z(z[11])
Z([3,'welfare'])
Z([3,'fa368f40-6'])
Z([[7],[3,'placeOrderLock']])
Z(z[2])
Z(z[11])
Z([3,'placeOrder'])
Z([3,'fa368f40-7'])
Z([[7],[3,'pullnewactivityLock']])
Z(z[2])
Z(z[11])
Z([3,'pullnewactivity'])
Z([3,'fa368f40-8'])
Z([[7],[3,'myFansLock']])
Z(z[2])
Z(z[11])
Z([3,'myFans'])
Z([3,'fa368f40-9'])
Z([[7],[3,'myPosterLock']])
Z(z[2])
Z(z[11])
Z([3,'myPoster'])
Z([3,'fa368f40-10'])
Z([[7],[3,'myOrderLock']])
Z(z[2])
Z(z[11])
Z([3,'myOrder'])
Z([1,1])
Z([3,'fa368f40-11'])
Z([[7],[3,'teamOrderLock']])
Z(z[2])
Z(z[11])
Z([3,'teamOrder'])
Z([1,2])
Z([3,'fa368f40-12'])
Z([[7],[3,'signReachLock']])
Z(z[2])
Z(z[11])
Z([3,'signReach'])
Z([3,'fa368f40-13'])
Z([[7],[3,'pointsMallLock']])
Z(z[2])
Z(z[11])
Z([3,'pointsMall'])
Z([3,'fa368f40-14'])
Z([[7],[3,'luckDrawLock']])
Z(z[2])
Z(z[11])
Z([3,'luckDraw'])
Z([3,'fa368f40-15'])
Z(z[2])
Z(z[11])
Z([3,'notPhone'])
Z([3,'fa368f40-16'])
Z([[7],[3,'jumppop']])
})(__WXML_GLOBAL__.ops_cached.$gwx_14);return __WXML_GLOBAL__.ops_cached.$gwx_14
}
function gz$gwx_15(){
if( __WXML_GLOBAL__.ops_cached.$gwx_15)return __WXML_GLOBAL__.ops_cached.$gwx_15
__WXML_GLOBAL__.ops_cached.$gwx_15=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'pages library data-v-cc2d48a4'])
Z([[2,'?:'],[[7],[3,'backLock']],[1,''],[1,'padding-bottom:150rpx']])
Z([3,'content data-v-cc2d48a4'])
Z([3,'index'])
Z([3,'item'])
Z([[6],[[7],[3,'$root']],[3,'l0']])
Z(z[3])
Z([3,'__e'])
Z([3,'item data-v-cc2d48a4'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'goInfo']],[[4],[[5],[[7],[3,'index']]]]]]]]]]]])
Z([[6],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'material']],[3,'preview_url']])
Z([[2,'=='],[[6],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'material']],[3,'type']],[1,1]])
Z([[2,'&&'],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'material']],[[2,'!='],[[6],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'material']],[3,'download_count']],[1,0]]])
Z([3,'indexs'])
Z([3,'items'])
Z([[6],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'material']],[3,'download_headimgurls']])
Z(z[13])
Z([[2,'<'],[[7],[3,'indexs']],[1,3]])
Z([[7],[3,'notYetData']])
Z([3,'__l'])
Z([3,'data-v-cc2d48a4'])
Z([3,'7e6cf3d1-1'])
Z([[7],[3,'scanCode']])
Z([3,'addbox-content data-v-cc2d48a4'])
Z([3,'content-code data-v-cc2d48a4'])
Z([[7],[3,'douYinImg']])
Z([[2,'!'],[[7],[3,'isEnd']]])
Z([[2,'>'],[[7],[3,'seconed']],[1,0]])
Z([[2,'<'],[[7],[3,'seconed']],[1,0]])
Z([[7],[3,'chooseDouyin']])
})(__WXML_GLOBAL__.ops_cached.$gwx_15);return __WXML_GLOBAL__.ops_cached.$gwx_15
}
function gz$gwx_16(){
if( __WXML_GLOBAL__.ops_cached.$gwx_16)return __WXML_GLOBAL__.ops_cached.$gwx_16
__WXML_GLOBAL__.ops_cached.$gwx_16=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'pages data-v-d4d19b92'])
Z([[2,'?:'],[[7],[3,'backLock']],[1,''],[1,'padding-bottom:150rpx']])
Z([[7],[3,'backLock']])
Z([3,'#fff'])
Z([3,'__l'])
Z([3,'data-v-d4d19b92'])
Z([3,'我要抽奖'])
Z([3,'#000'])
Z([3,'8b8310d6-1'])
Z([3,'turntable data-v-d4d19b92'])
Z([[2,'=='],[[6],[[7],[3,'configInfo']],[3,'carousel_status']],[1,1]])
Z([3,'luckDraw flex data-v-d4d19b92'])
Z([[2,'!'],[[7],[3,'outstandingOrders']]])
Z([3,'__e'])
Z([3,'item cent flex data-v-d4d19b92'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'popupCallback']],[[4],[[5],[1,3]]]]]]]]]]])
Z([3,'padding-top:0;'])
Z([[2,'!'],[[7],[3,'phone']]])
Z(z[4])
Z([3,'data-v-d4d19b92 vue-ref'])
Z([3,'popup1'])
Z([3,'true'])
Z([3,'抽奖结果'])
Z([3,'8b8310d6-2'])
Z([[4],[[5],[1,'content']]])
Z([3,'content1 data-v-d4d19b92'])
Z([3,'content'])
Z([[2,'||'],[[2,'=='],[[6],[[7],[3,'popupCallbackData']],[3,'prize_type']],[1,10]],[[2,'=='],[[6],[[7],[3,'popupCallbackData']],[3,'prize_type']],[1,0]]])
Z([[7],[3,'phone']])
Z(z[17])
Z(z[4])
Z(z[19])
Z([3,'popup6'])
Z([3,'8b8310d6-3'])
Z(z[24])
Z(z[4])
Z(z[19])
Z([3,'popup7'])
Z([1,true])
Z([3,'联系客服'])
Z([3,'8b8310d6-4'])
Z(z[24])
Z(z[4])
Z(z[19])
Z([3,'popup'])
Z(z[21])
Z([3,'温馨提示'])
Z([3,'8b8310d6-5'])
Z(z[24])
})(__WXML_GLOBAL__.ops_cached.$gwx_16);return __WXML_GLOBAL__.ops_cached.$gwx_16
}
function gz$gwx_17(){
if( __WXML_GLOBAL__.ops_cached.$gwx_17)return __WXML_GLOBAL__.ops_cached.$gwx_17
__WXML_GLOBAL__.ops_cached.$gwx_17=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'pages data-v-2007ebea'])
Z([[2,'==='],[[6],[[7],[3,'$root']],[3,'g0']],[1,0]])
Z([3,'__l'])
Z([3,'data-v-2007ebea'])
Z([3,'1e5e9fc3-1'])
})(__WXML_GLOBAL__.ops_cached.$gwx_17);return __WXML_GLOBAL__.ops_cached.$gwx_17
}
function gz$gwx_18(){
if( __WXML_GLOBAL__.ops_cached.$gwx_18)return __WXML_GLOBAL__.ops_cached.$gwx_18
__WXML_GLOBAL__.ops_cached.$gwx_18=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'page data-v-5e34fd2a'])
Z([[2,'?:'],[[7],[3,'backLock']],[1,''],[1,'padding-bottom:150rpx']])
Z([3,'bg data-v-5e34fd2a'])
Z([[7],[3,'user']])
Z([3,'data-v-5e34fd2a'])
Z([[7],[3,'is_show_member_right']])
Z([[6],[[7],[3,'user']],[3,'telephone']])
Z([[6],[[7],[3,'user']],[3,'hm_uid']])
Z([[2,'&&'],[[7],[3,'menuConfig']],[[2,'=='],[[6],[[7],[3,'menuConfig']],[3,'me_score_module_status']],[1,1]]])
Z(z[5])
Z([[7],[3,'nextLevel_name']])
Z([[2,'&&'],[[7],[3,'show_type']],[[6],[[7],[3,'menuConfig']],[3,'invite_friend_reward_background_url']]])
Z([[2,'&&'],[[6],[[7],[3,'menuConfig']],[3,'friend_order_reward_status']],[[6],[[7],[3,'menuConfig']],[3,'friend_order_reward_background_url']]])
Z([[6],[[7],[3,'$root']],[3,'g0']])
Z([3,'index'])
Z([3,'item'])
Z([[6],[[7],[3,'menuConfig']],[3,'lists']])
Z(z[14])
Z(z[4])
Z([[2,'=='],[[6],[[7],[3,'item']],[3,'func_type']],[1,'realname']])
Z([[2,'=='],[[6],[[7],[3,'item']],[3,'func_type']],[1,'customer']])
Z([3,'__e'])
Z([3,'item-list data-v-5e34fd2a'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[[5],[1,'openCustomerQrcode']],[[4],[[5],[1,'$0']]]],[[4],[[5],[[4],[[5],[[4],[[5],[[5],[[5],[1,'menuConfig.lists']],[1,'']],[[7],[3,'index']]]]]]]]]]]]]]]])
Z([[2,'=='],[[6],[[7],[3,'item']],[3,'kefu_qrcode_type']],[1,2]])
Z([[2,'&&'],[[2,'&&'],[[7],[3,'menuConfig']],[[6],[[7],[3,'menuConfig']],[3,'guide']]],[[2,'||'],[[2,'=='],[[6],[[6],[[7],[3,'menuConfig']],[3,'guide']],[3,'status']],[1,1]],[[2,'=='],[[6],[[6],[[7],[3,'menuConfig']],[3,'guide']],[3,'status']],[1,'1']]]])
Z([[7],[3,'isearnest']])
Z([3,'__l'])
Z([3,'data-v-5e34fd2a vue-ref'])
Z([3,'popup'])
Z([3,'true'])
Z([3,'客服二维码'])
Z([3,'4a180d5e-1'])
Z([[4],[[5],[1,'content']]])
Z([[7],[3,'realname']])
Z([[7],[3,'realNameTips']])
Z([[7],[3,'tipsPop']])
Z([[7],[3,'is_perfect']])
Z([[2,'&&'],[[7],[3,'head_img']],[[7],[3,'nick_name']]])
})(__WXML_GLOBAL__.ops_cached.$gwx_18);return __WXML_GLOBAL__.ops_cached.$gwx_18
}
function gz$gwx_19(){
if( __WXML_GLOBAL__.ops_cached.$gwx_19)return __WXML_GLOBAL__.ops_cached.$gwx_19
__WXML_GLOBAL__.ops_cached.$gwx_19=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'pages data-v-16d9cfc4'])
Z([[2,'?:'],[[7],[3,'backLock']],[1,''],[1,'padding-bottom:150rpx']])
Z([[7],[3,'backLock']])
Z([3,'#fff'])
Z([3,'__l'])
Z([3,'data-v-16d9cfc4'])
Z([3,'我的好友'])
Z([3,'#000'])
Z([3,'76fe53fe-1'])
Z([[2,'&&'],[[2,'=='],[[7],[3,'show_type']],[1,1]],[[7],[3,'userinfo']]])
Z(z[5])
Z([3,'levelinfo data-v-16d9cfc4'])
Z([[2,'||'],[[6],[[7],[3,'userinfo']],[3,'level']],[[2,'&&'],[[6],[[7],[3,'userinfo']],[3,'level_info']],[[6],[[6],[[7],[3,'userinfo']],[3,'level_info']],[3,'level']]]])
Z([[2,'&&'],[[2,'&&'],[[2,'=='],[[7],[3,'show_update']],[1,1]],[[6],[[7],[3,'userinfo']],[3,'next_level']]],[[2,'||'],[[6],[[7],[3,'userinfo']],[3,'level']],[[2,'&&'],[[6],[[7],[3,'userinfo']],[3,'level_info']],[[6],[[6],[[7],[3,'userinfo']],[3,'level_info']],[3,'level']]]]])
Z([[2,'=='],[[7],[3,'show_tutor']],[1,1]])
Z([[7],[3,'show_level']])
Z([3,'__i1__'])
Z([3,'item'])
Z([[7],[3,'userlevel']])
Z([3,'value'])
Z([3,'__e'])
Z([[4],[[5],[[5],[[5],[1,'item']],[1,'data-v-16d9cfc4']],[[2,'?:'],[[2,'=='],[[6],[[7],[3,'item']],[3,'value']],[[6],[[7],[3,'searchForm']],[3,'level']]],[1,'cur'],[1,'']]]])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[[5],[1,'changeUserLevel']],[[4],[[5],[1,'$0']]]],[[4],[[5],[[4],[[5],[[4],[[5],[[5],[[5],[1,'userlevel']],[1,'value']],[[6],[[7],[3,'item']],[3,'value']]]]]]]]]]]]]]]])
Z([[2,'!='],[[6],[[7],[3,'item']],[3,'value']],[1,0]])
Z([[2,'=='],[[7],[3,'show_type']],[1,0]])
Z(z[15])
Z(z[20])
Z([3,'list data-v-16d9cfc4'])
Z([[4],[[5],[[4],[[5],[[5],[1,'scrolltolower']],[[4],[[5],[[4],[[5],[[5],[1,'getList']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([1,false])
Z([3,'true'])
Z([[2,'=='],[[6],[[7],[3,'$root']],[3,'g0']],[1,0]])
Z(z[4])
Z(z[5])
Z([3,'76fe53fe-2'])
})(__WXML_GLOBAL__.ops_cached.$gwx_19);return __WXML_GLOBAL__.ops_cached.$gwx_19
}
function gz$gwx_20(){
if( __WXML_GLOBAL__.ops_cached.$gwx_20)return __WXML_GLOBAL__.ops_cached.$gwx_20
__WXML_GLOBAL__.ops_cached.$gwx_20=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'pages data-v-4907f55e'])
Z([[2,'?:'],[[7],[3,'backLock']],[1,''],[1,'padding-bottom:150rpx']])
Z([[7],[3,'backLock']])
Z([3,'#fff'])
Z([3,'__l'])
Z([3,'data-v-4907f55e'])
Z([[2,'?:'],[[2,'=='],[[7],[3,'type']],[1,2]],[1,'团队订单'],[1,'我的订单']])
Z([3,'#000'])
Z([3,'3a407dac-1'])
Z([[7],[3,'slotLock']])
Z([3,'orderList data-v-4907f55e'])
Z([3,'index'])
Z([3,'item'])
Z([[7],[3,'orderList']])
Z(z[11])
Z([[2,'=='],[[7],[3,'myOrderType']],[1,1]])
Z(z[5])
Z(z[5])
Z([[2,'=='],[[6],[[7],[3,'item']],[3,'profit_type']],[1,2]])
Z([[2,'=='],[[6],[[7],[3,'item']],[3,'profit_type']],[1,3]])
Z([[2,'=='],[[6],[[7],[3,'item']],[3,'profit_type']],[1,1]])
Z([[2,'=='],[[6],[[7],[3,'item']],[3,'is_reward']],[1,1]])
Z([[2,'=='],[[6],[[7],[3,'item']],[3,'order_status']],[1,3]])
Z([[2,'=='],[[6],[[7],[3,'item']],[3,'flow_point']],[1,'SETTLE']])
Z([[2,'&&'],[[6],[[7],[3,'item']],[3,'reward_amount']],[[2,'>'],[[6],[[7],[3,'item']],[3,'reward_amount']],[1,0]]])
Z([[7],[3,'notYetData']])
Z(z[4])
Z(z[5])
Z([3,'3a407dac-2'])
Z(z[4])
Z([3,'data-v-4907f55e vue-ref'])
Z([3,'loadMore'])
Z([3,'3a407dac-3'])
Z(z[4])
Z(z[30])
Z([1,200])
Z([3,'topping'])
Z([[7],[3,'scrollTop']])
Z([3,'3a407dac-4'])
})(__WXML_GLOBAL__.ops_cached.$gwx_20);return __WXML_GLOBAL__.ops_cached.$gwx_20
}
function gz$gwx_21(){
if( __WXML_GLOBAL__.ops_cached.$gwx_21)return __WXML_GLOBAL__.ops_cached.$gwx_21
__WXML_GLOBAL__.ops_cached.$gwx_21=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'pages data-v-61d1eb36'])
Z([[2,'?:'],[[7],[3,'backLock']],[1,''],[1,'padding-bottom:170rpx']])
Z([[7],[3,'backLock']])
Z([3,'#fff'])
Z([3,'__l'])
Z([3,'data-v-61d1eb36'])
Z([3,'我的海报'])
Z([3,'#000'])
Z([3,'0b1758de-1'])
Z([[2,'!='],[[6],[[7],[3,'$root']],[3,'g0']],[1,0]])
Z(z[5])
Z([3,'__e'])
Z([3,'swiper data-v-61d1eb36'])
Z([[4],[[5],[[4],[[5],[[5],[1,'change']],[[4],[[5],[[4],[[5],[[5],[1,'chage']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([[7],[3,'duration']])
Z([3,'#FE2B22'])
Z([3,'#CCCCCC'])
Z([[7],[3,'indicatorDots']])
Z([3,'120rpx'])
Z(z[18])
Z([3,'index'])
Z([3,'item'])
Z([[7],[3,'list']])
Z(z[20])
Z([[4],[[5],[[5],[[5],[1,'displayChart']],[1,'data-v-61d1eb36']],[[2,'?:'],[[2,'=='],[[7],[3,'current']],[[7],[3,'index']]],[1,'arry'],[1,'']]]])
Z([[2,'!'],[[6],[[7],[3,'fullPosterList']],[[7],[3,'index']]]])
Z(z[5])
Z([[2,'=='],[[7],[3,'invite_code_status']],[1,1]])
Z([[2,'!'],[[7],[3,'qrcode']]])
Z(z[28])
Z([[7],[3,'headimgurlStatus']])
Z([[6],[[7],[3,'$root']],[3,'g1']])
Z([3,'card-box data-v-61d1eb36'])
Z([[6],[[7],[3,'shareData']],[3,'h5_short_url']])
Z([[6],[[7],[3,'shareData']],[3,'wx_short_url']])
Z([[6],[[7],[3,'shareData']],[3,'wx_scheme_url']])
Z([[6],[[7],[3,'shareData']],[3,'wx_appid']])
Z([[6],[[7],[3,'shareData']],[3,'wx_path']])
Z([[6],[[7],[3,'shareData']],[3,'qr_code']])
Z([[7],[3,'shareTitle']])
})(__WXML_GLOBAL__.ops_cached.$gwx_21);return __WXML_GLOBAL__.ops_cached.$gwx_21
}
function gz$gwx_22(){
if( __WXML_GLOBAL__.ops_cached.$gwx_22)return __WXML_GLOBAL__.ops_cached.$gwx_22
__WXML_GLOBAL__.ops_cached.$gwx_22=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'page data-v-3faff76a'])
Z([[2,'?:'],[[7],[3,'backLock']],[1,''],[1,'padding-bottom:150rpx']])
Z([[7],[3,'backLock']])
Z([3,'#fff'])
Z([3,'__l'])
Z([3,'data-v-3faff76a'])
Z([3,'订单'])
Z([3,'#000'])
Z([3,'00cd4a80-1'])
Z([[6],[[7],[3,'from']],[3,'order_sn']])
Z([[7],[3,'cont']])
Z([3,'listModel data-v-3faff76a'])
Z([3,'index'])
Z([3,'item'])
Z([[6],[[7],[3,'$root']],[3,'l0']])
Z(z[12])
Z([3,'item data-v-3faff76a'])
Z([3,'activity_info data-v-3faff76a'])
Z([3,'__e'])
Z([3,'cover data-v-3faff76a'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'shop']],[[4],[[5],[[7],[3,'index']]]]]]]]]]]])
Z([[2,'||'],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,6]],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,3]]])
Z([3,'pop data-v-3faff76a'])
Z([[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,6]])
Z([[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,3]])
Z([3,'item-info data-v-3faff76a'])
Z(z[18])
Z([3,'name data-v-3faff76a'])
Z(z[20])
Z([[2,'&&'],[[2,'!='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,5]],[[2,'!='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,3]]])
Z(z[18])
Z([3,'Cashback data-v-3faff76a'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'lookUploadPage']],[[4],[[5],[[7],[3,'index']]]]]]]]]]]])
Z([[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'platform']],[1,1]])
Z([[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'platform']],[1,2]])
Z([[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'source']],[1,1]])
Z([[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'source']],[1,2]])
Z(z[18])
Z([3,'text gray data-v-3faff76a'])
Z(z[32])
Z([[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'user_order_sn']])
Z([[2,'||'],[[2,'||'],[[2,'&&'],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,7]],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'source']],[1,2]]],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,6]]],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,5]]])
Z([[2,'&&'],[[2,'&&'],[[2,'!='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,5]],[[2,'!='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,7]]],[[2,'!='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,6]]])
Z([3,'btnWrap data-v-3faff76a'])
Z([[2,'&&'],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'source']],[1,2]],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,4]]])
Z([[2,'&&'],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,3]],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'reject_reason']]])
Z([[2,'&&'],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,1]],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'user_order_sn']],[1,'']]])
Z([[2,'&&'],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'source']],[1,2]],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'video_voucher']]])
Z([[2,'&&'],[[2,'&&'],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,1]],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'user_order_sn']],[1,'']]],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'source']],[1,1]]])
Z([[2,'&&'],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,4]],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'source']],[1,2]]])
Z([[2,'&&'],[[2,'&&'],[[2,'||'],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,4]],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,2]]],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'source']],[1,2]]],[[2,'!'],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'video_voucher']]]])
Z([[2,'&&'],[[2,'&&'],[[2,'&&'],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'source']],[1,2]],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'user_order_sn']]],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'screen_shots']],[1,'']]],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,1]]])
Z([[2,'&&'],[[2,'&&'],[[2,'&&'],[[2,'&&'],[[2,'&&'],[[2,'&&'],[[2,'!='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,6]],[[2,'!='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,4]]],[[2,'!='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,3]]],[[2,'!='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,7]]],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'source']],[1,2]]],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'user_order_sn']]],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'screen_shots']]])
Z([[2,'&&'],[[2,'&&'],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'source']],[1,2]],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'user_order_sn']],[1,'']]],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,1]]])
Z([[2,'&&'],[[2,'&&'],[[2,'&&'],[[2,'&&'],[[2,'&&'],[[2,'!='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,7]],[[2,'!='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,6]]],[[2,'!='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'state']],[1,3]]],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'user_order_sn']]],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'source']],[1,1]]],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'plan_type']],[1,1]]])
Z(z[24])
Z([[7],[3,'notTips']])
Z(z[4])
Z(z[5])
Z([3,'00cd4a80-2'])
Z([[7],[3,'isGuza']])
Z([[7],[3,'jumpPopup']])
Z([[7],[3,'isShowQRc0de']])
Z(z[5])
Z([[2,'=='],[[6],[[7],[3,'info']],[3,'platform']],[1,1]])
Z([[2,'=='],[[6],[[7],[3,'info']],[3,'platform']],[1,2]])
Z([[7],[3,'isFailPop']])
Z(z[5])
Z([[2,'!='],[[6],[[7],[3,'$root']],[3,'g0']],[1,0]])
Z(z[12])
Z(z[13])
Z([[6],[[7],[3,'$root']],[3,'l2']])
Z(z[12])
Z([3,'failList data-v-3faff76a'])
Z([3,'flex data-v-3faff76a'])
Z([[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'audit_status']],[1,1]])
Z([[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'audit_status']],[1,2]])
Z([[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'audit_status']],[1,3]])
Z([[2,'||'],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'audit_status']],[1,2]],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'audit_status']],[1,3]]])
Z([[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'audit_files']])
Z([[6],[[7],[3,'$root']],[3,'g1']])
Z([[6],[[7],[3,'$root']],[3,'g2']])
})(__WXML_GLOBAL__.ops_cached.$gwx_22);return __WXML_GLOBAL__.ops_cached.$gwx_22
}
function gz$gwx_23(){
if( __WXML_GLOBAL__.ops_cached.$gwx_23)return __WXML_GLOBAL__.ops_cached.$gwx_23
__WXML_GLOBAL__.ops_cached.$gwx_23=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'page data-v-4c063932'])
Z([[2,'?:'],[[7],[3,'backLock']],[1,''],[1,'padding-bottom:150rpx']])
Z([[7],[3,'backLock']])
Z([3,'#fff'])
Z([3,'__l'])
Z([3,'data-v-4c063932'])
Z([3,'下单奖励活动'])
Z([3,'#000'])
Z([3,'5f561aa3-1'])
Z([3,'content data-v-4c063932'])
Z([[2,'!='],[[6],[[7],[3,'$root']],[3,'g0']],[1,0]])
Z([[6],[[7],[3,'$root']],[3,'g1']])
Z([[6],[[7],[3,'$root']],[3,'g2']])
Z([3,'model data-v-4c063932'])
Z([[2,'=='],[[7],[3,'active']],[1,0]])
Z([[7],[3,'notTips']])
Z(z[4])
Z(z[5])
Z([3,'5f561aa3-2'])
Z([[6],[[7],[3,'$root']],[3,'g3']])
Z([3,'index'])
Z([3,'item'])
Z([[7],[3,'RankingList']])
Z(z[20])
Z([3,'item dis dis-ali data-v-4c063932'])
Z([[2,'<'],[[7],[3,'index']],[1,3]])
Z(z[5])
Z([[2,'=='],[[7],[3,'index']],[1,0]])
Z([[2,'=='],[[7],[3,'index']],[1,1]])
Z([[2,'=='],[[7],[3,'index']],[1,2]])
})(__WXML_GLOBAL__.ops_cached.$gwx_23);return __WXML_GLOBAL__.ops_cached.$gwx_23
}
function gz$gwx_24(){
if( __WXML_GLOBAL__.ops_cached.$gwx_24)return __WXML_GLOBAL__.ops_cached.$gwx_24
__WXML_GLOBAL__.ops_cached.$gwx_24=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'pages data-v-0818cad3'])
Z([[2,'?:'],[[7],[3,'backLock']],[1,''],[1,'padding-bottom:150rpx']])
Z([[7],[3,'backLock']])
Z([3,'#fff'])
Z([3,'__l'])
Z([3,'data-v-0818cad3'])
Z([3,'积分商城'])
Z([3,'#000'])
Z([3,'1d662d93-1'])
Z([[7],[3,'keyword']])
Z([3,'content data-v-0818cad3'])
Z([[6],[[7],[3,'$root']],[3,'g0']])
Z([[6],[[7],[3,'$root']],[3,'g1']])
Z([[6],[[7],[3,'$root']],[3,'g2']])
Z([[7],[3,'notYetData']])
Z(z[4])
Z(z[5])
Z([3,'1d662d93-2'])
Z(z[4])
Z([3,'data-v-0818cad3 vue-ref'])
Z([1,200])
Z([3,'topping'])
Z([[7],[3,'scrollTop']])
Z([3,'1d662d93-3'])
})(__WXML_GLOBAL__.ops_cached.$gwx_24);return __WXML_GLOBAL__.ops_cached.$gwx_24
}
function gz$gwx_25(){
if( __WXML_GLOBAL__.ops_cached.$gwx_25)return __WXML_GLOBAL__.ops_cached.$gwx_25
__WXML_GLOBAL__.ops_cached.$gwx_25=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'page data-v-105310f4'])
Z([[2,'?:'],[[7],[3,'backLock']],[1,''],[1,'padding-bottom:150rpx']])
Z([[7],[3,'backLock']])
Z([3,'#fff'])
Z([3,'__l'])
Z([3,'data-v-105310f4'])
Z([3,'邀请好友'])
Z([3,'#000'])
Z([3,'f224ca3c-1'])
Z([[6],[[7],[3,'$root']],[3,'g0']])
Z([[6],[[7],[3,'$root']],[3,'g1']])
Z([3,'model data-v-105310f4'])
Z([[2,'=='],[[7],[3,'active']],[1,0]])
Z([[7],[3,'notTips']])
Z(z[4])
Z(z[5])
Z([3,'f224ca3c-2'])
Z([[6],[[7],[3,'$root']],[3,'g2']])
Z([3,'index'])
Z([3,'item'])
Z([[7],[3,'RankingList']])
Z(z[18])
Z([3,'item dis dis-ali data-v-105310f4'])
Z([[2,'<'],[[7],[3,'index']],[1,3]])
Z(z[5])
Z([[2,'=='],[[7],[3,'index']],[1,0]])
Z([[2,'=='],[[7],[3,'index']],[1,1]])
Z([[2,'=='],[[7],[3,'index']],[1,2]])
})(__WXML_GLOBAL__.ops_cached.$gwx_25);return __WXML_GLOBAL__.ops_cached.$gwx_25
}
function gz$gwx_26(){
if( __WXML_GLOBAL__.ops_cached.$gwx_26)return __WXML_GLOBAL__.ops_cached.$gwx_26
__WXML_GLOBAL__.ops_cached.$gwx_26=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'templateOne data-v-a7f2011e'])
Z([[2,'?:'],[[2,'&&'],[[6],[[6],[[7],[3,'configInfo']],[3,'checkin']],[3,'toptips_text']],[[6],[[6],[[7],[3,'configInfo']],[3,'checkin']],[3,'toptips_status']]],[1,'padding-top:96rpx'],[1,'']])
Z([[2,'&&'],[[6],[[6],[[7],[3,'configInfo']],[3,'checkin']],[3,'toptips_text']],[[6],[[6],[[7],[3,'configInfo']],[3,'checkin']],[3,'toptips_status']]])
Z([[7],[3,'todayCompleteActive1']])
Z([[7],[3,'todayCompleteActive']])
Z([[6],[[6],[[7],[3,'configInfo']],[3,'checkin']],[3,'is_show_return_home']])
Z([[7],[3,'completeActive']])
Z([[7],[3,'convertedActive']])
Z([[2,'=='],[[6],[[6],[[7],[3,'configInfo']],[3,'checkin']],[3,'mode']],[1,10]])
Z([[6],[[7],[3,'$root']],[3,'g0']])
Z([[2,'&&'],[[2,'||'],[[6],[[6],[[7],[3,'configInfo']],[3,'checkin']],[3,'remind_status']],[[6],[[6],[[7],[3,'configInfo']],[3,'checkin']],[3,'remind_mini_status']]],[[2,'=='],[[6],[[6],[[7],[3,'configInfo']],[3,'checkin']],[3,'mode']],[1,10]]])
Z([3,'bottom'])
Z([3,'__l'])
Z([3,'__e'])
Z([3,'data-v-a7f2011e vue-ref'])
Z([[4],[[5],[[4],[[5],[[5],[1,'^confirm']],[[4],[[5],[[4],[[5],[1,'timeConfirm']]]]]]]]])
Z([3,'picker'])
Z([3,'hi'])
Z([[2,'?:'],[[6],[[7],[3,'configInfo']],[3,'user']],[[6],[[7],[3,'$root']],[3,'g2']],[1,'00:00']])
Z([3,'246b0c3e-2'])
})(__WXML_GLOBAL__.ops_cached.$gwx_26);return __WXML_GLOBAL__.ops_cached.$gwx_26
}
function gz$gwx_27(){
if( __WXML_GLOBAL__.ops_cached.$gwx_27)return __WXML_GLOBAL__.ops_cached.$gwx_27
__WXML_GLOBAL__.ops_cached.$gwx_27=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'templateTwo data-v-551818c0'])
Z([[2,'&&'],[[6],[[6],[[7],[3,'configInfo']],[3,'checkin']],[3,'toptips_text']],[[6],[[6],[[7],[3,'configInfo']],[3,'checkin']],[3,'toptips_status']]])
Z([3,'content data-v-551818c0'])
Z([3,'centerBtn data-v-551818c0'])
Z([[7],[3,'todayCompleteActive1']])
Z([[7],[3,'todayCompleteActive']])
Z([[6],[[6],[[7],[3,'configInfo']],[3,'checkin']],[3,'is_show_return_home']])
Z([[7],[3,'completeActive']])
Z([[7],[3,'convertedActive']])
Z([[2,'=='],[[6],[[6],[[7],[3,'configInfo']],[3,'checkin']],[3,'mode']],[1,10]])
Z([3,'data-v-551818c0'])
Z([[2,'||'],[[6],[[6],[[7],[3,'configInfo']],[3,'checkin']],[3,'remind_status']],[[6],[[6],[[7],[3,'configInfo']],[3,'checkin']],[3,'remind_mini_status']]])
Z([[6],[[7],[3,'$root']],[3,'g1']])
Z([3,'bottom'])
Z([3,'__l'])
Z([3,'__e'])
Z([3,'data-v-551818c0 vue-ref'])
Z([[4],[[5],[[4],[[5],[[5],[1,'^confirm']],[[4],[[5],[[4],[[5],[1,'timeConfirm']]]]]]]]])
Z([3,'picker'])
Z([3,'hi'])
Z([[2,'?:'],[[6],[[7],[3,'configInfo']],[3,'user']],[[6],[[7],[3,'$root']],[3,'g2']],[1,'00:00']])
Z([3,'3d4bac98-2'])
})(__WXML_GLOBAL__.ops_cached.$gwx_27);return __WXML_GLOBAL__.ops_cached.$gwx_27
}
function gz$gwx_28(){
if( __WXML_GLOBAL__.ops_cached.$gwx_28)return __WXML_GLOBAL__.ops_cached.$gwx_28
__WXML_GLOBAL__.ops_cached.$gwx_28=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'signReach data-v-648d1cf5'])
Z([[2,'?:'],[[7],[3,'backLock']],[1,''],[1,'padding-bottom:150rpx']])
Z([[7],[3,'backLock']])
Z([3,'#fff'])
Z([3,'__l'])
Z([3,'data-v-648d1cf5'])
Z([3,'签到打卡'])
Z([3,'#000'])
Z([3,'e7b8c094-1'])
Z([[7],[3,'templateOneActive']])
Z(z[4])
Z([3,'__e'])
Z(z[11])
Z(z[11])
Z(z[11])
Z(z[11])
Z(z[11])
Z(z[11])
Z(z[5])
Z([[7],[3,'configInfo']])
Z([[4],[[5],[[5],[[5],[[5],[[5],[[5],[[5],[[4],[[5],[[5],[1,'^setMsgRemind']],[[4],[[5],[[4],[[5],[1,'setMsgRemind']]]]]]]],[[4],[[5],[[5],[1,'^getPhone']],[[4],[[5],[[4],[[5],[1,'getPhone']]]]]]]],[[4],[[5],[[5],[1,'^hitCard']],[[4],[[5],[[4],[[5],[1,'hitCard']]]]]]]],[[4],[[5],[[5],[1,'^signIn']],[[4],[[5],[[4],[[5],[1,'navLink']]]]]]]],[[4],[[5],[[5],[1,'^openRule']],[[4],[[5],[[4],[[5],[1,'e0']]]]]]]],[[4],[[5],[[5],[1,'^openMsgTips']],[[4],[[5],[[4],[[5],[1,'msgTips']]]]]]]],[[4],[[5],[[5],[1,'^nav']],[[4],[[5],[[4],[[5],[1,'nav']]]]]]]]])
Z([[7],[3,'elm']])
Z([[7],[3,'mt']])
Z([[7],[3,'navHeight']])
Z([[7],[3,'phone']])
Z([3,'e7b8c094-2'])
Z([[7],[3,'templateTwoActive']])
Z(z[4])
Z(z[11])
Z(z[11])
Z(z[11])
Z(z[11])
Z(z[11])
Z(z[11])
Z(z[11])
Z(z[5])
Z(z[19])
Z([[4],[[5],[[5],[[5],[[5],[[5],[[5],[[5],[[4],[[5],[[5],[1,'^setMsgRemind']],[[4],[[5],[[4],[[5],[1,'setMsgRemind']]]]]]]],[[4],[[5],[[5],[1,'^getPhone']],[[4],[[5],[[4],[[5],[1,'getPhone']]]]]]]],[[4],[[5],[[5],[1,'^hitCard']],[[4],[[5],[[4],[[5],[1,'hitCard']]]]]]]],[[4],[[5],[[5],[1,'^signIn']],[[4],[[5],[[4],[[5],[1,'navLink']]]]]]]],[[4],[[5],[[5],[1,'^openRule']],[[4],[[5],[[4],[[5],[1,'e1']]]]]]]],[[4],[[5],[[5],[1,'^openMsgTips']],[[4],[[5],[[4],[[5],[1,'msgTips']]]]]]]],[[4],[[5],[[5],[1,'^nav']],[[4],[[5],[[4],[[5],[1,'nav']]]]]]]]])
Z(z[21])
Z(z[22])
Z(z[24])
Z([3,'e7b8c094-3'])
Z(z[4])
Z([3,'data-v-648d1cf5 vue-ref'])
Z([3,'popup'])
Z([3,'打卡规则'])
Z([3,'e7b8c094-4'])
Z([[4],[[5],[1,'content']]])
Z(z[4])
Z(z[43])
Z([3,'popup1'])
Z([3,'客服二维码'])
Z([3,'e7b8c094-5'])
Z(z[47])
Z(z[4])
Z(z[43])
Z([3,'popup2'])
Z([3,'卡券兑换'])
Z([3,'e7b8c094-6'])
Z(z[47])
Z(z[4])
Z(z[43])
Z([3,'popup3'])
Z([3,'true'])
Z([3,'e7b8c094-7'])
Z(z[47])
Z([[2,'&'],[[2,'!'],[[6],[[6],[[7],[3,'configInfo']],[3,'checkin']],[3,'status']]],[[7],[3,'pageLock']]])
Z([[7],[3,'isLogin']])
})(__WXML_GLOBAL__.ops_cached.$gwx_28);return __WXML_GLOBAL__.ops_cached.$gwx_28
}
function gz$gwx_29(){
if( __WXML_GLOBAL__.ops_cached.$gwx_29)return __WXML_GLOBAL__.ops_cached.$gwx_29
__WXML_GLOBAL__.ops_cached.$gwx_29=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'page data-v-29fc4a78'])
Z([[2,'?:'],[[7],[3,'backLock']],[1,''],[1,'padding-bottom:150rpx']])
Z([[7],[3,'backLock']])
Z([3,'none'])
Z([3,'__l'])
Z([3,'data-v-29fc4a78'])
Z([3,'超值福利'])
Z([3,'#000'])
Z([3,'a4da1140-1'])
Z(z[5])
Z([[2,'||'],[[2,'||'],[[6],[[7],[3,'integral_config']],[3,'sign_in']],[[6],[[7],[3,'integral_config']],[3,'place_order']]],[[6],[[7],[3,'integral_config']],[3,'invite']]])
Z([3,'model data-v-29fc4a78'])
Z([[6],[[7],[3,'integral_config']],[3,'sign_in']])
Z([[6],[[7],[3,'integral_config']],[3,'place_order']])
Z([[6],[[7],[3,'integral_config']],[3,'invite']])
Z([[6],[[7],[3,'integral_config']],[3,'lottery_turntable']])
Z([[6],[[7],[3,'integral_config']],[3,'credits_exchange']])
Z([[7],[3,'isShow']])
})(__WXML_GLOBAL__.ops_cached.$gwx_29);return __WXML_GLOBAL__.ops_cached.$gwx_29
}
function gz$gwx_30(){
if( __WXML_GLOBAL__.ops_cached.$gwx_30)return __WXML_GLOBAL__.ops_cached.$gwx_30
__WXML_GLOBAL__.ops_cached.$gwx_30=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_30);return __WXML_GLOBAL__.ops_cached.$gwx_30
}
function gz$gwx_31(){
if( __WXML_GLOBAL__.ops_cached.$gwx_31)return __WXML_GLOBAL__.ops_cached.$gwx_31
__WXML_GLOBAL__.ops_cached.$gwx_31=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_31);return __WXML_GLOBAL__.ops_cached.$gwx_31
}
__WXML_GLOBAL__.ops_set.$gwx=z;
__WXML_GLOBAL__.ops_init.$gwx=true;
var nv_require=function(){var nnm={};var nom={};return function(n){if(n[0]==='p'&&n[1]==='_'&&f_[n.slice(2)])return f_[n.slice(2)];return function(){if(!nnm[n]) return undefined;try{if(!nom[n])nom[n]=nnm[n]();return nom[n];}catch(e){e.message=e.message.replace(/nv_/g,'');var tmp = e.stack.substring(0,e.stack.lastIndexOf(n));e.stack = tmp.substring(0,tmp.lastIndexOf('\n'));e.stack = e.stack.replace(/\snv_/g,' ');e.stack = $gstack(e.stack);e.stack += '\n    at ' + n.substring(2);console.error(e);}
}}}()
var x=['./components/customCard/index.wxml','./components/list/index.wxml','./components/loadMore/index.wxml','./components/loginPop/index.wxml','./components/navbar/index.wxml','./components/notPhone/index.wxml','./components/notYetData/index.wxml','./components/popup/index.wxml','./components/tabbar/index.wxml','./components/topping/index.wxml','./components/xp-picker/xp-picker.wxml','./pages/bwc/index.wxml','./pages/home/index.wxml','./pages/home/index1.wxml','./pages/library/index.wxml','./pages/luckDraw/index.wxml','./pages/material/index.wxml','./pages/my/index.wxml','./pages/myFans/index.wxml','./pages/myOrder/index.wxml','./pages/myPoster/index.wxml','./pages/orderlist/index.wxml','./pages/placeOrder/index.wxml','./pages/pointsMall/index.wxml','./pages/pullNewActivity/index.wxml','./pages/signReach/components/templateOne/index.wxml','./pages/signReach/components/templateTwo/index.wxml','./pages/signReach/index.wxml','./pages/welfare/index.wxml','./pages/yppPay/chooseLocation.wxml','./pages/yppPay/yppPay.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_1()
var oB=_n('view')
_rz(z,oB,'class',0,e,s,gg)
var xC=_v()
_(oB,xC)
if(_oz(z,1,e,s,gg)){xC.wxVkey=1
}
var oD=_v()
_(oB,oD)
if(_oz(z,2,e,s,gg)){oD.wxVkey=1
}
xC.wxXCkey=1
oD.wxXCkey=1
_(r,oB)
return r
}
e_[x[0]]={f:m0,j:[],i:[],ti:[],ic:[]}
d_[x[1]]={}
var m1=function(e,s,r,gg){
var z=gz$gwx_2()
var cF=_v()
_(r,cF)
if(_oz(z,0,e,s,gg)){cF.wxVkey=1
var hG=_v()
_(cF,hG)
var oH=function(oJ,cI,lK,gg){
var tM=_n('view')
_rz(z,tM,'class',5,oJ,cI,gg)
var bO=_n('view')
var oP=_v()
_(bO,oP)
if(_oz(z,6,oJ,cI,gg)){oP.wxVkey=1
}
var xQ=_v()
_(bO,xQ)
if(_oz(z,7,oJ,cI,gg)){xQ.wxVkey=1
}
oP.wxXCkey=1
xQ.wxXCkey=1
_(tM,bO)
var eN=_v()
_(tM,eN)
if(_oz(z,8,oJ,cI,gg)){eN.wxVkey=1
}
var oR=_n('view')
_rz(z,oR,'class',9,oJ,cI,gg)
var fS=_v()
_(oR,fS)
if(_oz(z,10,oJ,cI,gg)){fS.wxVkey=1
}
else{fS.wxVkey=2
var cT=_v()
_(fS,cT)
if(_oz(z,11,oJ,cI,gg)){cT.wxVkey=1
}
else{cT.wxVkey=2
var hU=_v()
_(cT,hU)
if(_oz(z,12,oJ,cI,gg)){hU.wxVkey=1
}
else{hU.wxVkey=2
var oV=_v()
_(hU,oV)
if(_oz(z,13,oJ,cI,gg)){oV.wxVkey=1
}
oV.wxXCkey=1
}
hU.wxXCkey=1
}
cT.wxXCkey=1
}
fS.wxXCkey=1
_(tM,oR)
eN.wxXCkey=1
_(lK,tM)
return lK
}
hG.wxXCkey=2
_2z(z,3,oH,e,s,gg,hG,'item','index','index')
}
cF.wxXCkey=1
return r
}
e_[x[1]]={f:m1,j:[],i:[],ti:[],ic:[]}
d_[x[2]]={}
var m2=function(e,s,r,gg){
var z=gz$gwx_3()
var oX=_n('view')
_rz(z,oX,'class',0,e,s,gg)
var lY=_v()
_(oX,lY)
if(_oz(z,1,e,s,gg)){lY.wxVkey=1
}
var aZ=_v()
_(oX,aZ)
if(_oz(z,2,e,s,gg)){aZ.wxVkey=1
var t1=_n('view')
_rz(z,t1,'class',3,e,s,gg)
var e2=_v()
_(t1,e2)
if(_oz(z,4,e,s,gg)){e2.wxVkey=1
}
var b3=_v()
_(t1,b3)
if(_oz(z,5,e,s,gg)){b3.wxVkey=1
}
e2.wxXCkey=1
b3.wxXCkey=1
_(aZ,t1)
}
lY.wxXCkey=1
aZ.wxXCkey=1
_(r,oX)
return r
}
e_[x[2]]={f:m2,j:[],i:[],ti:[],ic:[]}
d_[x[3]]={}
var m3=function(e,s,r,gg){
var z=gz$gwx_4()
var x5=_v()
_(r,x5)
if(_oz(z,0,e,s,gg)){x5.wxVkey=1
}
x5.wxXCkey=1
return r
}
e_[x[3]]={f:m3,j:[],i:[],ti:[],ic:[]}
d_[x[4]]={}
var m4=function(e,s,r,gg){
var z=gz$gwx_5()
var f7=_mz(z,'view',['class',0,'style',1],[],e,s,gg)
var c8=_v()
_(f7,c8)
if(_oz(z,2,e,s,gg)){c8.wxVkey=1
var h9=_v()
_(c8,h9)
if(_oz(z,3,e,s,gg)){h9.wxVkey=1
}
h9.wxXCkey=1
}
var o0=_n('slot')
_(f7,o0)
c8.wxXCkey=1
_(r,f7)
return r
}
e_[x[4]]={f:m4,j:[],i:[],ti:[],ic:[]}
d_[x[5]]={}
var m5=function(e,s,r,gg){
var z=gz$gwx_6()
var oBB=_v()
_(r,oBB)
if(_oz(z,0,e,s,gg)){oBB.wxVkey=1
}
oBB.wxXCkey=1
return r
}
e_[x[5]]={f:m5,j:[],i:[],ti:[],ic:[]}
d_[x[6]]={}
var m6=function(e,s,r,gg){
var z=gz$gwx_7()
return r
}
e_[x[6]]={f:m6,j:[],i:[],ti:[],ic:[]}
d_[x[7]]={}
var m7=function(e,s,r,gg){
var z=gz$gwx_8()
var tEB=_v()
_(r,tEB)
if(_oz(z,0,e,s,gg)){tEB.wxVkey=1
var eFB=_n('slot')
_rz(z,eFB,'name',1,e,s,gg)
_(tEB,eFB)
}
tEB.wxXCkey=1
return r
}
e_[x[7]]={f:m7,j:[],i:[],ti:[],ic:[]}
d_[x[8]]={}
var m8=function(e,s,r,gg){
var z=gz$gwx_9()
var oHB=_v()
_(r,oHB)
if(_oz(z,0,e,s,gg)){oHB.wxVkey=1
var xIB=_v()
_(oHB,xIB)
var oJB=function(cLB,fKB,hMB,gg){
var cOB=_mz(z,'view',['catchtap',5,'class',1,'data-event-opts',2,'style',3],[],cLB,fKB,gg)
var oPB=_v()
_(cOB,oPB)
if(_oz(z,9,cLB,fKB,gg)){oPB.wxVkey=1
}
oPB.wxXCkey=1
_(hMB,cOB)
return hMB
}
xIB.wxXCkey=2
_2z(z,3,oJB,e,s,gg,xIB,'item','index','index')
}
oHB.wxXCkey=1
return r
}
e_[x[8]]={f:m8,j:[],i:[],ti:[],ic:[]}
d_[x[9]]={}
var m9=function(e,s,r,gg){
var z=gz$gwx_10()
var aRB=_v()
_(r,aRB)
if(_oz(z,0,e,s,gg)){aRB.wxVkey=1
}
aRB.wxXCkey=1
return r
}
e_[x[9]]={f:m9,j:[],i:[],ti:[],ic:[]}
d_[x[10]]={}
var m10=function(e,s,r,gg){
var z=gz$gwx_11()
var eTB=_n('view')
_rz(z,eTB,'class',0,e,s,gg)
var bUB=_v()
_(eTB,bUB)
if(_oz(z,1,e,s,gg)){bUB.wxVkey=1
var oVB=_mz(z,'view',['bindtap',2,'class',1,'data-event-opts',2],[],e,s,gg)
var xWB=_n('slot')
_(oVB,xWB)
_(bUB,oVB)
}
var oXB=_n('view')
_rz(z,oXB,'class',5,e,s,gg)
var fYB=_v()
_(oXB,fYB)
if(_oz(z,6,e,s,gg)){fYB.wxVkey=1
}
var cZB=_v()
_(oXB,cZB)
if(_oz(z,7,e,s,gg)){cZB.wxVkey=1
}
fYB.wxXCkey=1
cZB.wxXCkey=1
_(eTB,oXB)
bUB.wxXCkey=1
_(r,eTB)
return r
}
e_[x[10]]={f:m10,j:[],i:[],ti:[],ic:[]}
d_[x[11]]={}
var m11=function(e,s,r,gg){
var z=gz$gwx_12()
var o2B=_mz(z,'view',['class',0,'style',1],[],e,s,gg)
var c3B=_v()
_(o2B,c3B)
if(_oz(z,2,e,s,gg)){c3B.wxVkey=1
var b9B=_mz(z,'view',['bindtap',3,'class',1,'data-event-opts',2,'style',3],[],e,s,gg)
var o0B=_v()
_(b9B,o0B)
if(_oz(z,7,e,s,gg)){o0B.wxVkey=1
}
o0B.wxXCkey=1
_(c3B,b9B)
}
var o4B=_v()
_(o2B,o4B)
if(_oz(z,8,e,s,gg)){o4B.wxVkey=1
}
var xAC=_v()
_(o2B,xAC)
var oBC=function(cDC,fCC,hEC,gg){
var cGC=_n('view')
_rz(z,cGC,'class',13,cDC,fCC,gg)
var oHC=_v()
_(cGC,oHC)
if(_oz(z,14,cDC,fCC,gg)){oHC.wxVkey=1
}
var lIC=_v()
_(cGC,lIC)
if(_oz(z,15,cDC,fCC,gg)){lIC.wxVkey=1
var xOC=_n('view')
_rz(z,xOC,'class',16,cDC,fCC,gg)
var oPC=_v()
_(xOC,oPC)
if(_oz(z,17,cDC,fCC,gg)){oPC.wxVkey=1
var fQC=_v()
_(oPC,fQC)
var cRC=function(oTC,hSC,cUC,gg){
var lWC=_v()
_(cUC,lWC)
var aXC=function(eZC,tYC,b1C,gg){
var x3C=_mz(z,'view',['bindtap',26,'class',1,'data-event-opts',2,'style',3],[],eZC,tYC,gg)
var o4C=_v()
_(x3C,o4C)
if(_oz(z,30,eZC,tYC,gg)){o4C.wxVkey=1
}
o4C.wxXCkey=1
_(b1C,x3C)
return b1C
}
lWC.wxXCkey=2
_2z(z,24,aXC,oTC,hSC,gg,lWC,'itemC','indexss','indexss')
return cUC
}
fQC.wxXCkey=2
_2z(z,20,cRC,cDC,fCC,gg,fQC,'itemB','index','index')
}
else{oPC.wxVkey=2
var f5C=_v()
_(oPC,f5C)
var c6C=function(o8C,h7C,c9C,gg){
var lAD=_v()
_(c9C,lAD)
var aBD=function(eDD,tCD,bED,gg){
var xGD=_mz(z,'view',['bindtap',39,'class',1,'data-event-opts',2,'style',3],[],eDD,tCD,gg)
var oHD=_v()
_(xGD,oHD)
if(_oz(z,43,eDD,tCD,gg)){oHD.wxVkey=1
}
oHD.wxXCkey=1
_(bED,xGD)
return bED
}
lAD.wxXCkey=2
_2z(z,37,aBD,o8C,h7C,gg,lAD,'itemC','indexss','indexss')
return c9C
}
f5C.wxXCkey=2
_2z(z,33,c6C,cDC,fCC,gg,f5C,'itemB','index','index')
}
oPC.wxXCkey=1
_(lIC,xOC)
}
var aJC=_v()
_(cGC,aJC)
if(_oz(z,44,cDC,fCC,gg)){aJC.wxVkey=1
}
var tKC=_v()
_(cGC,tKC)
if(_oz(z,45,cDC,fCC,gg)){tKC.wxVkey=1
var fID=_mz(z,'custom-card',['bind:__l',46,'card',1,'class',2,'vueId',3],[],cDC,fCC,gg)
_(tKC,fID)
}
var eLC=_v()
_(cGC,eLC)
if(_oz(z,50,cDC,fCC,gg)){eLC.wxVkey=1
var cJD=_n('view')
_rz(z,cJD,'class',51,cDC,fCC,gg)
var hKD=_v()
_(cJD,hKD)
if(_oz(z,52,cDC,fCC,gg)){hKD.wxVkey=1
}
var oLD=_v()
_(cJD,oLD)
if(_oz(z,53,cDC,fCC,gg)){oLD.wxVkey=1
var oND=_v()
_(oLD,oND)
if(_oz(z,55,cDC,fCC,gg)){oND.wxVkey=1
var lOD=_v()
_(oND,lOD)
if(_oz(z,56,cDC,fCC,gg)){lOD.wxVkey=1
}
lOD.wxXCkey=1
}
else{oND.wxVkey=2
var aPD=_mz(z,'swiper',['autoplay',57,'bindchange',1,'circular',2,'class',3,'data-event-opts',4,'duration',5,'indicatorDots',6,'interval',7],[],cDC,fCC,gg)
var tQD=_v()
_(aPD,tQD)
var eRD=function(oTD,bSD,xUD,gg){
var fWD=_v()
_(xUD,fWD)
if(_oz(z,69,oTD,bSD,gg)){fWD.wxVkey=1
}
fWD.wxXCkey=1
return xUD
}
tQD.wxXCkey=2
_2z(z,67,eRD,cDC,fCC,gg,tQD,'item','index','index')
_(oND,aPD)
}
oND.wxXCkey=1
}
var cMD=_v()
_(cJD,cMD)
if(_oz(z,70,cDC,fCC,gg)){cMD.wxVkey=1
var cXD=_v()
_(cMD,cXD)
if(_oz(z,72,cDC,fCC,gg)){cXD.wxVkey=1
var hYD=_n('view')
_rz(z,hYD,'class',73,cDC,fCC,gg)
var oZD=_n('view')
_rz(z,oZD,'class',74,cDC,fCC,gg)
var c1D=_v()
_(oZD,c1D)
if(_oz(z,75,cDC,fCC,gg)){c1D.wxVkey=1
}
var o2D=_v()
_(oZD,o2D)
if(_oz(z,76,cDC,fCC,gg)){o2D.wxVkey=1
}
var l3D=_v()
_(oZD,l3D)
if(_oz(z,77,cDC,fCC,gg)){l3D.wxVkey=1
}
var a4D=_v()
_(oZD,a4D)
if(_oz(z,78,cDC,fCC,gg)){a4D.wxVkey=1
}
var t5D=_v()
_(oZD,t5D)
if(_oz(z,79,cDC,fCC,gg)){t5D.wxVkey=1
}
c1D.wxXCkey=1
o2D.wxXCkey=1
l3D.wxXCkey=1
a4D.wxXCkey=1
t5D.wxXCkey=1
_(hYD,oZD)
var e6D=_n('view')
_rz(z,e6D,'class',80,cDC,fCC,gg)
var b7D=_n('view')
_rz(z,b7D,'class',81,cDC,fCC,gg)
var o8D=_v()
_(b7D,o8D)
if(_oz(z,82,cDC,fCC,gg)){o8D.wxVkey=1
}
var x9D=_v()
_(b7D,x9D)
if(_oz(z,83,cDC,fCC,gg)){x9D.wxVkey=1
}
var o0D=_v()
_(b7D,o0D)
if(_oz(z,84,cDC,fCC,gg)){o0D.wxVkey=1
}
var fAE=_v()
_(b7D,fAE)
if(_oz(z,85,cDC,fCC,gg)){fAE.wxVkey=1
}
var cBE=_v()
_(b7D,cBE)
if(_oz(z,86,cDC,fCC,gg)){cBE.wxVkey=1
}
o8D.wxXCkey=1
x9D.wxXCkey=1
o0D.wxXCkey=1
fAE.wxXCkey=1
cBE.wxXCkey=1
_(e6D,b7D)
var hCE=_n('view')
_rz(z,hCE,'class',87,cDC,fCC,gg)
var oDE=_v()
_(hCE,oDE)
if(_oz(z,88,cDC,fCC,gg)){oDE.wxVkey=1
}
var cEE=_v()
_(hCE,cEE)
if(_oz(z,89,cDC,fCC,gg)){cEE.wxVkey=1
}
var oFE=_v()
_(hCE,oFE)
if(_oz(z,90,cDC,fCC,gg)){oFE.wxVkey=1
}
var lGE=_v()
_(hCE,lGE)
if(_oz(z,91,cDC,fCC,gg)){lGE.wxVkey=1
}
var aHE=_v()
_(hCE,aHE)
if(_oz(z,92,cDC,fCC,gg)){aHE.wxVkey=1
}
oDE.wxXCkey=1
cEE.wxXCkey=1
oFE.wxXCkey=1
lGE.wxXCkey=1
aHE.wxXCkey=1
_(e6D,hCE)
_(hYD,e6D)
_(cXD,hYD)
}
else{cXD.wxVkey=2
var tIE=_n('view')
_rz(z,tIE,'class',93,cDC,fCC,gg)
var eJE=_v()
_(tIE,eJE)
if(_oz(z,94,cDC,fCC,gg)){eJE.wxVkey=1
}
var bKE=_v()
_(tIE,bKE)
if(_oz(z,95,cDC,fCC,gg)){bKE.wxVkey=1
}
var oLE=_v()
_(tIE,oLE)
if(_oz(z,96,cDC,fCC,gg)){oLE.wxVkey=1
}
var xME=_v()
_(tIE,xME)
if(_oz(z,97,cDC,fCC,gg)){xME.wxVkey=1
}
var oNE=_v()
_(tIE,oNE)
if(_oz(z,98,cDC,fCC,gg)){oNE.wxVkey=1
}
eJE.wxXCkey=1
bKE.wxXCkey=1
oLE.wxXCkey=1
xME.wxXCkey=1
oNE.wxXCkey=1
_(cXD,tIE)
}
cXD.wxXCkey=1
}
hKD.wxXCkey=1
oLD.wxXCkey=1
cMD.wxXCkey=1
_(eLC,cJD)
}
var bMC=_v()
_(cGC,bMC)
if(_oz(z,99,cDC,fCC,gg)){bMC.wxVkey=1
}
var oNC=_v()
_(cGC,oNC)
if(_oz(z,100,cDC,fCC,gg)){oNC.wxVkey=1
var fOE=_n('view')
_rz(z,fOE,'class',101,cDC,fCC,gg)
var cPE=_v()
_(fOE,cPE)
if(_oz(z,102,cDC,fCC,gg)){cPE.wxVkey=1
var oTE=_n('view')
_rz(z,oTE,'class',103,cDC,fCC,gg)
var lUE=_v()
_(oTE,lUE)
if(_oz(z,104,cDC,fCC,gg)){lUE.wxVkey=1
}
var aVE=_v()
_(oTE,aVE)
if(_oz(z,105,cDC,fCC,gg)){aVE.wxVkey=1
}
var tWE=_v()
_(oTE,tWE)
if(_oz(z,106,cDC,fCC,gg)){tWE.wxVkey=1
}
lUE.wxXCkey=1
aVE.wxXCkey=1
tWE.wxXCkey=1
_(cPE,oTE)
}
else{cPE.wxVkey=2
var eXE=_v()
_(cPE,eXE)
if(_oz(z,107,cDC,fCC,gg)){eXE.wxVkey=1
var bYE=_v()
_(eXE,bYE)
if(_oz(z,108,cDC,fCC,gg)){bYE.wxVkey=1
}
bYE.wxXCkey=1
}
eXE.wxXCkey=1
}
var hQE=_v()
_(fOE,hQE)
if(_oz(z,109,cDC,fCC,gg)){hQE.wxVkey=1
}
var oZE=_mz(z,'list',['bind:__l',110,'class',1,'list',2,'map_lat',3,'map_lon',4,'show',5,'vueId',6],[],cDC,fCC,gg)
_(fOE,oZE)
var oRE=_v()
_(fOE,oRE)
if(_oz(z,117,cDC,fCC,gg)){oRE.wxVkey=1
}
var cSE=_v()
_(fOE,cSE)
if(_oz(z,118,cDC,fCC,gg)){cSE.wxVkey=1
}
cPE.wxXCkey=1
hQE.wxXCkey=1
oRE.wxXCkey=1
cSE.wxXCkey=1
_(oNC,fOE)
}
oHC.wxXCkey=1
lIC.wxXCkey=1
aJC.wxXCkey=1
tKC.wxXCkey=1
tKC.wxXCkey=3
eLC.wxXCkey=1
bMC.wxXCkey=1
oNC.wxXCkey=1
oNC.wxXCkey=3
_(hEC,cGC)
return hEC
}
xAC.wxXCkey=4
_2z(z,11,oBC,e,s,gg,xAC,'_items','_indexsM','_indexsM')
var x1E=_mz(z,'popup',['bind:__l',119,'class',1,'data-ref',2,'flex',3,'title',4,'vueId',5,'vueSlots',6],[],e,s,gg)
_(o2B,x1E)
var o2E=_mz(z,'popup',['bind:__l',126,'class',1,'data-ref',2,'flex',3,'vueId',4,'vueSlots',5],[],e,s,gg)
_(o2B,o2E)
var l5B=_v()
_(o2B,l5B)
if(_oz(z,132,e,s,gg)){l5B.wxVkey=1
}
var a6B=_v()
_(o2B,a6B)
if(_oz(z,133,e,s,gg)){a6B.wxVkey=1
}
var t7B=_v()
_(o2B,t7B)
if(_oz(z,134,e,s,gg)){t7B.wxVkey=1
var f3E=_mz(z,'view',['bindtap',135,'class',1,'data-event-opts',2],[],e,s,gg)
var h5E=_n('view')
_rz(z,h5E,'class',138,e,s,gg)
var o6E=_v()
_(h5E,o6E)
if(_oz(z,139,e,s,gg)){o6E.wxVkey=1
}
var c7E=_v()
_(h5E,c7E)
if(_oz(z,140,e,s,gg)){c7E.wxVkey=1
}
var o8E=_v()
_(h5E,o8E)
if(_oz(z,141,e,s,gg)){o8E.wxVkey=1
}
var l9E=_v()
_(h5E,l9E)
if(_oz(z,142,e,s,gg)){l9E.wxVkey=1
}
var a0E=_n('view')
_rz(z,a0E,'class',143,e,s,gg)
var tAF=_v()
_(a0E,tAF)
if(_oz(z,144,e,s,gg)){tAF.wxVkey=1
}
var eBF=_v()
_(a0E,eBF)
if(_oz(z,145,e,s,gg)){eBF.wxVkey=1
}
var bCF=_v()
_(a0E,bCF)
if(_oz(z,146,e,s,gg)){bCF.wxVkey=1
}
var oDF=_v()
_(a0E,oDF)
if(_oz(z,147,e,s,gg)){oDF.wxVkey=1
}
var xEF=_v()
_(a0E,xEF)
if(_oz(z,148,e,s,gg)){xEF.wxVkey=1
}
var oFF=_v()
_(a0E,oFF)
if(_oz(z,149,e,s,gg)){oFF.wxVkey=1
}
tAF.wxXCkey=1
eBF.wxXCkey=1
bCF.wxXCkey=1
oDF.wxXCkey=1
xEF.wxXCkey=1
oFF.wxXCkey=1
_(h5E,a0E)
o6E.wxXCkey=1
c7E.wxXCkey=1
o8E.wxXCkey=1
l9E.wxXCkey=1
_(f3E,h5E)
var c4E=_v()
_(f3E,c4E)
if(_oz(z,150,e,s,gg)){c4E.wxVkey=1
}
c4E.wxXCkey=1
_(t7B,f3E)
}
var e8B=_v()
_(o2B,e8B)
if(_oz(z,151,e,s,gg)){e8B.wxVkey=1
}
c3B.wxXCkey=1
o4B.wxXCkey=1
l5B.wxXCkey=1
a6B.wxXCkey=1
t7B.wxXCkey=1
e8B.wxXCkey=1
_(r,o2B)
return r
}
e_[x[11]]={f:m11,j:[],i:[],ti:[],ic:[]}
d_[x[12]]={}
var m12=function(e,s,r,gg){
var z=gz$gwx_13()
var cHF=_n('view')
_rz(z,cHF,'class',0,e,s,gg)
var oXF=_mz(z,'tabbar',['bind:Callback',1,'bind:__l',1,'class',2,'current',3,'data-event-opts',4,'phone',5,'tabList',6,'vueId',7],[],e,s,gg)
_(cHF,oXF)
var hIF=_v()
_(cHF,hIF)
if(_oz(z,9,e,s,gg)){hIF.wxVkey=1
var cYF=_mz(z,'bwc',['bind:__l',10,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(hIF,cYF)
}
var oJF=_v()
_(cHF,oJF)
if(_oz(z,14,e,s,gg)){oJF.wxVkey=1
var oZF=_mz(z,'library',['bind:__l',15,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(oJF,oZF)
}
var cKF=_v()
_(cHF,cKF)
if(_oz(z,19,e,s,gg)){cKF.wxVkey=1
var l1F=_mz(z,'orderlist',['bind:__l',20,'class',1,'data-ref',2,'type',3,'vueId',4],[],e,s,gg)
_(cKF,l1F)
}
var oLF=_v()
_(cHF,oLF)
if(_oz(z,25,e,s,gg)){oLF.wxVkey=1
var a2F=_mz(z,'my',['bind:__l',26,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(oLF,a2F)
}
var lMF=_v()
_(cHF,lMF)
if(_oz(z,30,e,s,gg)){lMF.wxVkey=1
var t3F=_mz(z,'welfare',['bind:__l',31,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(lMF,t3F)
}
var aNF=_v()
_(cHF,aNF)
if(_oz(z,35,e,s,gg)){aNF.wxVkey=1
var e4F=_mz(z,'place-order',['bind:__l',36,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(aNF,e4F)
}
var tOF=_v()
_(cHF,tOF)
if(_oz(z,40,e,s,gg)){tOF.wxVkey=1
var b5F=_mz(z,'pullnewactivity',['bind:__l',41,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(tOF,b5F)
}
var ePF=_v()
_(cHF,ePF)
if(_oz(z,45,e,s,gg)){ePF.wxVkey=1
var o6F=_mz(z,'my-fans',['bind:__l',46,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(ePF,o6F)
}
var bQF=_v()
_(cHF,bQF)
if(_oz(z,50,e,s,gg)){bQF.wxVkey=1
var x7F=_mz(z,'my-poster',['bind:__l',51,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(bQF,x7F)
}
var oRF=_v()
_(cHF,oRF)
if(_oz(z,55,e,s,gg)){oRF.wxVkey=1
var o8F=_mz(z,'my-order',['bind:__l',56,'class',1,'data-ref',2,'hometype',3,'vueId',4],[],e,s,gg)
_(oRF,o8F)
}
var xSF=_v()
_(cHF,xSF)
if(_oz(z,61,e,s,gg)){xSF.wxVkey=1
var f9F=_mz(z,'team-order',['bind:__l',62,'class',1,'data-ref',2,'hometype',3,'vueId',4],[],e,s,gg)
_(xSF,f9F)
}
var oTF=_v()
_(cHF,oTF)
if(_oz(z,67,e,s,gg)){oTF.wxVkey=1
var c0F=_mz(z,'sign-reach',['bind:__l',68,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(oTF,c0F)
}
var fUF=_v()
_(cHF,fUF)
if(_oz(z,72,e,s,gg)){fUF.wxVkey=1
var hAG=_mz(z,'points-mall',['bind:__l',73,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(fUF,hAG)
}
var cVF=_v()
_(cHF,cVF)
if(_oz(z,77,e,s,gg)){cVF.wxVkey=1
var oBG=_mz(z,'luck-draw',['bind:__l',78,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(cVF,oBG)
}
var cCG=_mz(z,'not-phone',['bind:__l',82,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(cHF,cCG)
var hWF=_v()
_(cHF,hWF)
if(_oz(z,86,e,s,gg)){hWF.wxVkey=1
}
hIF.wxXCkey=1
hIF.wxXCkey=3
oJF.wxXCkey=1
oJF.wxXCkey=3
cKF.wxXCkey=1
cKF.wxXCkey=3
oLF.wxXCkey=1
oLF.wxXCkey=3
lMF.wxXCkey=1
lMF.wxXCkey=3
aNF.wxXCkey=1
aNF.wxXCkey=3
tOF.wxXCkey=1
tOF.wxXCkey=3
ePF.wxXCkey=1
ePF.wxXCkey=3
bQF.wxXCkey=1
bQF.wxXCkey=3
oRF.wxXCkey=1
oRF.wxXCkey=3
xSF.wxXCkey=1
xSF.wxXCkey=3
oTF.wxXCkey=1
oTF.wxXCkey=3
fUF.wxXCkey=1
fUF.wxXCkey=3
cVF.wxXCkey=1
cVF.wxXCkey=3
hWF.wxXCkey=1
_(r,cHF)
return r
}
e_[x[12]]={f:m12,j:[],i:[],ti:[],ic:[]}
d_[x[13]]={}
var m13=function(e,s,r,gg){
var z=gz$gwx_14()
var lEG=_n('view')
_rz(z,lEG,'class',0,e,s,gg)
var tUG=_mz(z,'tabbar',['bind:Callback',1,'bind:__l',1,'class',2,'current',3,'data-event-opts',4,'phone',5,'tabList',6,'vueId',7],[],e,s,gg)
_(lEG,tUG)
var aFG=_v()
_(lEG,aFG)
if(_oz(z,9,e,s,gg)){aFG.wxVkey=1
var eVG=_mz(z,'bwc',['bind:__l',10,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(aFG,eVG)
}
var tGG=_v()
_(lEG,tGG)
if(_oz(z,14,e,s,gg)){tGG.wxVkey=1
var bWG=_mz(z,'library',['bind:__l',15,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(tGG,bWG)
}
var eHG=_v()
_(lEG,eHG)
if(_oz(z,19,e,s,gg)){eHG.wxVkey=1
var oXG=_mz(z,'orderlist',['bind:__l',20,'class',1,'data-ref',2,'type',3,'vueId',4],[],e,s,gg)
_(eHG,oXG)
}
var bIG=_v()
_(lEG,bIG)
if(_oz(z,25,e,s,gg)){bIG.wxVkey=1
var xYG=_mz(z,'my',['bind:__l',26,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(bIG,xYG)
}
var oJG=_v()
_(lEG,oJG)
if(_oz(z,30,e,s,gg)){oJG.wxVkey=1
var oZG=_mz(z,'welfare',['bind:__l',31,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(oJG,oZG)
}
var xKG=_v()
_(lEG,xKG)
if(_oz(z,35,e,s,gg)){xKG.wxVkey=1
var f1G=_mz(z,'place-order',['bind:__l',36,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(xKG,f1G)
}
var oLG=_v()
_(lEG,oLG)
if(_oz(z,40,e,s,gg)){oLG.wxVkey=1
var c2G=_mz(z,'pullnewactivity',['bind:__l',41,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(oLG,c2G)
}
var fMG=_v()
_(lEG,fMG)
if(_oz(z,45,e,s,gg)){fMG.wxVkey=1
var h3G=_mz(z,'my-fans',['bind:__l',46,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(fMG,h3G)
}
var cNG=_v()
_(lEG,cNG)
if(_oz(z,50,e,s,gg)){cNG.wxVkey=1
var o4G=_mz(z,'my-poster',['bind:__l',51,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(cNG,o4G)
}
var hOG=_v()
_(lEG,hOG)
if(_oz(z,55,e,s,gg)){hOG.wxVkey=1
var c5G=_mz(z,'my-order',['bind:__l',56,'class',1,'data-ref',2,'hometype',3,'vueId',4],[],e,s,gg)
_(hOG,c5G)
}
var oPG=_v()
_(lEG,oPG)
if(_oz(z,61,e,s,gg)){oPG.wxVkey=1
var o6G=_mz(z,'team-order',['bind:__l',62,'class',1,'data-ref',2,'hometype',3,'vueId',4],[],e,s,gg)
_(oPG,o6G)
}
var cQG=_v()
_(lEG,cQG)
if(_oz(z,67,e,s,gg)){cQG.wxVkey=1
var l7G=_mz(z,'sign-reach',['bind:__l',68,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(cQG,l7G)
}
var oRG=_v()
_(lEG,oRG)
if(_oz(z,72,e,s,gg)){oRG.wxVkey=1
var a8G=_mz(z,'points-mall',['bind:__l',73,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(oRG,a8G)
}
var lSG=_v()
_(lEG,lSG)
if(_oz(z,77,e,s,gg)){lSG.wxVkey=1
var t9G=_mz(z,'luck-draw',['bind:__l',78,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(lSG,t9G)
}
var e0G=_mz(z,'not-phone',['bind:__l',82,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(lEG,e0G)
var aTG=_v()
_(lEG,aTG)
if(_oz(z,86,e,s,gg)){aTG.wxVkey=1
}
aFG.wxXCkey=1
aFG.wxXCkey=3
tGG.wxXCkey=1
tGG.wxXCkey=3
eHG.wxXCkey=1
eHG.wxXCkey=3
bIG.wxXCkey=1
bIG.wxXCkey=3
oJG.wxXCkey=1
oJG.wxXCkey=3
xKG.wxXCkey=1
xKG.wxXCkey=3
oLG.wxXCkey=1
oLG.wxXCkey=3
fMG.wxXCkey=1
fMG.wxXCkey=3
cNG.wxXCkey=1
cNG.wxXCkey=3
hOG.wxXCkey=1
hOG.wxXCkey=3
oPG.wxXCkey=1
oPG.wxXCkey=3
cQG.wxXCkey=1
cQG.wxXCkey=3
oRG.wxXCkey=1
oRG.wxXCkey=3
lSG.wxXCkey=1
lSG.wxXCkey=3
aTG.wxXCkey=1
_(r,lEG)
return r
}
e_[x[13]]={f:m13,j:[],i:[],ti:[],ic:[]}
d_[x[14]]={}
var m14=function(e,s,r,gg){
var z=gz$gwx_15()
var oBH=_mz(z,'view',['class',0,'style',1],[],e,s,gg)
var fEH=_n('view')
_rz(z,fEH,'class',2,e,s,gg)
var hGH=_v()
_(fEH,hGH)
var oHH=function(oJH,cIH,lKH,gg){
var tMH=_mz(z,'view',['bindtap',7,'class',1,'data-event-opts',2],[],oJH,cIH,gg)
var eNH=_v()
_(tMH,eNH)
if(_oz(z,10,oJH,cIH,gg)){eNH.wxVkey=1
}
var bOH=_v()
_(tMH,bOH)
if(_oz(z,11,oJH,cIH,gg)){bOH.wxVkey=1
}
var oPH=_v()
_(tMH,oPH)
if(_oz(z,12,oJH,cIH,gg)){oPH.wxVkey=1
var xQH=_v()
_(oPH,xQH)
var oRH=function(cTH,fSH,hUH,gg){
var cWH=_v()
_(hUH,cWH)
if(_oz(z,17,cTH,fSH,gg)){cWH.wxVkey=1
}
cWH.wxXCkey=1
return hUH
}
xQH.wxXCkey=2
_2z(z,15,oRH,oJH,cIH,gg,xQH,'items','indexs','indexs')
}
eNH.wxXCkey=1
bOH.wxXCkey=1
oPH.wxXCkey=1
_(lKH,tMH)
return lKH
}
hGH.wxXCkey=2
_2z(z,5,oHH,e,s,gg,hGH,'item','index','index')
var cFH=_v()
_(fEH,cFH)
if(_oz(z,18,e,s,gg)){cFH.wxVkey=1
var oXH=_mz(z,'not-yet-data',['bind:__l',19,'class',1,'vueId',2],[],e,s,gg)
_(cFH,oXH)
}
cFH.wxXCkey=1
cFH.wxXCkey=3
_(oBH,fEH)
var xCH=_v()
_(oBH,xCH)
if(_oz(z,22,e,s,gg)){xCH.wxVkey=1
var lYH=_n('view')
_rz(z,lYH,'class',23,e,s,gg)
var e2H=_n('view')
_rz(z,e2H,'class',24,e,s,gg)
var b3H=_v()
_(e2H,b3H)
if(_oz(z,25,e,s,gg)){b3H.wxVkey=1
}
var o4H=_v()
_(e2H,o4H)
if(_oz(z,26,e,s,gg)){o4H.wxVkey=1
}
b3H.wxXCkey=1
o4H.wxXCkey=1
_(lYH,e2H)
var aZH=_v()
_(lYH,aZH)
if(_oz(z,27,e,s,gg)){aZH.wxVkey=1
}
var t1H=_v()
_(lYH,t1H)
if(_oz(z,28,e,s,gg)){t1H.wxVkey=1
}
aZH.wxXCkey=1
t1H.wxXCkey=1
_(xCH,lYH)
}
var oDH=_v()
_(oBH,oDH)
if(_oz(z,29,e,s,gg)){oDH.wxVkey=1
}
xCH.wxXCkey=1
oDH.wxXCkey=1
_(r,oBH)
return r
}
e_[x[14]]={f:m14,j:[],i:[],ti:[],ic:[]}
d_[x[15]]={}
var m15=function(e,s,r,gg){
var z=gz$gwx_16()
var o6H=_mz(z,'view',['class',0,'style',1],[],e,s,gg)
var f7H=_mz(z,'navbar',['backLcok',2,'bgColor',1,'bind:__l',2,'class',3,'pageTitle',4,'pageTitleColor',5,'vueId',6],[],e,s,gg)
_(o6H,f7H)
var c8H=_n('view')
_rz(z,c8H,'class',9,e,s,gg)
var h9H=_v()
_(c8H,h9H)
if(_oz(z,10,e,s,gg)){h9H.wxVkey=1
}
var o0H=_n('view')
_rz(z,o0H,'class',11,e,s,gg)
var cAI=_v()
_(o0H,cAI)
if(_oz(z,12,e,s,gg)){cAI.wxVkey=1
}
else{cAI.wxVkey=2
var oBI=_mz(z,'view',['bindtap',13,'class',1,'data-event-opts',2,'style',3],[],e,s,gg)
var lCI=_v()
_(oBI,lCI)
if(_oz(z,17,e,s,gg)){lCI.wxVkey=1
}
lCI.wxXCkey=1
_(cAI,oBI)
}
cAI.wxXCkey=1
_(c8H,o0H)
h9H.wxXCkey=1
_(o6H,c8H)
var aDI=_mz(z,'popup',['bind:__l',18,'class',1,'data-ref',2,'flex',3,'title',4,'vueId',5,'vueSlots',6],[],e,s,gg)
var tEI=_mz(z,'view',['class',25,'slot',1],[],e,s,gg)
var eFI=_v()
_(tEI,eFI)
if(_oz(z,27,e,s,gg)){eFI.wxVkey=1
}
else{eFI.wxVkey=2
var bGI=_v()
_(eFI,bGI)
if(_oz(z,28,e,s,gg)){bGI.wxVkey=1
}
else{bGI.wxVkey=2
var oHI=_v()
_(bGI,oHI)
if(_oz(z,29,e,s,gg)){oHI.wxVkey=1
}
oHI.wxXCkey=1
}
bGI.wxXCkey=1
}
eFI.wxXCkey=1
_(aDI,tEI)
_(o6H,aDI)
var xII=_mz(z,'popup',['bind:__l',30,'class',1,'data-ref',2,'vueId',3,'vueSlots',4],[],e,s,gg)
_(o6H,xII)
var oJI=_mz(z,'popup',['bind:__l',35,'class',1,'data-ref',2,'flex',3,'title',4,'vueId',5,'vueSlots',6],[],e,s,gg)
_(o6H,oJI)
var fKI=_mz(z,'popup',['bind:__l',42,'class',1,'data-ref',2,'flex',3,'title',4,'vueId',5,'vueSlots',6],[],e,s,gg)
_(o6H,fKI)
_(r,o6H)
return r
}
e_[x[15]]={f:m15,j:[],i:[],ti:[],ic:[]}
d_[x[16]]={}
var m16=function(e,s,r,gg){
var z=gz$gwx_17()
var hMI=_n('view')
_rz(z,hMI,'class',0,e,s,gg)
var oNI=_v()
_(hMI,oNI)
if(_oz(z,1,e,s,gg)){oNI.wxVkey=1
var cOI=_mz(z,'not-yet-data',['bind:__l',2,'class',1,'vueId',2],[],e,s,gg)
_(oNI,cOI)
}
else{oNI.wxVkey=2
}
oNI.wxXCkey=1
oNI.wxXCkey=3
_(r,hMI)
return r
}
e_[x[16]]={f:m16,j:[],i:[],ti:[],ic:[]}
d_[x[17]]={}
var m17=function(e,s,r,gg){
var z=gz$gwx_18()
var lQI=_mz(z,'view',['class',0,'style',1],[],e,s,gg)
var cZI=_n('view')
_rz(z,cZI,'class',2,e,s,gg)
var h1I=_v()
_(cZI,h1I)
if(_oz(z,3,e,s,gg)){h1I.wxVkey=1
var c3I=_n('view')
_rz(z,c3I,'class',4,e,s,gg)
var o4I=_v()
_(c3I,o4I)
if(_oz(z,5,e,s,gg)){o4I.wxVkey=1
}
var l5I=_v()
_(c3I,l5I)
if(_oz(z,6,e,s,gg)){l5I.wxVkey=1
}
var a6I=_v()
_(c3I,a6I)
if(_oz(z,7,e,s,gg)){a6I.wxVkey=1
var t7I=_v()
_(a6I,t7I)
if(_oz(z,8,e,s,gg)){t7I.wxVkey=1
}
t7I.wxXCkey=1
}
o4I.wxXCkey=1
l5I.wxXCkey=1
a6I.wxXCkey=1
_(h1I,c3I)
}
var o2I=_v()
_(cZI,o2I)
if(_oz(z,9,e,s,gg)){o2I.wxVkey=1
var e8I=_v()
_(o2I,e8I)
if(_oz(z,10,e,s,gg)){e8I.wxVkey=1
}
e8I.wxXCkey=1
}
h1I.wxXCkey=1
o2I.wxXCkey=1
_(lQI,cZI)
var aRI=_v()
_(lQI,aRI)
if(_oz(z,11,e,s,gg)){aRI.wxVkey=1
}
var tSI=_v()
_(lQI,tSI)
if(_oz(z,12,e,s,gg)){tSI.wxVkey=1
}
var eTI=_v()
_(lQI,eTI)
if(_oz(z,13,e,s,gg)){eTI.wxVkey=1
var b9I=_v()
_(eTI,b9I)
var o0I=function(oBJ,xAJ,fCJ,gg){
var hEJ=_n('view')
_rz(z,hEJ,'class',18,oBJ,xAJ,gg)
var oFJ=_v()
_(hEJ,oFJ)
if(_oz(z,19,oBJ,xAJ,gg)){oFJ.wxVkey=1
}
else{oFJ.wxVkey=2
var cGJ=_v()
_(oFJ,cGJ)
if(_oz(z,20,oBJ,xAJ,gg)){cGJ.wxVkey=1
var oHJ=_mz(z,'view',['bindtap',21,'class',1,'data-event-opts',2],[],oBJ,xAJ,gg)
var lIJ=_v()
_(oHJ,lIJ)
if(_oz(z,24,oBJ,xAJ,gg)){lIJ.wxVkey=1
}
lIJ.wxXCkey=1
_(cGJ,oHJ)
}
else{cGJ.wxVkey=2
}
cGJ.wxXCkey=1
}
oFJ.wxXCkey=1
_(fCJ,hEJ)
return fCJ
}
b9I.wxXCkey=2
_2z(z,16,o0I,e,s,gg,b9I,'item','index','index')
}
var bUI=_v()
_(lQI,bUI)
if(_oz(z,25,e,s,gg)){bUI.wxVkey=1
}
var oVI=_v()
_(lQI,oVI)
if(_oz(z,26,e,s,gg)){oVI.wxVkey=1
}
var aJJ=_mz(z,'popup',['bind:__l',27,'class',1,'data-ref',2,'flex',3,'title',4,'vueId',5,'vueSlots',6],[],e,s,gg)
_(lQI,aJJ)
var xWI=_v()
_(lQI,xWI)
if(_oz(z,34,e,s,gg)){xWI.wxVkey=1
var tKJ=_v()
_(xWI,tKJ)
if(_oz(z,35,e,s,gg)){tKJ.wxVkey=1
}
tKJ.wxXCkey=1
}
var oXI=_v()
_(lQI,oXI)
if(_oz(z,36,e,s,gg)){oXI.wxVkey=1
}
var fYI=_v()
_(lQI,fYI)
if(_oz(z,37,e,s,gg)){fYI.wxVkey=1
var eLJ=_v()
_(fYI,eLJ)
if(_oz(z,38,e,s,gg)){eLJ.wxVkey=1
}
eLJ.wxXCkey=1
}
aRI.wxXCkey=1
tSI.wxXCkey=1
eTI.wxXCkey=1
bUI.wxXCkey=1
oVI.wxXCkey=1
xWI.wxXCkey=1
oXI.wxXCkey=1
fYI.wxXCkey=1
_(r,lQI)
return r
}
e_[x[17]]={f:m17,j:[],i:[],ti:[],ic:[]}
d_[x[18]]={}
var m18=function(e,s,r,gg){
var z=gz$gwx_19()
var oNJ=_mz(z,'view',['class',0,'style',1],[],e,s,gg)
var fQJ=_mz(z,'navbar',['backLcok',2,'bgColor',1,'bind:__l',2,'class',3,'pageTitle',4,'pageTitleColor',5,'vueId',6],[],e,s,gg)
_(oNJ,fQJ)
var xOJ=_v()
_(oNJ,xOJ)
if(_oz(z,9,e,s,gg)){xOJ.wxVkey=1
var hSJ=_n('view')
_rz(z,hSJ,'class',11,e,s,gg)
var oTJ=_v()
_(hSJ,oTJ)
if(_oz(z,12,e,s,gg)){oTJ.wxVkey=1
}
var cUJ=_v()
_(hSJ,cUJ)
if(_oz(z,13,e,s,gg)){cUJ.wxVkey=1
}
var oVJ=_v()
_(hSJ,oVJ)
if(_oz(z,14,e,s,gg)){oVJ.wxVkey=1
}
oTJ.wxXCkey=1
cUJ.wxXCkey=1
oVJ.wxXCkey=1
_(xOJ,hSJ)
var cRJ=_v()
_(xOJ,cRJ)
if(_oz(z,15,e,s,gg)){cRJ.wxVkey=1
var lWJ=_v()
_(cRJ,lWJ)
var aXJ=function(eZJ,tYJ,b1J,gg){
var x3J=_mz(z,'view',['bindtap',20,'class',1,'data-event-opts',2],[],eZJ,tYJ,gg)
var o4J=_v()
_(x3J,o4J)
if(_oz(z,23,eZJ,tYJ,gg)){o4J.wxVkey=1
}
o4J.wxXCkey=1
_(b1J,x3J)
return b1J
}
lWJ.wxXCkey=2
_2z(z,18,aXJ,e,s,gg,lWJ,'item','__i1__','value')
}
cRJ.wxXCkey=1
}
var oPJ=_v()
_(oNJ,oPJ)
if(_oz(z,24,e,s,gg)){oPJ.wxVkey=1
var f5J=_v()
_(oPJ,f5J)
if(_oz(z,25,e,s,gg)){f5J.wxVkey=1
}
f5J.wxXCkey=1
}
var c6J=_mz(z,'scroll-view',['bindscrolltolower',26,'class',1,'data-event-opts',2,'refresherEnabled',3,'scrollY',4],[],e,s,gg)
var h7J=_v()
_(c6J,h7J)
if(_oz(z,31,e,s,gg)){h7J.wxVkey=1
var o8J=_mz(z,'not-yet-data',['bind:__l',32,'class',1,'vueId',2],[],e,s,gg)
_(h7J,o8J)
}
h7J.wxXCkey=1
h7J.wxXCkey=3
_(oNJ,c6J)
xOJ.wxXCkey=1
oPJ.wxXCkey=1
_(r,oNJ)
return r
}
e_[x[18]]={f:m18,j:[],i:[],ti:[],ic:[]}
d_[x[19]]={}
var m19=function(e,s,r,gg){
var z=gz$gwx_20()
var o0J=_mz(z,'view',['class',0,'style',1],[],e,s,gg)
var aBK=_mz(z,'navbar',['backLcok',2,'bgColor',1,'bind:__l',2,'class',3,'pageTitle',4,'pageTitleColor',5,'vueId',6],[],e,s,gg)
_(o0J,aBK)
var lAK=_v()
_(o0J,lAK)
if(_oz(z,9,e,s,gg)){lAK.wxVkey=1
}
var tCK=_n('view')
_rz(z,tCK,'class',10,e,s,gg)
var bEK=_v()
_(tCK,bEK)
var oFK=function(oHK,xGK,fIK,gg){
var hKK=_v()
_(fIK,hKK)
if(_oz(z,15,oHK,xGK,gg)){hKK.wxVkey=1
var lOK=_n('view')
_rz(z,lOK,'class',17,oHK,xGK,gg)
var aPK=_v()
_(lOK,aPK)
if(_oz(z,18,oHK,xGK,gg)){aPK.wxVkey=1
}
var tQK=_v()
_(lOK,tQK)
if(_oz(z,19,oHK,xGK,gg)){tQK.wxVkey=1
}
var eRK=_v()
_(lOK,eRK)
if(_oz(z,20,oHK,xGK,gg)){eRK.wxVkey=1
}
var bSK=_v()
_(lOK,bSK)
if(_oz(z,21,oHK,xGK,gg)){bSK.wxVkey=1
}
aPK.wxXCkey=1
tQK.wxXCkey=1
eRK.wxXCkey=1
bSK.wxXCkey=1
_(hKK,lOK)
var oLK=_v()
_(hKK,oLK)
if(_oz(z,22,oHK,xGK,gg)){oLK.wxVkey=1
}
var cMK=_v()
_(hKK,cMK)
if(_oz(z,23,oHK,xGK,gg)){cMK.wxVkey=1
}
var oNK=_v()
_(hKK,oNK)
if(_oz(z,24,oHK,xGK,gg)){oNK.wxVkey=1
}
oLK.wxXCkey=1
cMK.wxXCkey=1
oNK.wxXCkey=1
}
hKK.wxXCkey=1
return fIK
}
bEK.wxXCkey=2
_2z(z,13,oFK,e,s,gg,bEK,'item','index','index')
var eDK=_v()
_(tCK,eDK)
if(_oz(z,25,e,s,gg)){eDK.wxVkey=1
var oTK=_mz(z,'not-yet-data',['bind:__l',26,'class',1,'vueId',2],[],e,s,gg)
_(eDK,oTK)
}
var xUK=_mz(z,'load-more',['bind:__l',29,'class',1,'data-ref',2,'vueId',3],[],e,s,gg)
_(tCK,xUK)
eDK.wxXCkey=1
eDK.wxXCkey=3
_(o0J,tCK)
var oVK=_mz(z,'topping',['bind:__l',33,'class',1,'condition',2,'data-ref',3,'scrollTop',4,'vueId',5],[],e,s,gg)
_(o0J,oVK)
lAK.wxXCkey=1
_(r,o0J)
return r
}
e_[x[19]]={f:m19,j:[],i:[],ti:[],ic:[]}
d_[x[20]]={}
var m20=function(e,s,r,gg){
var z=gz$gwx_21()
var cXK=_mz(z,'view',['class',0,'style',1],[],e,s,gg)
var oZK=_mz(z,'navbar',['backLcok',2,'bgColor',1,'bind:__l',2,'class',3,'pageTitle',4,'pageTitleColor',5,'vueId',6],[],e,s,gg)
_(cXK,oZK)
var hYK=_v()
_(cXK,hYK)
if(_oz(z,9,e,s,gg)){hYK.wxVkey=1
var c1K=_n('view')
_rz(z,c1K,'class',10,e,s,gg)
var a4K=_mz(z,'swiper',['bindchange',11,'class',1,'data-event-opts',2,'duration',3,'indicatorActiveColor',4,'indicatorColor',5,'indicatorDots',6,'nextMargin',7,'previousMargin',8],[],e,s,gg)
var t5K=_v()
_(a4K,t5K)
var e6K=function(o8K,b7K,x9K,gg){
var fAL=_n('view')
_rz(z,fAL,'class',24,o8K,b7K,gg)
var cBL=_v()
_(fAL,cBL)
if(_oz(z,25,o8K,b7K,gg)){cBL.wxVkey=1
var hCL=_v()
_(cBL,hCL)
if(_oz(z,27,o8K,b7K,gg)){hCL.wxVkey=1
}
var oDL=_v()
_(cBL,oDL)
if(_oz(z,28,o8K,b7K,gg)){oDL.wxVkey=1
}
var cEL=_v()
_(cBL,cEL)
if(_oz(z,29,o8K,b7K,gg)){cEL.wxVkey=1
}
else{cEL.wxVkey=2
var oFL=_v()
_(cEL,oFL)
if(_oz(z,30,o8K,b7K,gg)){oFL.wxVkey=1
}
oFL.wxXCkey=1
}
hCL.wxXCkey=1
oDL.wxXCkey=1
cEL.wxXCkey=1
}
else{cBL.wxVkey=2
}
cBL.wxXCkey=1
_(x9K,fAL)
return x9K
}
t5K.wxXCkey=2
_2z(z,22,e6K,e,s,gg,t5K,'item','index','index')
_(c1K,a4K)
var o2K=_v()
_(c1K,o2K)
if(_oz(z,31,e,s,gg)){o2K.wxVkey=1
var lGL=_n('view')
_rz(z,lGL,'class',32,e,s,gg)
var aHL=_v()
_(lGL,aHL)
if(_oz(z,33,e,s,gg)){aHL.wxVkey=1
}
var tIL=_v()
_(lGL,tIL)
if(_oz(z,34,e,s,gg)){tIL.wxVkey=1
}
var eJL=_v()
_(lGL,eJL)
if(_oz(z,35,e,s,gg)){eJL.wxVkey=1
}
var bKL=_v()
_(lGL,bKL)
if(_oz(z,36,e,s,gg)){bKL.wxVkey=1
}
var oLL=_v()
_(lGL,oLL)
if(_oz(z,37,e,s,gg)){oLL.wxVkey=1
}
var xML=_v()
_(lGL,xML)
if(_oz(z,38,e,s,gg)){xML.wxVkey=1
}
aHL.wxXCkey=1
tIL.wxXCkey=1
eJL.wxXCkey=1
bKL.wxXCkey=1
oLL.wxXCkey=1
xML.wxXCkey=1
_(o2K,lGL)
}
var l3K=_v()
_(c1K,l3K)
if(_oz(z,39,e,s,gg)){l3K.wxVkey=1
}
o2K.wxXCkey=1
l3K.wxXCkey=1
_(hYK,c1K)
}
else{hYK.wxVkey=2
}
hYK.wxXCkey=1
_(r,cXK)
return r
}
e_[x[20]]={f:m20,j:[],i:[],ti:[],ic:[]}
d_[x[21]]={}
var m21=function(e,s,r,gg){
var z=gz$gwx_22()
var fOL=_mz(z,'view',['class',0,'style',1],[],e,s,gg)
var aVL=_mz(z,'navbar',['backLcok',2,'bgColor',1,'bind:__l',2,'class',3,'pageTitle',4,'pageTitleColor',5,'vueId',6],[],e,s,gg)
_(fOL,aVL)
var cPL=_v()
_(fOL,cPL)
if(_oz(z,9,e,s,gg)){cPL.wxVkey=1
}
var hQL=_v()
_(fOL,hQL)
if(_oz(z,10,e,s,gg)){hQL.wxVkey=1
}
var tWL=_n('view')
_rz(z,tWL,'class',11,e,s,gg)
var bYL=_v()
_(tWL,bYL)
var oZL=function(o2L,x1L,f3L,gg){
var h5L=_n('view')
_rz(z,h5L,'class',16,o2L,x1L,gg)
var o8L=_n('view')
_rz(z,o8L,'class',17,o2L,x1L,gg)
var l9L=_mz(z,'view',['bindtap',18,'class',1,'data-event-opts',2],[],o2L,x1L,gg)
var a0L=_v()
_(l9L,a0L)
if(_oz(z,21,o2L,x1L,gg)){a0L.wxVkey=1
var tAM=_n('view')
_rz(z,tAM,'class',22,o2L,x1L,gg)
var eBM=_v()
_(tAM,eBM)
if(_oz(z,23,o2L,x1L,gg)){eBM.wxVkey=1
}
var bCM=_v()
_(tAM,bCM)
if(_oz(z,24,o2L,x1L,gg)){bCM.wxVkey=1
}
eBM.wxXCkey=1
bCM.wxXCkey=1
_(a0L,tAM)
}
a0L.wxXCkey=1
_(o8L,l9L)
var oDM=_n('view')
_rz(z,oDM,'class',25,o2L,x1L,gg)
var xEM=_mz(z,'view',['bindtap',26,'class',1,'data-event-opts',2],[],o2L,x1L,gg)
var oFM=_v()
_(xEM,oFM)
if(_oz(z,29,o2L,x1L,gg)){oFM.wxVkey=1
}
oFM.wxXCkey=1
_(oDM,xEM)
var fGM=_mz(z,'view',['bindtap',30,'class',1,'data-event-opts',2],[],o2L,x1L,gg)
var cHM=_v()
_(fGM,cHM)
if(_oz(z,33,o2L,x1L,gg)){cHM.wxVkey=1
}
var hIM=_v()
_(fGM,hIM)
if(_oz(z,34,o2L,x1L,gg)){hIM.wxVkey=1
}
var oJM=_v()
_(fGM,oJM)
if(_oz(z,35,o2L,x1L,gg)){oJM.wxVkey=1
}
var cKM=_v()
_(fGM,cKM)
if(_oz(z,36,o2L,x1L,gg)){cKM.wxVkey=1
}
cHM.wxXCkey=1
hIM.wxXCkey=1
oJM.wxXCkey=1
cKM.wxXCkey=1
_(oDM,fGM)
var oLM=_mz(z,'view',['bindtap',37,'class',1,'data-event-opts',2],[],o2L,x1L,gg)
var lMM=_v()
_(oLM,lMM)
if(_oz(z,40,o2L,x1L,gg)){lMM.wxVkey=1
}
lMM.wxXCkey=1
_(oDM,oLM)
_(o8L,oDM)
_(h5L,o8L)
var o6L=_v()
_(h5L,o6L)
if(_oz(z,41,o2L,x1L,gg)){o6L.wxVkey=1
}
var c7L=_v()
_(h5L,c7L)
if(_oz(z,42,o2L,x1L,gg)){c7L.wxVkey=1
var aNM=_n('view')
_rz(z,aNM,'class',43,o2L,x1L,gg)
var tOM=_v()
_(aNM,tOM)
if(_oz(z,44,o2L,x1L,gg)){tOM.wxVkey=1
}
var ePM=_v()
_(aNM,ePM)
if(_oz(z,45,o2L,x1L,gg)){ePM.wxVkey=1
}
var bQM=_v()
_(aNM,bQM)
if(_oz(z,46,o2L,x1L,gg)){bQM.wxVkey=1
}
var oRM=_v()
_(aNM,oRM)
if(_oz(z,47,o2L,x1L,gg)){oRM.wxVkey=1
}
var xSM=_v()
_(aNM,xSM)
if(_oz(z,48,o2L,x1L,gg)){xSM.wxVkey=1
}
var oTM=_v()
_(aNM,oTM)
if(_oz(z,49,o2L,x1L,gg)){oTM.wxVkey=1
}
var fUM=_v()
_(aNM,fUM)
if(_oz(z,50,o2L,x1L,gg)){fUM.wxVkey=1
}
var cVM=_v()
_(aNM,cVM)
if(_oz(z,51,o2L,x1L,gg)){cVM.wxVkey=1
}
var hWM=_v()
_(aNM,hWM)
if(_oz(z,52,o2L,x1L,gg)){hWM.wxVkey=1
}
var oXM=_v()
_(aNM,oXM)
if(_oz(z,53,o2L,x1L,gg)){oXM.wxVkey=1
}
var cYM=_v()
_(aNM,cYM)
if(_oz(z,54,o2L,x1L,gg)){cYM.wxVkey=1
}
var oZM=_v()
_(aNM,oZM)
if(_oz(z,55,o2L,x1L,gg)){oZM.wxVkey=1
}
tOM.wxXCkey=1
ePM.wxXCkey=1
bQM.wxXCkey=1
oRM.wxXCkey=1
xSM.wxXCkey=1
oTM.wxXCkey=1
fUM.wxXCkey=1
cVM.wxXCkey=1
hWM.wxXCkey=1
oXM.wxXCkey=1
cYM.wxXCkey=1
oZM.wxXCkey=1
_(c7L,aNM)
}
o6L.wxXCkey=1
c7L.wxXCkey=1
_(f3L,h5L)
return f3L
}
bYL.wxXCkey=2
_2z(z,14,oZL,e,s,gg,bYL,'item','index','index')
var eXL=_v()
_(tWL,eXL)
if(_oz(z,56,e,s,gg)){eXL.wxVkey=1
var l1M=_mz(z,'not-yet-data',['bind:__l',57,'class',1,'vueId',2],[],e,s,gg)
_(eXL,l1M)
}
eXL.wxXCkey=1
eXL.wxXCkey=3
_(fOL,tWL)
var oRL=_v()
_(fOL,oRL)
if(_oz(z,60,e,s,gg)){oRL.wxVkey=1
}
var cSL=_v()
_(fOL,cSL)
if(_oz(z,61,e,s,gg)){cSL.wxVkey=1
}
var oTL=_v()
_(fOL,oTL)
if(_oz(z,62,e,s,gg)){oTL.wxVkey=1
var a2M=_n('view')
_rz(z,a2M,'class',63,e,s,gg)
var t3M=_v()
_(a2M,t3M)
if(_oz(z,64,e,s,gg)){t3M.wxVkey=1
}
var e4M=_v()
_(a2M,e4M)
if(_oz(z,65,e,s,gg)){e4M.wxVkey=1
}
t3M.wxXCkey=1
e4M.wxXCkey=1
_(oTL,a2M)
}
var lUL=_v()
_(fOL,lUL)
if(_oz(z,66,e,s,gg)){lUL.wxVkey=1
var b5M=_n('view')
_rz(z,b5M,'class',67,e,s,gg)
var o6M=_v()
_(b5M,o6M)
if(_oz(z,68,e,s,gg)){o6M.wxVkey=1
var f9M=_v()
_(o6M,f9M)
var c0M=function(oBN,hAN,cCN,gg){
var lEN=_n('view')
_rz(z,lEN,'class',73,oBN,hAN,gg)
var tGN=_n('view')
_rz(z,tGN,'class',74,oBN,hAN,gg)
var eHN=_v()
_(tGN,eHN)
if(_oz(z,75,oBN,hAN,gg)){eHN.wxVkey=1
}
var bIN=_v()
_(tGN,bIN)
if(_oz(z,76,oBN,hAN,gg)){bIN.wxVkey=1
}
var oJN=_v()
_(tGN,oJN)
if(_oz(z,77,oBN,hAN,gg)){oJN.wxVkey=1
}
eHN.wxXCkey=1
bIN.wxXCkey=1
oJN.wxXCkey=1
_(lEN,tGN)
var aFN=_v()
_(lEN,aFN)
if(_oz(z,78,oBN,hAN,gg)){aFN.wxVkey=1
var xKN=_v()
_(aFN,xKN)
if(_oz(z,79,oBN,hAN,gg)){xKN.wxVkey=1
}
xKN.wxXCkey=1
}
aFN.wxXCkey=1
_(cCN,lEN)
return cCN
}
f9M.wxXCkey=2
_2z(z,71,c0M,e,s,gg,f9M,'item','index','index')
}
var x7M=_v()
_(b5M,x7M)
if(_oz(z,80,e,s,gg)){x7M.wxVkey=1
}
var o8M=_v()
_(b5M,o8M)
if(_oz(z,81,e,s,gg)){o8M.wxVkey=1
}
o6M.wxXCkey=1
x7M.wxXCkey=1
o8M.wxXCkey=1
_(lUL,b5M)
}
cPL.wxXCkey=1
hQL.wxXCkey=1
oRL.wxXCkey=1
cSL.wxXCkey=1
oTL.wxXCkey=1
lUL.wxXCkey=1
_(r,fOL)
return r
}
e_[x[21]]={f:m21,j:[],i:[],ti:[],ic:[]}
d_[x[22]]={}
var m22=function(e,s,r,gg){
var z=gz$gwx_23()
var fMN=_mz(z,'view',['class',0,'style',1],[],e,s,gg)
var hON=_mz(z,'navbar',['backLcok',2,'bgColor',1,'bind:__l',2,'class',3,'pageTitle',4,'pageTitleColor',5,'vueId',6],[],e,s,gg)
_(fMN,hON)
var oPN=_n('view')
_rz(z,oPN,'class',9,e,s,gg)
var cQN=_v()
_(oPN,cQN)
if(_oz(z,10,e,s,gg)){cQN.wxVkey=1
}
var oRN=_v()
_(oPN,oRN)
if(_oz(z,11,e,s,gg)){oRN.wxVkey=1
var lSN=_v()
_(oRN,lSN)
if(_oz(z,12,e,s,gg)){lSN.wxVkey=1
}
lSN.wxXCkey=1
}
var aTN=_n('view')
_rz(z,aTN,'class',13,e,s,gg)
var tUN=_v()
_(aTN,tUN)
if(_oz(z,14,e,s,gg)){tUN.wxVkey=1
}
else{tUN.wxVkey=2
var eVN=_v()
_(tUN,eVN)
if(_oz(z,15,e,s,gg)){eVN.wxVkey=1
var bWN=_mz(z,'not-yet-data',['bind:__l',16,'class',1,'vueId',2],[],e,s,gg)
_(eVN,bWN)
}
eVN.wxXCkey=1
eVN.wxXCkey=3
}
tUN.wxXCkey=1
tUN.wxXCkey=3
_(oPN,aTN)
cQN.wxXCkey=1
oRN.wxXCkey=1
_(fMN,oPN)
var cNN=_v()
_(fMN,cNN)
if(_oz(z,19,e,s,gg)){cNN.wxVkey=1
var oXN=_v()
_(cNN,oXN)
var xYN=function(f1N,oZN,c2N,gg){
var o4N=_n('view')
_rz(z,o4N,'class',24,f1N,oZN,gg)
var c5N=_v()
_(o4N,c5N)
if(_oz(z,25,f1N,oZN,gg)){c5N.wxVkey=1
var o6N=_n('view')
_rz(z,o6N,'class',26,f1N,oZN,gg)
var l7N=_v()
_(o6N,l7N)
if(_oz(z,27,f1N,oZN,gg)){l7N.wxVkey=1
}
var a8N=_v()
_(o6N,a8N)
if(_oz(z,28,f1N,oZN,gg)){a8N.wxVkey=1
}
var t9N=_v()
_(o6N,t9N)
if(_oz(z,29,f1N,oZN,gg)){t9N.wxVkey=1
}
l7N.wxXCkey=1
a8N.wxXCkey=1
t9N.wxXCkey=1
_(c5N,o6N)
}
else{c5N.wxVkey=2
}
c5N.wxXCkey=1
_(c2N,o4N)
return c2N
}
oXN.wxXCkey=2
_2z(z,22,xYN,e,s,gg,oXN,'item','index','index')
}
cNN.wxXCkey=1
_(r,fMN)
return r
}
e_[x[22]]={f:m22,j:[],i:[],ti:[],ic:[]}
d_[x[23]]={}
var m23=function(e,s,r,gg){
var z=gz$gwx_24()
var bAO=_mz(z,'view',['class',0,'style',1],[],e,s,gg)
var xCO=_mz(z,'navbar',['backLcok',2,'bgColor',1,'bind:__l',2,'class',3,'pageTitle',4,'pageTitleColor',5,'vueId',6],[],e,s,gg)
_(bAO,xCO)
var oBO=_v()
_(bAO,oBO)
if(_oz(z,9,e,s,gg)){oBO.wxVkey=1
}
var oDO=_n('view')
_rz(z,oDO,'class',10,e,s,gg)
var fEO=_v()
_(oDO,fEO)
if(_oz(z,11,e,s,gg)){fEO.wxVkey=1
}
var cFO=_v()
_(oDO,cFO)
if(_oz(z,12,e,s,gg)){cFO.wxVkey=1
}
var hGO=_v()
_(oDO,hGO)
if(_oz(z,13,e,s,gg)){hGO.wxVkey=1
}
var oHO=_v()
_(oDO,oHO)
if(_oz(z,14,e,s,gg)){oHO.wxVkey=1
var cIO=_mz(z,'not-yet-data',['bind:__l',15,'class',1,'vueId',2],[],e,s,gg)
_(oHO,cIO)
}
fEO.wxXCkey=1
cFO.wxXCkey=1
hGO.wxXCkey=1
oHO.wxXCkey=1
oHO.wxXCkey=3
_(bAO,oDO)
var oJO=_mz(z,'topping',['bind:__l',18,'class',1,'condition',2,'data-ref',3,'scrollTop',4,'vueId',5],[],e,s,gg)
_(bAO,oJO)
oBO.wxXCkey=1
_(r,bAO)
return r
}
e_[x[23]]={f:m23,j:[],i:[],ti:[],ic:[]}
d_[x[24]]={}
var m24=function(e,s,r,gg){
var z=gz$gwx_25()
var aLO=_mz(z,'view',['class',0,'style',1],[],e,s,gg)
var bOO=_mz(z,'navbar',['backLcok',2,'bgColor',1,'bind:__l',2,'class',3,'pageTitle',4,'pageTitleColor',5,'vueId',6],[],e,s,gg)
_(aLO,bOO)
var tMO=_v()
_(aLO,tMO)
if(_oz(z,9,e,s,gg)){tMO.wxVkey=1
var oPO=_v()
_(tMO,oPO)
if(_oz(z,10,e,s,gg)){oPO.wxVkey=1
}
oPO.wxXCkey=1
}
var xQO=_n('view')
_rz(z,xQO,'class',11,e,s,gg)
var oRO=_v()
_(xQO,oRO)
if(_oz(z,12,e,s,gg)){oRO.wxVkey=1
}
else{oRO.wxVkey=2
var fSO=_v()
_(oRO,fSO)
if(_oz(z,13,e,s,gg)){fSO.wxVkey=1
var cTO=_mz(z,'not-yet-data',['bind:__l',14,'class',1,'vueId',2],[],e,s,gg)
_(fSO,cTO)
}
fSO.wxXCkey=1
fSO.wxXCkey=3
}
oRO.wxXCkey=1
oRO.wxXCkey=3
_(aLO,xQO)
var eNO=_v()
_(aLO,eNO)
if(_oz(z,17,e,s,gg)){eNO.wxVkey=1
var hUO=_v()
_(eNO,hUO)
var oVO=function(oXO,cWO,lYO,gg){
var t1O=_n('view')
_rz(z,t1O,'class',22,oXO,cWO,gg)
var e2O=_v()
_(t1O,e2O)
if(_oz(z,23,oXO,cWO,gg)){e2O.wxVkey=1
var b3O=_n('view')
_rz(z,b3O,'class',24,oXO,cWO,gg)
var o4O=_v()
_(b3O,o4O)
if(_oz(z,25,oXO,cWO,gg)){o4O.wxVkey=1
}
var x5O=_v()
_(b3O,x5O)
if(_oz(z,26,oXO,cWO,gg)){x5O.wxVkey=1
}
var o6O=_v()
_(b3O,o6O)
if(_oz(z,27,oXO,cWO,gg)){o6O.wxVkey=1
}
o4O.wxXCkey=1
x5O.wxXCkey=1
o6O.wxXCkey=1
_(e2O,b3O)
}
else{e2O.wxVkey=2
}
e2O.wxXCkey=1
_(lYO,t1O)
return lYO
}
hUO.wxXCkey=2
_2z(z,20,oVO,e,s,gg,hUO,'item','index','index')
}
tMO.wxXCkey=1
eNO.wxXCkey=1
_(r,aLO)
return r
}
e_[x[24]]={f:m24,j:[],i:[],ti:[],ic:[]}
d_[x[25]]={}
var m25=function(e,s,r,gg){
var z=gz$gwx_26()
var c8O=_mz(z,'view',['class',0,'style',1],[],e,s,gg)
var h9O=_v()
_(c8O,h9O)
if(_oz(z,2,e,s,gg)){h9O.wxVkey=1
}
var o0O=_v()
_(c8O,o0O)
if(_oz(z,3,e,s,gg)){o0O.wxVkey=1
}
var cAP=_v()
_(c8O,cAP)
if(_oz(z,4,e,s,gg)){cAP.wxVkey=1
var bGP=_v()
_(cAP,bGP)
if(_oz(z,5,e,s,gg)){bGP.wxVkey=1
}
bGP.wxXCkey=1
}
var oBP=_v()
_(c8O,oBP)
if(_oz(z,6,e,s,gg)){oBP.wxVkey=1
}
var lCP=_v()
_(c8O,lCP)
if(_oz(z,7,e,s,gg)){lCP.wxVkey=1
}
var aDP=_v()
_(c8O,aDP)
if(_oz(z,8,e,s,gg)){aDP.wxVkey=1
}
var tEP=_v()
_(c8O,tEP)
if(_oz(z,9,e,s,gg)){tEP.wxVkey=1
}
var eFP=_v()
_(c8O,eFP)
if(_oz(z,10,e,s,gg)){eFP.wxVkey=1
}
var oHP=_mz(z,'xp-picker',['actionPosition',11,'bind:__l',1,'bind:confirm',2,'class',3,'data-event-opts',4,'data-ref',5,'mode',6,'value',7,'vueId',8],[],e,s,gg)
_(c8O,oHP)
h9O.wxXCkey=1
o0O.wxXCkey=1
cAP.wxXCkey=1
oBP.wxXCkey=1
lCP.wxXCkey=1
aDP.wxXCkey=1
tEP.wxXCkey=1
eFP.wxXCkey=1
_(r,c8O)
return r
}
e_[x[25]]={f:m25,j:[],i:[],ti:[],ic:[]}
d_[x[26]]={}
var m26=function(e,s,r,gg){
var z=gz$gwx_27()
var oJP=_n('view')
_rz(z,oJP,'class',0,e,s,gg)
var fKP=_v()
_(oJP,fKP)
if(_oz(z,1,e,s,gg)){fKP.wxVkey=1
}
var cLP=_n('view')
_rz(z,cLP,'class',2,e,s,gg)
var oNP=_n('view')
_rz(z,oNP,'class',3,e,s,gg)
var cOP=_v()
_(oNP,cOP)
if(_oz(z,4,e,s,gg)){cOP.wxVkey=1
}
var oPP=_v()
_(oNP,oPP)
if(_oz(z,5,e,s,gg)){oPP.wxVkey=1
var tSP=_v()
_(oPP,tSP)
if(_oz(z,6,e,s,gg)){tSP.wxVkey=1
}
tSP.wxXCkey=1
}
var lQP=_v()
_(oNP,lQP)
if(_oz(z,7,e,s,gg)){lQP.wxVkey=1
}
var aRP=_v()
_(oNP,aRP)
if(_oz(z,8,e,s,gg)){aRP.wxVkey=1
}
cOP.wxXCkey=1
oPP.wxXCkey=1
lQP.wxXCkey=1
aRP.wxXCkey=1
_(cLP,oNP)
var hMP=_v()
_(cLP,hMP)
if(_oz(z,9,e,s,gg)){hMP.wxVkey=1
var eTP=_v()
_(hMP,eTP)
if(_oz(z,11,e,s,gg)){eTP.wxVkey=1
}
var bUP=_v()
_(hMP,bUP)
if(_oz(z,12,e,s,gg)){bUP.wxVkey=1
}
eTP.wxXCkey=1
bUP.wxXCkey=1
}
hMP.wxXCkey=1
_(oJP,cLP)
var oVP=_mz(z,'xp-picker',['actionPosition',13,'bind:__l',1,'bind:confirm',2,'class',3,'data-event-opts',4,'data-ref',5,'mode',6,'value',7,'vueId',8],[],e,s,gg)
_(oJP,oVP)
fKP.wxXCkey=1
_(r,oJP)
return r
}
e_[x[26]]={f:m26,j:[],i:[],ti:[],ic:[]}
d_[x[27]]={}
var m27=function(e,s,r,gg){
var z=gz$gwx_28()
var oXP=_mz(z,'view',['class',0,'style',1],[],e,s,gg)
var c3P=_mz(z,'navbar',['backLcok',2,'bgColor',1,'bind:__l',2,'class',3,'pageTitle',4,'pageTitleColor',5,'vueId',6],[],e,s,gg)
_(oXP,c3P)
var fYP=_v()
_(oXP,fYP)
if(_oz(z,9,e,s,gg)){fYP.wxVkey=1
var o4P=_mz(z,'template-one',['bind:__l',10,'bind:getPhone',1,'bind:hitCard',2,'bind:nav',3,'bind:openMsgTips',4,'bind:openRule',5,'bind:setMsgRemind',6,'bind:signIn',7,'class',8,'configInfo',9,'data-event-opts',10,'elm',11,'mt',12,'navHeight',13,'phone',14,'vueId',15],[],e,s,gg)
_(fYP,o4P)
}
var cZP=_v()
_(oXP,cZP)
if(_oz(z,26,e,s,gg)){cZP.wxVkey=1
var l5P=_mz(z,'template-two',['bind:__l',27,'bind:getPhone',1,'bind:hitCard',2,'bind:nav',3,'bind:openMsgTips',4,'bind:openRule',5,'bind:setMsgRemind',6,'bind:signIn',7,'class',8,'configInfo',9,'data-event-opts',10,'elm',11,'mt',12,'phone',13,'vueId',14],[],e,s,gg)
_(cZP,l5P)
}
var a6P=_mz(z,'popup',['bind:__l',42,'class',1,'data-ref',2,'title',3,'vueId',4,'vueSlots',5],[],e,s,gg)
_(oXP,a6P)
var t7P=_mz(z,'popup',['bind:__l',48,'class',1,'data-ref',2,'title',3,'vueId',4,'vueSlots',5],[],e,s,gg)
_(oXP,t7P)
var e8P=_mz(z,'popup',['bind:__l',54,'class',1,'data-ref',2,'title',3,'vueId',4,'vueSlots',5],[],e,s,gg)
_(oXP,e8P)
var b9P=_mz(z,'popup',['bind:__l',60,'class',1,'data-ref',2,'flex',3,'vueId',4,'vueSlots',5],[],e,s,gg)
_(oXP,b9P)
var h1P=_v()
_(oXP,h1P)
if(_oz(z,66,e,s,gg)){h1P.wxVkey=1
}
var o2P=_v()
_(oXP,o2P)
if(_oz(z,67,e,s,gg)){o2P.wxVkey=1
}
fYP.wxXCkey=1
fYP.wxXCkey=3
cZP.wxXCkey=1
cZP.wxXCkey=3
h1P.wxXCkey=1
o2P.wxXCkey=1
_(r,oXP)
return r
}
e_[x[27]]={f:m27,j:[],i:[],ti:[],ic:[]}
d_[x[28]]={}
var m28=function(e,s,r,gg){
var z=gz$gwx_29()
var xAQ=_mz(z,'view',['class',0,'style',1],[],e,s,gg)
var oBQ=_mz(z,'navbar',['backLcok',2,'bgColor',1,'bind:__l',2,'class',3,'pageTitle',4,'pageTitleColor',5,'vueId',6],[],e,s,gg)
_(xAQ,oBQ)
var fCQ=_n('view')
_rz(z,fCQ,'class',9,e,s,gg)
var cDQ=_v()
_(fCQ,cDQ)
if(_oz(z,10,e,s,gg)){cDQ.wxVkey=1
var oHQ=_n('view')
_rz(z,oHQ,'class',11,e,s,gg)
var lIQ=_v()
_(oHQ,lIQ)
if(_oz(z,12,e,s,gg)){lIQ.wxVkey=1
}
var aJQ=_v()
_(oHQ,aJQ)
if(_oz(z,13,e,s,gg)){aJQ.wxVkey=1
}
var tKQ=_v()
_(oHQ,tKQ)
if(_oz(z,14,e,s,gg)){tKQ.wxVkey=1
}
lIQ.wxXCkey=1
aJQ.wxXCkey=1
tKQ.wxXCkey=1
_(cDQ,oHQ)
}
var hEQ=_v()
_(fCQ,hEQ)
if(_oz(z,15,e,s,gg)){hEQ.wxVkey=1
}
var oFQ=_v()
_(fCQ,oFQ)
if(_oz(z,16,e,s,gg)){oFQ.wxVkey=1
}
var cGQ=_v()
_(fCQ,cGQ)
if(_oz(z,17,e,s,gg)){cGQ.wxVkey=1
}
cDQ.wxXCkey=1
hEQ.wxXCkey=1
oFQ.wxXCkey=1
cGQ.wxXCkey=1
_(xAQ,fCQ)
_(r,xAQ)
return r
}
e_[x[28]]={f:m28,j:[],i:[],ti:[],ic:[]}
d_[x[29]]={}
var m29=function(e,s,r,gg){
var z=gz$gwx_30()
return r
}
e_[x[29]]={f:m29,j:[],i:[],ti:[],ic:[]}
d_[x[30]]={}
var m30=function(e,s,r,gg){
var z=gz$gwx_31()
return r
}
e_[x[30]]={f:m30,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
var main=e_[path].f
if (typeof global==="undefined")global={};global.f=$gdc(f_[path],"",1);
try{
main(env,{},root,global);
_tsd(root)
}catch(err){
console.log(err)
}
return root;
}
}
}
	__wxAppCode__['app.json'] = {"pages":["pages/home/index","pages/library/index","pages/bwc/index","pages/welfare/index","pages/home/index1","pages/orderlist/index","pages/my/index","pages/placeOrder/index","pages/myFans/index","pages/myOrder/index","pages/pullNewActivity/index","pages/myPoster/index","pages/signReach/index","pages/pointsMall/index","pages/luckDraw/index","pages/yppPay/yppPay","pages/yppPay/chooseLocation","pages/material/index"],"subPackages":[{"root":"subpackage/","pages":["cardboot/index","searchPage/index","login/phone","login/authorize","map/index","activity/index","uploadImage/index","set/index","realPerson/index","reward/index","withdrawalRecord/index","withdrawal/index","userWithdrawal/index","withdrawalList/index","income/index","guide/index","guide/tutorial/index","myOrder/orderDetails/refund/index","myOrder/orderDetails/confirmRefund/index","myOrder/orderDetails/index","pointsMall/cashExchange/index","pointsMall/exchangeRecord/index","pointsMall/myIntegral/index","pointsMall/pointsExchange/index","luckDraw/record/index","noticeList/index","noticeList/noticeDetails/index","cumulativeProfit/index","cumulativeProfit/profitReward/index","cumulativeProfit/profitExtension/index","cumulativeProfit/profitExchange/index","myFans/detail/index","memberBenefits/index","myTutor/index","webView/h5","authorization/error","authorization/toKen","authorization/authorization","businessSettleIn/index","redPacket/index","redPacket/list","grade/index","jumpSmallProgram/index"]},{"root":"/__wx__/","pages":["functional-page","open-api-redirecting-page","choose-wifi-credential-page"]}],"window":{"navigationBarTextStyle":"black","navigationStyle":"custom","navigationBarTitleText":"霸王餐","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"permission":{"scope.userLocation":{"desc":"需要获取您的地理位置，请确认授权"}},"requiredPrivateInfos":["getLocation","chooseLocation"],"__usePrivacyCheck__":false,"functionalPages":true,"usingComponents":{"not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","load-more":"/components/loadMore/index","topping":"/components/topping/index","login-pop":"/components/loginPop/index","not-phone":"/components/notPhone/index","list":"/components/list/index","tabbar":"/components/tabbar/index","navbar":"/components/navbar/index"},"__warning__":"[\"functionalPages\"] 配置需要更新，详见文档: https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/functional-pages.html","extAppid":"wx0a0efb8ba4b8d507"};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['app.wxml'] = [$gwx, './app.wxml'];else __wxAppCode__['app.wxml'] = $gwx( './app.wxml' );
		__wxAppCode__['components/customCard/index.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"},"component":true};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['components/customCard/index.wxml'] = [$gwx, './components/customCard/index.wxml'];else __wxAppCode__['components/customCard/index.wxml'] = $gwx( './components/customCard/index.wxml' );
		__wxAppCode__['components/list/index.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"},"component":true};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['components/list/index.wxml'] = [$gwx, './components/list/index.wxml'];else __wxAppCode__['components/list/index.wxml'] = $gwx( './components/list/index.wxml' );
		__wxAppCode__['components/loadMore/index.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"},"component":true};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['components/loadMore/index.wxml'] = [$gwx, './components/loadMore/index.wxml'];else __wxAppCode__['components/loadMore/index.wxml'] = $gwx( './components/loadMore/index.wxml' );
		__wxAppCode__['components/loginPop/index.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"},"component":true};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['components/loginPop/index.wxml'] = [$gwx, './components/loginPop/index.wxml'];else __wxAppCode__['components/loginPop/index.wxml'] = $gwx( './components/loginPop/index.wxml' );
		__wxAppCode__['components/navbar/index.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"},"component":true};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['components/navbar/index.wxml'] = [$gwx, './components/navbar/index.wxml'];else __wxAppCode__['components/navbar/index.wxml'] = $gwx( './components/navbar/index.wxml' );
		__wxAppCode__['components/notPhone/index.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"},"component":true};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['components/notPhone/index.wxml'] = [$gwx, './components/notPhone/index.wxml'];else __wxAppCode__['components/notPhone/index.wxml'] = $gwx( './components/notPhone/index.wxml' );
		__wxAppCode__['components/notYetData/index.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"},"component":true};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['components/notYetData/index.wxml'] = [$gwx, './components/notYetData/index.wxml'];else __wxAppCode__['components/notYetData/index.wxml'] = $gwx( './components/notYetData/index.wxml' );
		__wxAppCode__['components/popup/index.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"},"component":true};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['components/popup/index.wxml'] = [$gwx, './components/popup/index.wxml'];else __wxAppCode__['components/popup/index.wxml'] = $gwx( './components/popup/index.wxml' );
		__wxAppCode__['components/tabbar/index.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"},"component":true};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['components/tabbar/index.wxml'] = [$gwx, './components/tabbar/index.wxml'];else __wxAppCode__['components/tabbar/index.wxml'] = $gwx( './components/tabbar/index.wxml' );
		__wxAppCode__['components/topping/index.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"},"component":true};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['components/topping/index.wxml'] = [$gwx, './components/topping/index.wxml'];else __wxAppCode__['components/topping/index.wxml'] = $gwx( './components/topping/index.wxml' );
		__wxAppCode__['components/xp-picker/xp-picker.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"},"component":true};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['components/xp-picker/xp-picker.wxml'] = [$gwx, './components/xp-picker/xp-picker.wxml'];else __wxAppCode__['components/xp-picker/xp-picker.wxml'] = $gwx( './components/xp-picker/xp-picker.wxml' );
		__wxAppCode__['pages/bwc/index.json'] = {"usingComponents":{"custom-card":"/components/customCard/index","list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/bwc/index.wxml'] = [$gwx, './pages/bwc/index.wxml'];else __wxAppCode__['pages/bwc/index.wxml'] = $gwx( './pages/bwc/index.wxml' );
		__wxAppCode__['pages/home/index.json'] = {"usingComponents":{"bwc":"/pages/bwc/index","library":"/pages/library/index","orderlist":"/pages/orderlist/index","my":"/pages/my/index","welfare":"/pages/welfare/index","place-order":"/pages/placeOrder/index","pullnewactivity":"/pages/pullNewActivity/index","my-fans":"/pages/myFans/index","my-poster":"/pages/myPoster/index","my-order":"/pages/myOrder/index","team-order":"/pages/myOrder/index","sign-reach":"/pages/signReach/index","points-mall":"/pages/pointsMall/index","luck-draw":"/pages/luckDraw/index","list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/home/index.wxml'] = [$gwx, './pages/home/index.wxml'];else __wxAppCode__['pages/home/index.wxml'] = $gwx( './pages/home/index.wxml' );
		__wxAppCode__['pages/home/index1.json'] = {"usingComponents":{"bwc":"/pages/bwc/index","library":"/pages/library/index","orderlist":"/pages/orderlist/index","my":"/pages/my/index","welfare":"/pages/welfare/index","place-order":"/pages/placeOrder/index","pullnewactivity":"/pages/pullNewActivity/index","my-fans":"/pages/myFans/index","my-poster":"/pages/myPoster/index","my-order":"/pages/myOrder/index","team-order":"/pages/myOrder/index","sign-reach":"/pages/signReach/index","points-mall":"/pages/pointsMall/index","luck-draw":"/pages/luckDraw/index","list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/home/index1.wxml'] = [$gwx, './pages/home/index1.wxml'];else __wxAppCode__['pages/home/index1.wxml'] = $gwx( './pages/home/index1.wxml' );
		__wxAppCode__['pages/library/index.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/library/index.wxml'] = [$gwx, './pages/library/index.wxml'];else __wxAppCode__['pages/library/index.wxml'] = $gwx( './pages/library/index.wxml' );
		__wxAppCode__['pages/luckDraw/index.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/luckDraw/index.wxml'] = [$gwx, './pages/luckDraw/index.wxml'];else __wxAppCode__['pages/luckDraw/index.wxml'] = $gwx( './pages/luckDraw/index.wxml' );
		__wxAppCode__['pages/material/index.json'] = {"navigationBarBackgroundColor":"#FFFFFF","navigationBarTextStyle":"black","navigationBarTitleText":"发圈素材","navigationStyle":"default","usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/material/index.wxml'] = [$gwx, './pages/material/index.wxml'];else __wxAppCode__['pages/material/index.wxml'] = $gwx( './pages/material/index.wxml' );
		__wxAppCode__['pages/my/index.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/my/index.wxml'] = [$gwx, './pages/my/index.wxml'];else __wxAppCode__['pages/my/index.wxml'] = $gwx( './pages/my/index.wxml' );
		__wxAppCode__['pages/myFans/index.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/myFans/index.wxml'] = [$gwx, './pages/myFans/index.wxml'];else __wxAppCode__['pages/myFans/index.wxml'] = $gwx( './pages/myFans/index.wxml' );
		__wxAppCode__['pages/myOrder/index.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/myOrder/index.wxml'] = [$gwx, './pages/myOrder/index.wxml'];else __wxAppCode__['pages/myOrder/index.wxml'] = $gwx( './pages/myOrder/index.wxml' );
		__wxAppCode__['pages/myPoster/index.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/myPoster/index.wxml'] = [$gwx, './pages/myPoster/index.wxml'];else __wxAppCode__['pages/myPoster/index.wxml'] = $gwx( './pages/myPoster/index.wxml' );
		__wxAppCode__['pages/orderlist/index.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/orderlist/index.wxml'] = [$gwx, './pages/orderlist/index.wxml'];else __wxAppCode__['pages/orderlist/index.wxml'] = $gwx( './pages/orderlist/index.wxml' );
		__wxAppCode__['pages/placeOrder/index.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/placeOrder/index.wxml'] = [$gwx, './pages/placeOrder/index.wxml'];else __wxAppCode__['pages/placeOrder/index.wxml'] = $gwx( './pages/placeOrder/index.wxml' );
		__wxAppCode__['pages/pointsMall/index.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/pointsMall/index.wxml'] = [$gwx, './pages/pointsMall/index.wxml'];else __wxAppCode__['pages/pointsMall/index.wxml'] = $gwx( './pages/pointsMall/index.wxml' );
		__wxAppCode__['pages/pullNewActivity/index.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/pullNewActivity/index.wxml'] = [$gwx, './pages/pullNewActivity/index.wxml'];else __wxAppCode__['pages/pullNewActivity/index.wxml'] = $gwx( './pages/pullNewActivity/index.wxml' );
		__wxAppCode__['pages/signReach/components/templateOne/index.json'] = {"component":true,"usingComponents":{"xp-picker":"/components/xp-picker/xp-picker","list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/signReach/components/templateOne/index.wxml'] = [$gwx, './pages/signReach/components/templateOne/index.wxml'];else __wxAppCode__['pages/signReach/components/templateOne/index.wxml'] = $gwx( './pages/signReach/components/templateOne/index.wxml' );
		__wxAppCode__['pages/signReach/components/templateTwo/index.json'] = {"component":true,"usingComponents":{"xp-picker":"/components/xp-picker/xp-picker","list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/signReach/components/templateTwo/index.wxml'] = [$gwx, './pages/signReach/components/templateTwo/index.wxml'];else __wxAppCode__['pages/signReach/components/templateTwo/index.wxml'] = $gwx( './pages/signReach/components/templateTwo/index.wxml' );
		__wxAppCode__['pages/signReach/index.json'] = {"usingComponents":{"template-one":"/pages/signReach/components/templateOne/index","template-two":"/pages/signReach/components/templateTwo/index","list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/signReach/index.wxml'] = [$gwx, './pages/signReach/index.wxml'];else __wxAppCode__['pages/signReach/index.wxml'] = $gwx( './pages/signReach/index.wxml' );
		__wxAppCode__['pages/welfare/index.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/welfare/index.wxml'] = [$gwx, './pages/welfare/index.wxml'];else __wxAppCode__['pages/welfare/index.wxml'] = $gwx( './pages/welfare/index.wxml' );
		__wxAppCode__['pages/yppPay/chooseLocation.json'] = {"navigationBarBackgroundColor":"#FFFFFF","navigationBarTextStyle":"black","navigationBarTitleText":"选择地址","usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/yppPay/chooseLocation.wxml'] = [$gwx, './pages/yppPay/chooseLocation.wxml'];else __wxAppCode__['pages/yppPay/chooseLocation.wxml'] = $gwx( './pages/yppPay/chooseLocation.wxml' );
		__wxAppCode__['pages/yppPay/yppPay.json'] = {"usingComponents":{"list":"/components/list/index","load-more":"/components/loadMore/index","login-pop":"/components/loginPop/index","navbar":"/components/navbar/index","not-phone":"/components/notPhone/index","not-yet-data":"/components/notYetData/index","popup":"/components/popup/index","tabbar":"/components/tabbar/index","topping":"/components/topping/index"}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/yppPay/yppPay.wxml'] = [$gwx, './pages/yppPay/yppPay.wxml'];else __wxAppCode__['pages/yppPay/yppPay.wxml'] = $gwx( './pages/yppPay/yppPay.wxml' );
		__wxAppCode__['project.config.json'] = {"miniprogramRoot":"","__compileDebugInfo__":{"useSummer":true}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['project.config.wxml'] = [$gwx, './project.config.wxml'];else __wxAppCode__['project.config.wxml'] = $gwx( './project.config.wxml' );
		__wxAppCode__['project.private.config.json'] = {"description":"项目私有配置文件。此文件中的内容将覆盖 project.config.json 中的相同字段。项目的改动优先同步到此文件中。详见文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html","projectname":"bawangcan","setting":{"compileHotReLoad":true,"urlCheck":false}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['project.private.config.wxml'] = [$gwx, './project.private.config.wxml'];else __wxAppCode__['project.private.config.wxml'] = $gwx( './project.private.config.wxml' );
	
	define("@babel/runtime/helpers/Arrayincludes.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(r,e){if(null==this)throw new TypeError('"this" is null or not defined');var t=Object(this),n=t.length>>>0;if(0==n)return!1;for(var i,o,a=0|e,u=Math.max(0<=a?a:n-Math.abs(a),0);u<n;){if((i=t[u])===(o=r)||"number"==typeof i&&"number"==typeof o&&isNaN(i)&&isNaN(o))return!0;u++}return!1}}); 
 			}); 
		define("@babel/runtime/helpers/Objectentries.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
Object.entries||(Object.entries=function(e){for(var r=Object.keys(e),t=r.length,n=new Array(t);t--;)n[t]=[r[t],e[r[t]]];return n}); 
 			}); 
		define("@babel/runtime/helpers/Objectvalues.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
Object.values||(Object.values=function(e){if(e!==Object(e))throw new TypeError("Object.values called on a non-object");var t,r=[];for(t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.push(e[t]);return r}); 
 			}); 
		define("@babel/runtime/helpers/defineProperty.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
var toPropertyKey=require("./toPropertyKey");function _defineProperty(e,r,t){return(r=toPropertyKey(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}module.exports=_defineProperty; 
 			}); 
		define("@babel/runtime/helpers/toPrimitive.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
var _typeof=require("./typeof");function _toPrimitive(r,t){if("object"!==_typeof(r)||null===r)return r;var e=r[Symbol.toPrimitive];if(void 0!==e){var i=e.call(r,t||"default");if("object"!==_typeof(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(r)}module.exports=_toPrimitive; 
 			}); 
		define("@babel/runtime/helpers/toPropertyKey.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
var _typeof=require("./typeof"),toPrimitive=require("./toPrimitive");function _toPropertyKey(r){var t=toPrimitive(r,"string");return"symbol"===_typeof(t)?t:String(t)}module.exports=_toPropertyKey; 
 			}); 
		define("@babel/runtime/helpers/typeof.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
function _typeof(o){return module.exports=_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}module.exports=_typeof; 
 			}); 
		define("common/main.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";require("../@babel/runtime/helpers/Arrayincludes"),(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["common/main"],{1762:function(e,t,o){o.r(t),o.d(t,{default:function(){return b}});var n=o(7028),a=o(5476),c=o(5293),i=(o(214),o(2412)),r=o(188),d=o(7039).default,s=o(8793).default,u={data:{micro_scene:"",addWxCardLock:!1,hasClosed:!1,sceneArr:[1007,1008,1011,1012,1013,1014,1047,1048,1049,1058,1067,1073,1074,1081,1082,1091,1095,1096,1102,1107,1157,1160,1167,1185,1208]},onLaunch:function(e){console.log("App Launch",e,this.$route,this.$store),this.initMini(e)},onShow:function(e){var t=this;console.log("App Show",e),console.log("后台进入前台");var o,n,a,i,r;this.hasClosed&&["pages/home/index","subpackage/activity/index","pages/bwc/index","pages/welfare/index","pages/placeOrder/index","pages/pullnewactivity/index","pages/myPoster/index","subpackage/businessSettleIn/index","pages/signReach/index","pages/pointsMall/index","pages/luckDraw/index","subpackage/redPacket/index"].includes(e.path)&&((null!==(o=e.query)&&void 0!==o&&o.uid||e.uid)&&(this.$store.commit("setUid",(null===(r=e.query)||void 0===r?void 0:r.uid)||e.uid),console.log(this.$store.state.uid,"uid-------------")),(null!==(n=e.query)&&void 0!==n&&n.micro_scene||e.micro_scene)&&this.initMini(e),(null!==(a=e.query)&&void 0!==a&&a.uri||e.uri||null!==(i=e.query)&&void 0!==i&&i.scene)&&this.initMini(e));this.updateMini(),this.sceneArr.indexOf(e.scene-0)>=0&&(this.hasClosed&&this.addWxCardLock?(this.addWxCardLock=!1,this.hasClosed=!1,console.log("刚从卡券返回，不再打开")):setTimeout((function(){var o;(null!=e&&null!==(o=e.query)&&void 0!==o&&o.card_id||e.card_id)&&!t.$store.state.token&&(0,c.default)(),t.addWxCard(e)}),100))},onHide:function(){console.log("App Hide"),this.hasClosed=!0},methods:{initMini:function(e){var t,o,n,a,i,r,s,u=this;if(console.log(e,"--------小程序---"),this.$store.commit("setToken",""),this.$store.commit("setSceneToken",""),d.removeStorageSync("token"),d.removeStorageSync("scene_token"),console.log(d.getAccountInfoSync().miniProgram.appId,"appid"),this.$store.commit("setAppid",d.getAccountInfoSync().miniProgram.appId),null!==(t=e.query)&&void 0!==t&&t.uid?this.$store.commit("setUid",e.query.uid):e.uid&&this.$store.commit("setUid",e.uid),null!==(o=e.query)&&void 0!==o&&o.micro_scene?(this.$store.commit("setMicroScenes",e.query.micro_scene),this.micro_scene=null===(r=e.query)||void 0===r?void 0:r.micro_scene):e.micro_scene?(this.$store.commit("setMicroScenes",e.micro_scene),this.micro_scene=e.micro_scene):(this.$store.commit("setMicroScenes",""),this.micro_scene=""),null!==(n=e.query)&&void 0!==n&&n.utm_source?this.$store.commit("setUtmSource",e.query.utm_source):e.utm_source?this.$store.commit("setUtmSource",e.utm_source):this.$store.commit("setUtmSource",""),null!==(a=e.query)&&void 0!==a&&a.uri)d.setStorageSync("redPackUri",null===(s=e.query)||void 0===s?void 0:s.uri);else if(e.uri)d.setStorageSync("redPackUri",e.uri);else if(null!==(i=e.query)&&void 0!==i&&i.scene){var l;d.setStorageSync("redPackUri",decodeURIComponent(null===(l=e.query)||void 0===l?void 0:l.scene).split("=")[1])}else d.setStorageSync("redPackUri","");decodeURIComponent(e.scene).split("&").every((function(e){var t=e.split("=");return"uid"==t[0]?(u.$store.commit("setUid",t[1]||""),!1):"micro_scene"!=t[0]||(u.$store.commit("setMicroScenes",t[1]||""),!1)})),this.$store.state.micro_scene?this.$http.getMiniSkipInfo().then((function(e){200==e.code&&(null!=e.data&&"0"!=e.data.switch||(0,c.default)())})):(0,c.default)(),d.$once("login",(function(){console.log(e,"onlaunch中 登陆后执行"),u.sceneArr.indexOf(e.scene-0)>=0&&u.addWxCard(e)}))},initH5:function(e){var t=this;if(console.log(e,"H5传参"),r.default.SET("h5QueryInfo",e),d.removeStorageSync("access_token"),e.uid&&this.$store.commit("setUid",e.uid),e.miniEnAccounts&&d.setStorageSync("miniEnAccounts",e.miniEnAccounts),e.pid&&this.$store.commit("setPid",e.pid),d.setStorageSync("url",location.href.split("#")[0]),e.miniEnPid&&this.$store.commit("setMiniEnPid",e.miniEnPid),e.hm_scene&&this.$store.commit("setScene",e.hm_scene),this.$store.commit("setRandomPath",this.$route.params.randompath||(new Date).getTime()),e.appid)d.removeStorageSync("accountsId"),d.removeStorageSync("miniEnAccounts"),d.removeStorageSync("new_plan_source"),this.$store.commit("setAppid",i.default.getUrlParam("appid")),d.setStorageSync("appid",i.default.getUrlParam("appid"));else if(e.accountsId)return console.log(e.accountsId,d.getStorageSync("accountsId"),"-------accountsId---------"),e.access_token&&d.setStorageSync("access_token",e.access_token),e.realName?(d.setStorageSync("miniEnAccounts",e.miniEnAccounts),console.log(d.getStorageInfoSync("miniEnAccounts"),"miniEnAccounts----")):d.getStorageSync("accountsId")!=e.accountsId&&(d.removeStorageSync("miniEnAccounts"),d.removeStorageSync("bwcPhone")),e.new_plan_source?d.setStorageSync("new_plan_source",e.new_plan_source):d.removeStorageSync("new_plan_source"),d.removeStorageSync(d.getStorageSync("appid")),d.removeStorageSync("appid"),d.removeStorageSync("appidLogin"),d.setStorageSync("accountsId",e.accountsId),void this.$store.commit("setAccountsId",e.accountsId);d.$once("login",(function(){e.card_id&&t.addWxCard(e)})),console.log("=========".concat(this.$store.state.appid+"="+this.$store.state.token+"="+this.$store.state.kuaiditoken+"="+this.$store.state.phone,"==========="));var o="";d.getStorageSync("H5code")!=i.default.getUrlParam("code")&&(o=i.default.getUrlParam("code")),d.getStorageSync("accountsId")||this.$http.h5Login({code:o,appid:i.default.getUrlParam("appid")||"",invite_id:i.default.getUrlParam("uid")||"",authorize_type:i.default.getUrlParam("authorize_type")||0}).then((function(e){200==e.code&&e.data.token&&(console.log(e,"登录--"),d.setStorageSync("appid",e.data.appid),d.setStorageSync("H5code",i.default.getUrlParam("code")),t.$store.commit("setAppid",e.data.appid),d.setStorageSync(d.getStorageSync("appid"),e.data.token),t.$store.state.appid&&d.setStorageSync("appidLogin",!0),e.data.mobile?(d.setStorageSync("bwcPhone",e.data.mobile),d.$emit("refreshbwcPhone")):d.removeStorageSync("bwcPhone"),d.$emit("login",{login:!0}),console.log(location.search,"路径------------"),"/"==t.$route.path&&(t.$store.commit("setlocationSearch",location.search),d.getStorageSync("new_plan_source")?d.reLaunch({url:"/pages/home/index1/"+(t.$store.state.randompath||(new Date).getTime())+(location.search?"&":"?")+"uid="+e.data.uid+"&new_plan_source="+d.getStorageSync("new_plan_source")}):d.reLaunch({url:"/pages/home/index1/"+(t.$store.state.randompath||(new Date).getTime())+(location.search?"&":"?")+"uid="+e.data.uid})))}))},updateMini:function(){if(d.canIUse("getUpdateManager")){var e=d.getUpdateManager();e.onCheckForUpdate((function(t){t&&(e.onUpdateReady((function(){d.showModal({title:"更新提示",content:"新版本已经准备好，是否重启应用？",success:function(t){t.confirm&&e.applyUpdate()}})})),e.onUpdateFailed((function(){d.showModal({title:"已经有新版本了哟~",content:"新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"})})))}))}else{"微信",d.showModal({title:"提示",content:"当前".concat("微信","版本过低，请更新").concat("微信","版本！"),success:function(e){e.confirm&&s.updateWeChatApp()}})}},addWxCard:function(e){var t;if(console.log("addWxCard","addWxCard 方法 刚进入"),this.$utils.hasLogin()){console.log("addWxCard","addWxCard 方法 用户已经登录");var o=this;if(null!==(t=e.query)&&void 0!==t&&t.card_id||e.card_id){var n;console.log("addWxCard","参数中包含card_id");var a=(null===(n=e.query)||void 0===n?void 0:n.card_id)||e.card_id;o.$http.getWxCardInfo({card_id:a}).then((function(e){if(200==e.code){if(console.log("addWxCard","正常获取到cardinfo"),o.addWxCardLock)return;o.addWxCardLock=!0;var t="",n=getCurrentPages();n&&n.length&&(t=n[n.length-1].route),console.log(e.data,t,"霸王餐信息",e.data.receiving_status);var c=e.data.authorizer_appid;if(1==e.data.boot_page_status&&-1==t.indexOf("/subpackage/cardboot/index"))return o.$globalData.SET("card",e.data.card_info,"cardinfo"),o.$globalData.SET("card",e.data.card_color,"cardcolor"),o.$globalData.SET("card",c,"appid"),o.$globalData.SET("card",a,"cardid"),o.$globalData.SET("card",e.data.receiving_status,"receiving_status"),o.$globalData.SET("card",e.data.card_code,"card_code"),void d.navigateTo({url:"/subpackage/cardboot/index"});e.data.receiving_status?(console.log("opencard","app"),o.openCard(a,e.data.card_code)):o.$http.getWxCardApiTicket({appid:c,card_id:a}).then((function(e){200==e.code&&s.addCard({cardList:[{cardId:a,cardExt:JSON.stringify(e.data)}],success:function(e){console.log("addWxCard success",e),o.$http.getCardCode({encrypt_code:e.cardList[0].code,authorizer_appid:c}).then((function(e){console.log("解码会员卡号",e),200==e.code&&o.openCard(a,e.data.code)}))}})}))}}))}}}}},l=o(4862),p=(0,(o.n(l)(),o(9453)).default)(u,void 0,void 0,!1,null,null,null,!1,void 0,void 0).exports,m=o(9209),g=o(7668),h=o(1460),f=o(8793).default,S=o(7039).createApp;function y(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function v(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?y(Object(o),!0).forEach((function(t){(0,n.default)(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):y(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}f.__webpack_require_UNI_MP_PLUGIN__=o;a.default.component("notYetData",(function(){o.e("components/notYetData/index").then(function(){return resolve(o(8286))}.bind(null,o)).catch(o.oe)})),a.default.component("popup",(function(){o.e("components/popup/index").then(function(){return resolve(o(8152))}.bind(null,o)).catch(o.oe)})),a.default.component("loadMore",(function(){o.e("components/loadMore/index").then(function(){return resolve(o(8394))}.bind(null,o)).catch(o.oe)})),a.default.component("topping",(function(){o.e("components/topping/index").then(function(){return resolve(o(3513))}.bind(null,o)).catch(o.oe)})),a.default.component("loginPop",(function(){o.e("components/loginPop/index").then(function(){return resolve(o(5995))}.bind(null,o)).catch(o.oe)})),a.default.component("notPhone",(function(){o.e("components/notPhone/index").then(function(){return resolve(o(7565))}.bind(null,o)).catch(o.oe)})),a.default.component("list",(function(){o.e("components/list/index").then(function(){return resolve(o(4524))}.bind(null,o)).catch(o.oe)})),a.default.config.productionTip=!1,a.default.prototype.$utils=i.default,a.default.prototype.$common=h.default,a.default.prototype.$http=g.default,a.default.prototype.$globalData=r.default,a.default.prototype.$nav=i.default.nav;a.default.component("tabbar",(function(){o.e("components/tabbar/index").then(function(){return resolve(o(6291))}.bind(null,o)).catch(o.oe)}));a.default.component("navbar",(function(){o.e("components/navbar/index").then(function(){return resolve(o(1041))}.bind(null,o)).catch(o.oe)})),p.mpType="app";var _=new a.default(v(v({},p),{},{store:m.default}));S(_).$mount();var b=_},4862:function(){}},function(e){e.O(0,["common/vendor"],(function(){return t=1762,e(e.s=t);var t})),e.O()}]); 
 			}); 
		define("common/runtime.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var e=require("../@babel/runtime/helpers/typeof");!function(){try{var e=Function("return this")();e&&!e.Math&&(Object.assign(e,{isFinite:isFinite,Array:Array,Date:Date,Error:Error,Function:Function,Math:Math,Object:Object,RegExp:RegExp,String:String,TypeError:TypeError,setTimeout:setTimeout,clearTimeout:clearTimeout,setInterval:setInterval,clearInterval:clearInterval}),"undefined"!=typeof Reflect&&(e.Reflect=Reflect))}catch(e){}}(),function(){var n={},t={};function r(e){var o=t[e];if(void 0!==o)return o.exports;var i=t[e]={exports:{}};return n[e].call(i.exports,i,i.exports,r),i.exports}r.m=n,function(){var e=[];r.O=function(n,t,o,i){if(!t){var u=1/0;for(f=0;f<e.length;f++){t=e[f][0],o=e[f][1],i=e[f][2];for(var a=!0,c=0;c<t.length;c++)(!1&i||u>=i)&&Object.keys(r.O).every((function(e){return r.O[e](t[c])}))?t.splice(c--,1):(a=!1,i<u&&(u=i));if(a){e.splice(f--,1);var l=o();void 0!==l&&(n=l)}}return n}i=i||0;for(var f=e.length;f>0&&e[f-1][2]>i;f--)e[f]=e[f-1];e[f]=[t,o,i]}}(),r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,{a:n}),n},r.d=function(e,n){for(var t in n)r.o(n,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},r.f={},r.e=function(e){return Promise.all(Object.keys(r.f).reduce((function(n,t){return r.f[t](e,n),n}),[]))},r.u=function(e){return e+".js"},r.miniCssF=function(e){return e+".wxss"},r.g=function(){if("object"===("undefined"==typeof globalThis?"undefined":e(globalThis)))return globalThis;try{return this||new Function("return this")()}catch(n){if("object"===("undefined"==typeof window?"undefined":e(window)))return window}}(),r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},function(){var e={},n="bwc:";r.l=function(t,o,i,u){if(e[t])e[t].push(o);else{var a,c;if(void 0!==i)for(var l=document.getElementsByTagName("script"),f=0;f<l.length;f++){var s=l[f];if(s.getAttribute("src")==t||s.getAttribute("data-webpack")==n+i){a=s;break}}a||(c=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,r.nc&&a.setAttribute("nonce",r.nc),a.setAttribute("data-webpack",n+i),a.src=t),e[t]=[o];var d=function(n,r){a.onerror=a.onload=null,clearTimeout(p);var o=e[t];if(delete e[t],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((function(e){return e(r)})),n)return n(r)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=d.bind(null,a.onerror),a.onload=d.bind(null,a.onload),c&&document.head.appendChild(a)}}}(),r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.p="/",function(){if("undefined"!=typeof document){var e=function(e){return new Promise((function(n,t){var o=r.miniCssF(e),i=r.p+o;if(function(e,n){for(var t=document.getElementsByTagName("link"),r=0;r<t.length;r++){var o=t[r],i=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(i===e||i===n))return o}var u=document.getElementsByTagName("style");for(r=0;r<u.length;r++)if((i=(o=u[r]).getAttribute("data-href"))===e||i===n)return o}(o,i))return n();!function(e,n,t,r,o){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css";i.onerror=i.onload=function(t){if(i.onerror=i.onload=null,"load"===t.type)r();else{var u=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.href||n,c=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=u,c.request=a,i.parentNode&&i.parentNode.removeChild(i),o(c)}},i.href=n,t?t.parentNode.insertBefore(i,t.nextSibling):document.head.appendChild(i)}(e,i,null,n,t)}))},n={"common/runtime":0};r.f.miniCss=function(t,r){n[t]?r.push(n[t]):0!==n[t]&&{"components/notYetData/index":1,"components/popup/index":1,"components/loadMore/index":1,"components/topping/index":1,"components/loginPop/index":1,"components/notPhone/index":1,"components/list/index":1,"components/tabbar/index":1,"components/navbar/index":1,"components/customCard/index":1,"pages/signReach/components/templateOne/index":1,"pages/signReach/components/templateTwo/index":1,"components/xp-picker/xp-picker":1}[t]&&r.push(n[t]=e(t).then((function(){n[t]=0}),(function(e){throw delete n[t],e})))}}}(),function(){var e={"common/runtime":0};r.f.j=function(n,t){var o=r.o(e,n)?e[n]:void 0;if(0!==o)if(o)t.push(o[2]);else if("common/runtime"!=n){var i=new Promise((function(t,r){o=e[n]=[t,r]}));t.push(o[2]=i);var u=r.p+r.u(n),a=new Error;r.l(u,(function(t){if(r.o(e,n)&&(0!==(o=e[n])&&(e[n]=void 0),o)){var i=t&&("load"===t.type?"missing":t.type),u=t&&t.target&&t.target.src;a.message="Loading chunk "+n+" failed.\n("+i+": "+u+")",a.name="ChunkLoadError",a.type=i,a.request=u,o[1](a)}}),"chunk-"+n,n)}else e[n]=0},r.O.j=function(n){return 0===e[n]};var n=function(n,t){var o,i,u=t[0],a=t[1],c=t[2],l=0;if(u.some((function(n){return 0!==e[n]}))){for(o in a)r.o(a,o)&&(r.m[o]=a[o]);if(c)var f=c(r)}for(n&&n(t);l<u.length;l++)i=u[l],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(f)},t=global.webpackChunkbwc=global.webpackChunkbwc||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))}()}(); 
 			}); 
		define("common/vendor.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";require("../@babel/runtime/helpers/Arrayincludes");var e=require("../@babel/runtime/helpers/typeof");(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["common/vendor"],{4216:function(e,t,n){var r=n(7161)();e.exports=r},5476:function(t,n,r){r.r(n);
/*!
     * Vue.js v2.6.11
     * (c) 2014-2023 Evan You
     * Released under the MIT License.
     */
var o=Object.freeze({});function i(e){return null==e}function a(e){return null!=e}function u(e){return!0===e}function c(t){return"string"==typeof t||"number"==typeof t||"symbol"===e(t)||"boolean"==typeof t}function s(t){return null!==t&&"object"===e(t)}var f=Object.prototype.toString;function l(e){return"[object Object]"===f.call(e)}function d(e){var t=parseFloat(String(e));return t>=0&&Math.floor(t)===t&&isFinite(e)}function p(e){return a(e)&&"function"==typeof e.then&&"function"==typeof e.catch}function h(e){return null==e?"":Array.isArray(e)||l(e)&&e.toString===f?JSON.stringify(e,null,2):String(e)}function g(e){var t=parseFloat(e);return isNaN(t)?e:t}function v(e,t){for(var n=Object.create(null),r=e.split(","),o=0;o<r.length;o++)n[r[o]]=!0;return t?function(e){return n[e.toLowerCase()]}:function(e){return n[e]}}v("slot,component",!0);var m=v("key,ref,slot,slot-scope,is");function y(e,t){if(e.length){var n=e.indexOf(t);if(n>-1)return e.splice(n,1)}}var _=Object.prototype.hasOwnProperty;function b(e,t){return _.call(e,t)}function S(e){var t=Object.create(null);return function(n){return t[n]||(t[n]=e(n))}}var w=/-(\w)/g,O=S((function(e){return e.replace(w,(function(e,t){return t?t.toUpperCase():""}))})),P=S((function(e){return e.charAt(0).toUpperCase()+e.slice(1)})),k=/\B([A-Z])/g,A=S((function(e){return e.replace(k,"-$1").toLowerCase()}));var T=Function.prototype.bind?function(e,t){return e.bind(t)}:function(e,t){function n(n){var r=arguments.length;return r?r>1?e.apply(t,arguments):e.call(t,n):e.call(t)}return n._length=e.length,n};function $(e,t){t=t||0;for(var n=e.length-t,r=new Array(n);n--;)r[n]=e[n+t];return r}function x(e,t){for(var n in t)e[n]=t[n];return e}function E(e){for(var t={},n=0;n<e.length;n++)e[n]&&x(t,e[n]);return t}function C(e,t,n){}var j=function(e,t,n){return!1},L=function(e){return e};function I(e,t){if(e===t)return!0;var n=s(e),r=s(t);if(!n||!r)return!n&&!r&&String(e)===String(t);try{var o=Array.isArray(e),i=Array.isArray(t);if(o&&i)return e.length===t.length&&e.every((function(e,n){return I(e,t[n])}));if(e instanceof Date&&t instanceof Date)return e.getTime()===t.getTime();if(o||i)return!1;var a=Object.keys(e),u=Object.keys(t);return a.length===u.length&&a.every((function(n){return I(e[n],t[n])}))}catch(e){return!1}}function D(e,t){for(var n=0;n<e.length;n++)if(I(e[n],t))return n;return-1}function M(e){var t=!1;return function(){t||(t=!0,e.apply(this,arguments))}}var B=["component","directive","filter"],N=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured","serverPrefetch"],R={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!1,devtools:!1,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:j,isReservedAttr:j,isUnknownElement:j,getTagNamespace:C,parsePlatformTagName:L,mustUseProp:j,async:!0,_lifecycleHooks:N};function V(e){var t=(e+"").charCodeAt(0);return 36===t||95===t}function U(e,t,n,r){Object.defineProperty(e,t,{value:n,enumerable:!!r,writable:!0,configurable:!0})}var G=new RegExp("[^"+/a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/.source+".$_\\d]");var H,F="__proto__"in{},z="undefined"!=typeof window,W="undefined"!=typeof WXEnvironment&&!!WXEnvironment.platform,K=W&&WXEnvironment.platform.toLowerCase(),J=z&&window.navigator.userAgent.toLowerCase(),X=J&&/msie|trident/.test(J),q=(J&&J.indexOf("msie 9.0"),J&&J.indexOf("edge/"),J&&J.indexOf("android"),J&&/iphone|ipad|ipod|ios/.test(J)||"ios"===K),Y=(J&&/chrome\/\d+/.test(J),J&&/phantomjs/.test(J),J&&J.match(/firefox\/(\d+)/),{}.watch);if(z)try{var Q={};Object.defineProperty(Q,"passive",{get:function(){}}),window.addEventListener("test-passive",null,Q)}catch(e){}var Z=function(){return void 0===H&&(H=!z&&!W&&void 0!==r.g&&r.g.process&&"server"===r.g.process.env.VUE_ENV),H},ee=z&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function te(e){return"function"==typeof e&&/native code/.test(e.toString())}var ne,re="undefined"!=typeof Symbol&&te(Symbol)&&"undefined"!=typeof Reflect&&te(Reflect.ownKeys);ne="undefined"!=typeof Set&&te(Set)?Set:function(){function e(){this.set=Object.create(null)}return e.prototype.has=function(e){return!0===this.set[e]},e.prototype.add=function(e){this.set[e]=!0},e.prototype.clear=function(){this.set=Object.create(null)},e}();var oe=C,ie=0,ae=function(){this.id=ie++,this.subs=[]};function ue(e){ae.SharedObject.targetStack.push(e),ae.SharedObject.target=e,ae.target=e}function ce(){ae.SharedObject.targetStack.pop(),ae.SharedObject.target=ae.SharedObject.targetStack[ae.SharedObject.targetStack.length-1],ae.target=ae.SharedObject.target}ae.prototype.addSub=function(e){this.subs.push(e)},ae.prototype.removeSub=function(e){y(this.subs,e)},ae.prototype.depend=function(){ae.SharedObject.target&&ae.SharedObject.target.addDep(this)},ae.prototype.notify=function(){for(var e=this.subs.slice(),t=0,n=e.length;t<n;t++)e[t].update()},(ae.SharedObject={}).target=null,ae.SharedObject.targetStack=[];var se=function(e,t,n,r,o,i,a,u){this.tag=e,this.data=t,this.children=n,this.text=r,this.elm=o,this.ns=void 0,this.context=i,this.fnContext=void 0,this.fnOptions=void 0,this.fnScopeId=void 0,this.key=t&&t.key,this.componentOptions=a,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=u,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1},fe={child:{configurable:!0}};fe.child.get=function(){return this.componentInstance},Object.defineProperties(se.prototype,fe);var le=function(e){void 0===e&&(e="");var t=new se;return t.text=e,t.isComment=!0,t};function de(e){return new se(void 0,void 0,void 0,String(e))}var pe=Array.prototype,he=Object.create(pe);["push","pop","shift","unshift","splice","sort","reverse"].forEach((function(e){var t=pe[e];U(he,e,(function(){for(var n=[],r=arguments.length;r--;)n[r]=arguments[r];var o,i=t.apply(this,n),a=this.__ob__;switch(e){case"push":case"unshift":o=n;break;case"splice":o=n.slice(2)}return o&&a.observeArray(o),a.dep.notify(),i}))}));var ge=Object.getOwnPropertyNames(he),ve=!0;function me(e){ve=e}var ye=function(e){this.value=e,this.dep=new ae,this.vmCount=0,U(e,"__ob__",this),Array.isArray(e)?(F?e.push!==e.__proto__.push?_e(e,he,ge):function(e,t){e.__proto__=t}(e,he):_e(e,he,ge),this.observeArray(e)):this.walk(e)};function _e(e,t,n){for(var r=0,o=n.length;r<o;r++){var i=n[r];U(e,i,t[i])}}function be(e,t){var n;if(s(e)&&!(e instanceof se))return b(e,"__ob__")&&e.__ob__ instanceof ye?n=e.__ob__:!ve||Z()||!Array.isArray(e)&&!l(e)||!Object.isExtensible(e)||e._isVue||e.__v_isMPComponent||(n=new ye(e)),t&&n&&n.vmCount++,n}function Se(e,t,n,r,o){var i=new ae,a=Object.getOwnPropertyDescriptor(e,t);if(!a||!1!==a.configurable){var u=a&&a.get,c=a&&a.set;u&&!c||2!==arguments.length||(n=e[t]);var s=!o&&be(n);Object.defineProperty(e,t,{enumerable:!0,configurable:!0,get:function(){var t=u?u.call(e):n;return ae.SharedObject.target&&(i.depend(),s&&(s.dep.depend(),Array.isArray(t)&&Pe(t))),t},set:function(t){var r=u?u.call(e):n;t===r||t!=t&&r!=r||u&&!c||(c?c.call(e,t):n=t,s=!o&&be(t),i.notify())}})}}function we(e,t,n){if(Array.isArray(e)&&d(t))return e.length=Math.max(e.length,t),e.splice(t,1,n),n;if(t in e&&!(t in Object.prototype))return e[t]=n,n;var r=e.__ob__;return e._isVue||r&&r.vmCount?n:r?(Se(r.value,t,n),r.dep.notify(),n):(e[t]=n,n)}function Oe(e,t){if(Array.isArray(e)&&d(t))e.splice(t,1);else{var n=e.__ob__;e._isVue||n&&n.vmCount||b(e,t)&&(delete e[t],n&&n.dep.notify())}}function Pe(e){for(var t=void 0,n=0,r=e.length;n<r;n++)(t=e[n])&&t.__ob__&&t.__ob__.dep.depend(),Array.isArray(t)&&Pe(t)}ye.prototype.walk=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)Se(e,t[n])},ye.prototype.observeArray=function(e){for(var t=0,n=e.length;t<n;t++)be(e[t])};var ke=R.optionMergeStrategies;function Ae(e,t){if(!t)return e;for(var n,r,o,i=re?Reflect.ownKeys(t):Object.keys(t),a=0;a<i.length;a++)"__ob__"!==(n=i[a])&&(r=e[n],o=t[n],b(e,n)?r!==o&&l(r)&&l(o)&&Ae(r,o):we(e,n,o));return e}function Te(e,t,n){return n?function(){var r="function"==typeof t?t.call(n,n):t,o="function"==typeof e?e.call(n,n):e;return r?Ae(r,o):o}:t?e?function(){return Ae("function"==typeof t?t.call(this,this):t,"function"==typeof e?e.call(this,this):e)}:t:e}function $e(e,t){var n=t?e?e.concat(t):Array.isArray(t)?t:[t]:e;return n?function(e){for(var t=[],n=0;n<e.length;n++)-1===t.indexOf(e[n])&&t.push(e[n]);return t}(n):n}function xe(e,t,n,r){var o=Object.create(e||null);return t?x(o,t):o}ke.data=function(e,t,n){return n?Te(e,t,n):t&&"function"!=typeof t?e:Te(e,t)},N.forEach((function(e){ke[e]=$e})),B.forEach((function(e){ke[e+"s"]=xe})),ke.watch=function(e,t,n,r){if(e===Y&&(e=void 0),t===Y&&(t=void 0),!t)return Object.create(e||null);if(!e)return t;var o={};for(var i in x(o,e),t){var a=o[i],u=t[i];a&&!Array.isArray(a)&&(a=[a]),o[i]=a?a.concat(u):Array.isArray(u)?u:[u]}return o},ke.props=ke.methods=ke.inject=ke.computed=function(e,t,n,r){if(!e)return t;var o=Object.create(null);return x(o,e),t&&x(o,t),o},ke.provide=Te;var Ee=function(e,t){return void 0===t?e:t};function Ce(e,t,n){if("function"==typeof t&&(t=t.options),function(e,t){var n=e.props;if(n){var r,o,i={};if(Array.isArray(n))for(r=n.length;r--;)"string"==typeof(o=n[r])&&(i[O(o)]={type:null});else if(l(n))for(var a in n)o=n[a],i[O(a)]=l(o)?o:{type:o};e.props=i}}(t),function(e,t){var n=e.inject;if(n){var r=e.inject={};if(Array.isArray(n))for(var o=0;o<n.length;o++)r[n[o]]={from:n[o]};else if(l(n))for(var i in n){var a=n[i];r[i]=l(a)?x({from:i},a):{from:a}}}}(t),function(e){var t=e.directives;if(t)for(var n in t){var r=t[n];"function"==typeof r&&(t[n]={bind:r,update:r})}}(t),!t._base&&(t.extends&&(e=Ce(e,t.extends,n)),t.mixins))for(var r=0,o=t.mixins.length;r<o;r++)e=Ce(e,t.mixins[r],n);var i,a={};for(i in e)u(i);for(i in t)b(e,i)||u(i);function u(r){var o=ke[r]||Ee;a[r]=o(e[r],t[r],n,r)}return a}function je(e,t,n,r){if("string"==typeof n){var o=e[t];if(b(o,n))return o[n];var i=O(n);if(b(o,i))return o[i];var a=P(i);return b(o,a)?o[a]:o[n]||o[i]||o[a]}}function Le(e,t,n,r){var o=t[e],i=!b(n,e),a=n[e],u=Me(Boolean,o.type);if(u>-1)if(i&&!b(o,"default"))a=!1;else if(""===a||a===A(e)){var c=Me(String,o.type);(c<0||u<c)&&(a=!0)}if(void 0===a){a=function(e,t,n){if(b(t,"default")){var r=t.default;return e&&e.$options.propsData&&void 0===e.$options.propsData[n]&&void 0!==e._props[n]?e._props[n]:"function"==typeof r&&"Function"!==Ie(t.type)?r.call(e):r}}(r,o,e);var s=ve;me(!0),be(a),me(s)}return a}function Ie(e){var t=e&&e.toString().match(/^\s*function (\w+)/);return t?t[1]:""}function De(e,t){return Ie(e)===Ie(t)}function Me(e,t){if(!Array.isArray(t))return De(t,e)?0:-1;for(var n=0,r=t.length;n<r;n++)if(De(t[n],e))return n;return-1}function Be(e,t,n){ue();try{if(t)for(var r=t;r=r.$parent;){var o=r.$options.errorCaptured;if(o)for(var i=0;i<o.length;i++)try{if(!1===o[i].call(r,e,t,n))return}catch(e){Re(e,r,"errorCaptured hook")}}Re(e,t,n)}finally{ce()}}function Ne(e,t,n,r,o){var i;try{(i=n?e.apply(t,n):e.call(t))&&!i._isVue&&p(i)&&!i._handled&&(i.catch((function(e){return Be(e,r,o+" (Promise/async)")})),i._handled=!0)}catch(e){Be(e,r,o)}return i}function Re(e,t,n){if(R.errorHandler)try{return R.errorHandler.call(null,e,t,n)}catch(t){t!==e&&Ve(t,null,"config.errorHandler")}Ve(e,t,n)}function Ve(e,t,n){if(!z&&!W||"undefined"==typeof console)throw e;console.error(e)}var Ue,Ge=[],He=!1;function Fe(){He=!1;var e=Ge.slice(0);Ge.length=0;for(var t=0;t<e.length;t++)e[t]()}if("undefined"!=typeof Promise&&te(Promise)){var ze=Promise.resolve();Ue=function(){ze.then(Fe),q&&setTimeout(C)}}else if(X||"undefined"==typeof MutationObserver||!te(MutationObserver)&&"[object MutationObserverConstructor]"!==MutationObserver.toString())Ue="undefined"!=typeof setImmediate&&te(setImmediate)?function(){setImmediate(Fe)}:function(){setTimeout(Fe,0)};else{var We=1,Ke=new MutationObserver(Fe),Je=document.createTextNode(String(We));Ke.observe(Je,{characterData:!0}),Ue=function(){We=(We+1)%2,Je.data=String(We)}}function Xe(e,t){var n;if(Ge.push((function(){if(e)try{e.call(t)}catch(e){Be(e,t,"nextTick")}else n&&n(t)})),He||(He=!0,Ue()),!e&&"undefined"!=typeof Promise)return new Promise((function(e){n=e}))}var qe=new ne;function Ye(e){(function e(t,n){var r,o,i=Array.isArray(t);if(!(!i&&!s(t)||Object.isFrozen(t)||t instanceof se)){if(t.__ob__){var a=t.__ob__.dep.id;if(n.has(a))return;n.add(a)}if(i)for(r=t.length;r--;)e(t[r],n);else for(o=Object.keys(t),r=o.length;r--;)e(t[o[r]],n)}})(e,qe),qe.clear()}var Qe=S((function(e){var t="&"===e.charAt(0),n="~"===(e=t?e.slice(1):e).charAt(0),r="!"===(e=n?e.slice(1):e).charAt(0);return{name:e=r?e.slice(1):e,once:n,capture:r,passive:t}}));function Ze(e,t){function n(){var e=arguments,r=n.fns;if(!Array.isArray(r))return Ne(r,null,arguments,t,"v-on handler");for(var o=r.slice(),i=0;i<o.length;i++)Ne(o[i],null,e,t,"v-on handler")}return n.fns=e,n}function et(e,t,n,r){var o=t.options.mpOptions&&t.options.mpOptions.properties;if(i(o))return n;var u=t.options.mpOptions.externalClasses||[],c=e.attrs,s=e.props;if(a(c)||a(s))for(var f in o){var l=A(f);(tt(n,s,f,l,!0)||tt(n,c,f,l,!1))&&n[f]&&-1!==u.indexOf(l)&&r[O(n[f])]&&(n[f]=r[O(n[f])])}return n}function tt(e,t,n,r,o){if(a(t)){if(b(t,n))return e[n]=t[n],o||delete t[n],!0;if(b(t,r))return e[n]=t[r],o||delete t[r],!0}return!1}function nt(e){return c(e)?[de(e)]:Array.isArray(e)?function e(t,n){var r,o,s,f,l=[];for(r=0;r<t.length;r++)i(o=t[r])||"boolean"==typeof o||(s=l.length-1,f=l[s],Array.isArray(o)?o.length>0&&(rt((o=e(o,(n||"")+"_"+r))[0])&&rt(f)&&(l[s]=de(f.text+o[0].text),o.shift()),l.push.apply(l,o)):c(o)?rt(f)?l[s]=de(f.text+o):""!==o&&l.push(de(o)):rt(o)&&rt(f)?l[s]=de(f.text+o.text):(u(t._isVList)&&a(o.tag)&&i(o.key)&&a(n)&&(o.key="__vlist"+n+"_"+r+"__"),l.push(o)));return l}(e):void 0}function rt(e){return a(e)&&a(e.text)&&function(e){return!1===e}(e.isComment)}function ot(e){var t=e.$options.provide;t&&(e._provided="function"==typeof t?t.call(e):t)}function it(e){var t=at(e.$options.inject,e);t&&(me(!1),Object.keys(t).forEach((function(n){Se(e,n,t[n])})),me(!0))}function at(e,t){if(e){for(var n=Object.create(null),r=re?Reflect.ownKeys(e):Object.keys(e),o=0;o<r.length;o++){var i=r[o];if("__ob__"!==i){for(var a=e[i].from,u=t;u;){if(u._provided&&b(u._provided,a)){n[i]=u._provided[a];break}u=u.$parent}if(!u&&"default"in e[i]){var c=e[i].default;n[i]="function"==typeof c?c.call(t):c}}}return n}}function ut(e,t){if(!e||!e.length)return{};for(var n={},r=0,o=e.length;r<o;r++){var i=e[r],a=i.data;if(a&&a.attrs&&a.attrs.slot&&delete a.attrs.slot,i.context!==t&&i.fnContext!==t||!a||null==a.slot)i.asyncMeta&&i.asyncMeta.data&&"page"===i.asyncMeta.data.slot?(n.page||(n.page=[])).push(i):(n.default||(n.default=[])).push(i);else{var u=a.slot,c=n[u]||(n[u]=[]);"template"===i.tag?c.push.apply(c,i.children||[]):c.push(i)}}for(var s in n)n[s].every(ct)&&delete n[s];return n}function ct(e){return e.isComment&&!e.asyncFactory||" "===e.text}function st(e,t,n){var r,i=Object.keys(t).length>0,a=e?!!e.$stable:!i,u=e&&e.$key;if(e){if(e._normalized)return e._normalized;if(a&&n&&n!==o&&u===n.$key&&!i&&!n.$hasNormal)return n;for(var c in r={},e)e[c]&&"$"!==c[0]&&(r[c]=ft(t,c,e[c]))}else r={};for(var s in t)s in r||(r[s]=lt(t,s));return e&&Object.isExtensible(e)&&(e._normalized=r),U(r,"$stable",a),U(r,"$key",u),U(r,"$hasNormal",i),r}function ft(t,n,r){var o=function(){var t=arguments.length?r.apply(null,arguments):r({});return(t=t&&"object"===e(t)&&!Array.isArray(t)?[t]:nt(t))&&(0===t.length||1===t.length&&t[0].isComment)?void 0:t};return r.proxy&&Object.defineProperty(t,n,{get:o,enumerable:!0,configurable:!0}),o}function lt(e,t){return function(){return e[t]}}function dt(e,t){var n,r,o,i,u;if(Array.isArray(e)||"string"==typeof e)for(n=new Array(e.length),r=0,o=e.length;r<o;r++)n[r]=t(e[r],r,r,r);else if("number"==typeof e)for(n=new Array(e),r=0;r<e;r++)n[r]=t(r+1,r,r,r);else if(s(e))if(re&&e[Symbol.iterator]){n=[];for(var c=e[Symbol.iterator](),f=c.next();!f.done;)n.push(t(f.value,n.length,r,r++)),f=c.next()}else for(i=Object.keys(e),n=new Array(i.length),r=0,o=i.length;r<o;r++)u=i[r],n[r]=t(e[u],u,r,r);return a(n)||(n=[]),n._isVList=!0,n}function pt(e,t,n,r){var o,i=this.$scopedSlots[e];i?(n=n||{},r&&(n=x(x({},r),n)),o=i(n,this,n._i)||t):o=this.$slots[e]||t;var a=n&&n.slot;return a?this.$createElement("template",{slot:a},o):o}function ht(e){return je(this.$options,"filters",e)||L}function gt(e,t){return Array.isArray(e)?-1===e.indexOf(t):e!==t}function vt(e,t,n,r,o){var i=R.keyCodes[t]||n;return o&&r&&!R.keyCodes[t]?gt(o,r):i?gt(i,e):r?A(r)!==t:void 0}function mt(e,t,n,r,o){if(n&&s(n)){var i;Array.isArray(n)&&(n=E(n));var a=function(a){if("class"===a||"style"===a||m(a))i=e;else{var u=e.attrs&&e.attrs.type;i=r||R.mustUseProp(t,u,a)?e.domProps||(e.domProps={}):e.attrs||(e.attrs={})}var c=O(a),s=A(a);c in i||s in i||(i[a]=n[a],!o)||((e.on||(e.on={}))["update:"+a]=function(e){n[a]=e})};for(var u in n)a(u)}return e}function yt(e,t){var n=this._staticTrees||(this._staticTrees=[]),r=n[e];return r&&!t||bt(r=n[e]=this.$options.staticRenderFns[e].call(this._renderProxy,null,this),"__static__"+e,!1),r}function _t(e,t,n){return bt(e,"__once__"+t+(n?"_"+n:""),!0),e}function bt(e,t,n){if(Array.isArray(e))for(var r=0;r<e.length;r++)e[r]&&"string"!=typeof e[r]&&St(e[r],t+"_"+r,n);else St(e,t,n)}function St(e,t,n){e.isStatic=!0,e.key=t,e.isOnce=n}function wt(e,t){if(t&&l(t)){var n=e.on=e.on?x({},e.on):{};for(var r in t){var o=n[r],i=t[r];n[r]=o?[].concat(o,i):i}}return e}function Ot(e,t,n,r){t=t||{$stable:!n};for(var o=0;o<e.length;o++){var i=e[o];Array.isArray(i)?Ot(i,t,n):i&&(i.proxy&&(i.fn.proxy=!0),t[i.key]=i.fn)}return r&&(t.$key=r),t}function Pt(e,t){for(var n=0;n<t.length;n+=2){var r=t[n];"string"==typeof r&&r&&(e[t[n]]=t[n+1])}return e}function kt(e,t){return"string"==typeof e?t+e:e}function At(e){e._o=_t,e._n=g,e._s=h,e._l=dt,e._t=pt,e._q=I,e._i=D,e._m=yt,e._f=ht,e._k=vt,e._b=mt,e._v=de,e._e=le,e._u=Ot,e._g=wt,e._d=Pt,e._p=kt}function Tt(e,t,n,r,i){var a,c=this,s=i.options;b(r,"_uid")?(a=Object.create(r))._original=r:(a=r,r=r._original);var f=u(s._compiled),l=!f;this.data=e,this.props=t,this.children=n,this.parent=r,this.listeners=e.on||o,this.injections=at(s.inject,r),this.slots=function(){return c.$slots||st(e.scopedSlots,c.$slots=ut(n,r)),c.$slots},Object.defineProperty(this,"scopedSlots",{enumerable:!0,get:function(){return st(e.scopedSlots,this.slots())}}),f&&(this.$options=s,this.$slots=this.slots(),this.$scopedSlots=st(e.scopedSlots,this.$slots)),s._scopeId?this._c=function(e,t,n,o){var i=Dt(a,e,t,n,o,l);return i&&!Array.isArray(i)&&(i.fnScopeId=s._scopeId,i.fnContext=r),i}:this._c=function(e,t,n,r){return Dt(a,e,t,n,r,l)}}function $t(e,t,n,r,i){var u=e.options,c={},s=u.props;if(a(s))for(var f in s)c[f]=Le(f,s,t||o);else a(n.attrs)&&Et(c,n.attrs),a(n.props)&&Et(c,n.props);var l=new Tt(n,c,i,r,e),d=u.render.call(null,l._c,l);if(d instanceof se)return xt(d,n,l.parent,u,l);if(Array.isArray(d)){for(var p=nt(d)||[],h=new Array(p.length),g=0;g<p.length;g++)h[g]=xt(p[g],n,l.parent,u,l);return h}}function xt(e,t,n,r,o){var i=function(e){var t=new se(e.tag,e.data,e.children&&e.children.slice(),e.text,e.elm,e.context,e.componentOptions,e.asyncFactory);return t.ns=e.ns,t.isStatic=e.isStatic,t.key=e.key,t.isComment=e.isComment,t.fnContext=e.fnContext,t.fnOptions=e.fnOptions,t.fnScopeId=e.fnScopeId,t.asyncMeta=e.asyncMeta,t.isCloned=!0,t}(e);return i.fnContext=n,i.fnOptions=r,t.slot&&((i.data||(i.data={})).slot=t.slot),i}function Et(e,t){for(var n in t)e[O(n)]=t[n]}At(Tt.prototype);var Ct={init:function(e,t){if(e.componentInstance&&!e.componentInstance._isDestroyed&&e.data.keepAlive){var n=e;Ct.prepatch(n,n)}else{(e.componentInstance=function(e,t){var n={_isComponent:!0,_parentVnode:e,parent:t},r=e.data.inlineTemplate;return a(r)&&(n.render=r.render,n.staticRenderFns=r.staticRenderFns),new e.componentOptions.Ctor(n)}(e,Jt)).$mount(t?e.elm:void 0,t)}},prepatch:function(e,t){var n=t.componentOptions;Xt(t.componentInstance=e.componentInstance,n.propsData,n.listeners,t,n.children)},insert:function(e){var t=e.context,n=e.componentInstance;n._isMounted||(Qt(n,"onServiceCreated"),Qt(n,"onServiceAttached"),n._isMounted=!0,Qt(n,"mounted")),e.data.keepAlive&&(t._isMounted?function(e){e._inactive=!1,en.push(e)}(n):Yt(n,!0))},destroy:function(e){var t=e.componentInstance;t._isDestroyed||(e.data.keepAlive?function e(t,n){if(!(n&&(t._directInactive=!0,qt(t))||t._inactive)){t._inactive=!0;for(var r=0;r<t.$children.length;r++)e(t.$children[r]);Qt(t,"deactivated")}}(t,!0):t.$destroy())}},jt=Object.keys(Ct);function Lt(e,t,n,r,o){if(!i(e)){var c=n.$options._base;if(s(e)&&(e=c.extend(e)),"function"==typeof e){var f;if(i(e.cid)&&void 0===(e=Ut(f=e,c)))return function(e,t,n,r,o){var i=le();return i.asyncFactory=e,i.asyncMeta={data:t,context:n,children:r,tag:o},i}(f,t,n,r,o);t=t||{},bn(e),a(t.model)&&function(e,t){var n=e.model&&e.model.prop||"value",r=e.model&&e.model.event||"input";(t.attrs||(t.attrs={}))[n]=t.model.value;var o=t.on||(t.on={}),i=o[r],u=t.model.callback;a(i)?(Array.isArray(i)?-1===i.indexOf(u):i!==u)&&(o[r]=[u].concat(i)):o[r]=u}(e.options,t);var l=function(e,t,n,r){var o=t.options.props;if(i(o))return et(e,t,{},r);var u={},c=e.attrs,s=e.props;if(a(c)||a(s))for(var f in o){var l=A(f);tt(u,s,f,l,!0)||tt(u,c,f,l,!1)}return et(e,t,u,r)}(t,e,0,n);if(u(e.options.functional))return $t(e,l,t,n,r);var d=t.on;if(t.on=t.nativeOn,u(e.options.abstract)){var p=t.slot;t={},p&&(t.slot=p)}!function(e){for(var t=e.hook||(e.hook={}),n=0;n<jt.length;n++){var r=jt[n],o=t[r],i=Ct[r];o===i||o&&o._merged||(t[r]=o?It(i,o):i)}}(t);var h=e.options.name||o;return new se("vue-component-"+e.cid+(h?"-"+h:""),t,void 0,void 0,void 0,n,{Ctor:e,propsData:l,listeners:d,tag:o,children:r},f)}}}function It(e,t){var n=function(n,r){e(n,r),t(n,r)};return n._merged=!0,n}function Dt(e,t,n,r,o,i){return(Array.isArray(n)||c(n))&&(o=r,r=n,n=void 0),u(i)&&(o=2),Mt(e,t,n,r,o)}function Mt(e,t,n,r,o){return a(n)&&a(n.__ob__)?le():(a(n)&&a(n.is)&&(t=n.is),t?(Array.isArray(r)&&"function"==typeof r[0]&&((n=n||{}).scopedSlots={default:r[0]},r.length=0),2===o?r=nt(r):1===o&&(r=function(e){for(var t=0;t<e.length;t++)if(Array.isArray(e[t]))return Array.prototype.concat.apply([],e);return e}(r)),"string"==typeof t?(u=e.$vnode&&e.$vnode.ns||R.getTagNamespace(t),i=R.isReservedTag(t)?new se(R.parsePlatformTagName(t),n,r,void 0,void 0,e):n&&n.pre||!a(c=je(e.$options,"components",t))?new se(t,n,r,void 0,void 0,e):Lt(c,n,e,r,t)):i=Lt(t,n,e,r),Array.isArray(i)?i:a(i)?(a(u)&&Bt(i,u),a(n)&&function(e){s(e.style)&&Ye(e.style),s(e.class)&&Ye(e.class)}(n),i):le()):le());var i,u,c}function Bt(e,t,n){if(e.ns=t,"foreignObject"===e.tag&&(t=void 0,n=!0),a(e.children))for(var r=0,o=e.children.length;r<o;r++){var c=e.children[r];a(c.tag)&&(i(c.ns)||u(n)&&"svg"!==c.tag)&&Bt(c,t,n)}}var Nt,Rt=null;function Vt(e,t){return(e.__esModule||re&&"Module"===e[Symbol.toStringTag])&&(e=e.default),s(e)?t.extend(e):e}function Ut(e,t){if(u(e.error)&&a(e.errorComp))return e.errorComp;if(a(e.resolved))return e.resolved;var n=Rt;if(n&&a(e.owners)&&-1===e.owners.indexOf(n)&&e.owners.push(n),u(e.loading)&&a(e.loadingComp))return e.loadingComp;if(n&&!a(e.owners)){var r=e.owners=[n],o=!0,c=null,f=null;n.$on("hook:destroyed",(function(){return y(r,n)}));var l=function(e){for(var t=0,n=r.length;t<n;t++)r[t].$forceUpdate();e&&(r.length=0,null!==c&&(clearTimeout(c),c=null),null!==f&&(clearTimeout(f),f=null))},d=M((function(n){e.resolved=Vt(n,t),o?r.length=0:l(!0)})),h=M((function(t){a(e.errorComp)&&(e.error=!0,l(!0))})),g=e(d,h);return s(g)&&(p(g)?i(e.resolved)&&g.then(d,h):p(g.component)&&(g.component.then(d,h),a(g.error)&&(e.errorComp=Vt(g.error,t)),a(g.loading)&&(e.loadingComp=Vt(g.loading,t),0===g.delay?e.loading=!0:c=setTimeout((function(){c=null,i(e.resolved)&&i(e.error)&&(e.loading=!0,l(!1))}),g.delay||200)),a(g.timeout)&&(f=setTimeout((function(){f=null,i(e.resolved)&&h(null)}),g.timeout)))),o=!1,e.loading?e.loadingComp:e.resolved}}function Gt(e){return e.isComment&&e.asyncFactory}function Ht(e){if(Array.isArray(e))for(var t=0;t<e.length;t++){var n=e[t];if(a(n)&&(a(n.componentOptions)||Gt(n)))return n}}function Ft(e,t){Nt.$on(e,t)}function zt(e,t){Nt.$off(e,t)}function Wt(e,t){var n=Nt;return function r(){var o=t.apply(null,arguments);null!==o&&n.$off(e,r)}}function Kt(e,t,n){Nt=e,function(e,t,n,r,o,a){var c,s,f,l;for(c in e)s=e[c],f=t[c],l=Qe(c),i(s)||(i(f)?(i(s.fns)&&(s=e[c]=Ze(s,a)),u(l.once)&&(s=e[c]=o(l.name,s,l.capture)),n(l.name,s,l.capture,l.passive,l.params)):s!==f&&(f.fns=s,e[c]=f));for(c in t)i(e[c])&&r((l=Qe(c)).name,t[c],l.capture)}(t,n||{},Ft,zt,Wt,e),Nt=void 0}var Jt=null;function Xt(e,t,n,r,i){var a=r.data.scopedSlots,u=e.$scopedSlots,c=!!(a&&!a.$stable||u!==o&&!u.$stable||a&&e.$scopedSlots.$key!==a.$key),s=!!(i||e.$options._renderChildren||c);if(e.$options._parentVnode=r,e.$vnode=r,e._vnode&&(e._vnode.parent=r),e.$options._renderChildren=i,e.$attrs=r.data.attrs||o,e.$listeners=n||o,t&&e.$options.props){me(!1);for(var f=e._props,l=e.$options._propKeys||[],d=0;d<l.length;d++){var p=l[d],h=e.$options.props;f[p]=Le(p,h,t,e)}me(!0),e.$options.propsData=t}e._$updateProperties&&e._$updateProperties(e),n=n||o;var g=e.$options._parentListeners;e.$options._parentListeners=n,Kt(e,n,g),s&&(e.$slots=ut(i,r.context),e.$forceUpdate())}function qt(e){for(;e&&(e=e.$parent);)if(e._inactive)return!0;return!1}function Yt(e,t){if(t){if(e._directInactive=!1,qt(e))return}else if(e._directInactive)return;if(e._inactive||null===e._inactive){e._inactive=!1;for(var n=0;n<e.$children.length;n++)Yt(e.$children[n]);Qt(e,"activated")}}function Qt(e,t){ue();var n=e.$options[t],r=t+" hook";if(n)for(var o=0,i=n.length;o<i;o++)Ne(n[o],e,null,e,r);e._hasHookEvent&&e.$emit("hook:"+t),ce()}var Zt=[],en=[],tn={},nn=!1,rn=!1,on=0;var an=Date.now;if(z&&!X){var un=window.performance;un&&"function"==typeof un.now&&an()>document.createEvent("Event").timeStamp&&(an=function(){return un.now()})}function cn(){var e,t;for(an(),rn=!0,Zt.sort((function(e,t){return e.id-t.id})),on=0;on<Zt.length;on++)(e=Zt[on]).before&&e.before(),t=e.id,tn[t]=null,e.run();var n=en.slice(),r=Zt.slice();on=Zt.length=en.length=0,tn={},nn=rn=!1,function(e){for(var t=0;t<e.length;t++)e[t]._inactive=!0,Yt(e[t],!0)}(n),function(e){var t=e.length;for(;t--;){var n=e[t],r=n.vm;r._watcher===n&&r._isMounted&&!r._isDestroyed&&Qt(r,"updated")}}(r),ee&&R.devtools&&ee.emit("flush")}var sn=0,fn=function(e,t,n,r,o){this.vm=e,o&&(e._watcher=this),e._watchers.push(this),r?(this.deep=!!r.deep,this.user=!!r.user,this.lazy=!!r.lazy,this.sync=!!r.sync,this.before=r.before):this.deep=this.user=this.lazy=this.sync=!1,this.cb=n,this.id=++sn,this.active=!0,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new ne,this.newDepIds=new ne,this.expression="","function"==typeof t?this.getter=t:(this.getter=function(e){if(!G.test(e)){var t=e.split(".");return function(e){for(var n=0;n<t.length;n++){if(!e)return;e=e[t[n]]}return e}}}(t),this.getter||(this.getter=C)),this.value=this.lazy?void 0:this.get()};fn.prototype.get=function(){var e;ue(this);var t=this.vm;try{e=this.getter.call(t,t)}catch(e){if(!this.user)throw e;Be(e,t,'getter for watcher "'+this.expression+'"')}finally{this.deep&&Ye(e),ce(),this.cleanupDeps()}return e},fn.prototype.addDep=function(e){var t=e.id;this.newDepIds.has(t)||(this.newDepIds.add(t),this.newDeps.push(e),this.depIds.has(t)||e.addSub(this))},fn.prototype.cleanupDeps=function(){for(var e=this.deps.length;e--;){var t=this.deps[e];this.newDepIds.has(t.id)||t.removeSub(this)}var n=this.depIds;this.depIds=this.newDepIds,this.newDepIds=n,this.newDepIds.clear(),n=this.deps,this.deps=this.newDeps,this.newDeps=n,this.newDeps.length=0},fn.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():function(e){var t=e.id;if(null==tn[t]){if(tn[t]=!0,rn){for(var n=Zt.length-1;n>on&&Zt[n].id>e.id;)n--;Zt.splice(n+1,0,e)}else Zt.push(e);nn||(nn=!0,Xe(cn))}}(this)},fn.prototype.run=function(){if(this.active){var e=this.get();if(e!==this.value||s(e)||this.deep){var t=this.value;if(this.value=e,this.user)try{this.cb.call(this.vm,e,t)}catch(e){Be(e,this.vm,'callback for watcher "'+this.expression+'"')}else this.cb.call(this.vm,e,t)}}},fn.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},fn.prototype.depend=function(){for(var e=this.deps.length;e--;)this.deps[e].depend()},fn.prototype.teardown=function(){if(this.active){this.vm._isBeingDestroyed||y(this.vm._watchers,this);for(var e=this.deps.length;e--;)this.deps[e].removeSub(this);this.active=!1}};var ln={enumerable:!0,configurable:!0,get:C,set:C};function dn(e,t,n){ln.get=function(){return this[t][n]},ln.set=function(e){this[t][n]=e},Object.defineProperty(e,n,ln)}function pn(e){e._watchers=[];var t=e.$options;t.props&&function(e,t){var n=e.$options.propsData||{},r=e._props={},o=e.$options._propKeys=[];!e.$parent||me(!1);var i=function(i){o.push(i);var a=Le(i,t,n,e);Se(r,i,a),i in e||dn(e,"_props",i)};for(var a in t)i(a);me(!0)}(e,t.props),t.methods&&function(e,t){for(var n in e.$options.props,t)e[n]="function"!=typeof t[n]?C:T(t[n],e)}(e,t.methods),t.data?function(e){var t=e.$options.data;l(t=e._data="function"==typeof t?function(e,t){ue();try{return e.call(t,t)}catch(e){return Be(e,t,"data()"),{}}finally{ce()}}(t,e):t||{})||(t={});var n=Object.keys(t),r=e.$options.props,o=(e.$options.methods,n.length);for(;o--;){var i=n[o];r&&b(r,i)||V(i)||dn(e,"_data",i)}be(t,!0)}(e):be(e._data={},!0),t.computed&&function(e,t){var n=e._computedWatchers=Object.create(null),r=Z();for(var o in t){var i=t[o],a="function"==typeof i?i:i.get;r||(n[o]=new fn(e,a||C,C,hn)),o in e||gn(e,o,i)}}(e,t.computed),t.watch&&t.watch!==Y&&function(e,t){for(var n in t){var r=t[n];if(Array.isArray(r))for(var o=0;o<r.length;o++)yn(e,n,r[o]);else yn(e,n,r)}}(e,t.watch)}var hn={lazy:!0};function gn(e,t,n){var r=!Z();"function"==typeof n?(ln.get=r?vn(t):mn(n),ln.set=C):(ln.get=n.get?r&&!1!==n.cache?vn(t):mn(n.get):C,ln.set=n.set||C),Object.defineProperty(e,t,ln)}function vn(e){return function(){var t=this._computedWatchers&&this._computedWatchers[e];if(t)return t.dirty&&t.evaluate(),ae.SharedObject.target&&t.depend(),t.value}}function mn(e){return function(){return e.call(this,this)}}function yn(e,t,n,r){return l(n)&&(r=n,n=n.handler),"string"==typeof n&&(n=e[n]),e.$watch(t,n,r)}var _n=0;function bn(e){var t=e.options;if(e.super){var n=bn(e.super);if(n!==e.superOptions){e.superOptions=n;var r=function(e){var t,n=e.options,r=e.sealedOptions;for(var o in n)n[o]!==r[o]&&(t||(t={}),t[o]=n[o]);return t}(e);r&&x(e.extendOptions,r),(t=e.options=Ce(n,e.extendOptions)).name&&(t.components[t.name]=e)}}return t}function Sn(e){this._init(e)}function wn(e){e.cid=0;var t=1;e.extend=function(e){e=e||{};var n=this,r=n.cid,o=e._Ctor||(e._Ctor={});if(o[r])return o[r];var i=e.name||n.options.name,a=function(e){this._init(e)};return(a.prototype=Object.create(n.prototype)).constructor=a,a.cid=t++,a.options=Ce(n.options,e),a.super=n,a.options.props&&function(e){var t=e.options.props;for(var n in t)dn(e.prototype,"_props",n)}(a),a.options.computed&&function(e){var t=e.options.computed;for(var n in t)gn(e.prototype,n,t[n])}(a),a.extend=n.extend,a.mixin=n.mixin,a.use=n.use,B.forEach((function(e){a[e]=n[e]})),i&&(a.options.components[i]=a),a.superOptions=n.options,a.extendOptions=e,a.sealedOptions=x({},a.options),o[r]=a,a}}function On(e){return e&&(e.Ctor.options.name||e.tag)}function Pn(e,t){return Array.isArray(e)?e.indexOf(t)>-1:"string"==typeof e?e.split(",").indexOf(t)>-1:!!function(e){return"[object RegExp]"===f.call(e)}(e)&&e.test(t)}function kn(e,t){var n=e.cache,r=e.keys,o=e._vnode;for(var i in n){var a=n[i];if(a){var u=On(a.componentOptions);u&&!t(u)&&An(n,i,r,o)}}}function An(e,t,n,r){var o=e[t];!o||r&&o.tag===r.tag||o.componentInstance.$destroy(),e[t]=null,y(n,t)}(function(e){e.prototype._init=function(e){var t=this;t._uid=_n++,t._isVue=!0,e&&e._isComponent?function(e,t){var n=e.$options=Object.create(e.constructor.options),r=t._parentVnode;n.parent=t.parent,n._parentVnode=r;var o=r.componentOptions;n.propsData=o.propsData,n._parentListeners=o.listeners,n._renderChildren=o.children,n._componentTag=o.tag,t.render&&(n.render=t.render,n.staticRenderFns=t.staticRenderFns)}(t,e):t.$options=Ce(bn(t.constructor),e||{},t),t._renderProxy=t,t._self=t,function(e){var t=e.$options,n=t.parent;if(n&&!t.abstract){for(;n.$options.abstract&&n.$parent;)n=n.$parent;n.$children.push(e)}e.$parent=n,e.$root=n?n.$root:e,e.$children=[],e.$refs={},e._watcher=null,e._inactive=null,e._directInactive=!1,e._isMounted=!1,e._isDestroyed=!1,e._isBeingDestroyed=!1}(t),function(e){e._events=Object.create(null),e._hasHookEvent=!1;var t=e.$options._parentListeners;t&&Kt(e,t)}(t),function(e){e._vnode=null,e._staticTrees=null;var t=e.$options,n=e.$vnode=t._parentVnode,r=n&&n.context;e.$slots=ut(t._renderChildren,r),e.$scopedSlots=o,e._c=function(t,n,r,o){return Dt(e,t,n,r,o,!1)},e.$createElement=function(t,n,r,o){return Dt(e,t,n,r,o,!0)};var i=n&&n.data;Se(e,"$attrs",i&&i.attrs||o,null,!0),Se(e,"$listeners",t._parentListeners||o,null,!0)}(t),Qt(t,"beforeCreate"),!t._$fallback&&it(t),pn(t),!t._$fallback&&ot(t),!t._$fallback&&Qt(t,"created"),t.$options.el&&t.$mount(t.$options.el)}})(Sn),function(e){Object.defineProperty(e.prototype,"$data",{get:function(){return this._data}}),Object.defineProperty(e.prototype,"$props",{get:function(){return this._props}}),e.prototype.$set=we,e.prototype.$delete=Oe,e.prototype.$watch=function(e,t,n){var r=this;if(l(t))return yn(r,e,t,n);(n=n||{}).user=!0;var o=new fn(r,e,t,n);if(n.immediate)try{t.call(r,o.value)}catch(e){Be(e,r,'callback for immediate watcher "'+o.expression+'"')}return function(){o.teardown()}}}(Sn),function(e){var t=/^hook:/;e.prototype.$on=function(e,n){var r=this;if(Array.isArray(e))for(var o=0,i=e.length;o<i;o++)r.$on(e[o],n);else(r._events[e]||(r._events[e]=[])).push(n),t.test(e)&&(r._hasHookEvent=!0);return r},e.prototype.$once=function(e,t){var n=this;function r(){n.$off(e,r),t.apply(n,arguments)}return r.fn=t,n.$on(e,r),n},e.prototype.$off=function(e,t){var n=this;if(!arguments.length)return n._events=Object.create(null),n;if(Array.isArray(e)){for(var r=0,o=e.length;r<o;r++)n.$off(e[r],t);return n}var i,a=n._events[e];if(!a)return n;if(!t)return n._events[e]=null,n;for(var u=a.length;u--;)if((i=a[u])===t||i.fn===t){a.splice(u,1);break}return n},e.prototype.$emit=function(e){var t=this,n=t._events[e];if(n){n=n.length>1?$(n):n;for(var r=$(arguments,1),o='event handler for "'+e+'"',i=0,a=n.length;i<a;i++)Ne(n[i],t,r,t,o)}return t}}(Sn),function(e){e.prototype._update=function(e,t){var n=this,r=n.$el,o=n._vnode,i=function(e){var t=Jt;return Jt=e,function(){Jt=t}}(n);n._vnode=e,n.$el=o?n.__patch__(o,e):n.__patch__(n.$el,e,t,!1),i(),r&&(r.__vue__=null),n.$el&&(n.$el.__vue__=n),n.$vnode&&n.$parent&&n.$vnode===n.$parent._vnode&&(n.$parent.$el=n.$el)},e.prototype.$forceUpdate=function(){this._watcher&&this._watcher.update()},e.prototype.$destroy=function(){var e=this;if(!e._isBeingDestroyed){Qt(e,"beforeDestroy"),e._isBeingDestroyed=!0;var t=e.$parent;!t||t._isBeingDestroyed||e.$options.abstract||y(t.$children,e),e._watcher&&e._watcher.teardown();for(var n=e._watchers.length;n--;)e._watchers[n].teardown();e._data.__ob__&&e._data.__ob__.vmCount--,e._isDestroyed=!0,e.__patch__(e._vnode,null),Qt(e,"destroyed"),e.$off(),e.$el&&(e.$el.__vue__=null),e.$vnode&&(e.$vnode.parent=null)}}}(Sn),function(e){At(e.prototype),e.prototype.$nextTick=function(e){return Xe(e,this)},e.prototype._render=function(){var e,t=this,n=t.$options,r=n.render,o=n._parentVnode;o&&(t.$scopedSlots=st(o.data.scopedSlots,t.$slots,t.$scopedSlots)),t.$vnode=o;try{Rt=t,e=r.call(t._renderProxy,t.$createElement)}catch(n){Be(n,t,"render"),e=t._vnode}finally{Rt=null}return Array.isArray(e)&&1===e.length&&(e=e[0]),e instanceof se||(e=le()),e.parent=o,e}}(Sn);var Tn=[String,RegExp,Array],$n={KeepAlive:{name:"keep-alive",abstract:!0,props:{include:Tn,exclude:Tn,max:[String,Number]},created:function(){this.cache=Object.create(null),this.keys=[]},destroyed:function(){for(var e in this.cache)An(this.cache,e,this.keys)},mounted:function(){var e=this;this.$watch("include",(function(t){kn(e,(function(e){return Pn(t,e)}))})),this.$watch("exclude",(function(t){kn(e,(function(e){return!Pn(t,e)}))}))},render:function(){var e=this.$slots.default,t=Ht(e),n=t&&t.componentOptions;if(n){var r=On(n),o=this.include,i=this.exclude;if(o&&(!r||!Pn(o,r))||i&&r&&Pn(i,r))return t;var a=this.cache,u=this.keys,c=null==t.key?n.Ctor.cid+(n.tag?"::"+n.tag:""):t.key;a[c]?(t.componentInstance=a[c].componentInstance,y(u,c),u.push(c)):(a[c]=t,u.push(c),this.max&&u.length>parseInt(this.max)&&An(a,u[0],u,this._vnode)),t.data.keepAlive=!0}return t||e&&e[0]}}};(function(e){var t={get:function(){return R}};Object.defineProperty(e,"config",t),e.util={warn:oe,extend:x,mergeOptions:Ce,defineReactive:Se},e.set=we,e.delete=Oe,e.nextTick=Xe,e.observable=function(e){return be(e),e},e.options=Object.create(null),B.forEach((function(t){e.options[t+"s"]=Object.create(null)})),e.options._base=e,x(e.options.components,$n),function(e){e.use=function(e){var t=this._installedPlugins||(this._installedPlugins=[]);if(t.indexOf(e)>-1)return this;var n=$(arguments,1);return n.unshift(this),"function"==typeof e.install?e.install.apply(e,n):"function"==typeof e&&e.apply(null,n),t.push(e),this}}(e),function(e){e.mixin=function(e){return this.options=Ce(this.options,e),this}}(e),wn(e),function(e){B.forEach((function(t){e[t]=function(e,n){return n?("component"===t&&l(n)&&(n.name=n.name||e,n=this.options._base.extend(n)),"directive"===t&&"function"==typeof n&&(n={bind:n,update:n}),this.options[t+"s"][e]=n,n):this.options[t+"s"][e]}}))}(e)})(Sn),Object.defineProperty(Sn.prototype,"$isServer",{get:Z}),Object.defineProperty(Sn.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}}),Object.defineProperty(Sn,"FunctionalRenderContext",{value:Tt}),Sn.version="2.6.11";var xn="[object Array]",En="[object Object]",Cn="[object Null]",jn="[object Undefined]";function Ln(e,t){var n={};return function e(t,n){if(t!==n){var r=Dn(t),o=Dn(n);if(r==En&&o==En){if(Object.keys(t).length>=Object.keys(n).length)for(var i in n){var a=t[i];void 0===a?t[i]=null:e(a,n[i])}}else r==xn&&o==xn&&t.length>=n.length&&n.forEach((function(n,r){e(t[r],n)}))}}(e,t),function e(t,n,r,o){if(t!==n){var i=Dn(t),a=Dn(n);if(i==En)if(a!=En||Object.keys(t).length<Object.keys(n).length)In(o,r,t);else{var u=function(i){var a=t[i],u=n[i],c=Dn(a),s=Dn(u);if(c!=xn&&c!=En)a!==n[i]&&function(e,t){return e!==Cn&&e!==jn||t!==Cn&&t!==jn}(c,s)&&In(o,(""==r?"":r+".")+i,a);else if(c==xn)s!=xn||a.length<u.length?In(o,(""==r?"":r+".")+i,a):a.forEach((function(t,n){e(t,u[n],(""==r?"":r+".")+i+"["+n+"]",o)}));else if(c==En)if(s!=En||Object.keys(a).length<Object.keys(u).length)In(o,(""==r?"":r+".")+i,a);else for(var f in a)e(a[f],u[f],(""==r?"":r+".")+i+"."+f,o)};for(var c in t)u(c)}else i==xn?a!=xn||t.length<n.length?In(o,r,t):t.forEach((function(t,i){e(t,n[i],r+"["+i+"]",o)})):In(o,r,t)}}(e,t,"",n),n}function In(e,t,n){e[t]=n}function Dn(e){return Object.prototype.toString.call(e)}function Mn(e){if(e.__next_tick_callbacks&&e.__next_tick_callbacks.length){if({NODE_ENV:"production",VUE_APP_DARK_MODE:"false",VUE_APP_NAME:"bawangcan",VUE_APP_PLATFORM:"mp-weixin",BASE_URL:"/"}.VUE_APP_DEBUG){var t=e.$scope;console.log("["+ +new Date+"]["+(t.is||t.route)+"]["+e._uid+"]:flushCallbacks["+e.__next_tick_callbacks.length+"]")}var n=e.__next_tick_callbacks.slice(0);e.__next_tick_callbacks.length=0;for(var r=0;r<n.length;r++)n[r]()}}function Bn(e,t){if(!e.__next_tick_pending&&!function(e){return Zt.find((function(t){return e._watcher===t}))}(e)){if({NODE_ENV:"production",VUE_APP_DARK_MODE:"false",VUE_APP_NAME:"bawangcan",VUE_APP_PLATFORM:"mp-weixin",BASE_URL:"/"}.VUE_APP_DEBUG){var n=e.$scope;console.log("["+ +new Date+"]["+(n.is||n.route)+"]["+e._uid+"]:nextVueTick")}return Xe(t,e)}if({NODE_ENV:"production",VUE_APP_DARK_MODE:"false",VUE_APP_NAME:"bawangcan",VUE_APP_PLATFORM:"mp-weixin",BASE_URL:"/"}.VUE_APP_DEBUG){var r=e.$scope;console.log("["+ +new Date+"]["+(r.is||r.route)+"]["+e._uid+"]:nextMPTick")}var o;if(e.__next_tick_callbacks||(e.__next_tick_callbacks=[]),e.__next_tick_callbacks.push((function(){if(t)try{t.call(e)}catch(t){Be(t,e,"nextTick")}else o&&o(e)})),!t&&"undefined"!=typeof Promise)return new Promise((function(e){o=e}))}function Nn(e,t){return t&&(t._isVue||t.__v_isMPComponent)?{}:t}function Rn(){}function Vn(e){return Array.isArray(e)?function(e){for(var t,n="",r=0,o=e.length;r<o;r++)a(t=Vn(e[r]))&&""!==t&&(n&&(n+=" "),n+=t);return n}(e):s(e)?function(e){var t="";for(var n in e)e[n]&&(t&&(t+=" "),t+=n);return t}(e):"string"==typeof e?e:""}var Un=S((function(e){var t={},n=/:(.+)/;return e.split(/;(?![^(]*\))/g).forEach((function(e){if(e){var r=e.split(n);r.length>1&&(t[r[0].trim()]=r[1].trim())}})),t}));var Gn=["createSelectorQuery","createIntersectionObserver","selectAllComponents","selectComponent"];var Hn=["onLaunch","onShow","onHide","onUniNViewMessage","onPageNotFound","onThemeChange","onError","onUnhandledRejection","onInit","onLoad","onReady","onUnload","onPullDownRefresh","onReachBottom","onTabItemTap","onAddToFavorites","onShareTimeline","onShareAppMessage","onResize","onPageScroll","onNavigationBarButtonTap","onBackPress","onNavigationBarSearchInputChanged","onNavigationBarSearchInputConfirmed","onNavigationBarSearchInputClicked","onUploadDouyinVideo","onNFCReadMessage","onPageShow","onPageHide","onPageResize"];Sn.prototype.__patch__=function(e,t){var n=this;if(null!==t&&("page"===this.mpType||"component"===this.mpType)){var r=this.$scope,o=Object.create(null);try{o=function(e){var t=Object.create(null);[].concat(Object.keys(e._data||{}),Object.keys(e._computedWatchers||{})).reduce((function(t,n){return t[n]=e[n],t}),t);var n=e.__composition_api_state__||e.__secret_vfa_state__,r=n&&n.rawBindings;return r&&Object.keys(r).forEach((function(n){t[n]=e[n]})),Object.assign(t,e.$mp.data||{}),Array.isArray(e.$options.behaviors)&&-1!==e.$options.behaviors.indexOf("uni://form-field")&&(t.name=e.name,t.value=e.value),JSON.parse(JSON.stringify(t,Nn))}(this)}catch(e){console.error(e)}o.__webviewId__=r.data.__webviewId__;var i=Object.create(null);Object.keys(o).forEach((function(e){i[e]=r.data[e]}));var a=!1===this.$shouldDiffData?o:Ln(o,i);Object.keys(a).length?({NODE_ENV:"production",VUE_APP_DARK_MODE:"false",VUE_APP_NAME:"bawangcan",VUE_APP_PLATFORM:"mp-weixin",BASE_URL:"/"}.VUE_APP_DEBUG&&console.log("["+ +new Date+"]["+(r.is||r.route)+"]["+this._uid+"]差量更新",JSON.stringify(a)),this.__next_tick_pending=!0,r.setData(a,(function(){n.__next_tick_pending=!1,Mn(n)}))):Mn(this)}},Sn.prototype.$mount=function(e,t){return function(e,t,n){return e.mpType?("app"===e.mpType&&(e.$options.render=Rn),e.$options.render||(e.$options.render=Rn),!e._$fallback&&Qt(e,"beforeMount"),new fn(e,(function(){e._update(e._render(),n)}),C,{before:function(){e._isMounted&&!e._isDestroyed&&Qt(e,"beforeUpdate")}},!0),n=!1,e):e}(this,0,t)},function(e){var t=e.extend;e.extend=function(e){var n=(e=e||{}).methods;return n&&Object.keys(n).forEach((function(t){-1!==Hn.indexOf(t)&&(e[t]=n[t],delete n[t])})),t.call(this,e)};var n=e.config.optionMergeStrategies,r=n.created;Hn.forEach((function(e){n[e]=r})),e.prototype.__lifecycle_hooks__=Hn}(Sn),function(e){e.config.errorHandler=function(t,n,r){e.util.warn("Error in "+r+': "'+t.toString()+'"',n),console.error(t);var o="function"==typeof getApp&&getApp();o&&o.onError&&o.onError(t)};var t=e.prototype.$emit;e.prototype.$emit=function(e){if(this.$scope&&e){var n=this.$scope._triggerEvent||this.$scope.triggerEvent;if(n)try{n.call(this.$scope,e,{__args__:$(arguments,1)})}catch(e){}}return t.apply(this,arguments)},e.prototype.$nextTick=function(e){return Bn(this,e)},Gn.forEach((function(t){e.prototype[t]=function(e){return this.$scope&&this.$scope[t]?this.$scope[t](e):"undefined"!=typeof my?"createSelectorQuery"===t?my.createSelectorQuery(e):"createIntersectionObserver"===t?my.createIntersectionObserver(e):void 0:void 0}})),e.prototype.__init_provide=ot,e.prototype.__init_injections=it,e.prototype.__call_hook=function(e,t){var n=this;ue();var r,o=n.$options[e],i=e+" hook";if(o)for(var a=0,u=o.length;a<u;a++)r=Ne(o[a],n,t?[t]:null,n,i);return n._hasHookEvent&&n.$emit("hook:"+e,t),ce(),r},e.prototype.__set_model=function(t,n,r,o){Array.isArray(o)&&(-1!==o.indexOf("trim")&&(r=r.trim()),-1!==o.indexOf("number")&&(r=this._n(r))),t||(t=this),e.set(t,n,r)},e.prototype.__set_sync=function(t,n,r){t||(t=this),e.set(t,n,r)},e.prototype.__get_orig=function(e){return l(e)&&e.$orig||e},e.prototype.__get_value=function(e,t){return function e(t,n){var r=n.split("."),o=r[0];return 0===o.indexOf("__$n")&&(o=parseInt(o.replace("__$n",""))),1===r.length?t[o]:e(t[o],r.slice(1).join("."))}(t||this,e)},e.prototype.__get_class=function(e,t){return function(e,t){return a(e)||a(t)?function(e,t){return e?t?e+" "+t:e:t||""}(e,Vn(t)):""}(t,e)},e.prototype.__get_style=function(e,t){if(!e&&!t)return"";var n=function(e){return Array.isArray(e)?E(e):"string"==typeof e?Un(e):e}(e),r=t?x(t,n):n;return Object.keys(r).map((function(e){return A(e)+":"+r[e]})).join(";")},e.prototype.__map=function(e,t){var n,r,o,i,a;if(Array.isArray(e)){for(n=new Array(e.length),r=0,o=e.length;r<o;r++)n[r]=t(e[r],r);return n}if(s(e)){for(i=Object.keys(e),n=Object.create(null),r=0,o=i.length;r<o;r++)n[a=i[r]]=t(e[a],a,r);return n}if("number"==typeof e){for(n=new Array(e),r=0,o=e;r<o;r++)n[r]=t(r,r);return n}return[]}}(Sn),n.default=Sn},9453:function(e,t,n){function r(e,t,n,r,o,i,a,u,c,s){var f,l="function"==typeof e?e.options:e;if(c){l.components||(l.components={});var d=Object.prototype.hasOwnProperty;for(var p in c)d.call(c,p)&&!d.call(l.components,p)&&(l.components[p]=c[p])}if(s&&("function"==typeof s.beforeCreate&&(s.beforeCreate=[s.beforeCreate]),(s.beforeCreate||(s.beforeCreate=[])).unshift((function(){this[s.__module]=this})),(l.mixins||(l.mixins=[])).push(s)),t&&(l.render=t,l.staticRenderFns=n,l._compiled=!0),r&&(l.functional=!0),i&&(l._scopeId="data-v-"+i),a?(f=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},l._ssrRegister=f):o&&(f=u?function(){o.call(this,this.$root.$options.shadowRoot)}:o),f)if(l.functional){l._injectStyles=f;var h=l.render;l.render=function(e,t){return f.call(t),h(e,t)}}else{var g=l.beforeCreate;l.beforeCreate=g?[].concat(g,f):[f]}return{exports:e,options:l}}n.r(t),n.d(t,{default:function(){return r}})},843:function(t,n,r){var o=("undefined"!=typeof window?window:void 0!==r.g?r.g:{}).__VUE_DEVTOOLS_GLOBAL_HOOK__;function i(e){o&&(e._devtoolHook=o,o.emit("vuex:init",e),o.on("vuex:travel-to-state",(function(t){e.replaceState(t)})),e.subscribe((function(e,t){o.emit("vuex:mutation",e,t)}),{prepend:!0}),e.subscribeAction((function(e,t){o.emit("vuex:action",e,t)}),{prepend:!0}))}function a(t,n){if(void 0===n&&(n=[]),null===t||"object"!==e(t))return t;var r=function(e,t){return e.filter(t)[0]}(n,(function(e){return e.original===t}));if(r)return r.copy;var o=Array.isArray(t)?[]:{};return n.push({original:t,copy:o}),Object.keys(t).forEach((function(e){o[e]=a(t[e],n)})),o}function u(e,t){Object.keys(e).forEach((function(n){return t(e[n],n)}))}function c(t){return null!==t&&"object"===e(t)}var s=function(e,t){this.runtime=t,this._children=Object.create(null),this._rawModule=e;var n=e.state;this.state=("function"==typeof n?n():n)||{}},f={namespaced:{configurable:!0}};f.namespaced.get=function(){return!!this._rawModule.namespaced},s.prototype.addChild=function(e,t){this._children[e]=t},s.prototype.removeChild=function(e){delete this._children[e]},s.prototype.getChild=function(e){return this._children[e]},s.prototype.hasChild=function(e){return e in this._children},s.prototype.update=function(e){this._rawModule.namespaced=e.namespaced,e.actions&&(this._rawModule.actions=e.actions),e.mutations&&(this._rawModule.mutations=e.mutations),e.getters&&(this._rawModule.getters=e.getters)},s.prototype.forEachChild=function(e){u(this._children,e)},s.prototype.forEachGetter=function(e){this._rawModule.getters&&u(this._rawModule.getters,e)},s.prototype.forEachAction=function(e){this._rawModule.actions&&u(this._rawModule.actions,e)},s.prototype.forEachMutation=function(e){this._rawModule.mutations&&u(this._rawModule.mutations,e)},Object.defineProperties(s.prototype,f);var l,d=function(e){this.register([],e,!1)};d.prototype.get=function(e){return e.reduce((function(e,t){return e.getChild(t)}),this.root)},d.prototype.getNamespace=function(e){var t=this.root;return e.reduce((function(e,n){return e+((t=t.getChild(n)).namespaced?n+"/":"")}),"")},d.prototype.update=function(e){!function e(t,n,r){if(n.update(r),r.modules)for(var o in r.modules){if(!n.getChild(o))return;e(t.concat(o),n.getChild(o),r.modules[o])}}([],this.root,e)},d.prototype.register=function(e,t,n){var r=this;void 0===n&&(n=!0);var o=new s(t,n);0===e.length?this.root=o:this.get(e.slice(0,-1)).addChild(e[e.length-1],o);t.modules&&u(t.modules,(function(t,o){r.register(e.concat(o),t,n)}))},d.prototype.unregister=function(e){var t=this.get(e.slice(0,-1)),n=e[e.length-1],r=t.getChild(n);r&&r.runtime&&t.removeChild(n)},d.prototype.isRegistered=function(e){var t=this.get(e.slice(0,-1)),n=e[e.length-1];return!!t&&t.hasChild(n)};var p=function(e){var t=this;void 0===e&&(e={}),!l&&"undefined"!=typeof window&&window.Vue&&S(window.Vue);var n=e.plugins;void 0===n&&(n=[]);var r=e.strict;void 0===r&&(r=!1),this._committing=!1,this._actions=Object.create(null),this._actionSubscribers=[],this._mutations=Object.create(null),this._wrappedGetters=Object.create(null),this._modules=new d(e),this._modulesNamespaceMap=Object.create(null),this._subscribers=[],this._watcherVM=new l,this._makeLocalGettersCache=Object.create(null);var o=this,a=this.dispatch,u=this.commit;this.dispatch=function(e,t){return a.call(o,e,t)},this.commit=function(e,t,n){return u.call(o,e,t,n)},this.strict=r;var c=this._modules.root.state;y(this,c,[],this._modules.root),m(this,c),n.forEach((function(e){return e(t)})),(void 0!==e.devtools?e.devtools:l.config.devtools)&&i(this)},h={state:{configurable:!0}};function g(e,t,n){return t.indexOf(e)<0&&(n&&n.prepend?t.unshift(e):t.push(e)),function(){var n=t.indexOf(e);n>-1&&t.splice(n,1)}}function v(e,t){e._actions=Object.create(null),e._mutations=Object.create(null),e._wrappedGetters=Object.create(null),e._modulesNamespaceMap=Object.create(null);var n=e.state;y(e,n,[],e._modules.root,!0),m(e,n,t)}function m(e,t,n){var r=e._vm;e.getters={},e._makeLocalGettersCache=Object.create(null);var o=e._wrappedGetters,i={};u(o,(function(t,n){i[n]=function(e,t){return function(){return e(t)}}(t,e),Object.defineProperty(e.getters,n,{get:function(){return e._vm[n]},enumerable:!0})}));var a=l.config.silent;l.config.silent=!0,e._vm=new l({data:{$$state:t},computed:i}),l.config.silent=a,e.strict&&function(e){e._vm.$watch((function(){return this._data.$$state}),(function(){}),{deep:!0,sync:!0})}(e),r&&(n&&e._withCommit((function(){r._data.$$state=null})),l.nextTick((function(){return r.$destroy()})))}function y(e,t,n,r,o){var i=!n.length,a=e._modules.getNamespace(n);if(r.namespaced&&(e._modulesNamespaceMap[a],e._modulesNamespaceMap[a]=r),!i&&!o){var u=_(t,n.slice(0,-1)),c=n[n.length-1];e._withCommit((function(){l.set(u,c,r.state)}))}var s=r.context=function(e,t,n){var r=""===t,o={dispatch:r?e.dispatch:function(n,r,o){var i=b(n,r,o),a=i.payload,u=i.options,c=i.type;return u&&u.root||(c=t+c),e.dispatch(c,a)},commit:r?e.commit:function(n,r,o){var i=b(n,r,o),a=i.payload,u=i.options,c=i.type;u&&u.root||(c=t+c),e.commit(c,a,u)}};return Object.defineProperties(o,{getters:{get:r?function(){return e.getters}:function(){return function(e,t){if(!e._makeLocalGettersCache[t]){var n={},r=t.length;Object.keys(e.getters).forEach((function(o){if(o.slice(0,r)===t){var i=o.slice(r);Object.defineProperty(n,i,{get:function(){return e.getters[o]},enumerable:!0})}})),e._makeLocalGettersCache[t]=n}return e._makeLocalGettersCache[t]}(e,t)}},state:{get:function(){return _(e.state,n)}}}),o}(e,a,n);r.forEachMutation((function(t,n){!function(e,t,n,r){(e._mutations[t]||(e._mutations[t]=[])).push((function(t){n.call(e,r.state,t)}))}(e,a+n,t,s)})),r.forEachAction((function(t,n){var r=t.root?n:a+n,o=t.handler||t;!function(e,t,n,r){(e._actions[t]||(e._actions[t]=[])).push((function(t){var o=n.call(e,{dispatch:r.dispatch,commit:r.commit,getters:r.getters,state:r.state,rootGetters:e.getters,rootState:e.state},t);return function(e){return e&&"function"==typeof e.then}(o)||(o=Promise.resolve(o)),e._devtoolHook?o.catch((function(t){throw e._devtoolHook.emit("vuex:error",t),t})):o}))}(e,r,o,s)})),r.forEachGetter((function(t,n){!function(e,t,n,r){e._wrappedGetters[t]||(e._wrappedGetters[t]=function(e){return n(r.state,r.getters,e.state,e.getters)})}(e,a+n,t,s)})),r.forEachChild((function(r,i){y(e,t,n.concat(i),r,o)}))}function _(e,t){return t.reduce((function(e,t){return e[t]}),e)}function b(e,t,n){return c(e)&&e.type&&(n=t,t=e,e=e.type),{type:e,payload:t,options:n}}function S(e){l&&e===l||
/*!
     * vuex v3.6.2
     * (c) 2021 Evan You
     * @license MIT
     */
function(e){if(Number(e.version.split(".")[0])>=2)e.mixin({beforeCreate:n});else{var t=e.prototype._init;e.prototype._init=function(e){void 0===e&&(e={}),e.init=e.init?[n].concat(e.init):n,t.call(this,e)}}function n(){var e=this.$options;e.store?this.$store="function"==typeof e.store?e.store():e.store:e.parent&&e.parent.$store&&(this.$store=e.parent.$store)}}(l=e)}h.state.get=function(){return this._vm._data.$$state},h.state.set=function(e){},p.prototype.commit=function(e,t,n){var r=this,o=b(e,t,n),i=o.type,a=o.payload,u=(o.options,{type:i,payload:a}),c=this._mutations[i];c&&(this._withCommit((function(){c.forEach((function(e){e(a)}))})),this._subscribers.slice().forEach((function(e){return e(u,r.state)})))},p.prototype.dispatch=function(e,t){var n=this,r=b(e,t),o=r.type,i=r.payload,a={type:o,payload:i},u=this._actions[o];if(u){try{this._actionSubscribers.slice().filter((function(e){return e.before})).forEach((function(e){return e.before(a,n.state)}))}catch(e){}var c=u.length>1?Promise.all(u.map((function(e){return e(i)}))):u[0](i);return new Promise((function(e,t){c.then((function(t){try{n._actionSubscribers.filter((function(e){return e.after})).forEach((function(e){return e.after(a,n.state)}))}catch(e){}e(t)}),(function(e){try{n._actionSubscribers.filter((function(e){return e.error})).forEach((function(t){return t.error(a,n.state,e)}))}catch(e){}t(e)}))}))}},p.prototype.subscribe=function(e,t){return g(e,this._subscribers,t)},p.prototype.subscribeAction=function(e,t){return g("function"==typeof e?{before:e}:e,this._actionSubscribers,t)},p.prototype.watch=function(e,t,n){var r=this;return this._watcherVM.$watch((function(){return e(r.state,r.getters)}),t,n)},p.prototype.replaceState=function(e){var t=this;this._withCommit((function(){t._vm._data.$$state=e}))},p.prototype.registerModule=function(e,t,n){void 0===n&&(n={}),"string"==typeof e&&(e=[e]),this._modules.register(e,t),y(this,this.state,e,this._modules.get(e),n.preserveState),m(this,this.state)},p.prototype.unregisterModule=function(e){var t=this;"string"==typeof e&&(e=[e]),this._modules.unregister(e),this._withCommit((function(){var n=_(t.state,e.slice(0,-1));l.delete(n,e[e.length-1])})),v(this)},p.prototype.hasModule=function(e){return"string"==typeof e&&(e=[e]),this._modules.isRegistered(e)},p.prototype[[104,111,116,85,112,100,97,116,101].map((function(e){return String.fromCharCode(e)})).join("")]=function(e){this._modules.update(e),v(this,!0)},p.prototype._withCommit=function(e){var t=this._committing;this._committing=!0,e(),this._committing=t},Object.defineProperties(p.prototype,h);var w=T((function(e,t){var n={};return A(t).forEach((function(t){var r=t.key,o=t.val;n[r]=function(){var t=this.$store.state,n=this.$store.getters;if(e){var r=$(this.$store,"mapState",e);if(!r)return;t=r.context.state,n=r.context.getters}return"function"==typeof o?o.call(this,t,n):t[o]},n[r].vuex=!0})),n})),O=T((function(e,t){var n={};return A(t).forEach((function(t){var r=t.key,o=t.val;n[r]=function(){for(var t=[],n=arguments.length;n--;)t[n]=arguments[n];var r=this.$store.commit;if(e){var i=$(this.$store,"mapMutations",e);if(!i)return;r=i.context.commit}return"function"==typeof o?o.apply(this,[r].concat(t)):r.apply(this.$store,[o].concat(t))}})),n})),P=T((function(e,t){var n={};return A(t).forEach((function(t){var r=t.key,o=t.val;o=e+o,n[r]=function(){if(!e||$(this.$store,"mapGetters",e))return this.$store.getters[o]},n[r].vuex=!0})),n})),k=T((function(e,t){var n={};return A(t).forEach((function(t){var r=t.key,o=t.val;n[r]=function(){for(var t=[],n=arguments.length;n--;)t[n]=arguments[n];var r=this.$store.dispatch;if(e){var i=$(this.$store,"mapActions",e);if(!i)return;r=i.context.dispatch}return"function"==typeof o?o.apply(this,[r].concat(t)):r.apply(this.$store,[o].concat(t))}})),n}));function A(e){return function(e){return Array.isArray(e)||c(e)}(e)?Array.isArray(e)?e.map((function(e){return{key:e,val:e}})):Object.keys(e).map((function(t){return{key:t,val:e[t]}})):[]}function T(e){return function(t,n){return"string"!=typeof t?(n=t,t=""):"/"!==t.charAt(t.length-1)&&(t+="/"),e(t,n)}}function $(e,t,n){return e._modulesNamespaceMap[n]}function x(e,t,n){var r=n?e.groupCollapsed:e.group;try{r.call(e,t)}catch(n){e.log(t)}}function E(e){try{e.groupEnd()}catch(t){e.log("—— log end ——")}}function C(){var e=new Date;return" @ "+j(e.getHours(),2)+":"+j(e.getMinutes(),2)+":"+j(e.getSeconds(),2)+"."+j(e.getMilliseconds(),3)}function j(e,t){return function(e,t){return new Array(t+1).join(e)}("0",t-e.toString().length)+e}var L={Store:p,install:S,version:"3.6.2",mapState:w,mapMutations:O,mapGetters:P,mapActions:k,createNamespacedHelpers:function(e){return{mapState:w.bind(null,e),mapGetters:P.bind(null,e),mapMutations:O.bind(null,e),mapActions:k.bind(null,e)}},createLogger:function(e){void 0===e&&(e={});var t=e.collapsed;void 0===t&&(t=!0);var n=e.filter;void 0===n&&(n=function(e,t,n){return!0});var r=e.transformer;void 0===r&&(r=function(e){return e});var o=e.mutationTransformer;void 0===o&&(o=function(e){return e});var i=e.actionFilter;void 0===i&&(i=function(e,t){return!0});var u=e.actionTransformer;void 0===u&&(u=function(e){return e});var c=e.logMutations;void 0===c&&(c=!0);var s=e.logActions;void 0===s&&(s=!0);var f=e.logger;return void 0===f&&(f=console),function(e){var l=a(e.state);void 0!==f&&(c&&e.subscribe((function(e,i){var u=a(i);if(n(e,l,u)){var c=C(),s=o(e),d="mutation "+e.type+c;x(f,d,t),f.log("%c prev state","color: #9E9E9E; font-weight: bold",r(l)),f.log("%c mutation","color: #03A9F4; font-weight: bold",s),f.log("%c next state","color: #4CAF50; font-weight: bold",r(u)),E(f)}l=u})),s&&e.subscribeAction((function(e,n){if(i(e,n)){var r=C(),o=u(e),a="action "+e.type+r;x(f,a,t),f.log("%c action","color: #03A9F4; font-weight: bold",o),E(f)}})))}}};t.exports=L},7039:function(e,t,n){n.r(t),n.d(t,{createApp:function(){return Jt},createComponent:function(){return on},createPage:function(){return rn},createPlugin:function(){return un},createSubpackageApp:function(){return an},default:function(){return sn}});var r=n(9029),o=n(7028);function i(e,t){return(i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function a(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function u(e,t,n){return(u=a()?Reflect.construct.bind():function(e,t,n){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(e,r));return n&&i(o,n.prototype),o}).apply(null,arguments)}var c=n(9510),s=n(6257);function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var l=n(7206);function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(0,l.default)(r.key),r)}}function p(e,t,n){return t&&d(e.prototype,t),n&&d(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}var h=n(7039).default,g=["{","}"],v=function(){function e(){f(this,e),this._caches=Object.create(null)}return p(e,[{key:"interpolate",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:g;if(!t)return[e];var r=this._caches[e];return r||(r=_(e,n),this._caches[e]=r),b(r,t)}}]),e}(),m=/^(?:\d)+/,y=/^(?:\w)+/;function _(e,t){for(var n=(0,r.default)(t,2),o=n[0],i=n[1],a=[],u=0,c="";u<e.length;){var s=e[u++];if(s===o){c&&a.push({type:"text",value:c}),c="";var f="";for(s=e[u++];void 0!==s&&s!==i;)f+=s,s=e[u++];var l=s===i,d=m.test(f)?"list":l&&y.test(f)?"named":"unknown";a.push({value:f,type:d})}else c+=s}return c&&a.push({type:"text",value:c}),a}function b(e,t){var n=[],r=0,o=Array.isArray(t)?"list":function(e){return null!==e&&"object"===(0,s.default)(e)}(t)?"named":"unknown";if("unknown"===o)return n;for(;r<e.length;){var i=e[r];switch(i.type){case"text":n.push(i.value);break;case"list":n.push(t[parseInt(i.value,10)]);break;case"named":"named"===o&&n.push(t[i.value])}r++}return n}var S="zh-Hans",w="en",O=Object.prototype.hasOwnProperty,P=function(e,t){return O.call(e,t)},k=new v;function A(e,t){if(e){if(e=e.trim().replace(/_/g,"-"),t&&t[e])return e;if("chinese"===(e=e.toLowerCase()))return S;if(0===e.indexOf("zh"))return e.indexOf("-hans")>-1?S:e.indexOf("-hant")>-1||function(e,t){return!!t.find((function(t){return-1!==e.indexOf(t)}))}(e,["-tw","-hk","-mo","-cht"])?"zh-Hant":S;var n=[w,"fr","es"];return t&&Object.keys(t).length>0&&(n=Object.keys(t)),function(e,t){return t.find((function(t){return 0===e.indexOf(t)}))}(e,n)||void 0}}var T=function(){function e(t){var n=t.locale,r=t.fallbackLocale,o=t.messages,i=t.watcher,a=t.formater;f(this,e),this.locale=w,this.fallbackLocale=w,this.message={},this.messages={},this.watchers=[],r&&(this.fallbackLocale=r),this.formater=a||k,this.messages=o||{},this.setLocale(n||w),i&&this.watchLocale(i)}return p(e,[{key:"setLocale",value:function(e){var t=this,n=this.locale;this.locale=A(e,this.messages)||this.fallbackLocale,this.messages[this.locale]||(this.messages[this.locale]={}),this.message=this.messages[this.locale],n!==this.locale&&this.watchers.forEach((function(e){e(t.locale,n)}))}},{key:"getLocale",value:function(){return this.locale}},{key:"watchLocale",value:function(e){var t=this,n=this.watchers.push(e)-1;return function(){t.watchers.splice(n,1)}}},{key:"add",value:function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=this.messages[e];r?n?Object.assign(r,t):Object.keys(t).forEach((function(e){P(r,e)||(r[e]=t[e])})):this.messages[e]=t}},{key:"f",value:function(e,t,n){return this.formater.interpolate(e,t,n).join("")}},{key:"t",value:function(e,t,n){var r=this.message;return"string"==typeof t?(t=A(t,this.messages))&&(r=this.messages[t]):n=t,P(r,e)?this.formater.interpolate(r[e],n).join(""):(console.warn("Cannot translate the value of keypath ".concat(e,". Use the value of keypath as default.")),e)}}]),e}();function $(e,t){e.$watchLocale?e.$watchLocale((function(e){t.setLocale(e)})):e.$watch((function(){return e.$locale}),(function(e){t.setLocale(e)}))}function x(){return void 0!==h&&h.getLocale?h.getLocale():void 0!==n.g&&n.g.getLocale?n.g.getLocale():w}var E,C=n(5476),j=n(8793).default;function L(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function I(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?L(Object(n),!0).forEach((function(t){(0,o.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):L(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var D="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",M=/^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;function B(){var e,t=j.getStorageSync("uni_id_token")||"",n=t.split(".");if(!t||3!==n.length)return{uid:null,role:[],permission:[],tokenExpired:0};try{e=JSON.parse(function(e){return decodeURIComponent(E(e).split("").map((function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)})).join(""))}(n[1]))}catch(e){throw new Error("获取当前用户信息出错，详细错误信息为："+e.message)}return e.tokenExpired=1e3*e.exp,delete e.exp,delete e.iat,e}E="function"!=typeof atob?function(e){if(e=String(e).replace(/[\t\n\f\r ]+/g,""),!M.test(e))throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");var t;e+="==".slice(2-(3&e.length));for(var n,r,o="",i=0;i<e.length;)t=D.indexOf(e.charAt(i++))<<18|D.indexOf(e.charAt(i++))<<12|(n=D.indexOf(e.charAt(i++)))<<6|(r=D.indexOf(e.charAt(i++))),o+=64===n?String.fromCharCode(t>>16&255):64===r?String.fromCharCode(t>>16&255,t>>8&255):String.fromCharCode(t>>16&255,t>>8&255,255&t);return o}:atob;var N=Object.prototype.toString,R=Object.prototype.hasOwnProperty;function V(e){return"function"==typeof e}function U(e){return"string"==typeof e}function G(e){return"[object Object]"===N.call(e)}function H(e,t){return R.call(e,t)}function F(){}function z(e){var t=Object.create(null);return function(n){return t[n]||(t[n]=e(n))}}var W=/-(\w)/g,K=z((function(e){return e.replace(W,(function(e,t){return t?t.toUpperCase():""}))}));function J(e){var t={};return G(e)&&Object.keys(e).sort().forEach((function(n){t[n]=e[n]})),Object.keys(t)?t:e}var X=["invoke","success","fail","complete","returnValue"],q={},Y={};function Q(e,t){Object.keys(t).forEach((function(n){-1!==X.indexOf(n)&&V(t[n])&&(e[n]=function(e,t){var n=t?e?e.concat(t):Array.isArray(t)?t:[t]:e;return n?function(e){for(var t=[],n=0;n<e.length;n++)-1===t.indexOf(e[n])&&t.push(e[n]);return t}(n):n}(e[n],t[n]))}))}function Z(e,t){e&&t&&Object.keys(t).forEach((function(n){-1!==X.indexOf(n)&&V(t[n])&&function(e,t){var n=e.indexOf(t);-1!==n&&e.splice(n,1)}(e[n],t[n])}))}function ee(e,t){return function(n){return e(n,t)||n}}function te(e){return!!e&&("object"===(0,s.default)(e)||"function"==typeof e)&&"function"==typeof e.then}function ne(e,t,n){for(var r=!1,o=0;o<e.length;o++){var i=e[o];if(r)r=Promise.resolve(ee(i,n));else{var a=i(t,n);if(te(a)&&(r=Promise.resolve(a)),!1===a)return{then:function(){}}}}return r||{then:function(e){return e(t)}}}function re(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return["success","fail","complete"].forEach((function(n){if(Array.isArray(e[n])){var r=t[n];t[n]=function(o){ne(e[n],o,t).then((function(e){return V(r)&&r(e)||e}))}}})),t}function oe(e,t){var n=[];Array.isArray(q.returnValue)&&n.push.apply(n,(0,c.default)(q.returnValue));var r=Y[e];return r&&Array.isArray(r.returnValue)&&n.push.apply(n,(0,c.default)(r.returnValue)),n.forEach((function(e){t=e(t)||t})),t}function ie(e){var t=Object.create(null);Object.keys(q).forEach((function(e){"returnValue"!==e&&(t[e]=q[e].slice())}));var n=Y[e];return n&&Object.keys(n).forEach((function(e){"returnValue"!==e&&(t[e]=(t[e]||[]).concat(n[e]))})),t}function ae(e,t,n){for(var r=arguments.length,o=new Array(r>3?r-3:0),i=3;i<r;i++)o[i-3]=arguments[i];var a=ie(e);if(a&&Object.keys(a).length){if(Array.isArray(a.invoke)){var u=ne(a.invoke,n);return u.then((function(n){return t.apply(void 0,[re(ie(e),n)].concat(o))}))}return t.apply(void 0,[re(a,n)].concat(o))}return t.apply(void 0,[n].concat(o))}var ue={returnValue:function(e){return te(e)?new Promise((function(t,n){e.then((function(e){e[0]?n(e[0]):t(e[1])}))})):e}},ce=/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/,se=/^create|Manager$/,fe=["createBLEConnection"],le=["createBLEConnection","createPushMessage"],de=/^on|^off/;function pe(e){return se.test(e)&&-1===fe.indexOf(e)}function he(e){return ce.test(e)&&-1===le.indexOf(e)}function ge(e){return e.then((function(e){return[null,e]})).catch((function(e){return[e]}))}function ve(e){return!(pe(e)||he(e)||function(e){return de.test(e)&&"onPush"!==e}(e))}function me(e,t){return ve(e)&&V(t)?function(){for(var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return V(n.success)||V(n.fail)||V(n.complete)?oe(e,ae.apply(void 0,[e,t,n].concat(o))):oe(e,ge(new Promise((function(r,i){ae.apply(void 0,[e,t,Object.assign({},n,{success:r,fail:i})].concat(o))}))))}:t}Promise.prototype.finally||(Promise.prototype.finally=function(e){var t=this.constructor;return this.then((function(n){return t.resolve(e()).then((function(){return n}))}),(function(n){return t.resolve(e()).then((function(){throw n}))}))});var ye=!1,_e=0,be=0;var Se,we="zh-Hans",Oe={};Se=Ae(j.getSystemInfoSync().language)||"en",function(){if("undefined"!=typeof __uniConfig&&__uniConfig.locales&&Object.keys(__uniConfig.locales).length){var e=Object.keys(__uniConfig.locales);e.length&&e.forEach((function(e){var t=Oe[e],n=__uniConfig.locales[e];t?Object.assign(t,n):Oe[e]=n}))}}();var Pe=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0,r=arguments.length>3?arguments[3]:void 0;if("string"!=typeof e){var o=[t,e];e=o[0],t=o[1]}"string"!=typeof e&&(e=x()),"string"!=typeof n&&(n="undefined"!=typeof __uniConfig&&__uniConfig.fallbackLocale||w);var i=new T({locale:e,fallbackLocale:n,messages:t,watcher:r}),a=function(e,t){if("function"!=typeof getApp)a=function(e,t){return i.t(e,t)};else{var n=!1;a=function(e,t){var r=getApp().$vm;return r&&(r.$locale,n||(n=!0,$(r,i))),i.t(e,t)}}return a(e,t)};return{i18n:i,f:function(e,t,n){return i.f(e,t,n)},t:function(e,t){return a(e,t)},add:function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return i.add(e,t,n)},watch:function(e){return i.watchLocale(e)},getLocale:function(){return i.getLocale()},setLocale:function(e){return i.setLocale(e)}}}(Se,{}),ke=Pe.t;function Ae(e,t){if(e)return e=e.trim().replace(/_/g,"-"),t&&t[e]?e:"chinese"===(e=e.toLowerCase())?we:0===e.indexOf("zh")?e.indexOf("-hans")>-1?we:e.indexOf("-hant")>-1||function(e,t){return!!t.find((function(t){return-1!==e.indexOf(t)}))}(e,["-tw","-hk","-mo","-cht"])?"zh-Hant":we:function(e,t){return t.find((function(t){return 0===e.indexOf(t)}))}(e,["en","fr","es"])||void 0}function Te(){if(V(getApp)){var e=getApp({allowDefault:!0});if(e&&e.$vm)return e.$vm.$locale}return Ae(j.getSystemInfoSync().language)||"en"}Pe.mixin={beforeCreate:function(){var e=this,t=Pe.i18n.watchLocale((function(){e.$forceUpdate()}));this.$once("hook:beforeDestroy",(function(){t()}))},methods:{$$t:function(e,t){return ke(e,t)}}},Pe.setLocale,Pe.getLocale;var $e=[];void 0!==n.g&&(n.g.getLocale=Te);var xe={promiseInterceptor:ue},Ee=Object.freeze({__proto__:null,upx2px:function(e,t){if(0===_e&&function(){var e=j.getSystemInfoSync(),t=e.platform,n=e.pixelRatio,r=e.windowWidth;_e=r,be=n,ye="ios"===t}(),0===(e=Number(e)))return 0;var n=e/750*(t||_e);return n<0&&(n=-n),0===(n=Math.floor(n+1e-4))&&(n=1!==be&&ye?.5:1),e<0?-n:n},getLocale:Te,setLocale:function(e){var t=!!V(getApp)&&getApp();return!!t&&(t.$vm.$locale!==e&&(t.$vm.$locale=e,$e.forEach((function(t){return t({locale:e})})),!0))},onLocaleChange:function(e){-1===$e.indexOf(e)&&$e.push(e)},addInterceptor:function(e,t){"string"==typeof e&&G(t)?Q(Y[e]||(Y[e]={}),t):G(e)&&Q(q,e)},removeInterceptor:function(e,t){"string"==typeof e?G(t)?Z(Y[e],t):delete Y[e]:G(e)&&Z(q,e)},interceptors:xe});var Ce,je="__DC_STAT_UUID";function Le(e){(Ce=Ce||j.getStorageSync(je))||(Ce=Date.now()+""+Math.floor(1e7*Math.random()),j.setStorage({key:je,data:Ce})),e.deviceId=Ce}function Ie(e){if(e.safeArea){var t=e.safeArea;e.safeAreaInsets={top:t.top,left:t.left,right:e.windowWidth-t.right,bottom:e.screenHeight-t.bottom}}}function De(e,t){for(var n=e.deviceType||"phone",r={ipad:"pad",windows:"pc",mac:"pc"},o=Object.keys(r),i=t.toLocaleLowerCase(),a=0;a<o.length;a++){var u=o[a];if(-1!==i.indexOf(u)){n=r[u];break}}return n}function Me(e){var t=e;return t&&(t=e.toLocaleLowerCase()),t}function Be(e){return Te?Te():e}function Ne(e){var t=e.hostName||"WeChat";return e.environment?t=e.environment:e.host&&e.host.env&&(t=e.host.env),t}var Re={returnValue:function(e){Le(e),Ie(e),function(e){var t,n=e.brand,r=void 0===n?"":n,o=e.model,i=void 0===o?"":o,a=e.system,u=void 0===a?"":a,c=e.language,s=void 0===c?"":c,f=e.theme,l=e.version,d=(e.platform,e.fontSizeSetting),p=e.SDKVersion,h=e.pixelRatio,g=e.deviceOrientation,v="";v=u.split(" ")[0]||"",t=u.split(" ")[1]||"";var m=l,y=De(e,i),_=Me(r),b=Ne(e),S=g,w=h,O=p,P=s.replace(/_/g,"-"),k={appId:"__UNI__0002011",appName:"bawangcan",appVersion:"1.0.97",appVersionCode:"1097",appLanguage:Be(P),uniCompileVersion:"3.8.4",uniRuntimeVersion:"3.8.4",uniPlatform:"mp-weixin",deviceBrand:_,deviceModel:i,deviceType:y,devicePixelRatio:w,deviceOrientation:S,osName:v.toLocaleLowerCase(),osVersion:t,hostTheme:f,hostVersion:m,hostLanguage:P,hostName:b,hostSDKVersion:O,hostFontSizeSetting:d,windowTop:0,windowBottom:0,osLanguage:void 0,osTheme:void 0,ua:void 0,hostPackageName:void 0,browserName:void 0,browserVersion:void 0};Object.assign(e,k,{})}(e)}},Ve={redirectTo:{name:function(e){return"back"===e.exists&&e.delta?"navigateBack":"redirectTo"},args:function(e){if("back"===e.exists&&e.url){var t=function(e){for(var t=getCurrentPages(),n=t.length;n--;){var r=t[n];if(r.$page&&r.$page.fullPath===e)return n}return-1}(e.url);if(-1!==t){var n=getCurrentPages().length-1-t;n>0&&(e.delta=n)}}}},previewImage:{args:function(e){var t=parseInt(e.current);if(!isNaN(t)){var n=e.urls;if(Array.isArray(n)){var r=n.length;if(r)return t<0?t=0:t>=r&&(t=r-1),t>0?(e.current=n[t],e.urls=n.filter((function(e,r){return!(r<t)||e!==n[t]}))):e.current=n[0],{indicator:!1,loop:!1}}}}},getSystemInfo:Re,getSystemInfoSync:Re,showActionSheet:{args:function(e){"object"===(0,s.default)(e)&&(e.alertText=e.title)}},getAppBaseInfo:{returnValue:function(e){var t=e,n=t.version,r=t.language,o=t.SDKVersion,i=t.theme,a=Ne(e),u=r.replace("_","-");e=J(Object.assign(e,{appId:"__UNI__0002011",appName:"bawangcan",appVersion:"1.0.97",appVersionCode:"1097",appLanguage:Be(u),hostVersion:n,hostLanguage:u,hostName:a,hostSDKVersion:o,hostTheme:i}))}},getDeviceInfo:{returnValue:function(e){var t=e,n=t.brand,r=t.model,o=De(e,r),i=Me(n);Le(e),e=J(Object.assign(e,{deviceType:o,deviceBrand:i,deviceModel:r}))}},getWindowInfo:{returnValue:function(e){Ie(e),e=J(Object.assign(e,{windowTop:0,windowBottom:0}))}},getAppAuthorizeSetting:{returnValue:function(e){var t=e.locationReducedAccuracy;e.locationAccuracy="unsupported",!0===t?e.locationAccuracy="reduced":!1===t&&(e.locationAccuracy="full")}},compressImage:{args:function(e){e.compressedHeight&&!e.compressHeight&&(e.compressHeight=e.compressedHeight),e.compressedWidth&&!e.compressWidth&&(e.compressWidth=e.compressedWidth)}}},Ue=["success","fail","cancel","complete"];function Ge(e,t,n){return function(r){return t(Fe(e,r,n))}}function He(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=arguments.length>4&&void 0!==arguments[4]&&arguments[4];if(G(t)){var i=!0===o?t:{};for(var a in V(n)&&(n=n(t,i)||{}),t)if(H(n,a)){var u=n[a];V(u)&&(u=u(t[a],t,i)),u?U(u)?i[u]=t[a]:G(u)&&(i[u.name?u.name:a]=u.value):console.warn("The '".concat(e,"' method of platform '微信小程序' does not support option '").concat(a,"'"))}else-1!==Ue.indexOf(a)?V(t[a])&&(i[a]=Ge(e,t[a],r)):o||(i[a]=t[a]);return i}return V(t)&&(t=Ge(e,t,r)),t}function Fe(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return V(Ve.returnValue)&&(t=Ve.returnValue(e,t)),He(e,t,n,{},r)}function ze(e,t){if(H(Ve,e)){var n=Ve[e];return n?function(t,r){var o=n;V(n)&&(o=n(t));var i=[t=He(e,t,o.args,o.returnValue)];void 0!==r&&i.push(r),V(o.name)?e=o.name(t):U(o.name)&&(e=o.name);var a=j[e].apply(j,i);return he(e)?Fe(e,a,o.returnValue,pe(e)):a}:function(){console.error("Platform '微信小程序' does not support '".concat(e,"'."))}}return t}var We=Object.create(null);["onTabBarMidButtonTap","subscribePush","unsubscribePush","onPush","offPush","share"].forEach((function(e){We[e]=function(e){return function(t){var n=t.fail,r=t.complete,o={errMsg:"".concat(e,":fail method '").concat(e,"' not supported")};V(n)&&n(o),V(r)&&r(o)}}(e)}));var Ke={oauth:["weixin"],share:["weixin"],payment:["wxpay"],push:["weixin"]};var Je=Object.freeze({__proto__:null,getProvider:function(e){var t=e.service,n=e.success,r=e.fail,o=e.complete,i=!1;Ke[t]?(i={errMsg:"getProvider:ok",service:t,provider:Ke[t]},V(n)&&n(i)):(i={errMsg:"getProvider:fail service not found"},V(r)&&r(i)),V(o)&&o(i)}}),Xe=function(){var e;return function(){return e||(e=new C.default),e}}();function qe(e,t,n){return e[t].apply(e,n)}var Ye,Qe,Ze,et=Object.freeze({__proto__:null,$on:function(){return qe(Xe(),"$on",Array.prototype.slice.call(arguments))},$off:function(){return qe(Xe(),"$off",Array.prototype.slice.call(arguments))},$once:function(){return qe(Xe(),"$once",Array.prototype.slice.call(arguments))},$emit:function(){return qe(Xe(),"$emit",Array.prototype.slice.call(arguments))}});function tt(e){return function(){try{return e.apply(e,arguments)}catch(e){console.error(e)}}}function nt(e){try{return JSON.parse(e)}catch(e){}return e}var rt=[];function ot(e,t){rt.forEach((function(n){n(e,t)})),rt.length=0}var it=[],at=j.getAppBaseInfo&&j.getAppBaseInfo();at||(at=j.getSystemInfoSync());var ut=at?at.host:null,ct=ut&&"SAAASDK"===ut.env?j.miniapp.shareVideoMessage:j.shareVideoMessage,st=Object.freeze({__proto__:null,shareVideoMessage:ct,getPushClientId:function(e){G(e)||(e={});var t=function(e){var t={};for(var n in e){var r=e[n];V(r)&&(t[n]=tt(r),delete e[n])}return t}(e),n=t.success,r=t.fail,o=t.complete,i=V(n),a=V(r),u=V(o);Promise.resolve().then((function(){void 0===Ze&&(Ze=!1,Ye="",Qe="uniPush is not enabled"),rt.push((function(e,t){var c;e?(c={errMsg:"getPushClientId:ok",cid:e},i&&n(c)):(c={errMsg:"getPushClientId:fail"+(t?" "+t:"")},a&&r(c)),u&&o(c)})),void 0!==Ye&&ot(Ye,Qe)}))},onPushMessage:function(e){-1===it.indexOf(e)&&it.push(e)},offPushMessage:function(e){if(e){var t=it.indexOf(e);t>-1&&it.splice(t,1)}else it.length=0},invokePushCallback:function(e){if("enabled"===e.type)Ze=!0;else if("clientId"===e.type)Ye=e.cid,Qe=e.errMsg,ot(Ye,e.errMsg);else if("pushMsg"===e.type)for(var t={type:"receive",data:nt(e.message)},n=0;n<it.length;n++){if((0,it[n])(t),t.stopped)break}else"click"===e.type&&it.forEach((function(t){t({type:"click",data:nt(e.message)})}))}}),ft=["__route__","__wxExparserNodeId__","__wxWebviewId__"];function lt(e){return Behavior(e)}function dt(){return!!this.route}function pt(e){this.triggerEvent("__l",e)}function ht(e){var t=e.$scope,n={};Object.defineProperty(e,"$refs",{get:function(){var e={};return function e(t,n,r){(t.selectAllComponents(n)||[]).forEach((function(t){var o=t.dataset.ref;r[o]=t.$vm||mt(t),"scoped"===t.dataset.vueGeneric&&t.selectAllComponents(".scoped-ref").forEach((function(t){e(t,n,r)}))}))}(t,".vue-ref",e),(t.selectAllComponents(".vue-ref-in-for")||[]).forEach((function(t){var n=t.dataset.ref;e[n]||(e[n]=[]),e[n].push(t.$vm||mt(t))})),function(e,t){var n=u(Set,(0,c.default)(Object.keys(e)));return Object.keys(t).forEach((function(r){var o=e[r],i=t[r];Array.isArray(o)&&Array.isArray(i)&&o.length===i.length&&i.every((function(e){return o.includes(e)}))||(e[r]=i,n.delete(r))})),n.forEach((function(t){delete e[t]})),e}(n,e)}})}function gt(e){var t,n=e.detail||e.value,r=n.vuePid,o=n.vueOptions;r&&(t=function e(t,n){for(var r,o=t.$children,i=o.length-1;i>=0;i--){var a=o[i];if(a.$scope._$vueId===n)return a}for(var u=o.length-1;u>=0;u--)if(r=e(o[u],n))return r}(this.$vm,r)),t||(t=this.$vm),o.parent=t}function vt(e){return Object.defineProperty(e,"__v_isMPComponent",{configurable:!0,enumerable:!1,value:!0}),e}function mt(e){return function(e){return null!==e&&"object"===(0,s.default)(e)}(e)&&Object.isExtensible(e)&&Object.defineProperty(e,"__ob__",{configurable:!0,enumerable:!1,value:(0,o.default)({},"__v_skip",!0)}),e}var yt=/_(.*)_worklet_factory_/;var _t=Page,bt=Component,St=/:/g,wt=z((function(e){return K(e.replace(St,"-"))}));function Ot(e){var t=e.triggerEvent,n=function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];if(this.$vm||this.dataset&&this.dataset.comType)e=wt(e);else{var i=wt(e);i!==e&&t.apply(this,[i].concat(r))}return t.apply(this,[e].concat(r))};try{e.triggerEvent=n}catch(t){e._triggerEvent=n}}function Pt(e,t,n){var r=t[e];t[e]=function(){if(vt(this),Ot(this),r){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return r.apply(this,t)}}}_t.__$wrappered||(_t.__$wrappered=!0,Page=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Pt("onLoad",e),_t(e)},Page.after=_t.after,Component=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Pt("created",e),bt(e)});function kt(e,t,n){t.forEach((function(t){(function e(t,n){if(!n)return!0;if(C.default.options&&Array.isArray(C.default.options[t]))return!0;if(V(n=n.default||n))return!!V(n.extendOptions[t])||!!(n.super&&n.super.options&&Array.isArray(n.super.options[t]));if(V(n[t])||Array.isArray(n[t]))return!0;var r=n.mixins;return Array.isArray(r)?!!r.find((function(n){return e(t,n)})):void 0})(t,n)&&(e[t]=function(e){return this.$vm&&this.$vm.__call_hook(t,e)})}))}function At(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];Tt(t).forEach((function(t){return $t(e,t,n)}))}function Tt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return e&&Object.keys(e).forEach((function(n){0===n.indexOf("on")&&V(e[n])&&t.push(n)})),t}function $t(e,t,n){-1!==n.indexOf(t)||H(e,t)||(e[t]=function(e){return this.$vm&&this.$vm.__call_hook(t,e)})}function xt(e,t){var n;return[n=V(t=t.default||t)?t:e.extend(t),t=n.options]}function Et(e,t){if(Array.isArray(t)&&t.length){var n=Object.create(null);t.forEach((function(e){n[e]=!0})),e.$scopedSlots=e.$slots=n}}function Ct(e,t){var n=(e=(e||"").split(",")).length;1===n?t._$vueId=e[0]:2===n&&(t._$vueId=e[0],t._$vuePid=e[1])}function jt(e,t){var n=e.data||{},r=e.methods||{};if("function"==typeof n)try{n=n.call(t)}catch(e){({NODE_ENV:"production",VUE_APP_DARK_MODE:"false",VUE_APP_NAME:"bawangcan",VUE_APP_PLATFORM:"mp-weixin",BASE_URL:"/"}).VUE_APP_DEBUG&&console.warn("根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。",n)}else try{n=JSON.parse(JSON.stringify(n))}catch(e){}return G(n)||(n={}),Object.keys(r).forEach((function(e){-1!==t.__lifecycle_hooks__.indexOf(e)||H(n,e)||(n[e]=r[e])})),n}var Lt=[String,Number,Boolean,Object,Array,null];function It(e){return function(t,n){this.$vm&&(this.$vm[e]=t)}}function Dt(e,t){var n=e.behaviors,r=e.extends,o=e.mixins,i=e.props;i||(e.props=i=[]);var a=[];return Array.isArray(n)&&n.forEach((function(e){a.push(e.replace("uni://","wx".concat("://"))),"uni://form-field"===e&&(Array.isArray(i)?(i.push("name"),i.push("value")):(i.name={type:String,default:""},i.value={type:[String,Number,Boolean,Array,Object,Date],default:""}))})),G(r)&&r.props&&a.push(t({properties:Bt(r.props,!0)})),Array.isArray(o)&&o.forEach((function(e){G(e)&&e.props&&a.push(t({properties:Bt(e.props,!0)}))})),a}function Mt(e,t,n,r){return Array.isArray(t)&&1===t.length?t[0]:t}function Bt(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>3?arguments[3]:void 0,r={};return t||(r.vueId={type:String,value:""},n.virtualHost&&(r.virtualHostStyle={type:null,value:""},r.virtualHostClass={type:null,value:""}),r.scopedSlotsCompiler={type:String,value:""},r.vueSlots={type:null,value:[],observer:function(e,t){var n=Object.create(null);e.forEach((function(e){n[e]=!0})),this.setData({$slots:n})}}),Array.isArray(e)?e.forEach((function(e){r[e]={type:null,observer:It(e)}})):G(e)&&Object.keys(e).forEach((function(t){var n=e[t];if(G(n)){var o=n.default;V(o)&&(o=o()),n.type=Mt(0,n.type),r[t]={type:-1!==Lt.indexOf(n.type)?n.type:null,value:o,observer:It(t)}}else{var i=Mt(0,n);r[t]={type:-1!==Lt.indexOf(i)?i:null,observer:It(t)}}})),r}function Nt(e,t,n,r){var o={};return Array.isArray(t)&&t.length&&t.forEach((function(t,i){"string"==typeof t?t?"$event"===t?o["$"+i]=n:"arguments"===t?o["$"+i]=n.detail&&n.detail.__args__||r:0===t.indexOf("$event.")?o["$"+i]=e.__get_value(t.replace("$event.",""),n):o["$"+i]=e.__get_value(t):o["$"+i]=e:o["$"+i]=function(e,t){var n=e;return t.forEach((function(t){var r=t[0],o=t[2];if(r||void 0!==o){var i,a=t[1],u=t[3];Number.isInteger(r)?i=r:r?"string"==typeof r&&r&&(i=0===r.indexOf("#s#")?r.substr(3):e.__get_value(r,n)):i=n,Number.isInteger(i)?n=o:a?Array.isArray(i)?n=i.find((function(t){return e.__get_value(a,t)===o})):G(i)?n=Object.keys(i).find((function(t){return e.__get_value(a,i[t])===o})):console.error("v-for 暂不支持循环数据：",i):n=i[o],u&&(n=e.__get_value(u,n))}})),n}(e,t)})),o}function Rt(e){for(var t={},n=1;n<e.length;n++){var r=e[n];t[r[0]]=r[1]}return t}function Vt(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],o=arguments.length>4?arguments[4]:void 0,i=arguments.length>5?arguments[5]:void 0,a=!1,u=G(t.detail)&&t.detail.__args__||[t.detail];if(o&&(a=t.currentTarget&&t.currentTarget.dataset&&"wx"===t.currentTarget.dataset.comType,!n.length))return a?[t]:u;var c=Nt(e,r,t,u),s=[];return n.forEach((function(e){"$event"===e?"__set_model"!==i||o?o&&!a?s.push(u[0]):s.push(t):s.push(t.target.value):Array.isArray(e)&&"o"===e[0]?s.push(Rt(e)):"string"==typeof e&&H(c,e)?s.push(c[e]):s.push(e)})),s}function Ut(e){var t=this,n=((e=function(e){try{e.mp=JSON.parse(JSON.stringify(e))}catch(e){}return e.stopPropagation=F,e.preventDefault=F,e.target=e.target||{},H(e,"detail")||(e.detail={}),H(e,"markerId")&&(e.detail="object"===(0,s.default)(e.detail)?e.detail:{},e.detail.markerId=e.markerId),G(e.detail)&&(e.target=Object.assign({},e.target,e.detail)),e}(e)).currentTarget||e.target).dataset;if(!n)return console.warn("事件信息不存在");var r=n.eventOpts||n["event-opts"];if(!r)return console.warn("事件信息不存在");var o=e.type,i=[];return r.forEach((function(n){var r=n[0],a=n[1],u="^"===r.charAt(0),c="~"===(r=u?r.slice(1):r).charAt(0);r=c?r.slice(1):r,a&&function(e,t){return e===t||"regionchange"===t&&("begin"===e||"end"===e)}(o,r)&&a.forEach((function(n){var r=n[0];if(r){var o=t.$vm;if(o.$options.generic&&(o=function(e){for(var t=e.$parent;t&&t.$parent&&(t.$options.generic||t.$parent.$options.generic||t.$scope._$vuePid);)t=t.$parent;return t&&t.$parent}(o)||o),"$emit"===r)return void o.$emit.apply(o,Vt(t.$vm,e,n[1],n[2],u,r));var a=o[r];if(!V(a)){var s="page"===t.$vm.mpType?"Page":"Component",f=t.route||t.is;throw new Error("".concat(s,' "').concat(f,'" does not have a method "').concat(r,'"'))}if(c){if(a.once)return;a.once=!0}var l=Vt(t.$vm,e,n[1],n[2],u,r);l=Array.isArray(l)?l:[],/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(a.toString())&&(l=l.concat([,,,,,,,,,,e])),i.push(a.apply(o,l))}}))})),"input"===o&&1===i.length&&void 0!==i[0]?i[0]:void 0}var Gt={},Ht=[];var Ft=["onShow","onHide","onError","onPageNotFound","onThemeChange","onUnhandledRejection"];function zt(){C.default.prototype.getOpenerEventChannel=function(){return this.$scope.getOpenerEventChannel()};var e=C.default.prototype.__call_hook;C.default.prototype.__call_hook=function(t,n){return"onLoad"===t&&n&&n.__id__&&(this.__eventChannel__=function(e){if(e){var t=Gt[e];return delete Gt[e],t}return Ht.shift()}(n.__id__),delete n.__id__),e.call(this,t,n)}}function Wt(e,t){var n=t.mocks,r=t.initRefs;zt(),function(){var e={},t={};function n(e){var t=this.$options.propsData.vueId;t&&e(t.split(",")[0])}C.default.prototype.$hasSSP=function(n){var r=e[n];return r||(t[n]=this,this.$on("hook:destroyed",(function(){delete t[n]}))),r},C.default.prototype.$getSSP=function(t,n,r){var o=e[t];if(o){var i=o[n]||[];return r?i:i[0]}},C.default.prototype.$setSSP=function(t,r){var o=0;return n.call(this,(function(n){var i=e[n],a=i[t]=i[t]||[];a.push(r),o=a.length-1})),o},C.default.prototype.$initSSP=function(){n.call(this,(function(t){e[t]={}}))},C.default.prototype.$callSSP=function(){n.call(this,(function(e){t[e]&&t[e].$forceUpdate()}))},C.default.mixin({destroyed:function(){var n=this.$options.propsData,r=n&&n.vueId;r&&(delete e[r],delete t[r])}})}(),e.$options.store&&(C.default.prototype.$store=e.$options.store),function(e){e.prototype.uniIDHasRole=function(e){return B().role.indexOf(e)>-1},e.prototype.uniIDHasPermission=function(e){var t=B().permission;return this.uniIDHasRole("admin")||t.indexOf(e)>-1},e.prototype.uniIDTokenValid=function(){return B().tokenExpired>Date.now()}}(C.default),C.default.prototype.mpHost="mp-weixin",C.default.mixin({beforeCreate:function(){if(this.$options.mpType){if(this.mpType=this.$options.mpType,this.$mp=(0,o.default)({data:{}},this.mpType,this.$options.mpInstance),this.$scope=this.$options.mpInstance,delete this.$options.mpType,delete this.$options.mpInstance,"page"===this.mpType&&"function"==typeof getApp){var e=getApp();e.$vm&&e.$vm.$i18n&&(this._i18n=e.$vm.$i18n)}"app"!==this.mpType&&(r(this),function(e,t){var n=e.$mp[e.mpType];t.forEach((function(t){H(n,t)&&(e[t]=n[t])}))}(this,n))}}});var i={onLaunch:function(t){this.$vm||(j.canIUse&&!j.canIUse("nextTick")&&console.error("当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上"),this.$vm=e,this.$vm.$mp={app:this},this.$vm.$scope=this,this.$vm.globalData=this.globalData,this.$vm._isMounted=!0,this.$vm.__call_hook("mounted",t),this.$vm.__call_hook("onLaunch",t))}};i.globalData=e.$options.globalData||{};var a=e.$options.methods;return a&&Object.keys(a).forEach((function(e){i[e]=a[e]})),function(e,t,n){var r=e.observable({locale:n||Pe.getLocale()}),o=[];t.$watchLocale=function(e){o.push(e)},Object.defineProperty(t,"$locale",{get:function(){return r.locale},set:function(e){r.locale=e,o.forEach((function(t){return t(e)}))}})}(C.default,e,Ae(j.getSystemInfoSync().language)||"en"),kt(i,Ft),At(i,e.$options),i}function Kt(e){return Wt(e,{mocks:ft,initRefs:ht})}function Jt(e){return App(Kt(e)),e}var Xt=/[!'()*]/g,qt=function(e){return"%"+e.charCodeAt(0).toString(16)},Yt=/%2C/g,Qt=function(e){return encodeURIComponent(e).replace(Xt,qt).replace(Yt,",")};function Zt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Qt,n=e?Object.keys(e).map((function(n){var r=e[n];if(void 0===r)return"";if(null===r)return t(n);if(Array.isArray(r)){var o=[];return r.forEach((function(e){void 0!==e&&(null===e?o.push(t(n)):o.push(t(n)+"="+t(e)))})),o.join("&")}return t(n)+"="+t(r)})).filter((function(e){return e.length>0})).join("&"):null;return n?"?".concat(n):""}function en(e,t){return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.isPage,o=t.initRelation,i=arguments.length>2?arguments[2]:void 0,a=xt(C.default,e),u=(0,r.default)(a,2),c=u[0],s=u[1],f=I({multipleSlots:!0,addGlobalClass:!0},s.options||{});s["mp-weixin"]&&s["mp-weixin"].options&&Object.assign(f,s["mp-weixin"].options);var l={options:f,data:jt(s,C.default.prototype),behaviors:Dt(s,lt),properties:Bt(s.props,!1,s.__file,f),lifetimes:{attached:function(){var e=this.properties,t={mpType:n.call(this)?"page":"component",mpInstance:this,propsData:e};Ct(e.vueId,this),o.call(this,{vuePid:this._$vuePid,vueOptions:t}),this.$vm=new c(t),Et(this.$vm,e.vueSlots),this.$vm.$mount()},ready:function(){this.$vm&&(this.$vm._isMounted=!0,this.$vm.__call_hook("mounted"),this.$vm.__call_hook("onReady"))},detached:function(){this.$vm&&this.$vm.$destroy()}},pageLifetimes:{show:function(e){this.$vm&&this.$vm.__call_hook("onPageShow",e)},hide:function(){this.$vm&&this.$vm.__call_hook("onPageHide")},resize:function(e){this.$vm&&this.$vm.__call_hook("onPageResize",e)}},methods:{__l:gt,__e:Ut}};return s.externalClasses&&(l.externalClasses=s.externalClasses),Array.isArray(s.wxsCallMethods)&&s.wxsCallMethods.forEach((function(e){l.methods[e]=function(t){return this.$vm[e](t)}})),i?[l,s,c]:n?l:[l,c]}(e,{isPage:dt,initRelation:pt},t)}var tn=["onShow","onHide","onUnload"];function nn(e){var t=en(e,!0),n=(0,r.default)(t,2),o=n[0],i=n[1];return kt(o.methods,tn,i),o.methods.onLoad=function(e){this.options=e;var t=Object.assign({},e);delete t.__id__,this.$page={fullPath:"/"+(this.route||this.is)+Zt(t)},this.$vm.$mp.query=e,this.$vm.__call_hook("onLoad",e)},At(o.methods,e,["onReady"]),function(e,t){t&&Object.keys(t).forEach((function(n){var r=n.match(yt);if(r){var o=r[1];e[n]=t[n],e[o]=t[o]}}))}(o.methods,i.methods),o}function rn(e){return Component(function(e){return nn(e)}(e))}function on(e){return Component(en(e))}function an(e){var t=Kt(e),n=getApp({allowDefault:!0});e.$scope=n;var r=n.globalData;if(r&&Object.keys(t.globalData).forEach((function(e){H(r,e)||(r[e]=t.globalData[e])})),Object.keys(t).forEach((function(e){H(n,e)||(n[e]=t[e])})),V(t.onShow)&&j.onAppShow&&j.onAppShow((function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];e.__call_hook("onShow",n)})),V(t.onHide)&&j.onAppHide&&j.onAppHide((function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];e.__call_hook("onHide",n)})),V(t.onLaunch)){var o=j.getLaunchOptionsSync&&j.getLaunchOptionsSync();e.__call_hook("onLaunch",o)}return e}function un(e){var t=Kt(e);if(V(t.onShow)&&j.onAppShow&&j.onAppShow((function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];e.__call_hook("onShow",n)})),V(t.onHide)&&j.onAppHide&&j.onAppHide((function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];e.__call_hook("onHide",n)})),V(t.onLaunch)){var n=j.getLaunchOptionsSync&&j.getLaunchOptionsSync();e.__call_hook("onLaunch",n)}return e}tn.push.apply(tn,["onPullDownRefresh","onReachBottom","onAddToFavorites","onShareTimeline","onShareAppMessage","onPageScroll","onResize","onTabItemTap"]),["vibrate","preloadPage","unPreloadPage","loadSubPackage"].forEach((function(e){Ve[e]=!1})),[].forEach((function(e){var t=Ve[e]&&Ve[e].name?Ve[e].name:e;j.canIUse(t)||(Ve[e]=!1)}));var cn={};"undefined"!=typeof Proxy?cn=new Proxy({},{get:function(e,t){return H(e,t)?e[t]:Ee[t]?Ee[t]:st[t]?me(t,st[t]):Je[t]?me(t,Je[t]):We[t]?me(t,We[t]):et[t]?et[t]:me(t,ze(t,j[t]))},set:function(e,t,n){return e[t]=n,!0}}):(Object.keys(Ee).forEach((function(e){cn[e]=Ee[e]})),Object.keys(We).forEach((function(e){cn[e]=me(e,We[e])})),Object.keys(Je).forEach((function(e){cn[e]=me(e,We[e])})),Object.keys(et).forEach((function(e){cn[e]=et[e]})),Object.keys(st).forEach((function(e){cn[e]=me(e,st[e])})),Object.keys(j).forEach((function(e){(H(j,e)||H(Ve,e))&&(cn[e]=me(e,ze(e,j[e])))}))),j.createApp=Jt,j.createPage=rn,j.createComponent=on,j.createSubpackageApp=an,j.createPlugin=un;var sn=cn},8793:function(e,t,n){n.r(t);var r=["qy","env","error","version","lanDebug","cloud","serviceMarket","router","worklet"],o=["lanDebug","router","worklet"],i="undefined"!=typeof globalThis?globalThis:function(){return this}(),a=["w","x"].join(""),u=i[a],c=u.getLaunchOptionsSync?u.getLaunchOptionsSync():null;function s(e){return(!c||1154!==c.scene||!o.includes(e))&&(r.indexOf(e)>-1||"function"==typeof u[e])}i[a]=function(){var e={};for(var t in u)s(t)&&(e[t]=u[t]);return e}(),t.default=i[a]},1460:function(e,t,n){n.r(t);var r=n(7668),o=n(2412),i={getUserInfo:function(){return new Promise((function(e,t){r.default.userInfo().then((function(n){200==n.code?e(n.data):t({})}))}))},getSharePath:function(){return new Promise((function(e,t){r.default.sharePath().then((function(n){200==n.code?e(n.data):t({})}))}))},getShareInfo:function(e){return new Promise((function(t,n){r.default.getbwcShareWx().then((function(r){if(console.log(r,e,"分享模板"),200==r.code){var i=r.data.templates,a="",u="";if(1==e.shareSwitch){var c=0;i.length>0&&(c=o.default.random(0,r.data.templates.length)-1),c<0&&(c=0),a=i[c]&&""!=i[c].title?i[c].title:"霸王餐",u=i[c]&&""!=i[c].img_url?i[c].img_url:""}else if(e.templateId){var s=i.filter((function(t){return t.id==e.templateId}));console.log(s),0!=s.length?(a=s[0].title?s[0].title:"霸王餐",u=s[0].img_url?s[0].img_url:""):(a="霸王餐",u="")}console.log(a,u),t({shareTitle:a,shareUrl:u})}else n({})}))}))}};t.default=i},1644:function(e,t,n){n.r(t),n.d(t,{fmtNumber:function(){return d},getDate:function(){return f},getLocalTime:function(){return l},templateFactory:function(){return s},time2Timestamp:function(){return p}});var r=n(9029);function o(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=i(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return u=e.done,e},e:function(e){c=!0,a=e},f:function(){try{u||null==n.return||n.return()}finally{if(c)throw a}}}}function i(e,t){if(e){if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var u=function(e){return e%4==0&&e%100!=0||e%100==0&&e%400==0},c={y:{text:"年",range:[null,null]},m:{text:"月",range:[1,12]},d:{text:"日",range:[1,31]},h:{text:"时",range:[0,23]},i:{text:"分",range:[0,59]},s:{text:"秒",range:[0,59]}};function s(e){var t,n=e.mode,i=e.value,a=e.yearRange,u=(0,r.default)(a,2),s=u[0],d=u[1],p={},h=o(n);try{for(h.s();!(t=h.n()).done;){var g=t.value;p[g]=c[g]}}catch(e){h.e(e)}finally{h.f()}if(-1!==n.indexOf("y")&&(p.y.range=[s||2016,d||(new Date).getFullYear()]),-1!==n.indexOf("d")){var v=f(i||l(n));p.d.range=[1,v]}return p}function f(e){var t,n,o=e.substring(0,e.lastIndexOf("-")),i=new Date;switch(o.length){case 0:t=i.getFullYear(),n=i.getMonth()+1;break;case 2:t=i.getFullYear(),n=parseInt(o);break;default:var a=o.split("-"),c=(0,r.default)(a,2),s=c[0],f=c[1];t=parseInt(s),n=parseInt(f)}return[31,u(t)?29:28,31,30,31,30,31,31,30,31,30,31][n-1]}function l(e){if(!e)return null;var t=new Date,n=d(t.getFullYear()),r=d(t.getMonth()+1),o=d(t.getDate()),i=d(t.getHours()),a=d(t.getMinutes()),u=d(t.getSeconds());return{y:"".concat(n),m:"".concat(r),d:"".concat(o),h:"".concat(i),i:"".concat(a),s:"".concat(u),ym:"".concat(n,"-").concat(r),md:"".concat(r,"-").concat(o),hi:"".concat(i,":").concat(a),is:"".concat(a,":").concat(u),ymd:"".concat(n,"-").concat(r,"-").concat(o),his:"".concat(i,":").concat(a,":").concat(u),mdh:"".concat(r,"-").concat(o," ").concat(i),ymdh:"".concat(n,"-").concat(r,"-").concat(o," ").concat(i),mdhi:"".concat(r,"-").concat(o," ").concat(i,":").concat(a),mdhis:"".concat(r,"-").concat(o," ").concat(i,":").concat(r,":").concat(u),yd:"".concat(n,"-").concat(o),ymdhi:"".concat(n,"-").concat(r,"-").concat(o," ").concat(i,":").concat(a),ymdhis:"".concat(n,"-").concat(r,"-").concat(o," ").concat(i,":").concat(a,":").concat(u)}[e]}function d(e){return e>9?e+"":"0"+e}function p(e){return new Date(e).getTime()}},7668:function(e,t,n){n.r(t);var r,o=n(7028),i=n(8238);t.default=(r={miniLogin:function(e){return i.default.send("/home/auth/login","POST",e)},h5Login:function(e){return i.default.send("/home/auth/h5-login","POST",e)},aliLogin:function(e){return i.default.send("/home/auth/alipay-login","POST",e)},getAuditMode:function(e){return i.default.send("/home/version/alipay","POST",e)},getPos:function(e){return i.default.send("/api/mt-single-store/location","POST",e)},getPosNew:function(e){return i.default.send("/home/overlordmeal/goods/location","POST",e)},getShare:function(e){return i.default.send("/home/index/share","GET",e)},configInfo:function(e){return i.default.send("/api/wap/info","GET",e)},getDyActivityLink:function(e){return i.default.send("/home/ecommerce/doudian/activity/get-link","POST",e)},getFilmLink:function(e){return i.default.send("/heinw-film/get-link","GET",e)},menuConfig:function(e){return i.default.send("/home/me/config","POST",e)},posterList:function(e){return i.default.send("/home/index/poster","GET",e)},userInfo:function(e){return i.default.send("/home/user/info","GET",e)},popularize:function(e){return i.default.send("/home/index/popularize","GET",e)},getFriends:function(e){return i.default.send("/home/friend/index","POST",e)},getExamineStatus:function(e){return i.default.send("/home/app/info","POST",e)},getUserLevel:function(e){return i.default.send("/home/user/user-level","POST",e)},newOrderList:function(e){return i.default.send("/home/order/list","POST",e,"",1)},getBusinessName:function(e){return i.default.send("/home/business/list","GET",e)},wxItem:function(e){return i.default.send("/home/auth/wx-item","GET",e)}},(0,o.default)(r,"menuConfig",(function(e){return i.default.send("/home/me/config","POST",e)})),(0,o.default)(r,"checkinInfo",(function(e){return i.default.send("/home/checkin/info","GET",e)})),(0,o.default)(r,"setRemind",(function(e){return i.default.send("/home/checkin/set-remind","POST",e)})),(0,o.default)(r,"checkin",(function(e){return i.default.send("/home/checkin/checkin","POST",e,1)})),(0,o.default)(r,"getPhone",(function(e){return i.default.send("/home/checkin/phone","POST",e)})),(0,o.default)(r,"checkinExchange",(function(e){return i.default.send("/home/checkin/exchange","POST",e,1)})),(0,o.default)(r,"moneyCardsList",(function(e){return i.default.send("/home/cash/cards","POST",e)})),(0,o.default)(r,"getMyExchange",(function(e){return i.default.send("/home/goods/get-list","POST",e)})),(0,o.default)(r,"getExpressCoupon",(function(e){return i.default.send("/home/goods/get-express-coupon","POST",e)})),(0,o.default)(r,"getKuaidiMyInfo",(function(e){return i.default.send("/home/kuaidi/baobaoda/user/index","POST",e)})),(0,o.default)(r,"getMoneyList",(function(e){return i.default.send("/home/money/list","GET",e)})),(0,o.default)(r,"rewardIncomeList",(function(e){return i.default.send("/home/reward/order-record","POST",e)})),(0,o.default)(r,"rewardIncomeOrderDetails",(function(e){return i.default.send("/home/order/info","POST",e)})),(0,o.default)(r,"commissionList",(function(e){return i.default.send("/home/commission/list","POST",e,"",1)})),(0,o.default)(r,"rewardIncomeOrderDetails",(function(e){return i.default.send("/home/order/info","POST",e)})),(0,o.default)(r,"cashList",(function(e){return i.default.send("/home/cash/list","GET",e)})),(0,o.default)(r,"redeemedIntegrate",(function(e){return i.default.send("/home/kuaidi/baobaoda/coupon/redeemed-integrate-coupon","POST",e)})),(0,o.default)(r,"cashApply",(function(e){return i.default.send("/home/cash/apply","POST",e)})),(0,o.default)(r,"getExchangeRecord",(function(e){return i.default.send("/home/goods/order-v2","GET",e)})),(0,o.default)(r,"getMyIntegral",(function(e){return i.default.send("/home/score/list","POST",e)})),(0,o.default)(r,"getScoreExplain",(function(e){return i.default.send("/home/index/get-score-explain","POST",e)})),(0,o.default)(r,"ExchangeSubmit",(function(e){return i.default.send("/home/goods/redeem","POST",e,1)})),(0,o.default)(r,"getRewardInfo",(function(e){return i.default.send("/home/reward/rank","POST",e)})),(0,o.default)(r,"getlotteryInfo",(function(e){return i.default.send("/home/lottery/info","GET",e)})),(0,o.default)(r,"carousel",(function(e){return i.default.send("/home/lottery/carousel","POST",e)})),(0,o.default)(r,"notExchangeOrder",(function(e){return i.default.send("/home/goods/not-exchange-order","POST",e)})),(0,o.default)(r,"start",(function(e){return i.default.send("/home/lottery/start","POST",e,1)})),(0,o.default)(r,"otteryExchange",(function(e){return i.default.send("/home/lottery/exchange","POST",e,1)})),(0,o.default)(r,"goodsList",(function(e){return i.default.send("/home/goods/order-v2","POST",e)})),(0,o.default)(r,"getNoticeList",(function(e){return i.default.send("/home/notice/index","POST",e)})),(0,o.default)(r,"emptyNoticeList",(function(e){return i.default.send("/home/notice/clean-up","POST",e)})),(0,o.default)(r,"geUncollectMaterial",(function(e){return i.default.send("/home/ecommerce/doudian/self/uncollect-material","POST",e)})),(0,o.default)(r,"getCollectMaterial",(function(e){return i.default.send("/home/ecommerce/doudian/self/collect-material","POST",e)})),(0,o.default)(r,"getMyGoodsListType",(function(e){return i.default.send("/home/ecommerce/doudian/materia-category/list","POST",e)})),(0,o.default)(r,"getMyMateriaList",(function(e){return i.default.send("/home/ecommerce/doudian/materia/goods-list","POST",e)})),(0,o.default)(r,"getDyAccountList",(function(e){return i.default.send("/home/ecommerce/douyin/auth-list","POST",e)})),(0,o.default)(r,"getDyAuthAddress",(function(e){return i.default.send("/home/ecommerce/douyin/auth-url","POST",e)})),(0,o.default)(r,"addDyShowCaseProduct",(function(e){return i.default.send("/home/ecommerce/douyin/store-add","POST",e)})),(0,o.default)(r,"getUserDetail",(function(e){return i.default.send("/home/friend/user-detail","POST",e)})),(0,o.default)(r,"bindInvite",(function(e){return i.default.send("/home/auth/bind-invite","POST",e)})),(0,o.default)(r,"getMyTutorInfo",(function(e){return i.default.send("/home/me/get-my-mentor","POST",e)})),(0,o.default)(r,"setWxAccount",(function(e){return i.default.send("/home/user/set-wechat-account","POST",e)})),(0,o.default)(r,"getbwcInfo",(function(e){return i.default.send("/home/overlordmeal/config/info","POST",e)})),(0,o.default)(r,"getbwcList",(function(e){return i.default.send("/home/overlordmeal/goods/merchant-list","POST",e)})),(0,o.default)(r,"getbwcDetails",(function(e){return i.default.send("/home/overlordmeal/goods/merchant-details","POST",e)})),(0,o.default)(r,"getbwcorderDetails",(function(e){return i.default.send("/home/overlordmeal/order/details","POST",e)})),(0,o.default)(r,"getbwcOrderList",(function(e){return i.default.send("/home/overlordmeal/order/list","POST",e)})),(0,o.default)(r,"getbwcOrderTotal",(function(e){return i.default.send("/home/overlordmeal/order/statistics","POST",e)})),(0,o.default)(r,"getUserInfo",(function(e){return i.default.send("/home/overlordmeal/user/info","POST",e)})),(0,o.default)(r,"getSetHeader",(function(e){return i.default.send("/home/overlordmeal/user/set-headimgurl","POST",e)})),(0,o.default)(r,"getSetName",(function(e){return i.default.send("/home/overlordmeal/user/set-nickname","POST",e)})),(0,o.default)(r,"getConfig",(function(e){return i.default.send("/home/overlordmeal/config/me","POST",e)})),(0,o.default)(r,"getWithdrawalList",(function(e){return i.default.send("/home/overlordmeal/withdrawal/list","POST",e)})),(0,o.default)(r,"getLogin",(function(e){return i.default.send("/home/overlordmeal/passport/login","POST",e)})),(0,o.default)(r,"getLoginSendCode",(function(e){return i.default.send("/home/overlordmeal/passport/send-code","POST",e)})),(0,o.default)(r,"getScreenshots",(function(e){return i.default.send("/home/overlordmeal/order/set-screenshots","POST",e)})),(0,o.default)(r,"getMoney",(function(e){return i.default.send("/home/overlordmeal/withdrawal/info","POST",e)})),(0,o.default)(r,"getCalc",(function(e){return i.default.send("/home/overlordmeal/withdrawal/calc","POST",e)})),(0,o.default)(r,"getWithdrawalSendCode",(function(e){return i.default.send("/home/overlordmeal/withdrawal/send-code","POST",e)})),(0,o.default)(r,"getWithdrawalApply",(function(e){return i.default.send("/home/overlordmeal/withdrawal/apply","POST",e)})),(0,o.default)(r,"getCancelevent",(function(e){return i.default.send("/home/overlordmeal/goods/cancelevent","POST",e)})),(0,o.default)(r,"getfaultSubmit",(function(e){return i.default.send("/home/overlordmeal/fault/submit","POST",e)})),(0,o.default)(r,"getRule",(function(e){return i.default.send("/home/overlordmeal/goods/rule","POST",e)})),(0,o.default)(r,"getRegisterevent",(function(e){return i.default.send("/home/overlordmeal/goods/registerevent","POST",e)})),(0,o.default)(r,"getCancelevent",(function(e){return i.default.send("/home/overlordmeal/goods/cancelevent","POST",e)})),(0,o.default)(r,"getQrcode",(function(e){return i.default.send("/home/overlordmeal/goods/qrcode","POST",e)})),(0,o.default)(r,"getQrcodeInfo",(function(e){return i.default.send("/home/app/get-mp","POST",e)})),(0,o.default)(r,"getUrl",(function(e){return i.default.send("/home/overlordmeal/user/get-certification-url","POST",e)})),(0,o.default)(r,"getUrlNew",(function(e){return i.default.send("/home/user/get-realname-link","POST",e)})),(0,o.default)(r,"getSetRealName",(function(e){return i.default.send("/home/overlordmeal/user/set-certification","POST",e)})),(0,o.default)(r,"decrotyBwcPhone",(function(e){return i.default.send("/home/overlordmeal/passport/decrypt-login","POST",e)})),(0,o.default)(r,"getbwcShareH5",(function(e){return i.default.send("/home/overlordmeal/config/share","POST",e)})),(0,o.default)(r,"getbwcShareWx",(function(e){return i.default.send("/home/mini/get-share-templates","POST",e)})),(0,o.default)(r,"getHomeBanner",(function(e){return i.default.send("/home/overlordmeal/activity/home/index","POST",e)})),(0,o.default)(r,"getCashbackList",(function(e){return i.default.send("/home/overlordmeal/cashback/list","POST",e)})),(0,o.default)(r,"getbwcCouponList",(function(e){return i.default.send("/home/overlordmeal/config/info","POST",e)})),(0,o.default)(r,"getbwcIsAudit",(function(e){return i.default.send("/home/auth/app-info","POST",e)})),(0,o.default)(r,"getWxCardInfo",(function(e){return i.default.send("/home/card/info","POST",e)})),(0,o.default)(r,"getWxCardApiTicket",(function(e){return i.default.send("/api/wap/card-js-api","POST",e)})),(0,o.default)(r,"getWxCardJsApiTocket",(function(e){return i.default.send("/api/wap/info","GET",e)})),(0,o.default)(r,"getCardCode",(function(e){return i.default.send("/home/card/code-decrypt","POST",e)})),(0,o.default)(r,"getWxinfo",(function(e){return i.default.send("/home/auth/wx-info","GET",e)})),(0,o.default)(r,"getVerifyMethod",(function(e){return i.default.send("/home/auth/phone-method","GET",e)})),(0,o.default)(r,"getWithdrawProtocol",(function(e){return i.default.send("/home/auth/withdraw-protocol","POST",e)})),(0,o.default)(r,"getTabbar",(function(e){return i.default.send("/home/app/tabbar","POST",e)})),(0,o.default)(r,"getIndexInfo",(function(e){return i.default.send("/home/index/overlord-meal","POST",e)})),(0,o.default)(r,"getInviteConfig",(function(e){return i.default.send("/olm/home/index/get-invite-config-v2","GET",e)})),(0,o.default)(r,"getHomeList",(function(e){return i.default.send("/olm/user/plan/list","GET",e)})),(0,o.default)(r,"getPlanInfo",(function(e){return i.default.send("/olm/user/plan/info","GET",e)})),(0,o.default)(r,"placeOrder",(function(e){return i.default.send("/home/overlordmeal/place-order/place-order","POST",e)})),(0,o.default)(r,"cancelOrder",(function(e){return i.default.send("/olm/user/order/cancel-order","POST",e)})),(0,o.default)(r,"delayOrder",(function(e){return i.default.send("/olm/user/order/delay-order","POST",e)})),(0,o.default)(r,"getProgressing",(function(e){return i.default.send("/olm/user/order/progressing","GET",e)})),(0,o.default)(r,"orderList",(function(e){return i.default.send("/olm/user/order/list","GET",e)})),(0,o.default)(r,"orderStatics",(function(e){return i.default.send("/olm/user/order/statistics","GET",e)})),(0,o.default)(r,"faultReport",(function(e){return i.default.send("/olm/user/plan/fault-report","POST",e)})),(0,o.default)(r,"comfirmOrder",(function(e){return i.default.send("/olm/user/order/confirm-order","POST",e)})),(0,o.default)(r,"uploadCredential",(function(e){return i.default.send("/olm/user/order/upload-credential","POST",e)})),(0,o.default)(r,"orderInfo",(function(e){return i.default.send("/olm/user/order/info","GET",e)})),(0,o.default)(r,"getShareInfo",(function(e){return i.default.send("/home/app/get-mp","POST",e)})),(0,o.default)(r,"getPoserScan",(function(e){return i.default.send("/home/index/poser-scan","POST",e)})),(0,o.default)(r,"getCouponPackage",(function(e){return i.default.send("/home/overlordmeal/goods/coupon-package","GET",e)})),(0,o.default)(r,"getInviteRecord",(function(e){return i.default.send("/olm/user/index/invite-record-v2","GET",e)})),(0,o.default)(r,"getOrderInviteRecord",(function(e){return i.default.send("/olm/user/index/order-invite-record-v2","GET",e)})),(0,o.default)(r,"getWithdrawalApply1",(function(e){return i.default.send("/home/withdraw/apply","POST",e)})),(0,o.default)(r,"getCashbackList2",(function(e){return i.default.send("/home/overlordmeal/user/wallet-log","POST",e)})),(0,o.default)(r,"getWithdrawalList1",(function(e){return i.default.send("/home/withdraw/list","GET",e)})),(0,o.default)(r,"getCashbackList1",(function(e){return i.default.send("/home/money/list","GET",e)})),(0,o.default)(r,"activePOp",(function(e){return i.default.send("/home/olm/activity-popup/get-config","POST",e)})),(0,o.default)(r,"withdrawConfig",(function(e){return i.default.send("/home/withdraw/config","POST",e)})),(0,o.default)(r,"withdrawAccount",(function(e){return i.default.send("/home/withdraw/account","POST",e)})),(0,o.default)(r,"setAlipay",(function(e){return i.default.send("/home/withdraw/set-alipay","POST",e)})),(0,o.default)(r,"isScene",(function(e){return i.default.send("/home/micro-scene/is-scene","POST",e)})),(0,o.default)(r,"sceneLogin",(function(e){return i.default.send("/home/micro-scene/login","POST",e)})),(0,o.default)(r,"sceneSendCode",(function(e){return i.default.send("/home/micro-scene/send-code","POST",e)})),(0,o.default)(r,"getCertification",(function(e){return i.default.send("/home/overlordmeal/user/get-certification","POST",e)})),(0,o.default)(r,"modifyOpenId",(function(e){return i.default.send("/home/overlordmeal/user/set-open-id","POST",e)})),(0,o.default)(r,"withdrawalCofig",(function(e){return i.default.send("/home/overlordmeal/withdrawal/config","POST",e)})),(0,o.default)(r,"getOrderRejected",(function(e){return i.default.send("/olm/user/order/rejected-notice","GET",e)})),(0,o.default)(r,"getMtWithdrawalRule",(function(e){return i.default.send("/olm/home/index/info","GET",e)})),(0,o.default)(r,"getRewardInfo",(function(e){return i.default.send("/home/reward/rank","POST",e)})),(0,o.default)(r,"getCityJson",(function(e){return i.default.send("/home/overlordmeal/apply/city","POST",e)})),(0,o.default)(r,"applyEntry",(function(e){return i.default.send("/home/overlordmeal/apply/entry","POST",e)})),(0,o.default)(r,"sharePath",(function(e){return i.default.send("/olm/home/index/share-path","GET",e)})),(0,o.default)(r,"getMiniSkipInfo",(function(e){return i.default.send("/olm/home/index/mini-skip-info","GET",e)})),(0,o.default)(r,"getWithdrawConfig",(function(e){return i.default.send("/olm/user/index/get-withdrawal-config","GET",e)})),(0,o.default)(r,"getOrderRank",(function(e){return i.default.send("/home/reward/order-rank","POST",e)})),(0,o.default)(r,"getSubscribeList",(function(e){return i.default.send("/olm/user/index/get-subscribe-list","GET",e)})),(0,o.default)(r,"setUserPerfectInfo",(function(e){return i.default.send("/home/overlordmeal/user/perfect-info","POST",e)})),(0,o.default)(r,"getUserLevel",(function(e){return i.default.send("/home/user/user-level","GET",e)})),(0,o.default)(r,"payUpgrade",(function(e){return i.default.send("/home/user/pay-upgrade","POST",e)})),(0,o.default)(r,"getBonusRedPack",(function(e){return i.default.send("/home/bonus/red-pack/index","POST",e)})),(0,o.default)(r,"getBonusRedPackUserList",(function(e){return i.default.send("/home/bonus/red-pack/receive-list","POST",e)})),(0,o.default)(r,"getBonusRedPackInfo",(function(e){return i.default.send("/home/bonus/red-pack/info","POST",e)})),(0,o.default)(r,"getBonusRedPackReceive",(function(e){return i.default.send("/home/bonus/red-pack/to-receive","POST",e)})),(0,o.default)(r,"getBonusRedPackBurialPoint",(function(e){return i.default.send("/home/bonus/red-pack/burial-point","POST",e)})),(0,o.default)(r,"getPayGenerateMp1",(function(e){return i.default.send("/home/thirdparty/pay/generate-mp1","POST",e)})),(0,o.default)(r,"uploadVideoCredential",(function(e){return i.default.send("/olm/user/order/upload-video-credential","POST",e)})),(0,o.default)(r,"ocrOrderInfo",(function(e){return i.default.send("/olm/home/index/ocr-order-info","GET",e)})),(0,o.default)(r,"checkOrderScreenshots",(function(e){return i.default.send("/olm/home/index/check-order-screenshots","GET",e)})),(0,o.default)(r,"getPosterConfig",(function(e){return i.default.send("/home/kuaidi/baobaoda/poster/config","POST",e)})),(0,o.default)(r,"getMomentsTypeList",(function(e){return i.default.send("/home/kuaidi/baobaoda/express-moments/type-list","POST",e)})),(0,o.default)(r,"getMomentsList",(function(e){return i.default.send("/home/kuaidi/baobaoda/express-moments/list","POST",e)})),r)},8238:function(e,t,n){n.r(t);var r=n(2412),o=n(9209),i=n(5293),a=n(8793).default,u=n(7039).default,c="https://pubwxh5.yunzhanxinxi.com",s="bwc1.0.97";setTimeout((function(){console.log("判断sdk微信版本号是否高于2.2.2"),r.default.compareVersion("2.2.2")>=0&&(s=a.getAccountInfoSync().miniProgram.version,console.log("微信sdk版本高于或等于2.2.2")),o.default.commit("setVersion",s)}),200);var f={utm_source:"",platform:"",uid:"",url_config:c,version:s};u.getSystemInfo({success:function(e){f.platform=e.platform}}),f.send=function(e,t,n){var a;switch(a={version:f.version,editionType:"routine","utm-source":o.default.state.utm_source,platform:f.platform,hm_scene_template:"overlordMeal",appid:o.default.state.appid},u.getStorageSync("scenesLogin")?((u.getStorageSync("scene_token")||o.default.state.scene_token)&&(a.Authorization=u.getStorageSync("scene_token")||o.default.state.scene_token),(u.getStorageSync("micro_scene")||o.default.state.setMicroScenes)&&(a.micro_scene=u.getStorageSync("micro_scene")||o.default.state.setMicroScenes)):(u.getStorageSync("token")||o.default.state.token)&&(a.token=u.getStorageSync("token")||o.default.state.token),t){case"POST":a["Content-Type"]="application/x-www-form-urlencoded"}return new Promise((function(o,s){u.request({url:c+e,method:t,data:n,dataType:"json",header:a,withCredentials:!0,timeout:1e4,success:function(t){switch(t.data.code-0){case 200:case 3000112:case 400404:case 400402:case 403012:o(t.data);break;case 301:u.removeStorageSync("url"),u.removeStorageSync("token"),u.removeStorageSync("bwcPhone"),u.removeStorageSync("scene_token");var n=(new Date).getTime();(!u.getStorageSync("301Time")||u.getStorageSync("301Time")&&n-u.getStorageSync("301Time")>6e3)&&(u.setStorageSync("301Time",n),(0,i.default)()),s(t.data);break;case 10031:case 10035:o(t.data);break;default:console.log("请求接口".concat(e,"异常")),console.log(t.data),r.default.showToast(t.data.message),s(t.data)}},fail:function(t){console.log("请求接口".concat(e,"异常")),console.log(t),s(t)}})}))},t.default=f},7256:function(e,t,n){var r,o,i=n(8793).default,a=n(6587);!function(i,u){"object"==a(t)?e.exports=u():void 0===(o="function"==typeof(r=u)?r.call(t,n,t,e):r)||(e.exports=o)}(0,(function(){var e=Object.prototype.hasOwnProperty,t=Object.prototype.toString,n=Object.defineProperty,r=Object.getOwnPropertyDescriptor,o=function(e){return"function"==typeof Array.isArray?Array.isArray(e):"[object Array]"===t.call(e)},u=function(n){if(!n||"[object Object]"!==t.call(n))return!1;var r,o=e.call(n,"constructor"),i=n.constructor&&n.constructor.prototype&&e.call(n.constructor.prototype,"isPrototypeOf");if(n.constructor&&!o&&!i)return!1;for(r in n);return void 0===r||e.call(n,r)},c=function(e,t){n&&"__proto__"===t.name?n(e,t.name,{enumerable:!0,configurable:!0,value:t.newValue,writable:!0}):e[t.name]=t.newValue},s=function(t,n){if("__proto__"===n){if(!e.call(t,n))return;if(r)return r(t,n).value}return t[n]};function f(e){this.mode=d.MODE_8BIT_BYTE,this.data=e}function l(e,t){this.typeNumber=e,this.errorCorrectLevel=t,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=new Array}f.prototype={getLength:function(e){return this.data.length},write:function(e){for(var t=0;t<this.data.length;t++)e.put(this.data.charCodeAt(t),8)}},l.prototype={addData:function(e){var t=new f(e);this.dataList.push(t),this.dataCache=null},isDark:function(e,t){if(e<0||this.moduleCount<=e||t<0||this.moduleCount<=t)throw new Error(e+","+t);return this.modules[e][t]},getModuleCount:function(){return this.moduleCount},make:function(){if(this.typeNumber<1){var e=1;for(e=1;e<40;e++){for(var t=y.getRSBlocks(e,this.errorCorrectLevel),n=new _,r=0,o=0;o<t.length;o++)r+=t[o].dataCount;for(o=0;o<this.dataList.length;o++){var i=this.dataList[o];n.put(i.mode,4),n.put(i.getLength(),h.getLengthInBits(i.mode,e)),i.write(n)}if(n.getLengthInBits()<=8*r)break}this.typeNumber=e}this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(e,t){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var n=0;n<this.moduleCount;n++){this.modules[n]=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++)this.modules[n][r]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(e,t),this.typeNumber>=7&&this.setupTypeNumber(e),null==this.dataCache&&(this.dataCache=l.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,t)},setupPositionProbePattern:function(e,t){for(var n=-1;n<=7;n++)if(!(e+n<=-1||this.moduleCount<=e+n))for(var r=-1;r<=7;r++)t+r<=-1||this.moduleCount<=t+r||(this.modules[e+n][t+r]=0<=n&&n<=6&&(0==r||6==r)||0<=r&&r<=6&&(0==n||6==n)||2<=n&&n<=4&&2<=r&&r<=4)},getBestMaskPattern:function(){for(var e=0,t=0,n=0;n<8;n++){this.makeImpl(!0,n);var r=h.getLostPoint(this);(0==n||e>r)&&(e=r,t=n)}return t},createMovieClip:function(e,t,n){var r=e.createEmptyMovieClip(t,n);this.make();for(var o=0;o<this.modules.length;o++)for(var i=1*o,a=0;a<this.modules[o].length;a++){var u=1*a;this.modules[o][a]&&(r.beginFill(0,100),r.moveTo(u,i),r.lineTo(u+1,i),r.lineTo(u+1,i+1),r.lineTo(u,i+1),r.endFill())}return r},setupTimingPattern:function(){for(var e=8;e<this.moduleCount-8;e++)null==this.modules[e][6]&&(this.modules[e][6]=e%2==0);for(var t=8;t<this.moduleCount-8;t++)null==this.modules[6][t]&&(this.modules[6][t]=t%2==0)},setupPositionAdjustPattern:function(){for(var e=h.getPatternPosition(this.typeNumber),t=0;t<e.length;t++)for(var n=0;n<e.length;n++){var r=e[t],o=e[n];if(null==this.modules[r][o])for(var i=-2;i<=2;i++)for(var a=-2;a<=2;a++)this.modules[r+i][o+a]=-2==i||2==i||-2==a||2==a||0==i&&0==a}},setupTypeNumber:function(e){for(var t=h.getBCHTypeNumber(this.typeNumber),n=0;n<18;n++){var r=!e&&1==(t>>n&1);this.modules[Math.floor(n/3)][n%3+this.moduleCount-8-3]=r}for(n=0;n<18;n++)r=!e&&1==(t>>n&1),this.modules[n%3+this.moduleCount-8-3][Math.floor(n/3)]=r},setupTypeInfo:function(e,t){for(var n=this.errorCorrectLevel<<3|t,r=h.getBCHTypeInfo(n),o=0;o<15;o++){var i=!e&&1==(r>>o&1);o<6?this.modules[o][8]=i:o<8?this.modules[o+1][8]=i:this.modules[this.moduleCount-15+o][8]=i}for(o=0;o<15;o++)i=!e&&1==(r>>o&1),o<8?this.modules[8][this.moduleCount-o-1]=i:o<9?this.modules[8][15-o-1+1]=i:this.modules[8][15-o-1]=i;this.modules[this.moduleCount-8][8]=!e},mapData:function(e,t){for(var n=-1,r=this.moduleCount-1,o=7,i=0,a=this.moduleCount-1;a>0;a-=2)for(6==a&&a--;;){for(var u=0;u<2;u++)if(null==this.modules[r][a-u]){var c=!1;i<e.length&&(c=1==(e[i]>>>o&1)),h.getMask(t,r,a-u)&&(c=!c),this.modules[r][a-u]=c,-1==--o&&(i++,o=7)}if((r+=n)<0||this.moduleCount<=r){r-=n,n=-n;break}}}},l.PAD0=236,l.PAD1=17,l.createData=function(e,t,n){for(var r=y.getRSBlocks(e,t),o=new _,i=0;i<n.length;i++){var a=n[i];o.put(a.mode,4),o.put(a.getLength(),h.getLengthInBits(a.mode,e)),a.write(o)}var u=0;for(i=0;i<r.length;i++)u+=r[i].dataCount;if(o.getLengthInBits()>8*u)throw new Error("code length overflow. ("+o.getLengthInBits()+">"+8*u+")");for(o.getLengthInBits()+4<=8*u&&o.put(0,4);o.getLengthInBits()%8!=0;)o.putBit(!1);for(;!(o.getLengthInBits()>=8*u||(o.put(l.PAD0,8),o.getLengthInBits()>=8*u));)o.put(l.PAD1,8);return l.createBytes(o,r)},l.createBytes=function(e,t){for(var n=0,r=0,o=0,i=new Array(t.length),a=new Array(t.length),u=0;u<t.length;u++){var c=t[u].dataCount,s=t[u].totalCount-c;r=Math.max(r,c),o=Math.max(o,s),i[u]=new Array(c);for(var f=0;f<i[u].length;f++)i[u][f]=255&e.buffer[f+n];n+=c;var l=h.getErrorCorrectPolynomial(s),d=new m(i[u],l.getLength()-1).mod(l);for(a[u]=new Array(l.getLength()-1),f=0;f<a[u].length;f++){var p=f+d.getLength()-a[u].length;a[u][f]=p>=0?d.get(p):0}}var g=0;for(f=0;f<t.length;f++)g+=t[f].totalCount;var v=new Array(g),y=0;for(f=0;f<r;f++)for(u=0;u<t.length;u++)f<i[u].length&&(v[y++]=i[u][f]);for(f=0;f<o;f++)for(u=0;u<t.length;u++)f<a[u].length&&(v[y++]=a[u][f]);return v};for(var d={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},p={L:1,M:0,Q:3,H:2},h={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(e){for(var t=e<<10;h.getBCHDigit(t)-h.getBCHDigit(h.G15)>=0;)t^=h.G15<<h.getBCHDigit(t)-h.getBCHDigit(h.G15);return(e<<10|t)^h.G15_MASK},getBCHTypeNumber:function(e){for(var t=e<<12;h.getBCHDigit(t)-h.getBCHDigit(h.G18)>=0;)t^=h.G18<<h.getBCHDigit(t)-h.getBCHDigit(h.G18);return e<<12|t},getBCHDigit:function(e){for(var t=0;0!=e;)t++,e>>>=1;return t},getPatternPosition:function(e){return h.PATTERN_POSITION_TABLE[e-1]},getMask:function(e,t,n){switch(e){case 0:return(t+n)%2==0;case 1:return t%2==0;case 2:return n%3==0;case 3:return(t+n)%3==0;case 4:return(Math.floor(t/2)+Math.floor(n/3))%2==0;case 5:return t*n%2+t*n%3==0;case 6:return(t*n%2+t*n%3)%2==0;case 7:return(t*n%3+(t+n)%2)%2==0;default:throw new Error("bad maskPattern:"+e)}},getErrorCorrectPolynomial:function(e){for(var t=new m([1],0),n=0;n<e;n++)t=t.multiply(new m([1,g.gexp(n)],0));return t},getLengthInBits:function(e,t){if(1<=t&&t<10)switch(e){case d.MODE_NUMBER:return 10;case d.MODE_ALPHA_NUM:return 9;case d.MODE_8BIT_BYTE:case d.MODE_KANJI:return 8;default:throw new Error("mode:"+e)}else if(t<27)switch(e){case d.MODE_NUMBER:return 12;case d.MODE_ALPHA_NUM:return 11;case d.MODE_8BIT_BYTE:return 16;case d.MODE_KANJI:return 10;default:throw new Error("mode:"+e)}else{if(!(t<41))throw new Error("type:"+t);switch(e){case d.MODE_NUMBER:return 14;case d.MODE_ALPHA_NUM:return 13;case d.MODE_8BIT_BYTE:return 16;case d.MODE_KANJI:return 12;default:throw new Error("mode:"+e)}}},getLostPoint:function(e){for(var t=e.getModuleCount(),n=0,r=0;r<t;r++)for(var o=0;o<t;o++){for(var i=0,a=e.isDark(r,o),u=-1;u<=1;u++)if(!(r+u<0||t<=r+u))for(var c=-1;c<=1;c++)o+c<0||t<=o+c||0==u&&0==c||a==e.isDark(r+u,o+c)&&i++;i>5&&(n+=3+i-5)}for(r=0;r<t-1;r++)for(o=0;o<t-1;o++){var s=0;e.isDark(r,o)&&s++,e.isDark(r+1,o)&&s++,e.isDark(r,o+1)&&s++,e.isDark(r+1,o+1)&&s++,0!=s&&4!=s||(n+=3)}for(r=0;r<t;r++)for(o=0;o<t-6;o++)e.isDark(r,o)&&!e.isDark(r,o+1)&&e.isDark(r,o+2)&&e.isDark(r,o+3)&&e.isDark(r,o+4)&&!e.isDark(r,o+5)&&e.isDark(r,o+6)&&(n+=40);for(o=0;o<t;o++)for(r=0;r<t-6;r++)e.isDark(r,o)&&!e.isDark(r+1,o)&&e.isDark(r+2,o)&&e.isDark(r+3,o)&&e.isDark(r+4,o)&&!e.isDark(r+5,o)&&e.isDark(r+6,o)&&(n+=40);var f=0;for(o=0;o<t;o++)for(r=0;r<t;r++)e.isDark(r,o)&&f++;return n+Math.abs(100*f/t/t-50)/5*10}},g={glog:function(e){if(e<1)throw new Error("glog("+e+")");return g.LOG_TABLE[e]},gexp:function(e){for(;e<0;)e+=255;for(;e>=256;)e-=255;return g.EXP_TABLE[e]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},v=0;v<8;v++)g.EXP_TABLE[v]=1<<v;for(v=8;v<256;v++)g.EXP_TABLE[v]=g.EXP_TABLE[v-4]^g.EXP_TABLE[v-5]^g.EXP_TABLE[v-6]^g.EXP_TABLE[v-8];for(v=0;v<255;v++)g.LOG_TABLE[g.EXP_TABLE[v]]=v;function m(e,t){if(null==e.length)throw new Error(e.length+"/"+t);for(var n=0;n<e.length&&0==e[n];)n++;this.num=new Array(e.length-n+t);for(var r=0;r<e.length-n;r++)this.num[r]=e[r+n]}function y(e,t){this.totalCount=e,this.dataCount=t}function _(){this.buffer=new Array,this.length=0}return m.prototype={get:function(e){return this.num[e]},getLength:function(){return this.num.length},multiply:function(e){for(var t=new Array(this.getLength()+e.getLength()-1),n=0;n<this.getLength();n++)for(var r=0;r<e.getLength();r++)t[n+r]^=g.gexp(g.glog(this.get(n))+g.glog(e.get(r)));return new m(t,0)},mod:function(e){if(this.getLength()-e.getLength()<0)return this;for(var t=g.glog(this.get(0))-g.glog(e.get(0)),n=new Array(this.getLength()),r=0;r<this.getLength();r++)n[r]=this.get(r);for(r=0;r<e.getLength();r++)n[r]^=g.gexp(g.glog(e.get(r))+t);return new m(n,0).mod(e)}},y.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],y.getRSBlocks=function(e,t){var n=y.getRsBlockTable(e,t);if(null==n)throw new Error("bad rs block @ typeNumber:"+e+"/errorCorrectLevel:"+t);for(var r=n.length/3,o=new Array,i=0;i<r;i++)for(var a=n[3*i+0],u=n[3*i+1],c=n[3*i+2],s=0;s<a;s++)o.push(new y(u,c));return o},y.getRsBlockTable=function(e,t){switch(t){case p.L:return y.RS_BLOCK_TABLE[4*(e-1)+0];case p.M:return y.RS_BLOCK_TABLE[4*(e-1)+1];case p.Q:return y.RS_BLOCK_TABLE[4*(e-1)+2];case p.H:return y.RS_BLOCK_TABLE[4*(e-1)+3];default:return}},_.prototype={get:function(e){var t=Math.floor(e/8);return 1==(this.buffer[t]>>>7-e%8&1)},put:function(e,t){for(var n=0;n<t;n++)this.putBit(1==(e>>>t-n-1&1))},getLengthInBits:function(){return this.length},putBit:function(e){var t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}},function(e){(e=function e(){var t,n,r,i,f,l,d=arguments[0],p=1,h=arguments.length,g=!1;for("boolean"==typeof d&&(g=d,d=arguments[1]||{},p=2),(null==d||"object"!=a(d)&&"function"!=typeof d)&&(d={});p<h;++p)if(null!=(t=arguments[p]))for(n in t)r=s(d,n),d!==(i=s(t,n))&&(g&&i&&(u(i)||(f=o(i)))?(f?(f=!1,l=r&&o(r)?r:[]):l=r&&u(r)?r:{},c(d,{name:n,newValue:e(g,l,i)})):void 0!==i&&c(d,{name:n,newValue:i}));return d}(!0,{width:256,height:256,x:0,y:0,typeNumber:-1,correctLevel:p.H,background:"#ffffff",foreground:"#000000",image:{imageResource:"",dx:0,dy:0,dWidth:100,dHeight:100}},e=e||{})).canvasId||e.ctx?function(){var t,n=new l(e.typeNumber,e.correctLevel);n.addData(function(e){var t,n,r,o;for(t="",r=e.length,n=0;n<r;n++)(o=e.charCodeAt(n))>=1&&o<=127?t+=e.charAt(n):o>2047?(t+=String.fromCharCode(224|o>>12&15),t+=String.fromCharCode(128|o>>6&63),t+=String.fromCharCode(128|o>>0&63)):(t+=String.fromCharCode(192|o>>6&31),t+=String.fromCharCode(128|o>>0&63));return t}(e.text)),n.make(),t=e.ctx?e.ctx:e._this?i.createCanvasContext&&i.createCanvasContext(e.canvasId,e._this):i.createCanvasContext&&i.createCanvasContext(e.canvasId);for(var r=e.width/n.getModuleCount(),o=e.height/n.getModuleCount(),a=0;a<n.getModuleCount();a++)for(var u=0;u<n.getModuleCount();u++){var c=n.isDark(a,u)?e.foreground:e.background;t.setFillStyle(c);var s=Math.ceil((u+1)*r)-Math.floor(u*r),f=Math.ceil((a+1)*r)-Math.floor(a*r);t.fillRect(Math.round(u*r)+e.x,Math.round(a*o)+e.y,s,f)}e.image.imageResource&&t.drawImage(e.image.imageResource,e.image.dx,e.image.dy,e.image.dWidth,e.image.dHeight),t.draw(!1,(function(t){e.callback&&e.callback(t)}))}():console.warn("please set canvasId or ctx!")}}))},9209:function(e,t,n){n.r(t);var r=n(5476),o=n(843),i=n.n(o),a=n(2412);r.default.use(i()),t.default=new(i().Store)({state:{appid:a.default.getSessionStorage("appid"),accountsId:a.default.getSessionStorage("accountsId"),uid:a.default.getSessionStorage("uid"),utm_source:a.default.getSessionStorage("utm_source"),scene:a.default.getSessionStorage("scene"),miniEnAccounts:a.default.getSessionStorage("miniEnAccounts"),miniEnPid:a.default.getSessionStorage("miniEnPid"),phone:a.default.getSessionStorage("phone"),token:a.default.getSessionStorage("token"),loginLock:!1,randompath:"",is_new:a.default.getSessionStorage("isNew")||0,pid:a.default.getSessionStorage("pid"),shareLink:a.default.getSessionStorage("shareLink"),version:a.default.getSessionStorage("version"),locationSearch:a.default.getSessionStorage("locationSearch"),is_wallet:a.default.getSessionStorage("is_wallet"),micro_scene:a.default.getSessionStorage("micro_scene"),scene_token:a.default.getSessionStorage("scene_token")},mutations:{setShareLink:function(e,t){e.shareLink=t,a.default.setSessionStorage("shareLink",t)},setPid:function(e,t){e.pid=t,a.default.setSessionStorage("pid",t)},setIsNew:function(e,t){e.is_new=t,a.default.setSessionStorage("isNew",t)},setIsWallet:function(e,t){e.is_wallet=t,a.default.setSessionStorage("is_wallet",t)},setRandomPath:function(e,t){e.randompath=t},setToken:function(e,t){e.token=t,a.default.setSessionStorage("token",t)},setScene:function(e,t){e.scene=t,a.default.setSessionStorage("scene",t)},setLoginLock:function(e,t){e.loginLock=t},setPhone:function(e,t){e.phone=t,a.default.setSessionStorage("phone",t)},setMiniEnPid:function(e,t){e.miniEnPid=t,a.default.setSessionStorage("miniEnPid",t)},setMiniEnAccounts:function(e,t){e.miniEnAccounts=t,a.default.setSessionStorage("miniEnAccounts",t)},setUtmSource:function(e,t){e.utm_source=t,a.default.setSessionStorage("utm_source",t)},setAppid:function(e,t){e.appid=t,a.default.setSessionStorage("appid",t)},setAccountsId:function(e,t){e.accountsId=t,a.default.setSessionStorage("accountsId",t)},setUid:function(e,t){e.uid=t,a.default.setSessionStorage("uid",t)},setMicroScenes:function(e,t){e.micro_scene=t,a.default.setSessionStorage("micro_scene",t)},setSceneToken:function(e,t){e.scene_token=t,a.default.setSessionStorage("scene_token",t)},setVersion:function(e,t){e.version=t,a.default.setSessionStorage("version",t)},setlocationSearch:function(e,t){e.locationSearch=t,a.default.setSessionStorage("locationSearch",t)}}})},214:function(e,t,n){n.r(t),n.d(t,{default:function(){return a}});var r=n(9209),o=n(7668),i=n(7039).default;function a(){r.default.state.loginLock||(r.default.commit("setLoginLock",!0),i.login({scopes:"auth_user",success:function(e){o.default.aliLogin({code:e.authCode}).then((function(e){r.default.commit("setLoginLock",!1),e&&200==e.code&&(r.default.commit("setKuaiditoken",e.data.kuaiditoken),r.default.commit("setPid",e.data.sid),r.default.commit("setShareLink",e.data.sharelink),r.default.commit("setPhone",e.data.telephone))}))},fail:function(){r.default.commit("setLoginLock",!1)}}))}},188:function(e,t,n){n.r(t),n(1762);var r={GET:function(e){return!!e&&getApp().globalData[e]},SET:function(e,t,n){if(!e)return!1;n?(getApp().globalData[e]||(getApp().globalData[e]={}),getApp().globalData[e][n]=t):getApp().globalData[e]=t}};t.default=r},2412:function(e,t,n){n.r(t);var r=n(7668),o=(n(9209),n(188)),i=n(5293),a=n(8793).default,u=n(7039).default;t.default={compareVersion:function(e){var t=a.getAppBaseInfo&&a.getAppBaseInfo().SDKVersion||a.getSystemInfoSync&&a.getSystemInfoSync().SDKVersion;console.log("小程序基础库版本".concat(t)),t=t||"0.0.0";for(var n=e.split("."),r=t.split("."),o=Math.max(n.length,r.length),i=0;i<o;i++){var u=parseInt(n[i]||"0"),c=parseInt(r[i]||"0");if(u>c)return-1;if(u<c)return 1}return 0},showToast:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e3,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"none",r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return u.showToast({title:e,duration:t,icon:n,mask:r})},setSessionStorage:function(e,t){u.setStorageSync(e,t)},getSessionStorage:function(e,t){return u.getStorageSync(e)||""},setLocalStorage:function(e,t,n){u.setStorageSync(e,t)},getLocalStorage:function(e,t){return u.getStorageSync(e)||""},hasLogin:function(){if(u.getStorageSync("scenesLogin")){if(u.getStorageSync("scene_token")&&u.getStorageSync("bwcPhone"))return!0}else if(u.getStorageSync("token"))return!0;return!1},random:function(e,t){return Math.floor(Math.random()*(t-e))+e},copy:function(e){var t=this;if(!(e+=""))return this.showToast("暂无可复制内容",3e3);u.setClipboardData({data:e,success:function(){t.showToast("复制成功")}})},nav:function(e){if(e){[].indexOf(e)>=0?u.switchTab({url:e}):u.navigateTo({url:e})}},wxSetUp:function(e){return new Promise((function(e,t){u.authorize({scope:"scope.userLocation",success:function(){e()},fail:function(){t()}})}))},getLocation:function(){return new Promise((function(e,t){u.getLocation({type:"gcj02",success:function(t){e({latitude:t.latitude,longitude:t.longitude})},fail:function(){u.authorize({scope:"scope.userLocation",success:function(n){u.getLocation({type:"gcj02",success:function(t){e({latitude:t.latitude,longitude:t.longitude})},fail:function(){t()}})},fail:function(n){u.showModal({title:"是否授权当前位置",content:"需要获取您的地理位置，请确认授权，否则将无法正常下单",success:function(n){n.confirm?u.openSetting({success:function(n){u.getLocation({type:"gcj02",success:function(t){e({latitude:t.latitude,longitude:t.longitude})},fail:function(){t()}})}}):t()}})}})}})}))},getUrlParam:function(e){for(var t=window.location.search.substring(1).split("&"),n=0;n<t.length;n++){var r=t[n].split("=");if(r[0]==e&&r[1])return r[1]}return""},funcUrlDel:function(e){"string"==typeof e&&(e=[e]);for(var t=window.location,n={},r=t.search.substr(1).split("&"),o=0;o<r.length;o++)r[o]=r[o].split("="),n[r[o][0]]=r[o][1];for(o=0;o<e.length;o++)delete n[e[o]];return t.origin+t.pathname+"?"+JSON.stringify(n).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&")},closeShare:function(){this.jweixinConfig().then((function(){jweixin.ready((function(){jweixin.hideMenuItems({menuList:["menuItem:share:qq","menuItem:share:QZone","menuItem:copyUrl","menuItem:share:appMessage","menuItem:share:timeline","menuItem:share:weiboApp","menuItem:favorite","menuItem:share:facebook"]})}))}))},publicNavigation:function(e){var t=this;if(console.log(e,"---"),!this.handleLoginNav()&&e.jump_type&&0!=e.jump_type){if(1==e.jump_type){var n="";if(e.jump_config?e.jump_config.appid?e.jump_config.pagepath||(n="jump_type:1，小程序path不存在!"):n="jump_type:1，小程序appid不存在!":n="jump_type:1，小程序appid path不存在!",n)return this.showToast(n);u.navigateToMiniProgram({appId:e.jump_config.appid,path:e.jump_config.pagepath})}else if(2==e.jump_type){var i="";if(e.jump_config&&e.jump_config.url||(i="jump_type:2，跳转链接不存在!"),i)return this.showToast(i);u.navigateTo({url:"/subpackage/webView/h5?url="+encodeURIComponent(e.jump_config.url)})}if(3==e.jump_type||5==e.jump_type){var a="";if(e.jump_config&&e.jump_config.id||(a="jump_type:3，业务id不存在!"),a)return this.showToast(a);u.showLoading(),r.default.getShare({link_id:e.jump_config.id,is_mini:1,is_mini_qrcode:1,permissions:e.jump_config.permissions||[],lat:o.default.GET("lat"),lng:o.default.GET("lon")}).then((function(n){if(u.hideLoading(),200==n.code)if(3==e.jump_type){if(!n.data.mini_appid||!n.data.mini_path)return t.showToast("jump_type:3，小程序appid path不存在!");u.navigateToMiniProgram({appId:n.data.mini_appid,path:n.data.mini_path})}else{if(!n.data.link)return t.showToast("jump_type:5，H5链接不存在!");t.navRouter("/subpackage/webView/h5?url="+encodeURIComponent(n.data.link))}}))}if(4==e.jump_type){var c="";if(e.jump_config&&e.jump_config.pagepath||(c="jump_type:4，小程序path不存在!"),c)return this.showToast(c);this.navRouter(e.jump_config.pagepath)}6==e.jump_type&&r.default.getDyActivityLink({id:e.jump_config.id}).then((function(e){if(200==e.code){if(!e.data.url)return t.showToast("活动链接不存在");t.navRouter("/subpackage/webView/h5?url="+encodeURIComponent(e.data.url))}}))}},navRouter:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=["/pages/bwc/index","/pages/home/index","/pages/orderlist/index","/pages/my/index","/pages/welfare/index"];if(4==t&&r.includes(e))return u.navigateTo({url:e});var o=["/pages/home/index"];if(o.indexOf(e)>=0){var i=getCurrentPages();if(10==i.length)t=2,console.log("页面栈超出限制，调用redirectTo方法");else if(i.length>0)for(var a=i.length-1;a>=0;a--)if("/"+i[a].route===e){t=5,n=i.length-a-1,console.log("页面栈中已经存在该页面，返回",n);break}}switch(t){case 1:u.navigateTo({url:e});break;case 2:u.redirectTo({url:e});break;case 3:u.reLaunch({url:e});break;case 4:u.switchTab({url:e});break;default:u.navigateBack({delta:n})}},handleLoginNav:function(){if(!this.hasLogin()){if(u.getStorageSync("scenesLogin"))return u.navigateTo({url:"/subpackage/login/authorize"}),!0;(0,i.default)()}},isInteger:function(e){return Math.floor(e)===e}}},5293:function(e,t,n){n.r(t),n.d(t,{default:function(){return a}});var r=n(9209),o=n(7668),i=n(7039).default;function a(){i.getUserInfo({success:function(e){console.log(e,"微信登录1"),i.login({provider:"weixin",success:function(t){console.log(t,"微信登录2---------"),o.default.isScene({appid:r.default.state.appid,micro_scene:r.default.state.micro_scene,mini_code:t.code}).then((function(n){n&&200==n.code&&(i.setStorageSync("isScenes",n.data.is_micro_scene),i.setStorageSync("scenesLogin",n.data.login_verify),n.data.login_verify?(r.default.commit("setToken",""),i.removeStorageSync("token"),o.default.sceneLogin({micro_scene:r.default.state.micro_scene,mini_code:t.code,invite_id:r.default.state.uid}).then((function(e){console.log(t,r.default.state.uid,"微场景登录---------"),e&&200==e.code&&(r.default.commit("setSceneToken",e.data.token),i.setStorageSync("scene_token",e.data.token),i.setStorageSync("mini_code",t.code),i.$emit("login"),e.data.phone?(i.setStorageSync("bwcPhone",e.data.phone),i.$emit("refreshbwcPhone")):i.removeStorageSync("bwcPhone"))}))):(r.default.commit("setSceneToken",""),r.default.commit("setMicroScenes",""),i.removeStorageSync("micro_scene"),i.removeStorageSync("scene_token"),o.default.miniLogin({code:t.code,appid:r.default.state.appid,encryptedData:e.encryptedData,iv:e.iv,invite_id:r.default.state.uid}).then((function(e){console.log(e,"-----3"),e&&200==e.code&&(console.log(e.data,"微信登录3"),r.default.commit("setToken",e.data.token),i.setStorageSync("token",e.data.token),i.$emit("login"),r.default.commit("setIsNew",e.data.is_new),e.data.mobile?(i.$emit("refreshbwcPhone"),i.setStorageSync("bwcPhone",e.data.mobile)):i.removeStorageSync("bwcPhone"))}))))}))}})},fail:function(e){console.log(e,"错误")}})}},7161:function(e,t,n){var r=n(6587).default;function o(){
/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
e.exports=o=function(){return t},e.exports.__esModule=!0,e.exports.default=e.exports;var t={},n=Object.prototype,i=n.hasOwnProperty,a=Object.defineProperty||function(e,t,n){e[t]=n.value},u="function"==typeof Symbol?Symbol:{},c=u.iterator||"@@iterator",s=u.asyncIterator||"@@asyncIterator",f=u.toStringTag||"@@toStringTag";function l(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(e){l=function(e,t,n){return e[t]=n}}function d(e,t,n,r){var o=t&&t.prototype instanceof g?t:g,i=Object.create(o.prototype),u=new $(r||[]);return a(i,"_invoke",{value:P(e,n,u)}),i}function p(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}t.wrap=d;var h={};function g(){}function v(){}function m(){}var y={};l(y,c,(function(){return this}));var _=Object.getPrototypeOf,b=_&&_(_(x([])));b&&b!==n&&i.call(b,c)&&(y=b);var S=m.prototype=g.prototype=Object.create(y);function w(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function O(e,t){function n(o,a,u,c){var s=p(e[o],e,a);if("throw"!==s.type){var f=s.arg,l=f.value;return l&&"object"==r(l)&&i.call(l,"__await")?t.resolve(l.__await).then((function(e){n("next",e,u,c)}),(function(e){n("throw",e,u,c)})):t.resolve(l).then((function(e){f.value=e,u(f)}),(function(e){return n("throw",e,u,c)}))}c(s.arg)}var o;a(this,"_invoke",{value:function(e,r){function i(){return new t((function(t,o){n(e,r,t,o)}))}return o=o?o.then(i,i):i()}})}function P(e,t,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return{value:void 0,done:!0}}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var u=k(a,n);if(u){if(u===h)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var c=p(e,t,n);if("normal"===c.type){if(r=n.done?"completed":"suspendedYield",c.arg===h)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r="completed",n.method="throw",n.arg=c.arg)}}}function k(e,t){var n=t.method,r=e.iterator[n];if(void 0===r)return t.delegate=null,"throw"===n&&e.iterator.return&&(t.method="return",t.arg=void 0,k(e,t),"throw"===t.method)||"return"!==n&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+n+"' method")),h;var o=p(r,e.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,h;var i=o.arg;return i?i.done?(t[e.resultName]=i.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,h):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,h)}function A(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function T(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function $(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(A,this),this.reset(!0)}function x(e){if(e){var t=e[c];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,r=function t(){for(;++n<e.length;)if(i.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return r.next=r}}return{next:E}}function E(){return{value:void 0,done:!0}}return v.prototype=m,a(S,"constructor",{value:m,configurable:!0}),a(m,"constructor",{value:v,configurable:!0}),v.displayName=l(m,f,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===v||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,m):(e.__proto__=m,l(e,f,"GeneratorFunction")),e.prototype=Object.create(S),e},t.awrap=function(e){return{__await:e}},w(O.prototype),l(O.prototype,s,(function(){return this})),t.AsyncIterator=O,t.async=function(e,n,r,o,i){void 0===i&&(i=Promise);var a=new O(d(e,n,r,o),i);return t.isGeneratorFunction(n)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},w(S),l(S,f,"Generator"),l(S,c,(function(){return this})),l(S,"toString",(function(){return"[object Generator]"})),t.keys=function(e){var t=Object(e),n=[];for(var r in t)n.push(r);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},t.values=x,$.prototype={constructor:$,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(T),!e)for(var t in this)"t"===t.charAt(0)&&i.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(n,r){return a.type="throw",a.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r],a=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var u=i.call(o,"catchLoc"),c=i.call(o,"finallyLoc");if(u&&c){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(u){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&i.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=e,a.arg=t,o?(this.method="next",this.next=o.finallyLoc,h):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),h},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),T(n),h}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var o=r.arg;T(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:x(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),h}},t}e.exports=o,e.exports.__esModule=!0,e.exports.default=e.exports},6587:function(t){function n(r){return t.exports=n="function"==typeof Symbol&&"symbol"==e(Symbol.iterator)?function(t){return e(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":e(t)},t.exports.__esModule=!0,t.exports.default=t.exports,n(r)}t.exports=n,t.exports.__esModule=!0,t.exports.default=t.exports},7346:function(e,t,n){function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.r(t),n.d(t,{default:function(){return r}})},4587:function(e,t,n){function r(e,t,n,r,o,i,a){try{var u=e[i](a),c=u.value}catch(e){return void n(e)}u.done?t(c):Promise.resolve(c).then(r,o)}function o(e){return function(){var t=this,n=arguments;return new Promise((function(o,i){var a=e.apply(t,n);function u(e){r(a,o,i,u,c,"next",e)}function c(e){r(a,o,i,u,c,"throw",e)}u(void 0)}))}}n.r(t),n.d(t,{default:function(){return o}})},7028:function(e,t,n){n.r(t),n.d(t,{default:function(){return o}});var r=n(7206);function o(e,t,n){return(t=(0,r.default)(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},9029:function(e,t,n){n.r(t),n.d(t,{default:function(){return o}});var r=n(9837);function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i,a,u=[],c=!0,s=!1;try{if(i=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=i.call(n)).done)&&(u.push(r.value),u.length!==t);c=!0);}catch(e){s=!0,o=e}finally{try{if(!c&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw o}}return u}}(e,t)||(0,r.default)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},9510:function(e,t,n){n.r(t),n.d(t,{default:function(){return i}});var r=n(7346);var o=n(9837);function i(e){return function(e){if(Array.isArray(e))return(0,r.default)(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||(0,o.default)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},7206:function(e,t,n){n.r(t),n.d(t,{default:function(){return o}});var r=n(6257);function o(e){var t=function(e,t){if("object"!==(0,r.default)(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,t||"default");if("object"!==(0,r.default)(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===(0,r.default)(t)?t:String(t)}},6257:function(t,n,r){function o(t){return(o="function"==typeof Symbol&&"symbol"==e(Symbol.iterator)?function(t){return e(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":e(t)})(t)}r.r(n),r.d(n,{default:function(){return o}})},9837:function(e,t,n){n.r(t),n.d(t,{default:function(){return o}});var r=n(7346);function o(e,t){if(e){if("string"==typeof e)return(0,r.default)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?(0,r.default)(e,t):void 0}}}}]); 
 			}); 
		define("functional-pages/request-payment.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";exports.beforeRequestPayment=function(e,t){t(null,{timeStamp:e.timeStamp,nonceStr:e.nonceStr,package:e.package,signType:e.signType,paySign:e.paySign,extraData:{timeStamp:e.timeStamp}})}; 
 			}); 
		define("static/js/qrcode.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var t=require("../../@babel/runtime/helpers/typeof");!function(e,r){"object"==("undefined"==typeof exports?"undefined":t(exports))&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):(void 0).drawQrcode=r()}(0,(function(){var e=Object.prototype.hasOwnProperty,r=Object.prototype.toString,o=Object.defineProperty,n=Object.getOwnPropertyDescriptor,i=function(t){return"function"==typeof Array.isArray?Array.isArray(t):"[object Array]"===r.call(t)},a=function(t){if(!t||"[object Object]"!==r.call(t))return!1;var o,n=e.call(t,"constructor"),i=t.constructor&&t.constructor.prototype&&e.call(t.constructor.prototype,"isPrototypeOf");if(t.constructor&&!n&&!i)return!1;for(o in t);return void 0===o||e.call(t,o)},u=function(t,e){o&&"__proto__"===e.name?o(t,e.name,{enumerable:!0,configurable:!0,value:e.newValue,writable:!0}):t[e.name]=e.newValue},s=function(t,r){if("__proto__"===r){if(!e.call(t,r))return;if(n)return n(t,r).value}return t[r]};function h(t){this.mode=f.MODE_8BIT_BYTE,this.data=t}function l(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=new Array}h.prototype={getLength:function(t){return this.data.length},write:function(t){for(var e=0;e<this.data.length;e++)t.put(this.data.charCodeAt(e),8)}},l.prototype={addData:function(t){var e=new h(t);this.dataList.push(e),this.dataCache=null},isDark:function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){if(this.typeNumber<1){var t=1;for(t=1;t<40;t++){for(var e=v.getRSBlocks(t,this.errorCorrectLevel),r=new C,o=0,n=0;n<e.length;n++)o+=e[n].dataCount;for(n=0;n<this.dataList.length;n++){var i=this.dataList[n];r.put(i.mode,4),r.put(i.getLength(),c.getLengthInBits(i.mode,t)),i.write(r)}if(r.getLengthInBits()<=8*o)break}this.typeNumber=t}this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++){this.modules[r]=new Array(this.moduleCount);for(var o=0;o<this.moduleCount;o++)this.modules[r][o]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=l.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},setupPositionProbePattern:function(t,e){for(var r=-1;r<=7;r++)if(!(t+r<=-1||this.moduleCount<=t+r))for(var o=-1;o<=7;o++)e+o<=-1||this.moduleCount<=e+o||(this.modules[t+r][e+o]=0<=r&&r<=6&&(0==o||6==o)||0<=o&&o<=6&&(0==r||6==r)||2<=r&&r<=4&&2<=o&&o<=4)},getBestMaskPattern:function(){for(var t=0,e=0,r=0;r<8;r++){this.makeImpl(!0,r);var o=c.getLostPoint(this);(0==r||t>o)&&(t=o,e=r)}return e},createMovieClip:function(t,e,r){var o=t.createEmptyMovieClip(e,r);this.make();for(var n=0;n<this.modules.length;n++)for(var i=1*n,a=0;a<this.modules[n].length;a++){var u=1*a;this.modules[n][a]&&(o.beginFill(0,100),o.moveTo(u,i),o.lineTo(u+1,i),o.lineTo(u+1,i+1),o.lineTo(u,i+1),o.endFill())}return o},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},setupPositionAdjustPattern:function(){for(var t=c.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var r=0;r<t.length;r++){var o=t[e],n=t[r];if(null==this.modules[o][n])for(var i=-2;i<=2;i++)for(var a=-2;a<=2;a++)this.modules[o+i][n+a]=-2==i||2==i||-2==a||2==a||0==i&&0==a}},setupTypeNumber:function(t){for(var e=c.getBCHTypeNumber(this.typeNumber),r=0;r<18;r++){var o=!t&&1==(e>>r&1);this.modules[Math.floor(r/3)][r%3+this.moduleCount-8-3]=o}for(r=0;r<18;r++)o=!t&&1==(e>>r&1),this.modules[r%3+this.moduleCount-8-3][Math.floor(r/3)]=o},setupTypeInfo:function(t,e){for(var r=this.errorCorrectLevel<<3|e,o=c.getBCHTypeInfo(r),n=0;n<15;n++){var i=!t&&1==(o>>n&1);n<6?this.modules[n][8]=i:n<8?this.modules[n+1][8]=i:this.modules[this.moduleCount-15+n][8]=i}for(n=0;n<15;n++)i=!t&&1==(o>>n&1),n<8?this.modules[8][this.moduleCount-n-1]=i:n<9?this.modules[8][15-n-1+1]=i:this.modules[8][15-n-1]=i;this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var r=-1,o=this.moduleCount-1,n=7,i=0,a=this.moduleCount-1;a>0;a-=2)for(6==a&&a--;;){for(var u=0;u<2;u++)if(null==this.modules[o][a-u]){var s=!1;i<t.length&&(s=1==(t[i]>>>n&1)),c.getMask(e,o,a-u)&&(s=!s),this.modules[o][a-u]=s,-1==--n&&(i++,n=7)}if((o+=r)<0||this.moduleCount<=o){o-=r,r=-r;break}}}},l.PAD0=236,l.PAD1=17,l.createData=function(t,e,r){for(var o=v.getRSBlocks(t,e),n=new C,i=0;i<r.length;i++){var a=r[i];n.put(a.mode,4),n.put(a.getLength(),c.getLengthInBits(a.mode,t)),a.write(n)}var u=0;for(i=0;i<o.length;i++)u+=o[i].dataCount;if(n.getLengthInBits()>8*u)throw new Error("code length overflow. ("+n.getLengthInBits()+">"+8*u+")");for(n.getLengthInBits()+4<=8*u&&n.put(0,4);n.getLengthInBits()%8!=0;)n.putBit(!1);for(;!(n.getLengthInBits()>=8*u||(n.put(l.PAD0,8),n.getLengthInBits()>=8*u));)n.put(l.PAD1,8);return l.createBytes(n,o)},l.createBytes=function(t,e){for(var r=0,o=0,n=0,i=new Array(e.length),a=new Array(e.length),u=0;u<e.length;u++){var s=e[u].dataCount,h=e[u].totalCount-s;o=Math.max(o,s),n=Math.max(n,h),i[u]=new Array(s);for(var l=0;l<i[u].length;l++)i[u][l]=255&t.buffer[l+r];r+=s;var f=c.getErrorCorrectPolynomial(h),g=new p(i[u],f.getLength()-1).mod(f);for(a[u]=new Array(f.getLength()-1),l=0;l<a[u].length;l++){var d=l+g.getLength()-a[u].length;a[u][l]=d>=0?g.get(d):0}}var m=0;for(l=0;l<e.length;l++)m+=e[l].totalCount;var v=new Array(m),C=0;for(l=0;l<o;l++)for(u=0;u<e.length;u++)l<i[u].length&&(v[C++]=i[u][l]);for(l=0;l<n;l++)for(u=0;u<e.length;u++)l<a[u].length&&(v[C++]=a[u][l]);return v};for(var f={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},g={L:1,M:0,Q:3,H:2},c={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;c.getBCHDigit(e)-c.getBCHDigit(c.G15)>=0;)e^=c.G15<<c.getBCHDigit(e)-c.getBCHDigit(c.G15);return(t<<10|e)^c.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;c.getBCHDigit(e)-c.getBCHDigit(c.G18)>=0;)e^=c.G18<<c.getBCHDigit(e)-c.getBCHDigit(c.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return c.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,r){switch(t){case 0:return(e+r)%2==0;case 1:return e%2==0;case 2:return r%3==0;case 3:return(e+r)%3==0;case 4:return(Math.floor(e/2)+Math.floor(r/3))%2==0;case 5:return e*r%2+e*r%3==0;case 6:return(e*r%2+e*r%3)%2==0;case 7:return(e*r%3+(e+r)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new p([1],0),r=0;r<t;r++)e=e.multiply(new p([1,d.gexp(r)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case f.MODE_NUMBER:return 10;case f.MODE_ALPHA_NUM:return 9;case f.MODE_8BIT_BYTE:case f.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case f.MODE_NUMBER:return 12;case f.MODE_ALPHA_NUM:return 11;case f.MODE_8BIT_BYTE:return 16;case f.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case f.MODE_NUMBER:return 14;case f.MODE_ALPHA_NUM:return 13;case f.MODE_8BIT_BYTE:return 16;case f.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),r=0,o=0;o<e;o++)for(var n=0;n<e;n++){for(var i=0,a=t.isDark(o,n),u=-1;u<=1;u++)if(!(o+u<0||e<=o+u))for(var s=-1;s<=1;s++)n+s<0||e<=n+s||0==u&&0==s||a==t.isDark(o+u,n+s)&&i++;i>5&&(r+=3+i-5)}for(o=0;o<e-1;o++)for(n=0;n<e-1;n++){var h=0;t.isDark(o,n)&&h++,t.isDark(o+1,n)&&h++,t.isDark(o,n+1)&&h++,t.isDark(o+1,n+1)&&h++,0!=h&&4!=h||(r+=3)}for(o=0;o<e;o++)for(n=0;n<e-6;n++)t.isDark(o,n)&&!t.isDark(o,n+1)&&t.isDark(o,n+2)&&t.isDark(o,n+3)&&t.isDark(o,n+4)&&!t.isDark(o,n+5)&&t.isDark(o,n+6)&&(r+=40);for(n=0;n<e;n++)for(o=0;o<e-6;o++)t.isDark(o,n)&&!t.isDark(o+1,n)&&t.isDark(o+2,n)&&t.isDark(o+3,n)&&t.isDark(o+4,n)&&!t.isDark(o+5,n)&&t.isDark(o+6,n)&&(r+=40);var l=0;for(n=0;n<e;n++)for(o=0;o<e;o++)t.isDark(o,n)&&l++;return r+Math.abs(100*l/e/e-50)/5*10}},d={glog:function(t){if(t<1)throw new Error("glog("+t+")");return d.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return d.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},m=0;m<8;m++)d.EXP_TABLE[m]=1<<m;for(m=8;m<256;m++)d.EXP_TABLE[m]=d.EXP_TABLE[m-4]^d.EXP_TABLE[m-5]^d.EXP_TABLE[m-6]^d.EXP_TABLE[m-8];for(m=0;m<255;m++)d.LOG_TABLE[d.EXP_TABLE[m]]=m;function p(t,e){if(null==t.length)throw new Error(t.length+"/"+e);for(var r=0;r<t.length&&0==t[r];)r++;this.num=new Array(t.length-r+e);for(var o=0;o<t.length-r;o++)this.num[o]=t[o+r]}function v(t,e){this.totalCount=t,this.dataCount=e}function C(){this.buffer=new Array,this.length=0}return p.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),r=0;r<this.getLength();r++)for(var o=0;o<t.getLength();o++)e[r+o]^=d.gexp(d.glog(this.get(r))+d.glog(t.get(o)));return new p(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=d.glog(this.get(0))-d.glog(t.get(0)),r=new Array(this.getLength()),o=0;o<this.getLength();o++)r[o]=this.get(o);for(o=0;o<t.getLength();o++)r[o]^=d.gexp(d.glog(t.get(o))+e);return new p(r,0).mod(t)}},v.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],v.getRSBlocks=function(t,e){var r=v.getRsBlockTable(t,e);if(null==r)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var o=r.length/3,n=new Array,i=0;i<o;i++)for(var a=r[3*i+0],u=r[3*i+1],s=r[3*i+2],h=0;h<a;h++)n.push(new v(u,s));return n},v.getRsBlockTable=function(t,e){switch(e){case g.L:return v.RS_BLOCK_TABLE[4*(t-1)+0];case g.M:return v.RS_BLOCK_TABLE[4*(t-1)+1];case g.Q:return v.RS_BLOCK_TABLE[4*(t-1)+2];case g.H:return v.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},C.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var r=0;r<e;r++)this.putBit(1==(t>>>e-r-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},function(e){(e=function e(){var r,o,n,h,l,f,g=arguments[0],c=1,d=arguments.length,m=!1;for("boolean"==typeof g&&(m=g,g=arguments[1]||{},c=2),(null==g||"object"!=t(g)&&"function"!=typeof g)&&(g={});c<d;++c)if(null!=(r=arguments[c]))for(o in r)n=s(g,o),g!==(h=s(r,o))&&(m&&h&&(a(h)||(l=i(h)))?(l?(l=!1,f=n&&i(n)?n:[]):f=n&&a(n)?n:{},u(g,{name:o,newValue:e(m,f,h)})):void 0!==h&&u(g,{name:o,newValue:h}));return g}(!0,{width:256,height:256,x:0,y:0,typeNumber:-1,correctLevel:g.H,background:"#ffffff",foreground:"#000000",image:{imageResource:"",dx:0,dy:0,dWidth:100,dHeight:100}},e=e||{})).canvasId||e.ctx?function(){var t,r=new l(e.typeNumber,e.correctLevel);r.addData(function(t){var e,r,o,n;for(e="",o=t.length,r=0;r<o;r++)(n=t.charCodeAt(r))>=1&&n<=127?e+=t.charAt(r):n>2047?(e+=String.fromCharCode(224|n>>12&15),e+=String.fromCharCode(128|n>>6&63),e+=String.fromCharCode(128|n>>0&63)):(e+=String.fromCharCode(192|n>>6&31),e+=String.fromCharCode(128|n>>0&63));return e}(e.text)),r.make(),t=e.ctx?e.ctx:e._this?wx.createCanvasContext&&wx.createCanvasContext(e.canvasId,e._this):wx.createCanvasContext&&wx.createCanvasContext(e.canvasId);for(var o=e.width/r.getModuleCount(),n=e.height/r.getModuleCount(),i=0;i<r.getModuleCount();i++)for(var a=0;a<r.getModuleCount();a++){var u=r.isDark(i,a)?e.foreground:e.background;t.setFillStyle(u);var s=Math.ceil((a+1)*o)-Math.floor(a*o),h=Math.ceil((i+1)*o)-Math.floor(i*o);t.fillRect(Math.round(a*o)+e.x,Math.round(i*n)+e.y,s,h)}e.image.imageResource&&t.drawImage(e.image.imageResource,e.image.dx,e.image.dy,e.image.dWidth,e.image.dHeight),t.draw(!1,(function(t){e.callback&&e.callback(t)}))}():console.warn("please set canvasId or ctx!")}})); 
 			}); 
		define("static/js/uni-simple-router.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";require("../../@babel/runtime/helpers/Objectentries"),require("../../@babel/runtime/helpers/Arrayincludes"),require("../../@babel/runtime/helpers/Objectvalues");var e=require("../../@babel/runtime/helpers/typeof");!function(t,r){"object"==("undefined"==typeof exports?"undefined":e(exports))&&"object"==("undefined"==typeof module?"undefined":e(module))?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==("undefined"==typeof exports?"undefined":e(exports))?exports.Router=r():t.Router=r()}(self,(function(){return t={779:function(t,r,o){var n=o(173);t.exports=function e(t,r,o){return n(r)||(o=r||o,r=[]),o=o||{},t instanceof RegExp?function(e,t){var r=e.source.match(/\((?!\?)/g);if(r)for(var o=0;o<r.length;o++)t.push({name:o,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return s(e,t)}(t,r):n(t)?function(t,r,o){for(var n=[],a=0;a<t.length;a++)n.push(e(t[a],r,o).source);return s(new RegExp("(?:"+n.join("|")+")",f(o)),r)}(t,r,o):function(e,t,r){return h(i(e,r),t,r)}(t,r,o)},t.exports.parse=i,t.exports.compile=function(e,t){return l(i(e,t),t)},t.exports.tokensToFunction=l,t.exports.tokensToRegExp=h;var a=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function i(e,t){for(var r,o=[],n=0,i=0,u="",l=t&&t.delimiter||"/";null!=(r=a.exec(e));){var s=r[0],f=r[1],h=r.index;if(u+=e.slice(i,h),i=h+s.length,f)u+=f[1];else{var v=e[i],y=r[2],g=r[3],d=r[4],m=r[5],b=r[6],P=r[7];u&&(o.push(u),u="");var O=null!=y&&null!=v&&v!==y,k="+"===b||"*"===b,w="?"===b||"*"===b,j=r[2]||l,R=d||m;o.push({name:g||n++,prefix:y||"",delimiter:j,optional:w,repeat:k,partial:O,asterisk:!!P,pattern:R?p(R):P?".*":"[^"+c(j)+"]+?"})}}return i<e.length&&(u+=e.substr(i)),u&&o.push(u),o}function u(e){return encodeURI(e).replace(/[\/?#]/g,(function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()}))}function l(t,r){for(var o=new Array(t.length),a=0;a<t.length;a++)"object"==e(t[a])&&(o[a]=new RegExp("^(?:"+t[a].pattern+")$",f(r)));return function(e,r){for(var a="",i=e||{},l=(r||{}).pretty?u:encodeURIComponent,c=0;c<t.length;c++){var p=t[c];if("string"!=typeof p){var s,f=i[p.name];if(null==f){if(p.optional){p.partial&&(a+=p.prefix);continue}throw new TypeError('Expected "'+p.name+'" to be defined')}if(n(f)){if(!p.repeat)throw new TypeError('Expected "'+p.name+'" to not repeat, but received `'+JSON.stringify(f)+"`");if(0===f.length){if(p.optional)continue;throw new TypeError('Expected "'+p.name+'" to not be empty')}for(var h=0;h<f.length;h++){if(s=l(f[h]),!o[c].test(s))throw new TypeError('Expected all "'+p.name+'" to match "'+p.pattern+'", but received `'+JSON.stringify(s)+"`");a+=(0===h?p.prefix:p.delimiter)+s}}else{if(s=p.asterisk?encodeURI(f).replace(/[?#]/g,(function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})):l(f),!o[c].test(s))throw new TypeError('Expected "'+p.name+'" to match "'+p.pattern+'", but received "'+s+'"');a+=p.prefix+s}}else a+=p}return a}}function c(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function p(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function s(e,t){return e.keys=t,e}function f(e){return e&&e.sensitive?"":"i"}function h(e,t,r){n(t)||(r=t||r,t=[]);for(var o=(r=r||{}).strict,a=!1!==r.end,i="",u=0;u<e.length;u++){var l=e[u];if("string"==typeof l)i+=c(l);else{var p=c(l.prefix),h="(?:"+l.pattern+")";t.push(l),l.repeat&&(h+="(?:"+p+h+")*"),i+=h=l.optional?l.partial?p+"("+h+")?":"(?:"+p+"("+h+"))?":p+"("+h+")"}}var v=c(r.delimiter||"/"),y=i.slice(-v.length)===v;return o||(i=(y?i.slice(0,-v.length):i)+"(?:"+v+"(?=$))?"),i+=a?"$":o&&y?"":"(?="+v+"|$)",s(new RegExp("^"+i,f(r)),t)}},173:function(e){e.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},844:function(e,t,r){var o=this&&this.__assign||function(){return(o=Object.assign||function(e){for(var t,r=1,o=arguments.length;r<o;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.buildVueRouter=t.buildVueRoutes=void 0;var n=r(366),a=r(883),i=r(789),u=r(169);t.buildVueRoutes=function(e,t){for(var r=e.routesMap,o=r.pathMap,l=r.finallyPathList,c=Object.keys(t),p=0;p<c.length;p++){var s=c[p],f=o[s],h=t[s];if(f){var v=i.getRoutePath(f,e).finallyPath;if(v instanceof Array)throw new Error("非 vueRouterDev 模式下，alias、aliasPath、path 无法提供数组类型！ "+JSON.stringify(f));null!=f.name&&(h.name=f.name);var y=h.path,g=h.alias;delete h.alias,h.path=v,"/"===y&&null!=g&&(h.alias=g,h.path=y),f.beforeEnter&&(h.beforeEnter=function(t,r,o){u.onTriggerEachHook(t,r,e,n.hookToggle.enterHooks,o)})}else a.warn(s+" 路由地址在路由表中未找到，确定是否传递漏啦",e,!0)}return l.includes("*")&&(t["*"]=o["*"]),t},t.buildVueRouter=function(e,t,r){var n;n="[object Array]"===i.getDataType(r)?r:Object.values(r);var a=e.options.h5,u=a.scrollBehavior,l=a.fallback,c=t.options.scrollBehavior;t.options.scrollBehavior=function(e,t,r){return c&&c(e,t,r),u(e,t,r)},t.fallback=l;var p=new t.constructor(o(o({},e.options.h5),{base:t.options.base,mode:t.options.mode,routes:n}));t.matcher=p.matcher}},369:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.addKeepAliveInclude=void 0;var o=r(789),n=["",""],a=n[0],i=n[1];t.addKeepAliveInclude=function(e){var t=getApp(),r=t.keepAliveInclude;if(0===e.runId&&0===r.length){i=t.$route.params.__id__;var n=(a=t.$route.meta.name)+"-"+i;t.keepAliveInclude.push(n)}else if(""!==a)for(var u=t.keepAliveInclude,l=0;l<u.length;l++){n=u[l];var c=new RegExp(a+"-(\\d+)$"),p=a+"-"+i;if(c.test(n)&&n!==p){o.removeSimpleValue(u,p),a="";break}}}},147:function(e,t){var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)},function(e,t){function o(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)});Object.defineProperty(t,"__esModule",{value:!0}),t.proxyH5Mount=t.proxyEachHook=t.MyArray=void 0;var n=function(e){function t(r,o,n,a){var i=e.call(this)||this;return i.router=r,i.vueEachArray=o,i.myEachHook=n,i.hookName=a,Object.setPrototypeOf(i,t.prototype),i}return o(t,e),t.prototype.push=function(e){var t=this;this.vueEachArray.push(e);var r=this.length;this[this.length]=function(e,o,n){r>0?t.vueEachArray[r](e,o,(function(){n&&n()})):t.myEachHook(e,o,(function(a){!1===a?n(!1):t.vueEachArray[r](e,o,(function(e){n(a)}))}),t.router,!0)}},t}(Array);t.MyArray=n,t.proxyEachHook=function(e,t){for(var r=["beforeHooks","afterHooks"],o=0;o<r.length;o++){var a=r[o],i=e.lifeCycle[a][0];if(i){var u=t[a];t[a]=new n(e,u,i,a)}}},t.proxyH5Mount=function(e){var t;if(0===e.mount.length){if(null===(t=e.options.h5)||void 0===t?void 0:t.vueRouterDev)return;navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)&&setTimeout((function(){if(document.getElementsByTagName("uni-page").length>0)return!1;window.location.reload()}),0)}else e.mount[0].app.$mount(),e.mount=[]}},814:function(e,t){var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,r=1,o=arguments.length;r<o;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.tabIndexSelect=t.HomeNvueSwitchTab=t.runtimeQuit=t.registerLoddingPage=void 0;var o=null,n=null;t.registerLoddingPage=function(e){var t;if(null===(t=e.options.APP)||void 0===t?void 0:t.registerLoadingPage){var o=e.options.APP,n=o.loadingPageHook,a=o.loadingPageStyle;n(new plus.nativeObj.View("router-loadding",r({top:"0px",left:"0px",height:"100%",width:"100%"},a())))}},t.runtimeQuit=function(e){void 0===e&&(e="再按一次退出应用");var t=+new Date;o?t-o<1e3&&plus.runtime.quit():(o=t,uni.showToast({title:e,icon:"none",position:"bottom",duration:1e3}),setTimeout((function(){o=null}),1e3))},t.HomeNvueSwitchTab=function(e,t,r){return new Promise((function(t){return 0!==e.runId?t(!1):__uniConfig.tabBar&&Array.isArray(__uniConfig.tabBar.list)?void r({url:__uniConfig.entryPagePath,animationDuration:0,complete:function(){return t(!0)}}):t(!1)}))},t.tabIndexSelect=function(e,t){if(!__uniConfig.tabBar||!Array.isArray(__uniConfig.tabBar.list))return!1;for(var r=__uniConfig.tabBar.list,o=[],a=0,i=0;i<r.length;i++){var u=r[i];if("/"+u.pagePath!==e.path&&"/"+u.pagePath!==t.path||(u.pagePath===t.path&&(a=i),o.push(u)),2===o.length)break}return 2===o.length&&(null==n&&(n=uni.requireNativePlugin("uni-tabview")),n.switchSelect({index:a}),!0)}},334:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.getEnterPath=void 0,t.getEnterPath=function(e,t){switch(t.options.platform){case"mp-alipay":case"mp-weixin":case"mp-toutiao":case"mp-qq":return e.$options.mpInstance.route;case"mp-baidu":return e.$options.mpInstance.is||e.$options.mpInstance.pageinstance.route}return e.$options.mpInstance.route}},282:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.proxyHookName=t.proxyHookDeps=t.lifeCycle=t.baseConfig=t.mpPlatformReg=void 0;var o=r(883),n=r(99);t.mpPlatformReg="(^mp-weixin$)|(^mp-baidu$)|(^mp-alipay$)|(^mp-toutiao$)|(^mp-qq$)|(^mp-360$)",t.baseConfig={h5:{paramsToQuery:!1,vueRouterDev:!1,vueNext:!1,mode:"hash",base:"/",linkActiveClass:"router-link-active",linkExactActiveClass:"router-link-exact-active",scrollBehavior:function(e,t,r){return{x:0,y:0}},fallback:!0},APP:{registerLoadingPage:!0,loadingPageStyle:function(){return JSON.parse('{"backgroundColor":"#FFF"}')},loadingPageHook:function(e){e.show()},launchedHook:function(){plus.navigator.closeSplashscreen()},animation:{}},applet:{animationDuration:300},beforeProxyHooks:{onLoad:function(e,t,r){var o=e[0];t([n.parseQuery({query:o},r)])}},platform:"h5",keepUniOriginNav:!1,debugger:!1,routerBeforeEach:function(e,t,r){r()},routerAfterEach:function(e,t){},routerErrorEach:function(e,t){t.$lockStatus=!1,o.err(e,t,!0)},detectBeforeLock:function(e,t,r){},routes:[{path:"/choose-location"},{path:"/open-location"},{path:"/preview-image"}]},t.lifeCycle={beforeHooks:[],afterHooks:[],routerBeforeHooks:[],routerAfterHooks:[],routerErrorHooks:[]},t.proxyHookDeps={resetIndex:[],hooks:{},options:{}},t.proxyHookName=["onLaunch","onShow","onHide","onError","onInit","onLoad","onReady","onUnload","onResize","created","beforeMount","mounted","beforeDestroy","destroyed"]},801:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.createRouteMap=void 0;var o=r(883),n=r(789);t.createRouteMap=function(e,t){var r={finallyPathList:[],finallyPathMap:Object.create(null),aliasPathMap:Object.create(null),pathMap:Object.create(null),vueRouteMap:Object.create(null),nameMap:Object.create(null)};return t.forEach((function(t){var a=n.getRoutePath(t,e),i=a.finallyPath,u=a.aliasPath,l=a.path;if(null==l)throw new Error("请提供一个完整的路由对象，包括以绝对路径开始的 ‘path’ 字符串 "+JSON.stringify(t));if(i instanceof Array&&!e.options.h5.vueRouterDev&&"h5"===e.options.platform)throw new Error("非 vueRouterDev 模式下，route.alias 目前无法提供数组类型！ "+JSON.stringify(t));var c=i,p=u;"h5"!==e.options.platform&&0!==c.indexOf("/")&&"*"!==l&&o.warn("当前路由对象下，route："+JSON.stringify(t)+" 是否缺少了前缀 ‘/’",e,!0),r.finallyPathMap[c]||(r.finallyPathMap[c]=t,r.aliasPathMap[p]=t,r.pathMap[l]=t,r.finallyPathList.push(c),null!=t.name&&(r.nameMap[t.name]=t))})),r}},662:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.registerEachHooks=t.registerRouterHooks=t.registerHook=void 0;var o=r(366),n=r(169);function a(e,t){e[0]=t}t.registerHook=a,t.registerRouterHooks=function(e,t){return a(e.routerBeforeHooks,(function(e,r,o){t.routerBeforeEach(e,r,o)})),a(e.routerAfterHooks,(function(e,r){t.routerAfterEach(e,r)})),a(e.routerErrorHooks,(function(e,r){t.routerErrorEach(e,r)})),e},t.registerEachHooks=function(e,t,r){a(e.lifeCycle[t],(function(e,a,i,u,l){l?n.onTriggerEachHook(e,a,u,o.hookToggle[t],i):r(e,a,i)}))}},460:function(e,t,r){var o=this&&this.__assign||function(){return(o=Object.assign||function(e){for(var t,r=1,o=arguments.length;r<o;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.initMixins=t.getMixins=void 0;var n=r(801),a=r(844),i=r(147),u=r(814),l=r(845),c=r(890),p=r(789),s=r(334),f=r(282),h=r(925),v=!1,y=!1,g={app:!1,page:""};function d(e,t){var r=t.options.platform;return new RegExp(f.mpPlatformReg,"g").test(r)&&(r="app-lets"),{h5:{beforeCreate:function(){var e;if(h.beforeProxyHook(this,t),this.$options.router){t.$route=this.$options.router;var r=[];(null===(e=t.options.h5)||void 0===e?void 0:e.vueRouterDev)?r=t.options.routes:(r=n.createRouteMap(t,this.$options.router.options.routes).finallyPathMap,t.routesMap.vueRouteMap=r,a.buildVueRoutes(t,r)),a.buildVueRouter(t,this.$options.router,r),i.proxyEachHook(t,this.$options.router)}}},"app-plus":{beforeCreate:function(){h.beforeProxyHook(this,t),v||(v=!0,l.proxyPageHook(this,t,"app"),u.registerLoddingPage(t))}},"app-lets":{beforeCreate:function(){h.beforeProxyHook(this,t),p.voidFun("UNI-SIMPLE-ROUTER");var e=!0,r=this.$options.mpType;y||("component"===r?e=p.assertParentChild(g.page,this):"page"===r?(g[r]=s.getEnterPath(this,t),t.enterPath=g[r]):g[r]=!0,e&&l.proxyPageHook(this,t,r))},onLoad:function(){p.voidFun("UNI-SIMPLE-ROUTER"),!y&&p.assertParentChild(g.page,this)&&(y=!0,c.forceGuardEach(t))}}}[r]}t.getMixins=d,t.initMixins=function(e,t){var r=n.createRouteMap(t,t.options.routes);t.routesMap=r,e.mixin(o({},d(0,t)))}},789:function(t,r,o){var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,o=arguments.length;r<o;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)},a=this&&this.__rest||function(e,t){var r={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(o=Object.getOwnPropertySymbols(e);n<o.length;n++)t.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(e,o[n])&&(r[o[n]]=e[o[n]])}return r},i=this&&this.__spreadArrays||function(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var o=Array(e),n=0;for(t=0;t<r;t++)for(var a=arguments[t],i=0,u=a.length;i<u;i++,n++)o[n]=a[i];return o};Object.defineProperty(r,"__esModule",{value:!0}),r.deepDecodeQuery=r.resolveAbsolutePath=r.assertParentChild=r.lockDetectWarn=r.deepClone=r.baseClone=r.assertDeepObject=r.paramsToQuery=r.forMatNextToFrom=r.urlToJson=r.getUniCachePage=r.removeSimpleValue=r.copyData=r.getDataType=r.routesForMapRoute=r.notRouteTo404=r.getWildcardRule=r.assertNewOptions=r.getRoutePath=r.notDeepClearNull=r.mergeConfig=r.timeOut=r.def=r.voidFun=void 0;var u=o(282),l=o(169),c=o(883),p=o(890),s=o(779);function f(e,t){for(var r=Object.create(null),o=Object.keys(e).concat(["resolveQuery","parseQuery"]),a=0;a<o.length;a+=1){var u=o[a];null!=t[u]?t[u].constructor===Object?r[u]=n(n({},e[u]),t[u]):r[u]="routes"===u?i(e[u],t[u]):t[u]:r[u]=e[u]}return r}function h(e,t){var r=e.aliasPath||e.alias||e.path;return"h5"!==t.options.platform&&(r=e.path),{finallyPath:r,aliasPath:e.aliasPath||e.path,path:e.path,alias:e.alias}}function v(e,t){var r=e.routesMap.finallyPathMap["*"];if(r)return r;throw t&&l.ERRORHOOK[0](t,e),new Error("当前路由表匹配规则已全部匹配完成，未找到满足的匹配规则。你可以使用 '*' 通配符捕捉最后的异常")}function y(e){return Object.prototype.toString.call(e)}function g(t,r){if(null==t)r=t;else for(var o=0,n=Object.keys(t);o<n.length;o++){var a=n[o],i=a;t[a]!==t&&("object"==e(t[a])?(r[i]="[object Array]"===y(t[a])?[]:{},r[i]=g(t[a],r[i])):r[i]=t[a])}return r}function d(e){var t="[object Array]"===y(e)?[]:{};return g(e,t),t}r.voidFun=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t]},r.def=function(e,t,r){Object.defineProperty(e,t,{get:function(){return r()}})},r.timeOut=function(e){return new Promise((function(t){setTimeout((function(){t()}),e)}))},r.mergeConfig=f,r.notDeepClearNull=function(e){for(var t in e)null==e[t]&&delete e[t];return e},r.getRoutePath=h,r.assertNewOptions=function(e){var t,r=e.platform,o=e.routes;if(null==r)throw new Error("你在实例化路由时必须传递 'platform'");if(null==o||0===o.length)throw new Error("你在实例化路由时必须传递 routes 为空，这是无意义的。");return"h5"===e.platform&&(null===(t=e.h5)||void 0===t?void 0:t.vueRouterDev)&&(u.baseConfig.routes=[]),f(u.baseConfig,e)},r.getWildcardRule=v,r.notRouteTo404=function(e,t,r,o){if("*"!==t.path)return t;var n=t.redirect;if(void 0===n)throw new Error(" *  通配符必须配合 redirect 使用。redirect: string | Location | Function");var a=n;return"function"==typeof a&&(a=a(r)),p.navjump(a,e,o,void 0,void 0,void 0,!1)},r.routesForMapRoute=function e(t,r,o,n){var a;if(void 0===n&&(n=!1),null===(a=t.options.h5)||void 0===a?void 0:a.vueRouterDev)return{path:r};for(var i=r.split("?")[0],u="",l=t.routesMap,c=0;c<o.length;c++)for(var p=l[o[c]],f=0,h=Object.entries(p);f<h.length;f++){var g=h[f],d=g[0],m=g[1];if("*"!==d){var b=m,P=d;if("[object Array]"===y(p)&&(P=b),null!=s(P).exec(i))return"[object String]"===y(b)?l.finallyPathMap[b]:b}else""===u&&(u="*")}if(n)return{};if(l.aliasPathMap){var O=e(t,r,["aliasPathMap"],!0);if(Object.keys(O).length>0)return O}if(""!==u)return v(t);throw new Error(r+" 路径无法在路由表中找到！检查跳转路径及路由表")},r.getDataType=y,r.copyData=function(e){return JSON.parse(JSON.stringify(e))},r.removeSimpleValue=function(e,t){for(var r=0;r<e.length;r++)if(e[r]===t)return e.splice(r,1),!0;return!1},r.getUniCachePage=function(e){var t=getCurrentPages();if(null==e)return t;if(0===t.length)return t;var r=t.reverse()[e];return null==r?[]:r},r.urlToJson=function(e){var t={},r=e.split("?"),o=r[0],n=r[1];if(null!=n)for(var a=0,i=n.split("&");a<i.length;a++){var u=i[a].split("=");t[u[0]]=u[1]}return{path:o,query:t}},r.forMatNextToFrom=function(e,t,r){var o=[t,r],n=o[0],a=o[1];if("h5"===e.options.platform){var i=e.options.h5,u=i.vueNext,l=i.vueRouterDev;u||l||(n=p.createRoute(e,void 0,n),a=p.createRoute(e,void 0,a))}else n=p.createRoute(e,void 0,d(n)),a=p.createRoute(e,void 0,d(a));return{matTo:n,matFrom:a}},r.paramsToQuery=function(e,t){var r;if("h5"===e.options.platform&&!(null===(r=e.options.h5)||void 0===r?void 0:r.paramsToQuery))return t;if("[object Object]"===y(t)){var o=t,i=o.name,u=o.params,c=a(o,["name","params"]),p=u;if("h5"!==e.options.platform&&null==p&&(p={}),null!=i&&null!=p){var s=e.routesMap.nameMap[i];null==s&&(s=v(e,{type:2,msg:"命名路由为："+i+" 的路由，无法在路由表中找到！",toRule:t}));var f=h(s,e).finallyPath;if(!f.includes(":"))return n(n({},c),{path:f,query:p});l.ERRORHOOK[0]({type:2,msg:"动态路由："+f+" 无法使用 paramsToQuery！",toRule:t},e)}}return t},r.assertDeepObject=function(e){var t=null;try{t=JSON.stringify(e).match(/\{|\[|\}|\]/g)}catch(e){c.warnLock("传递的参数解析对象失败。"+e)}return null!=t&&t.length>3},r.baseClone=g,r.deepClone=d,r.lockDetectWarn=function(e,t,r,o,n,a){if(void 0===n&&(n={}),"afterHooks"===a)o();else{var i=e.options.detectBeforeLock;i&&i(e,t,r),e.$lockStatus?e.options.routerErrorEach({type:2,msg:"当前页面正在处于跳转状态，请稍后再进行跳转....",NAVTYPE:r,uniActualData:n},e):o()}},r.assertParentChild=function(e,t){for(;null!=t.$parent;){var r=t.$parent.$mp;if(r.page&&r.page.is===e)return!0;t=t.$parent}try{if(t.$mp.page.is===e||t.$mp.page.route===e)return!0}catch(e){return!1}return!1},r.resolveAbsolutePath=function(e,t){var r=/^\/?([^\?\s]+)(\?.+)?$/,o=e.trim();if(!r.test(o))throw new Error("【"+e+"】 路径错误，请提供完整的路径(10001)。");var n=o.match(r);if(null==n)throw new Error("【"+e+"】 路径错误，请提供完整的路径(10002)。");var a=n[2]||"";if(/^\.\/[^\.]+/.test(o))return(t.currentRoute.path+e).replace(/[^\/]+\.\//,"");var i=n[1].replace(/\//g,"\\/").replace(/\.\./g,"[^\\/]+").replace(/\./g,"\\."),u=new RegExp("^\\/"+i+"$"),l=t.options.routes.filter((function(e){return u.test(e.path)}));if(1!==l.length)throw new Error("【"+e+"】 路径错误，尝试转成绝对路径失败，请手动转成绝对路径(10003)。");return l[0].path+a},r.deepDecodeQuery=function t(r){for(var o="[object Array]"===y(r)?[]:{},n=Object.keys(r),a=0;a<n.length;a++){var i=n[a],u=r[i];if("string"==typeof u)try{var l=JSON.parse(decodeURIComponent(u));"object"!=e(l)&&(l=u),o[i]=l}catch(t){try{o[i]=decodeURIComponent(u)}catch(t){o[i]=u}}else if("object"==e(u)){var c=t(u);o[i]=c}else o[i]=u}return o}},883:function(e,t){function r(e,t,r,o){if(void 0===o&&(o=!1),!o){var n="[object Object]"===t.toString();if(!1===t)return!1;if(n&&!1===t[e])return!1}return console[e](r),!0}Object.defineProperty(t,"__esModule",{value:!0}),t.warnLock=t.log=t.warn=t.err=t.isLog=void 0,t.isLog=r,t.err=function(e,t,o){r("error",t.options.debugger,e,o)},t.warn=function(e,t,o){r("warn",t.options.debugger,e,o)},t.log=function(e,t,o){r("log",t.options.debugger,e,o)},t.warnLock=function(e){console.warn(e)}},607:function(e,t,r){var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r),Object.defineProperty(e,o,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),n=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||o(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),t.createRouter=t.RouterMount=t.runtimeQuit=void 0,n(r(366),t),n(r(309),t),n(r(789),t);var a=r(814);Object.defineProperty(t,"runtimeQuit",{enumerable:!0,get:function(){return a.runtimeQuit}});var i=r(963);Object.defineProperty(t,"RouterMount",{enumerable:!0,get:function(){return i.RouterMount}}),Object.defineProperty(t,"createRouter",{enumerable:!0,get:function(){return i.createRouter}});var u="2.0.8-BETA.4";/[A-Z]/g.test(u)&&console.warn("【"+"UNI-SIMPLE-ROUTER".toLocaleLowerCase()+" 提示】：当前版本 "+u.toLocaleLowerCase()+" 此版本为测试版。有BUG请退回正式版，线上正式版本：2.0.7")},366:function(e,t){var r,o,n;Object.defineProperty(t,"__esModule",{value:!0}),t.rewriteMethodToggle=t.navtypeToggle=t.hookToggle=void 0,(n=t.hookToggle||(t.hookToggle={})).beforeHooks="beforeEach",n.afterHooks="afterEach",n.enterHooks="beforeEnter",(o=t.navtypeToggle||(t.navtypeToggle={})).push="navigateTo",o.replace="redirectTo",o.replaceAll="reLaunch",o.pushTab="switchTab",o.back="navigateBack",(r=t.rewriteMethodToggle||(t.rewriteMethodToggle={})).navigateTo="push",r.navigate="push",r.redirectTo="replace",r.reLaunch="replaceAll",r.switchTab="pushTab",r.navigateBack="back"},309:function(e,t){Object.defineProperty(t,"__esModule",{value:!0})},925:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.beforeProxyHook=void 0;var o=r(789),n=r(883);t.beforeProxyHook=function(e,t){var r=e.$options,a=t.options.beforeProxyHooks;if(null==r)return!1;if(null==a)return!1;for(var i=Object.keys(a),u=function(e){var u=i[e],l=r[u];if(l)for(var c=a[u],p=function(e){if(l[e].toString().includes("UNI-SIMPLE-ROUTER"))return"continue";var r=l.splice(e,1,(function(){for(var e=this,n=[],a=0;a<arguments.length;a++)n[a]=arguments[a];var i="UNI-SIMPLE-ROUTER";o.voidFun(i),c?c.call(this,n,(function(t){r.apply(e,t)}),t):r.apply(this,n)}))[0]},s=0;s<l.length;s++)p(s);else n.warn("beforeProxyHooks ===> 当前组件不适合"+u+"，或者 hook: "+u+" 不存在，已为你规避处理，可以忽略。",t)},l=0;l<i.length;l++)u(l);return!0}},169:function(t,r,o){var n=this&&this.__rest||function(e,t){var r={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(o=Object.getOwnPropertySymbols(e);n<o.length;n++)t.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(e,o[n])&&(r[o[n]]=e[o[n]])}return r};Object.defineProperty(r,"__esModule",{value:!0}),r.loopCallHook=r.transitionTo=r.onTriggerEachHook=r.callHook=r.callBeforeRouteLeave=r.HOOKLIST=r.ERRORHOOK=void 0;var a=o(789),i=o(890),u=o(147),l=o(369),c=o(814);function p(e,t,r,o){var n,i=a.getUniCachePage(0);if(Object.keys(i).length>0){var u=void 0;switch("h5"===e.options.platform?u=i.$options.beforeRouteLeave:null!=i.$vm&&(u=i.$vm.$options.beforeRouteLeave),a.getDataType(u)){case"[object Array]":n=(n=u[0]).bind(i);break;case"[object Function]":n=u.bind(i.$vm)}}return s(n,t,r,e,o)}function s(e,t,r,o,n,a){void 0===a&&(a=!0),null!=e&&e instanceof Function?!0===a?e(t,r,n,o,!1):(e(t,r,(function(){}),o,!1),n()):n()}function f(e,t,r,o,n,i){var u=a.forMatNextToFrom(e,t,r),l=u.matTo,c=u.matFrom;"h5"===e.options.platform?h(n,0,i,e,l,c,o):h(n.slice(0,4),0,(function(){i((function(){h(n.slice(4),0,a.voidFun,e,l,c,o)}))}),e,l,c,o)}function h(t,o,u,l,p,s,f){var v=a.routesForMapRoute(l,p.path,["finallyPathMap","pathMap"]);if(t.length-1<o)return u();var y=t[o],g=r.ERRORHOOK[0];y(l,p,s,v,(function(r){if("app-plus"===l.options.platform&&(!1!==r&&"string"!=typeof r&&"object"!=e(r)||c.tabIndexSelect(p,s)),!1===r)"h5"===l.options.platform&&u(!1),g({type:0,msg:"管道函数传递 false 导航被终止!",matTo:p,matFrom:s,nextTo:r},l);else if("string"==typeof r||"object"==e(r)){var a=f,v=r;if("object"==e(r)){var y=r.NAVTYPE;v=n(r,["NAVTYPE"]),null!=y&&(a=y)}i.navjump(v,l,a,{from:s,next:u})}else null==r?(o++,h(t,o,u,l,p,s,f)):g({type:1,msg:"管道函数传递未知类型，无法被识别。导航被终止！",matTo:p,matFrom:s,nextTo:r},l)}))}r.ERRORHOOK=[function(e,t){return t.lifeCycle.routerErrorHooks[0](e,t)}],r.HOOKLIST=[function(e,t,r,o,n){return s(e.lifeCycle.routerBeforeHooks[0],t,r,e,n)},function(e,t,r,o,n){return p(e,t,r,n)},function(e,t,r,o,n){return s(e.lifeCycle.beforeHooks[0],t,r,e,n)},function(e,t,r,o,n){return s(o.beforeEnter,t,r,e,n)},function(e,t,r,o,n){return s(e.lifeCycle.afterHooks[0],t,r,e,n,!1)},function(e,t,r,o,n){return e.$lockStatus=!1,"h5"===e.options.platform&&(u.proxyH5Mount(e),l.addKeepAliveInclude(e)),e.runId++,s(e.lifeCycle.routerAfterHooks[0],t,r,e,n,!1)}],r.callBeforeRouteLeave=p,r.callHook=s,r.onTriggerEachHook=function(e,t,o,n,a){var i=[];switch(n){case"beforeEach":i=r.HOOKLIST.slice(0,3);break;case"afterEach":i=r.HOOKLIST.slice(4);break;case"beforeEnter":i=r.HOOKLIST.slice(3,4)}f(o,e,t,"push",i,a)},r.transitionTo=f,r.loopCallHook=h},890:function(e,t,r){var o=this&&this.__assign||function(){return(o=Object.assign||function(e){for(var t,r=1,o=arguments.length;r<o;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)},n=this&&this.__rest||function(e,t){var r={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(o=Object.getOwnPropertySymbols(e);n<o.length;n++)t.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(e,o[n])&&(r[o[n]]=e[o[n]])}return r};Object.defineProperty(t,"__esModule",{value:!0}),t.createRoute=t.forceGuardEach=t.backOptionsBuild=t.navjump=t.lockNavjump=void 0;var a=r(366),i=r(99),u=r(789),l=r(169),c=r(845),p=r(169);function s(e,t,r,o,n){u.lockDetectWarn(t,e,r,(function(){"h5"!==t.options.platform&&(t.$lockStatus=!0),f(e,t,r,void 0,o,n)}),n)}function f(e,t,r,n,s,f,v){if(void 0===v&&(v=!0),"back"===r){var y=1;if("string"==typeof e?y=+e:(y=e.delta||1,f=o(o({},f||{}),e)),"h5"===t.options.platform){t.$route.go(-y);var g=(f||{success:u.voidFun}).success||u.voidFun,d=(f||{complete:u.voidFun}).complete||u.voidFun;return g({errMsg:"navigateBack:ok"}),void d({errMsg:"navigateBack:ok"})}e=h(t,y,f)}var m=i.queryPageToMap(e,t).rule;m.type=a.navtypeToggle[r];var b=u.paramsToQuery(t,m),P=i.resolveQuery(b,t);if("h5"===t.options.platform)if("push"!==r&&(r="replace"),null!=n)n.next(o({replace:"push"!==r},P));else if("push"===r&&Reflect.has(P,"events")){if(Reflect.has(P,"name"))throw new Error("在h5端上使用 'push'、'navigateTo' 跳转时，如果包含 events 不允许使用 name 跳转，因为 name 实现了动态路由。请更换为 path 或者 url 跳转！");uni.navigateTo(P,!0,u.voidFun,s)}else t.$route[r](P,P.success||u.voidFun,P.fail||u.voidFun);else{var O={path:""};if(null==n){var k=u.routesForMapRoute(t,P.path,["finallyPathMap","pathMap"]);k=u.notRouteTo404(t,k,P,r),P=o(o(o(o({},k),{params:{}}),P),{path:k.path}),O=c.createToFrom(P,t)}else O=n.from;if(c.createFullPath(P,O),!1===v)return P;l.transitionTo(t,P,O,r,p.HOOKLIST,(function(e){uni[a.navtypeToggle[r]](P,!0,e,s)}))}}function h(e,t,r){void 0===r&&(r={});var n=v(e,t,void 0,o({NAVTYPE:"back"},r)),a=o(o({},r),{path:n.path,query:n.query,delta:t});if("[object Object]"===u.getDataType(r)){var i=r,l=i.animationDuration,c=i.animationType;null!=l&&(a.animationDuration=l),null!=c&&(a.animationType=c);var p=r.from;null!=p&&(a.BACKTYPE=p)}return a}function v(e,t,r,l){void 0===t&&(t=0),void 0===l&&(l={});var c={name:"",meta:{},path:"",fullPath:"",NAVTYPE:"",query:{},params:{},BACKTYPE:(r||{BACKTYPE:""}).BACKTYPE||""};if(19970806===t)return c;if("h5"===e.options.platform){var p={path:""};p=null!=r?r:e.$route.currentRoute;var s=u.copyData(p.params);delete s.__id__;var f=i.parseQuery(o(o({},s),u.copyData(p.query)),e);p=o(o({},p),{query:f}),c.path=p.path,c.fullPath=p.fullPath||"",c.query=u.deepDecodeQuery(p.query||{}),c.NAVTYPE=a.rewriteMethodToggle[p.type||"reLaunch"]}else{var h={};if(null!=r)h=o(o({},r),{openType:r.type});else{var v=u.getUniCachePage(t);if(0===Object.keys(v).length){var y=l.NAVTYPE,g=n(l,["NAVTYPE"]),d="不存在的页面栈，请确保有足够的页面可用，当前 level:"+t;throw e.options.routerErrorEach({type:3,msg:d,NAVTYPE:y,level:t,uniActualData:g},e),new Error(d)}var m=v.options||{};h=o(o({},v.$page||{}),{query:u.deepDecodeQuery(m),fullPath:decodeURIComponent((v.$page||{}).fullPath||"/"+v.route)}),"app-plus"!==e.options.platform&&(h.path="/"+v.route)}var b=h.openType;c.query=h.query,c.path=h.path,c.fullPath=h.fullPath,c.NAVTYPE=a.rewriteMethodToggle[b||"reLaunch"]}var P=u.routesForMapRoute(e,c.path,["finallyPathMap","pathMap"]),O=o(o({},c),P);return O.query=i.parseQuery(O.query,e),O}t.lockNavjump=s,t.navjump=f,t.backOptionsBuild=h,t.forceGuardEach=function(e,t,r){if(void 0===t&&(t="replaceAll"),void 0===r&&(r=!1),"h5"===e.options.platform)throw new Error("在h5端上使用：forceGuardEach 是无意义的，目前 forceGuardEach 仅支持在非h5端上使用");var o=u.getUniCachePage(0);0===Object.keys(o).length&&e.options.routerErrorEach({type:3,NAVTYPE:t,uniActualData:{},level:0,msg:"不存在的页面栈，请确保有足够的页面可用，当前 level:0"},e);var n=o,a=n.route,i=n.options;s({path:"/"+a,query:u.deepDecodeQuery(i||{})},e,t,r)},t.createRoute=v},845:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.resetPageHook=t.resetAndCallPageHook=t.proxyPageHook=t.createFullPath=t.createToFrom=void 0;var o=r(282),n=r(789),a=r(890),i=r(99);function u(e){for(var t=e.proxyHookDeps,r=0,o=Object.entries(t.hooks);r<o.length;r++)(0,o[r][1].resetHook)()}t.createToFrom=function(e,t){var r=n.getUniCachePage(0);return"[object Array]"===n.getDataType(r)?n.deepClone(e):a.createRoute(t)},t.createFullPath=function(e,t){if(null==e.fullPath){var r=i.stringifyQuery(e.query);e.fullPath=e.path+r}null==t.fullPath&&(r=i.stringifyQuery(t.query),t.fullPath=t.path+r)},t.proxyPageHook=function(e,t,r){for(var n=t.proxyHookDeps,a=e.$options,i=function(i){var u=o.proxyHookName[i],l=a[u];if(l)for(var c=function(o){if(l[o].toString().includes("UNI-SIMPLE-ROUTER"))return"continue";var a=Object.keys(n.hooks).length+1,i=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];n.resetIndex.push(a),n.options[a]=e},u=l.splice(o,1,i)[0];n.hooks[a]={proxyHook:i,callHook:function(o){if(t.enterPath.replace(/^\//,"")===o.replace(/^\//,"")||"app"===r){var i=n.options[a];u.apply(e,i)}},resetHook:function(){l.splice(o,1,u)}}},p=0;p<l.length;p++)c(p)},u=0;u<o.proxyHookName.length;u++)i(u)},t.resetAndCallPageHook=function(e,t,r){void 0===r&&(r=!0);var o=t.trim().match(/^(\/?[^\?\s]+)(\?[\s\S]*$)?$/);if(null==o)throw new Error("还原hook失败。请检查 【"+t+"】 路径是否正确。");t=o[1];for(var n=e.proxyHookDeps,a=n.resetIndex,i=0;i<a.length;i++){var l=a[i];(0,n.hooks[l].callHook)(t)}r&&u(e)},t.resetPageHook=u},99:function(t,r,o){var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,o=arguments.length;r<o;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)};Object.defineProperty(r,"__esModule",{value:!0}),r.stringifyQuery=r.parseQuery=r.resolveQuery=r.queryPageToMap=void 0;var a=o(789),i=o(169),u=o(883),l=/[!'()*]/g,c=function(e){return"%"+e.charCodeAt(0).toString(16)},p=/%2C/g,s=function(e){return encodeURIComponent(e).replace(l,c).replace(p,",")};r.queryPageToMap=function(e,t){var r={},o="",u=e.success,l=e.fail;if("[object Object]"===a.getDataType(e)){var c=e;if(null!=c.path){var p=a.urlToJson(c.path),s=p.path,f=p.query;o=a.routesForMapRoute(t,s,["finallyPathList","pathMap"]),r=n(n({},f),e.query||{}),c.path=s,c.query=r,delete e.params}else null!=c.name?null==(o=t.routesMap.nameMap[c.name])?o=a.getWildcardRule(t,{type:2,msg:"命名路由为："+c.name+" 的路由，无法在路由表中找到！",toRule:e}):(r=e.params||{},delete e.query):o=a.getWildcardRule(t,{type:2,msg:e+" 解析失败，请检测当前路由表下是否有包含。",toRule:e})}else e=a.urlToJson(e),o=a.routesForMapRoute(t,e.path,["finallyPathList","pathMap"]),r=e.query;if("h5"===t.options.platform){a.getRoutePath(o,t).finallyPath.includes(":")&&null==e.name&&i.ERRORHOOK[0]({type:2,msg:"当有设置 alias或者aliasPath 为动态路由时，不允许使用 path 跳转。请使用 name 跳转！",route:o},t);var h=e.complete,v=e.success,y=e.fail;if("[object Function]"===a.getDataType(h)){var g=function(e,t){"[object Function]"===a.getDataType(t)&&t.apply(this,e),h.apply(this,e)};u=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];g.call(this,e,v)},l=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];g.call(this,e,y)}}}var d=e;return"[object Function]"===a.getDataType(d.success)&&(d.success=u),"[object Function]"===a.getDataType(d.fail)&&(d.fail=l),{rule:d,route:o,query:r}},r.resolveQuery=function(e,t){var r="query";null!=e.params&&(r="params"),null!=e.query&&(r="query");var o=a.copyData(e[r]||{}),n=t.options.resolveQuery;if(n){var i=n(o);"[object Object]"!==a.getDataType(i)?u.warn("请按格式返回参数： resolveQuery?:(jsonQuery:{[propName: string]: any;})=>{[propName: string]: any;}",t):e[r]=i}else{if(!a.assertDeepObject(o))return e;var l=JSON.stringify(o);e[r]={query:l}}return e},r.parseQuery=function(t,r){var o=r.options.parseQuery;if(o)t=o(a.copyData(t)),"[object Object]"!==a.getDataType(t)&&u.warn("请按格式返回参数： parseQuery?:(jsonQuery:{[propName: string]: any;})=>{[propName: string]: any;}",r);else if(Reflect.get(t,"query")){var n=Reflect.get(t,"query");if("string"==typeof n)try{n=JSON.parse(n)}catch(t){u.warn("尝试解析深度对象失败，按原样输出。"+t,r)}if("object"==e(n))return a.deepDecodeQuery(n)}return t},r.stringifyQuery=function(e){var t=e?Object.keys(e).map((function(t){var r=e[t];if(void 0===r)return"";if(null===r)return s(t);if(Array.isArray(r)){var o=[];return r.forEach((function(e){void 0!==e&&(null===e?o.push(s(t)):o.push(s(t)+"="+s(e)))})),o.join("&")}return s(t)+"="+s(r)})).filter((function(e){return e.length>0})).join("&"):null;return t?"?"+t:""}},314:function(e,t,r){var o=this&&this.__awaiter||function(e,t,r,o){return new(r||(r=Promise))((function(n,a){function i(e){try{l(o.next(e))}catch(e){a(e)}}function u(e){try{l(o.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,u)}l((o=o.apply(e,t||[])).next())}))},n=this&&this.__generator||function(e,t){var r,o,n,a,i={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,o&&(n=2&a[0]?o.return:a[0]?o.throw||((n=o.return)&&n.call(o),0):o.next)&&!(n=n.call(o,a[1])).done)return n;switch(o=0,n&&(a=[2&a[0],n.value]),a[0]){case 0:case 1:n=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,o=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!((n=(n=i.trys).length>0&&n[n.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!n||a[1]>n[0]&&a[1]<n[3])){i.label=a[1];break}if(6===a[0]&&i.label<n[1]){i.label=n[1],n=a;break}if(n&&i.label<n[2]){i.label=n[2],i.ops.push(a);break}n[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],o=0}finally{r=n=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.rewriteMethod=void 0;var a=r(366),i=r(789),u=r(883),l=r(809),c=r(814),p=["navigateTo","redirectTo","reLaunch","switchTab","navigateBack"],s={navigateTo:function(){},redirectTo:function(){},reLaunch:function(){},switchTab:function(){},navigateBack:function(){}};t.rewriteMethod=function(e){!1===e.options.keepUniOriginNav&&p.forEach((function(t){var r=uni[t];s[t]=r,uni[t]=function(p,f,h,v){return void 0===f&&(f=!1),o(this,void 0,void 0,(function(){return n(this,(function(o){switch(o.label){case 0:return f?"app-plus"!==e.options.platform?[3,2]:[4,c.HomeNvueSwitchTab(e,p,s.reLaunch)]:[3,3];case 1:o.sent(),o.label=2;case 2:return l.uniOriginJump(e,r,t,p,h,v),[3,4];case 3:"app-plus"===e.options.platform&&0===Object.keys(e.appMain).length&&(e.appMain={NAVTYPE:t,path:p.url}),function(e,t,r){if("app-plus"===r.options.platform){var o=null;e&&(o=e.openType),null!=o&&"appLaunch"===o&&(t="reLaunch")}if("reLaunch"===t&&'{"url":"/"}'===JSON.stringify(e)&&(u.warn("uni-app 原生方法：reLaunch({url:'/'}) 默认被重写啦！你可以使用 this.$Router.replaceAll() 或者 uni.reLaunch({url:'/?xxx=xxx'})",r),t="navigateBack",e={from:"backbutton"}),"navigateBack"===t){var n=1;null==e&&(e={delta:1}),"[object Number]"===i.getDataType(e.delta)&&(n=e.delta),r.back(n,e)}else{var l=a.rewriteMethodToggle[t],c=e.url;if(!c.startsWith("/")){var p=i.resolveAbsolutePath(c,r);c=p,e.url=p}if("switchTab"===t){var s=i.routesForMapRoute(r,c,["pathMap","finallyPathList"]),f=i.getRoutePath(s,r).finallyPath;if("[object Array]"===i.getDataType(f)&&u.warn("uni-app 原生方法跳转路径为："+c+"。此路为是tab页面时，不允许设置 alias 为数组的情况，并且不能为动态路由！当然你可以通过通配符*解决！",r),"*"===f&&u.warn("uni-app 原生方法跳转路径为："+c+"。在路由表中找不到相关路由表！当然你可以通过通配符*解决！",r),"h5"===r.options.platform){var h=e.success;e.success=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];null==h||h.apply(null,t),i.timeOut(150).then((function(){var t=e.detail||{};if(Object.keys(t).length>0&&Reflect.has(t,"index")){var r=i.getUniCachePage(0);if(0===Object.keys(r).length)return!1;var o=r,n=o.$options.onTabItemTap;if(n)for(var a=0;a<n.length;a++)n[a].call(o,t)}}))}}c=f}var v=e,y=v.events,g=v.success,d=v.fail,m=v.complete,b=v.animationType,P={path:c,events:y,success:g,fail:d,complete:m,animationDuration:v.animationDuration,animationType:b};r[l](i.notDeepClearNull(P))}}(p,t,e),o.label=4;case 4:return[2]}}))}))}}))}},963:function(t,r,o){var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,o=arguments.length;r<o;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)};Object.defineProperty(r,"__esModule",{value:!0}),r.createRouter=r.RouterMount=void 0;var a=o(282),i=o(789),u=o(662),l=o(460),c=o(890),p=o(314),s=function(){},f=new Promise((function(e){return s=e}));r.createRouter=function(e){var t=i.assertNewOptions(e),r={options:t,mount:[],runId:0,Vue:null,proxyHookDeps:a.proxyHookDeps,appMain:{},enterPath:"",$route:null,$lockStatus:!1,routesMap:{},lifeCycle:u.registerRouterHooks(a.lifeCycle,t),push:function(e){c.lockNavjump(e,r,"push")},replace:function(e){c.lockNavjump(e,r,"replace")},replaceAll:function(e){c.lockNavjump(e,r,"replaceAll")},pushTab:function(e){c.lockNavjump(e,r,"pushTab")},back:function(e,t){void 0===e&&(e=1),"[object Object]"!==i.getDataType(t)?t={from:"navigateBack"}:Reflect.has(t,"from")||(t=n(n({},t),{from:"navigateBack"})),c.lockNavjump(e+"",r,"back",void 0,t)},forceGuardEach:function(e,t){c.forceGuardEach(r,e,t)},beforeEach:function(e){u.registerEachHooks(r,"beforeHooks",e)},afterEach:function(e){u.registerEachHooks(r,"afterHooks",e)},install:function(e){r.Vue=e,p.rewriteMethod(this),l.initMixins(e,this),Object.defineProperty(e.prototype,"$Router",{get:function(){var e=r;return Object.defineProperty(this,"$Router",{value:e,writable:!1,configurable:!1,enumerable:!1}),Object.seal(e)}}),Object.defineProperty(e.prototype,"$Route",{get:function(){return c.createRoute(r)}}),Object.defineProperty(e.prototype,"$AppReady",{get:function(){return"h5"===r.options.platform?Promise.resolve():f},set:function(e){!0===e&&s()}})}};return i.def(r,"currentRoute",(function(){return c.createRoute(r)})),r.beforeEach((function(e,t,r){return r()})),r.afterEach((function(){})),r},r.RouterMount=function(t,r,o){if(void 0===o&&(o="#app"),"[object Array]"!==i.getDataType(r.mount))throw new Error("挂载路由失败，router.app 应该为数组类型。当前类型："+e(r.mount));if(r.mount.push({app:t,el:o}),"h5"===r.options.platform){var n=r.$route;n.replace({path:n.currentRoute.fullPath})}}},809:function(e,t,r){var o=this&&this.__assign||function(){return(o=Object.assign||function(e){for(var t,r=1,o=arguments.length;r<o;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)},n=this&&this.__awaiter||function(e,t,r,o){return new(r||(r=Promise))((function(n,a){function i(e){try{l(o.next(e))}catch(e){a(e)}}function u(e){try{l(o.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,u)}l((o=o.apply(e,t||[])).next())}))},a=this&&this.__generator||function(e,t){var r,o,n,a,i={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,o&&(n=2&a[0]?o.return:a[0]?o.throw||((n=o.return)&&n.call(o),0):o.next)&&!(n=n.call(o,a[1])).done)return n;switch(o=0,n&&(a=[2&a[0],n.value]),a[0]){case 0:case 1:n=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,o=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!((n=(n=i.trys).length>0&&n[n.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!n||a[1]>n[0]&&a[1]<n[3])){i.label=a[1];break}if(6===a[0]&&i.label<n[1]){i.label=n[1],n=a;break}if(n&&i.label<n[2]){i.label=n[2],i.ops.push(a);break}n[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],o=0}finally{r=n=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},i=this&&this.__rest||function(e,t){var r={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(o=Object.getOwnPropertySymbols(e);n<o.length;n++)t.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(e,o[n])&&(r[o[n]]=e[o[n]])}return r};Object.defineProperty(t,"__esModule",{value:!0}),t.formatOriginURLQuery=t.uniOriginJump=void 0;var u=r(99),l=r(789),c=r(282),p=r(845),s=0,f="reLaunch";function h(e,t,r){var n,a=t.url,i=t.path,c=t.query,p=t.animationType,s=t.animationDuration,f=t.events,h=t.success,v=t.fail,y=t.complete,g=t.delta,d=t.animation,m=u.stringifyQuery(c||{}),b=""===m?i||a:(i||a)+m,P={};return"app-plus"===e.options.platform&&"navigateBack"!==r&&(P=(null===(n=e.options.APP)||void 0===n?void 0:n.animation)||{},P=o(o({},P),d||{})),l.notDeepClearNull({delta:g,url:b,animationType:p||P.animationType,animationDuration:s||P.animationDuration,events:f,success:h,fail:v,complete:y})}t.uniOriginJump=function(e,t,r,u,v,y){var g=h(e,u,r),d=g.complete,m=i(g,["complete"]),b=e.options.platform;null!=y&&!1===y?(0===s&&(s++,"h5"!==b&&(p.resetAndCallPageHook(e,m.url),e.Vue.prototype.$AppReady=!0)),d&&d.apply(null,{msg:"forceGuardEach强制触发并且不执行跳转"}),v&&v.apply(null,{msg:"forceGuardEach强制触发并且不执行跳转"})):(0===s&&("app-plus"===b?p.resetAndCallPageHook(e,m.url):new RegExp(c.mpPlatformReg,"g").test(b)&&p.resetAndCallPageHook(e,m.url,!1)),t(o(o({},m),{from:u.BACKTYPE,complete:function(){for(var t,o,i,u,h=[],y=0;y<arguments.length;y++)h[y]=arguments[y];return n(this,void 0,void 0,(function(){var n,y,g;return a(this,(function(a){switch(a.label){case 0:return 0===s&&(s++,"h5"!==b&&(new RegExp(c.mpPlatformReg,"g").test(b)&&p.resetPageHook(e),e.Vue.prototype.$AppReady=!0,"app-plus"===b&&((n=plus.nativeObj.View.getViewById("router-loadding"))&&n.close(),(y=null===(t=e.options.APP)||void 0===t?void 0:t.launchedHook)&&y()))),g=0,new RegExp(c.mpPlatformReg,"g").test(b)?g=null===(o=e.options.applet)||void 0===o?void 0:o.animationDuration:"app-plus"===b&&"navigateBack"===r&&"navigateTo"===f&&(g=null===(u=null===(i=e.options.APP)||void 0===i?void 0:i.animation)||void 0===u?void 0:u.animationDuration),"navigateTo"!==r&&"navigateBack"!==r||0===g?[3,2]:[4,l.timeOut(g)];case 1:a.sent(),a.label=2;case 2:return f=r,d&&d.apply(null,h),v&&v.apply(null,h),[2]}}))}))}})))},t.formatOriginURLQuery=h}},r={},function e(o){if(r[o])return r[o].exports;var n=r[o]={exports:{}};return t[o].call(n.exports,n,n.exports,e),n.exports}(607);var t,r})); 
 			}); 
		define("static/js/weapp-qrcode.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var t;(function(){function e(t,e){for(var r=1,o=function(t){var e=encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return e.length+(e.length!=t?3:0)}(t),n=0,a=c.length;n<=a;n++){var s=0;switch(e){case i.L:s=c[n][0];break;case i.M:s=c[n][1];break;case i.Q:s=c[n][2];break;case i.H:s=c[n][3]}if(o<=s)break;r++}if(r>c.length)throw new Error("Too long data");return r}function r(t){this.mode=n.MODE_8BIT_BYTE,this.data=t,this.parsedData=[];for(var e=0,r=this.data.length;e<r;e++){var o=[],i=this.data.charCodeAt(e);i>65536?(o[0]=240|(1835008&i)>>>18,o[1]=128|(258048&i)>>>12,o[2]=128|(4032&i)>>>6,o[3]=128|63&i):i>2048?(o[0]=224|(61440&i)>>>12,o[1]=128|(4032&i)>>>6,o[2]=128|63&i):i>128?(o[0]=192|(1984&i)>>>6,o[1]=128|63&i):o[0]=i,this.parsedData.push(o)}this.parsedData=Array.prototype.concat.apply([],this.parsedData),this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function o(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}r.prototype={getLength:function(t){return this.parsedData.length},write:function(t){for(var e=0,r=this.parsedData.length;e<r;e++)t.put(this.parsedData[e],8)}},o.prototype={addData:function(t){var e=new r(t);this.dataList.push(e),this.dataCache=null},isDark:function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++){this.modules[r]=new Array(this.moduleCount);for(var n=0;n<this.moduleCount;n++)this.modules[r][n]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=o.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},setupPositionProbePattern:function(t,e){for(var r=-1;r<=7;r++)if(!(t+r<=-1||this.moduleCount<=t+r))for(var o=-1;o<=7;o++)e+o<=-1||this.moduleCount<=e+o||(this.modules[t+r][e+o]=0<=r&&r<=6&&(0==o||6==o)||0<=o&&o<=6&&(0==r||6==r)||2<=r&&r<=4&&2<=o&&o<=4)},getBestMaskPattern:function(){for(var t=0,e=0,r=0;r<8;r++){this.makeImpl(!0,r);var o=s.getLostPoint(this);(0==r||t>o)&&(t=o,e=r)}return e},createMovieClip:function(t,e,r){var o=t.createEmptyMovieClip(e,r);this.make();for(var n=0;n<this.modules.length;n++)for(var i=1*n,a=0;a<this.modules[n].length;a++){var s=1*a;this.modules[n][a]&&(o.beginFill(0,100),o.moveTo(s,i),o.lineTo(s+1,i),o.lineTo(s+1,i+1),o.lineTo(s,i+1),o.endFill())}return o},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},setupPositionAdjustPattern:function(){for(var t=s.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var r=0;r<t.length;r++){var o=t[e],n=t[r];if(null==this.modules[o][n])for(var i=-2;i<=2;i++)for(var a=-2;a<=2;a++)this.modules[o+i][n+a]=-2==i||2==i||-2==a||2==a||0==i&&0==a}},setupTypeNumber:function(t){for(var e=s.getBCHTypeNumber(this.typeNumber),r=0;r<18;r++){var o=!t&&1==(e>>r&1);this.modules[Math.floor(r/3)][r%3+this.moduleCount-8-3]=o}for(r=0;r<18;r++)o=!t&&1==(e>>r&1),this.modules[r%3+this.moduleCount-8-3][Math.floor(r/3)]=o},setupTypeInfo:function(t,e){for(var r=this.errorCorrectLevel<<3|e,o=s.getBCHTypeInfo(r),n=0;n<15;n++){var i=!t&&1==(o>>n&1);n<6?this.modules[n][8]=i:n<8?this.modules[n+1][8]=i:this.modules[this.moduleCount-15+n][8]=i}for(n=0;n<15;n++)i=!t&&1==(o>>n&1),n<8?this.modules[8][this.moduleCount-n-1]=i:n<9?this.modules[8][15-n-1+1]=i:this.modules[8][15-n-1]=i;this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var r=-1,o=this.moduleCount-1,n=7,i=0,a=this.moduleCount-1;a>0;a-=2)for(6==a&&a--;;){for(var h=0;h<2;h++)if(null==this.modules[o][a-h]){var u=!1;i<t.length&&(u=1==(t[i]>>>n&1)),s.getMask(e,o,a-h)&&(u=!u),this.modules[o][a-h]=u,-1==--n&&(i++,n=7)}if((o+=r)<0||this.moduleCount<=o){o-=r,r=-r;break}}}},o.PAD0=236,o.PAD1=17,o.createData=function(t,e,r){for(var n=g.getRSBlocks(t,e),i=new f,a=0;a<r.length;a++){var h=r[a];i.put(h.mode,4),i.put(h.getLength(),s.getLengthInBits(h.mode,t)),h.write(i)}var u=0;for(a=0;a<n.length;a++)u+=n[a].dataCount;if(i.getLengthInBits()>8*u)throw new Error("code length overflow. ("+i.getLengthInBits()+">"+8*u+")");for(i.getLengthInBits()+4<=8*u&&i.put(0,4);i.getLengthInBits()%8!=0;)i.putBit(!1);for(;!(i.getLengthInBits()>=8*u||(i.put(o.PAD0,8),i.getLengthInBits()>=8*u));)i.put(o.PAD1,8);return o.createBytes(i,n)},o.createBytes=function(t,e){for(var r=0,o=0,n=0,i=new Array(e.length),a=new Array(e.length),h=0;h<e.length;h++){var u=e[h].dataCount,g=e[h].totalCount-u;o=Math.max(o,u),n=Math.max(n,g),i[h]=new Array(u);for(var f=0;f<i[h].length;f++)i[h][f]=255&t.buffer[f+r];r+=u;var c=s.getErrorCorrectPolynomial(g),d=new l(i[h],c.getLength()-1).mod(c);for(a[h]=new Array(c.getLength()-1),f=0;f<a[h].length;f++){var m=f+d.getLength()-a[h].length;a[h][f]=m>=0?d.get(m):0}}var p=0;for(f=0;f<e.length;f++)p+=e[f].totalCount;var v=new Array(p),E=0;for(f=0;f<o;f++)for(h=0;h<e.length;h++)f<i[h].length&&(v[E++]=i[h][f]);for(f=0;f<n;f++)for(h=0;h<e.length;h++)f<a[h].length&&(v[E++]=a[h][f]);return v};for(var n={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},i={L:1,M:0,Q:3,H:2},a={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},s={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;s.getBCHDigit(e)-s.getBCHDigit(s.G15)>=0;)e^=s.G15<<s.getBCHDigit(e)-s.getBCHDigit(s.G15);return(t<<10|e)^s.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;s.getBCHDigit(e)-s.getBCHDigit(s.G18)>=0;)e^=s.G18<<s.getBCHDigit(e)-s.getBCHDigit(s.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return s.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,r){switch(t){case a.PATTERN000:return(e+r)%2==0;case a.PATTERN001:return e%2==0;case a.PATTERN010:return r%3==0;case a.PATTERN011:return(e+r)%3==0;case a.PATTERN100:return(Math.floor(e/2)+Math.floor(r/3))%2==0;case a.PATTERN101:return e*r%2+e*r%3==0;case a.PATTERN110:return(e*r%2+e*r%3)%2==0;case a.PATTERN111:return(e*r%3+(e+r)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new l([1],0),r=0;r<t;r++)e=e.multiply(new l([1,h.gexp(r)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case n.MODE_NUMBER:return 10;case n.MODE_ALPHA_NUM:return 9;case n.MODE_8BIT_BYTE:case n.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case n.MODE_NUMBER:return 12;case n.MODE_ALPHA_NUM:return 11;case n.MODE_8BIT_BYTE:return 16;case n.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case n.MODE_NUMBER:return 14;case n.MODE_ALPHA_NUM:return 13;case n.MODE_8BIT_BYTE:return 16;case n.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),r=0,o=0;o<e;o++)for(var n=0;n<e;n++){for(var i=0,a=t.isDark(o,n),s=-1;s<=1;s++)if(!(o+s<0||e<=o+s))for(var h=-1;h<=1;h++)n+h<0||e<=n+h||0==s&&0==h||a==t.isDark(o+s,n+h)&&i++;i>5&&(r+=3+i-5)}for(o=0;o<e-1;o++)for(n=0;n<e-1;n++){var u=0;t.isDark(o,n)&&u++,t.isDark(o+1,n)&&u++,t.isDark(o,n+1)&&u++,t.isDark(o+1,n+1)&&u++,0!=u&&4!=u||(r+=3)}for(o=0;o<e;o++)for(n=0;n<e-6;n++)t.isDark(o,n)&&!t.isDark(o,n+1)&&t.isDark(o,n+2)&&t.isDark(o,n+3)&&t.isDark(o,n+4)&&!t.isDark(o,n+5)&&t.isDark(o,n+6)&&(r+=40);for(n=0;n<e;n++)for(o=0;o<e-6;o++)t.isDark(o,n)&&!t.isDark(o+1,n)&&t.isDark(o+2,n)&&t.isDark(o+3,n)&&t.isDark(o+4,n)&&!t.isDark(o+5,n)&&t.isDark(o+6,n)&&(r+=40);var l=0;for(n=0;n<e;n++)for(o=0;o<e;o++)t.isDark(o,n)&&l++;return r+=10*(Math.abs(100*l/e/e-50)/5)}},h={glog:function(t){if(t<1)throw new Error("glog("+t+")");return h.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return h.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},u=0;u<8;u++)h.EXP_TABLE[u]=1<<u;for(u=8;u<256;u++)h.EXP_TABLE[u]=h.EXP_TABLE[u-4]^h.EXP_TABLE[u-5]^h.EXP_TABLE[u-6]^h.EXP_TABLE[u-8];for(u=0;u<255;u++)h.LOG_TABLE[h.EXP_TABLE[u]]=u;function l(t,e){if(null==t.length)throw new Error(t.length+"/"+e);for(var r=0;r<t.length&&0==t[r];)r++;this.num=new Array(t.length-r+e);for(var o=0;o<t.length-r;o++)this.num[o]=t[o+r]}function g(t,e){this.totalCount=t,this.dataCount=e}function f(){this.buffer=[],this.length=0}l.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),r=0;r<this.getLength();r++)for(var o=0;o<t.getLength();o++)e[r+o]^=h.gexp(h.glog(this.get(r))+h.glog(t.get(o)));return new l(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=h.glog(this.get(0))-h.glog(t.get(0)),r=new Array(this.getLength()),o=0;o<this.getLength();o++)r[o]=this.get(o);for(o=0;o<t.getLength();o++)r[o]^=h.gexp(h.glog(t.get(o))+e);return new l(r,0).mod(t)}},g.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],g.getRSBlocks=function(t,e){var r=g.getRsBlockTable(t,e);if(null==r)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var o=r.length/3,n=[],i=0;i<o;i++)for(var a=r[3*i+0],s=r[3*i+1],h=r[3*i+2],u=0;u<a;u++)n.push(new g(s,h));return n},g.getRsBlockTable=function(t,e){switch(e){case i.L:return g.RS_BLOCK_TABLE[4*(t-1)+0];case i.M:return g.RS_BLOCK_TABLE[4*(t-1)+1];case i.Q:return g.RS_BLOCK_TABLE[4*(t-1)+2];case i.H:return g.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},f.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var r=0;r<e;r++)this.putBit(1==(t>>>e-r-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var c=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];(t=function(t,e){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:i.H},"string"==typeof e&&(e={text:e}),e)for(var r in e)this._htOption[r]=e[r];this._oQRCode=null,this.canvasId=t,this._htOption.text&&this.canvasId&&this.makeCode(this._htOption.text)}).prototype.makeCode=function(t){this._oQRCode=new o(e(t,this._htOption.correctLevel),this._htOption.correctLevel),this._oQRCode.addData(t),this._oQRCode.make(),this.makeImage()},t.prototype.makeImage=function(){var t;t=this._htOption.usingIn?wx.createCanvasContext(this.canvasId,this._htOption.usingIn):wx.createCanvasContext(this.canvasId);var e=this._htOption,r=this._oQRCode,o=r.getModuleCount(),n=e.width/o,i=e.height/o,a=Math.round(n),s=Math.round(i);e.image&&""!=e.image&&t.drawImage(e.image,0,0,e.width,e.height);for(var h=0;h<o;h++)for(var u=0;u<o;u++){var l=r.isDark(h,u),g=u*n,f=h*i;t.setStrokeStyle(l?e.colorDark:e.colorLight),t.setLineWidth(1),t.setFillStyle(l?e.colorDark:e.colorLight),t.fillRect(g,f,n,i),t.strokeRect(Math.floor(g)+.5,Math.floor(f)+.5,a,s),t.strokeRect(Math.ceil(g)-.5,Math.ceil(f)-.5,a,s)}t.draw()},t.prototype.exportImage=function(t){t&&wx.canvasToTempFilePath({x:0,y:0,width:this._htOption.width,height:this._htOption.height,destWidth:this._htOption.width,destHeight:this._htOption.height,canvasId:this.canvasId,success:function(e){t(e.tempFilePath)}})},t.CorrectLevel=i})(),module.exports=t; 
 			}); 
		define("static/js/weixinSdk.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var e=require("../../@babel/runtime/helpers/defineProperty");!function(e,n){"function"==typeof define&&(define.amd||define.cmd)?define((function(){return n(e)})):n(e,!0)}(window,(function(n,i){if(n&&!n.jWeixin){var t,o,r={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},a=function(){var e={};for(var n in r)e[r[n]]=n;return e}(),c=n.document,s=c.title,d=navigator.userAgent.toLowerCase(),u=navigator.platform.toLowerCase(),l=!(!u.match("mac")&&!u.match("win")),p=-1!=d.indexOf("wxdebugger"),f=-1!=d.indexOf("micromessenger"),m=-1!=d.indexOf("android"),g=-1!=d.indexOf("iphone")||-1!=d.indexOf("ipad"),h=(o=d.match(/micromessenger\/(\d+\.\d+\.\d+)/)||d.match(/micromessenger\/(\d+\.\d+)/))?o[1]:"",v={initStartTime:b(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},S={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:g?1:m?2:-1,clientVersion:h,url:encodeURIComponent(location.href)},y={},I={_completes:[]},_={state:0,data:{}};N((function(){v.initEndTime=b()}));var w=!1,T=[],k=(e(e(e(e(e(e(e(e(e(e(t={config:function(e){O("config",y=e);var i=!1!==y.check;N((function(){if(i)x(r.config,{verifyJsApiList:L(y.jsApiList),verifyOpenTagList:L(y.openTagList)},function(){I._complete=function(e){v.preVerifyEndTime=b(),_.state=1,_.data=e},I.success=function(e){S.isPreVerifyOk=0},I.fail=function(e){I._fail?I._fail(e):_.state=-1};var e=I._completes;return e.push((function(){!function(){if(!(l||p||y.debug||h<"6.0.2"||S.systemType<0)){var e=new Image;S.appId=y.appId,S.initTime=v.initEndTime-v.initStartTime,S.preVerifyTime=v.preVerifyEndTime-v.preVerifyStartTime,k.getNetworkType({isInnerInvoke:!0,success:function(n){S.networkType=n.networkType;var i="https://open.weixin.qq.com/sdk/report?v="+S.version+"&o="+S.isPreVerifyOk+"&s="+S.systemType+"&c="+S.clientVersion+"&a="+S.appId+"&n="+S.networkType+"&i="+S.initTime+"&p="+S.preVerifyTime+"&u="+S.url;e.src=i}})}}()})),I.complete=function(n){for(var i=0,t=e.length;i<t;++i)e[i]();I._completes=[]},I}()),v.preVerifyStartTime=b();else{_.state=1;for(var e=I._completes,n=0,t=e.length;n<t;++n)e[n]();I._completes=[]}})),k.invoke||(k.invoke=function(e,i,t){n.WeixinJSBridge&&WeixinJSBridge.invoke(e,A(i),t)},k.on=function(e,i){n.WeixinJSBridge&&WeixinJSBridge.on(e,i)})},ready:function(e){0!=_.state?e():(I._completes.push(e),!f&&y.debug&&e())},error:function(e){h<"6.0.2"||(-1==_.state?e(_.data):I._fail=e)},checkJsApi:function(e){x("checkJsApi",{jsApiList:L(e.jsApiList)},(e._complete=function(e){if(m){var n=e.checkResult;n&&(e.checkResult=JSON.parse(n))}e=function(e){var n=e.checkResult;for(var i in n){var t=a[i];t&&(n[t]=n[i],delete n[i])}return e}(e)},e))},onMenuShareTimeline:function(e){V(r.onMenuShareTimeline,{complete:function(){x("shareTimeline",{title:e.title||s,desc:e.title||s,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){V(r.onMenuShareAppMessage,{complete:function(n){"favorite"===n.scene?x("sendAppMessage",{title:e.title||s,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""}):x("sendAppMessage",{title:e.title||s,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){V(r.onMenuShareQQ,{complete:function(){x("shareQQ",{title:e.title||s,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){V(r.onMenuShareWeibo,{complete:function(){x("shareWeiboApp",{title:e.title||s,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){V(r.onMenuShareQZone,{complete:function(){x("shareQZone",{title:e.title||s,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},updateTimelineShareData:function(e){x("updateTimelineShareData",{title:e.title,link:e.link,imgUrl:e.imgUrl},e)},updateAppMessageShareData:function(e){x("updateAppMessageShareData",{title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl},e)},startRecord:function(e){x("startRecord",{},e)},stopRecord:function(e){x("stopRecord",{},e)},onVoiceRecordEnd:function(e){V("onVoiceRecordEnd",e)},playVoice:function(e){x("playVoice",{localId:e.localId},e)},pauseVoice:function(e){x("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){x("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){V("onVoicePlayEnd",e)},uploadVoice:function(e){x("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){x("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){x("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){x("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},(e._complete=function(e){if(m){var n=e.localIds;try{n&&(e.localIds=JSON.parse(n))}catch(e){}}},e))},getLocation:function(e){},previewImage:function(e){x(r.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){x("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){x("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===w?(w=!0,x("getLocalImgData",{localId:e.localId},(e._complete=function(e){if(w=!1,0<T.length){var n=T.shift();wx.getLocalImgData(n)}},e))):T.push(e)},getNetworkType:function(e){x("getNetworkType",{},(e._complete=function(e){e=function(e){var n=e.errMsg;e.errMsg="getNetworkType:ok";var i=e.subtype;if(delete e.subtype,i)e.networkType=i;else{var t=n.indexOf(":"),o=n.substring(t+1);switch(o){case"wifi":case"edge":case"wwan":e.networkType=o;break;default:e.errMsg="getNetworkType:fail"}}return e}(e)},e))},openLocation:function(e){x("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)}},"getLocation",(function(e){x(r.getLocation,{type:(e=e||{}).type||"wgs84"},(e._complete=function(e){delete e.type},e))})),"hideOptionMenu",(function(e){x("hideOptionMenu",{},e)})),"showOptionMenu",(function(e){x("showOptionMenu",{},e)})),"closeWindow",(function(e){x("closeWindow",{},e=e||{})})),"hideMenuItems",(function(e){x("hideMenuItems",{menuList:e.menuList},e)})),"showMenuItems",(function(e){x("showMenuItems",{menuList:e.menuList},e)})),"hideAllNonBaseMenuItem",(function(e){x("hideAllNonBaseMenuItem",{},e)})),"showAllNonBaseMenuItem",(function(e){x("showAllNonBaseMenuItem",{},e)})),"scanQRCode",(function(e){x("scanQRCode",{needResult:(e=e||{}).needResult||0,scanType:e.scanType||["qrCode","barCode"]},(e._complete=function(e){if(g){var n=e.resultStr;if(n){var i=JSON.parse(n);e.resultStr=i&&i.scan_code&&i.scan_code.scan_result}}},e))})),"openAddress",(function(e){x(r.openAddress,{},(e._complete=function(e){e=function(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}(e)},e))})),e(e(e(e(e(e(e(e(e(e(t,"openProductSpecificView",(function(e){x(r.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)})),"addCard",(function(e){for(var n=e.cardList,i=[],t=0,o=n.length;t<o;++t){var a=n[t],c={card_id:a.cardId,card_ext:a.cardExt};i.push(c)}x(r.addCard,{card_list:i},(e._complete=function(e){var n=e.card_list;if(n){for(var i=0,t=(n=JSON.parse(n)).length;i<t;++i){var o=n[i];o.cardId=o.card_id,o.cardExt=o.card_ext,o.isSuccess=!!o.is_succ,delete o.card_id,delete o.card_ext,delete o.is_succ}e.cardList=n,delete e.card_list}},e))})),"chooseCard",(function(e){x("chooseCard",{app_id:y.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},(e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e))})),"openCard",(function(e){for(var n=e.cardList,i=[],t=0,o=n.length;t<o;++t){var a=n[t],c={card_id:a.cardId,code:a.code};i.push(c)}x(r.openCard,{card_list:i},e)})),"consumeAndShareCard",(function(e){x(r.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)})),"chooseWXPay",(function(e){x(r.chooseWXPay,C(e),e)})),"openEnterpriseRedPacket",(function(e){x(r.openEnterpriseRedPacket,C(e),e)})),"startSearchBeacons",(function(e){x(r.startSearchBeacons,{ticket:e.ticket},e)})),"stopSearchBeacons",(function(e){x(r.stopSearchBeacons,{},e)})),"onSearchBeacons",(function(e){V(r.onSearchBeacons,e)})),e(e(e(e(t,"openEnterpriseChat",(function(e){x("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)})),"launchMiniProgram",(function(e){x("launchMiniProgram",{targetAppId:e.targetAppId,path:function(e){if("string"==typeof e&&0<e.length){var n=e.split("?")[0],i=e.split("?")[1];return n+=".html",void 0!==i?n+"?"+i:n}}(e.path),envVersion:e.envVersion},e)})),"openBusinessView",(function(e){x("openBusinessView",{businessType:e.businessType,queryString:e.queryString||"",envVersion:e.envVersion},(e._complete=function(e){if(m){var n=e.extraData;if(n)try{e.extraData=JSON.parse(n)}catch(n){e.extraData={}}}},e))})),"miniProgram",{navigateBack:function(e){e=e||{},N((function(){x("invokeMiniProgramAPI",{name:"navigateBack",arg:{delta:e.delta||1}},e)}))},navigateTo:function(e){N((function(){x("invokeMiniProgramAPI",{name:"navigateTo",arg:{url:e.url}},e)}))},redirectTo:function(e){N((function(){x("invokeMiniProgramAPI",{name:"redirectTo",arg:{url:e.url}},e)}))},switchTab:function(e){N((function(){x("invokeMiniProgramAPI",{name:"switchTab",arg:{url:e.url}},e)}))},reLaunch:function(e){N((function(){x("invokeMiniProgramAPI",{name:"reLaunch",arg:{url:e.url}},e)}))},postMessage:function(e){N((function(){x("invokeMiniProgramAPI",{name:"postMessage",arg:e.data||{}},e)}))},getEnv:function(e){N((function(){e({miniprogram:"miniprogram"===n.__wxjs_environment})}))}})),M=1,P={};return c.addEventListener("error",(function(e){if(!m){var n=e.target,i=n.tagName,t=n.src;if(("IMG"==i||"VIDEO"==i||"AUDIO"==i||"SOURCE"==i)&&-1!=t.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var o=n["wx-id"];if(o||(o=M++,n["wx-id"]=o),P[o])return;P[o]=!0,wx.ready((function(){wx.getLocalImgData({localId:t,success:function(e){n.src=e.localData}})}))}}}),!0),c.addEventListener("load",(function(e){if(!m){var n=e.target,i=n.tagName;if(n.src,"IMG"==i||"VIDEO"==i||"AUDIO"==i||"SOURCE"==i){var t=n["wx-id"];t&&(P[t]=!1)}}}),!0),i&&(n.wx=n.jWeixin=k),k}function x(e,i,t){n.WeixinJSBridge?WeixinJSBridge.invoke(e,A(i),(function(n){B(e,n,t)})):O(e,t)}function V(e,i,t){n.WeixinJSBridge?WeixinJSBridge.on(e,(function(n){t&&t.trigger&&t.trigger(n),B(e,n,i)})):O(e,t||i)}function A(e){return(e=e||{}).appId=y.appId,e.verifyAppId=y.appId,e.verifySignType="sha1",e.verifyTimestamp=y.timestamp+"",e.verifyNonceStr=y.nonceStr,e.verifySignature=y.signature,e}function C(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function B(e,n,i){"openEnterpriseChat"!=e&&"openBusinessView"!==e||(n.errCode=n.err_code),delete n.err_code,delete n.err_desc,delete n.err_detail;var t=n.errMsg;t||(t=n.err_msg,delete n.err_msg,t=function(e,n){var i=e,t=a[i];t&&(i=t);var o="ok";if(n){var r=n.indexOf(":");"confirm"==(o=n.substring(r+1))&&(o="ok"),"failed"==o&&(o="fail"),-1!=o.indexOf("failed_")&&(o=o.substring(7)),-1!=o.indexOf("fail_")&&(o=o.substring(5)),"access denied"!=(o=(o=o.replace(/_/g," ")).toLowerCase())&&"no permission to execute"!=o||(o="permission denied"),"config"==i&&"function not exist"==o&&(o="ok"),""==o&&(o="fail")}return i+":"+o}(e,t),n.errMsg=t),(i=i||{})._complete&&(i._complete(n),delete i._complete),t=n.errMsg||"",y.debug&&!i.isInnerInvoke&&console.log(JSON.stringify(n));var o=t.indexOf(":");switch(t.substring(o+1)){case"ok":i.success&&i.success(n);break;case"cancel":i.cancel&&i.cancel(n);break;default:i.fail&&i.fail(n)}i.complete&&i.complete(n)}function L(e){if(e){for(var n=0,i=e.length;n<i;++n){var t=e[n],o=r[t];o&&(e[n]=o)}return e}}function O(e,n){if(!(!y.debug||n&&n.isInnerInvoke)){var i=a[e];i&&(e=i),n&&n._complete&&delete n._complete,console.log('"'+e+'",',n||"")}}function b(){return(new Date).getTime()}function N(e){f&&(n.WeixinJSBridge?e():c.addEventListener&&c.addEventListener("WeixinJSBridgeReady",e,!1))}})); 
 			}); 
		define("app.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";require("./common/runtime.js"),require("./common/vendor.js"),require("./common/main.js"); 
 			}); 	require("app.js");
 		__wxRoute = 'components/customCard/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'components/customCard/index.js';	define("components/customCard/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["components/customCard/index"],{2064:function(t,e,n){n.r(e),n.d(e,{default:function(){return r}});var i=n(7039).default,o=n(8793).default,u={props:{filmLink:{type:String,default:function(){return""}},phone:{type:String,default:function(){return""}},card:{type:Object,default:function(){return{name:"",type:"customCard",show_type:0,status:0,sort:0,display_name:0,display_background_color:0,list:[]}}},mt:{type:Boolean,default:function(){return!1}}},data:function(){return{height:0}},computed:{showBelow:function(){return!this.card.list.every((function(t){return 1!=t.status||!t.text_below}))}},methods:{imgClicked:function(t){this.$utils.handleLoginNav()||(21==t.jump_type?i.$emit("sqpopup",!0):this.$utils.publicNavigation(t))},getPhone:function(t){this.$emit("getPhone",t)},customImgLoaded:function(t){var e=this;console.log("图片加载完成",t);var n=(t.target||t.srcElement).width,i=(t.target||t.srcElement).height;o.createSelectorQuery().in(this).select(".custom-imgs-item").boundingClientRect().exec((function(t){var o=t[0].width/n*i;0==e.height?e.height=o:e.height=Math.min(e.height,o)}))}}},a=n(553),r=(0,(n.n(a)(),n(9453)).default)(u,(function(){var t=this,e=(t.$createElement,t._self._c,t.card.list.filter((function(t){return 1==t.status}))),n=t.showBelow?t.card.list.filter((function(t){return 1==t.status})):null;t._isMounted||(t.e0=function(e,n){var i=arguments[arguments.length-1].currentTarget.dataset,o=i.eventParams||i["event-params"];return n=o.item,t.imgClicked(n)}),t.$mp.data=Object.assign({},{$root:{l0:e,l1:n}})}),[],!1,null,"08b8b056",null,!1,void 0,void 0).exports},553:function(){}}]),(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["components/customCard/index-create-component"],{},function(t){t("7039").createComponent(t(2064))}]); 
 			}); 	require("components/customCard/index.js");
 		__wxRoute = 'components/list/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'components/list/index.js';	define("components/list/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["components/list/index"],{4524:function(t,s,e){e.r(s),e.d(s,{default:function(){return o}});var i=e(7039).default,n={data:function(){return{}},props:{map_lat:{default:function(){return""}},map_lon:{default:function(){return""}},list:{default:function(){return[]}},show:{default:function(){return!1}}},methods:{speed:function(t,s){return(1==this.list[t].source?parseInt(this.list[t].plan_list[s].rest_stock)/parseInt(this.list[t].plan_list[s].total_stock)*100:parseInt(this.list[t].plan_list[s].rest_stock)/parseInt(this.list[t].plan_list[s].rest_stock+this.list[t].plan_list[s].plan_user_num)*100).toFixed(2)+"%"},placeOrderAll:function(t){0==this.list[t].plan_list[0].rest_stock?this.placeOrder(t,1):this.placeOrder(t,0)},placeOrder:function(t,s){var e=this;if(!i.getStorageSync("isScenes")||!this.$utils.handleLoginNav()){var n=this.list[t].plan_list[s];if(0==n.rest_stock)return this.$utils.showToast("该店铺活动已抢光，请选择其他店铺参与活动！");var l=n.plan_id;if(1==this.list[t].source)i.request({url:this.list[t].action_url.mt_monitor.click_monitor_url,method:"GET"});else{if(2==this.list[t].source&&1==n.time_state)return this.$utils.showToast("该店铺活动未开始，请选择其他店铺参与活动！");if(2==this.list[t].source&&3==n.time_state)return this.$utils.showToast("该店铺活动已结束，请选择其他店铺参与活动！")}this.$http.getPlanInfo({plan_id:l,map_lat:this.map_lat,map_lon:this.map_lon}).then((function(s){console.log(s,"详情"),200==s.code?(l=l.replace(/%/g,"baifenhao"),e.$utils.navRouter("/subpackage/activity/index?id=".concat(l,"&map_lat=").concat(e.map_lat,"&map_lon=").concat(e.map_lon))):400404==s.code&&(e.$utils.showToast(s.message||s.data.message),e.list.splice(t,1))}))}},prompt:function(t){var s="";switch(t){case 1:s="该店铺活动未开始，请选择其他店铺参与活动！";break;case 2:s="该店铺活动已抢光，请选择其他店铺参与活动！";break;case 3:s="该店铺活动已结束，请选择其他店铺参与活动！"}this.$utils.showToast(s)}}},l=e(8098),a=(0,(e.n(l)(),e(9453)).default)(n,(function(){var t=this,s=(t.$createElement,t._self._c,t.show&&0!=t.list.length),e=s?t.__map(t.list,(function(s,e){return{$orig:t.__get_orig(s),m0:t.speed(e,s.max_index)}})):null;t.$mp.data=Object.assign({},{$root:{g0:s,l0:e}})}),[],!1,null,null,null,!1,void 0,void 0),o=a.exports},8098:function(){}}]),(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["components/list/index-create-component"],{},function(t){t("7039").createComponent(t(4524))}]); 
 			}); 	require("components/list/index.js");
 		__wxRoute = 'components/loadMore/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'components/loadMore/index.js';	define("components/loadMore/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["components/loadMore/index"],{8394:function(o,n,c){c.r(n),c.d(n,{default:function(){return l}});var t={data:function(){return{loadLock:!1,noLock:!1}},props:["type"],methods:{open:function(){this.loadLock=!0},close:function(){this.loadLock=!1},no:function(){this.noLock=!0},closeNo:function(){this.noLock=!1}}},e=c(5142),l=(0,(c.n(e)(),c(9453)).default)(t,(function(){this.$createElement;this._self._c}),[],!1,null,null,null,!1,void 0,void 0).exports},5142:function(){}}]),(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["components/loadMore/index-create-component"],{},function(o){o("7039").createComponent(o(8394))}]); 
 			}); 	require("components/loadMore/index.js");
 		__wxRoute = 'components/loginPop/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'components/loginPop/index.js';	define("components/loginPop/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["components/loginPop/index"],{5995:function(n,o,t){t.r(o),t.d(o,{default:function(){return c}});var e={name:"loginPop",data:function(){return{showLogon:!1}},methods:{show:function(){this.showLogon=!0},hide:function(){this.showLogon=!1},openPhoneLogin:function(){this.$utils.handleLoginNav()}}},i=t(2717),c=(0,(t.n(i)(),t(9453)).default)(e,(function(){this.$createElement;this._self._c}),[],!1,null,null,null,!1,void 0,void 0).exports},2717:function(){}}]),(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["components/loginPop/index-create-component"],{},function(n){n("7039").createComponent(n(5995))}]); 
 			}); 	require("components/loginPop/index.js");
 		__wxRoute = 'components/navbar/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'components/navbar/index.js';	define("components/navbar/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["components/navbar/index"],{1041:function(t,n,e){e.r(n),e.d(n,{default:function(){return c}});var o=e(8793).default,a=e(7039).default,u={props:{isRanking:{type:Boolean,default:function(){return!1}},pageTitle:{default:function(){return""}},pageTitleColor:{default:function(){return"#000"}},bgColor:{default:function(){return"#fff"}},bgImg:{default:function(){return""}},custom:{type:Boolean,default:function(){return!1}},backLcok:{type:Boolean,default:function(){return!1}},backDelta:{default:1},backType:{type:Boolean,default:function(){return!1}}},data:function(){return{menuButtonObject:{},navHeight:0,backButtonHeight:0}},created:function(){var t=this,n=o.getMenuButtonBoundingClientRect();this.menuButtonObject=n,this.$globalData.SET("menuButtonObject",n),o.getSystemInfo({success:function(e){var o=e.statusBarHeight,a=o+n.height+2*(n.top-o);t.navHeight=a,t.$emit("navHeight",a),t.$emit("menuButtonHeight",n.height),t.backButtonHeight=a-n.top}})},mounted:function(){"#fff"!=this.bgColor&&"#F4F4F4"!=this.bgColor||a.setNavigationBarColor({frontColor:"#000000",backgroundColor:"#ffffff"})},methods:{nav:function(){1==getCurrentPages().length?this.$utils.navRouter("/pages/home/index",3):a.navigateBack({delta:this.backDelta,animationType:"none"}),this.$emit("navigateBack",!0)}}},i=e(8),c=(0,(e.n(i)(),e(9453)).default)(u,(function(){this.$createElement;this._self._c}),[],!1,null,"673b7377",null,!1,void 0,void 0).exports},8:function(){}}]),(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["components/navbar/index-create-component"],{},function(t){t("7039").createComponent(t(1041))}]); 
 			}); 	require("components/navbar/index.js");
 		__wxRoute = 'components/notPhone/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'components/notPhone/index.js';	define("components/notPhone/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["components/notPhone/index"],{7565:function(n,o,e){e.r(o),e.d(o,{default:function(){return u}});var t=e(7039).default,i={name:"notPhone",data:function(){return{isShow:!1}},methods:{show:function(){this.isShow=!0},hide:function(){this.isShow=!1},openPhoneLogin:function(){this.hide(),t.navigateTo({url:"/subpackage/login/authorize"})}}},c=e(2336),u=(0,(e.n(c)(),e(9453)).default)(i,(function(){this.$createElement;this._self._c}),[],!1,null,"35fc5a08",null,!1,void 0,void 0).exports},2336:function(){}}]),(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["components/notPhone/index-create-component"],{},function(n){n("7039").createComponent(n(7565))}]); 
 			}); 	require("components/notPhone/index.js");
 		__wxRoute = 'components/notYetData/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'components/notYetData/index.js';	define("components/notYetData/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["components/notYetData/index"],{8286:function(n,t,e){e.r(t),e.d(t,{default:function(){return a}});var o={props:{top:{default:180}}},c=e(3909),a=(0,(e.n(c)(),e(9453)).default)(o,(function(){this.$createElement;this._self._c}),[],!1,null,"43a73fcc",null,!1,void 0,void 0).exports},3909:function(){}}]),(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["components/notYetData/index-create-component"],{},function(n){n("7039").createComponent(n(8286))}]); 
 			}); 	require("components/notYetData/index.js");
 		__wxRoute = 'components/popup/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'components/popup/index.js';	define("components/popup/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["components/popup/index"],{8152:function(n,t,o){o.r(t),o.d(t,{default:function(){return p}});var e={data:function(){return{popupShow:!1}},props:{title:{default:function(){return""}},flex:{default:function(){return!1}},bottom:{default:function(){return!1}}},methods:{show:function(){this.popupShow=!0},hide:function(){this.popupShow=!1}}},u=o(20),p=(0,(o.n(u)(),o(9453)).default)(e,(function(){this.$createElement;this._self._c}),[],!1,null,"2df7805d",null,!1,void 0,void 0).exports},20:function(){}}]),(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["components/popup/index-create-component"],{},function(n){n("7039").createComponent(n(8152))}]); 
 			}); 	require("components/popup/index.js");
 		__wxRoute = 'components/tabbar/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'components/tabbar/index.js';	define("components/tabbar/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["components/tabbar/index"],{6291:function(e,n,o){o.r(n),o.d(n,{default:function(){return l}});var t=o(7039).default,i={data:function(){return{iPhoneLock:!1,bgColor:""}},props:{tabList:{default:function(){return[]}},current:{default:function(){return 0}},phone:{default:function(){return""}}},created:function(){var e=this;if(t.$on("back",(function(n){e.handleBack(n.index)})),t.getSystemInfo({success:function(n){"ios"==n.platform&&-1==n.model.indexOf("iPhone 4")&&-1==n.model.indexOf("iPhone 4s")&&-1==n.model.indexOf("iPhone 5")&&-1==n.model.indexOf("iPhone 5c")&&-1==n.model.indexOf("iPhone 5s")&&-1==n.model.indexOf("iPhone 6")&&-1==n.model.indexOf("iPhone 6 plus")&&-1==n.model.indexOf("iPhone 6s")&&-1==n.model.indexOf("iPhone 6s plus")&&-1==n.model.indexOf("iPhone SE")&&-1==n.model.indexOf("iPhone 7")&&-1==n.model.indexOf("iPhone 7 plus")&&-1==n.model.indexOf("iPhone 8")&&-1==n.model.indexOf("iPhone 8 pius")&&(e.iPhoneLock=!0,e.$emit("iPhoneLock"),e.$globalData.SET("iPhoneLock",!0))}}),this.getBgColor(),t.$once("login",(function(n){n&&e.getBgColor()})),this.$utils.hasLogin()){this.getBgColor();var n=this;setTimeout((function(){console.log(n.tabList,"------89898------")}),2e3)}},methods:{getBgColor:function(){var e=this;this.$http.getExamineStatus().then((function(n){200==n.code&&(e.$globalData.SET("systemconfig",n.data),1==n.data.personal_background_status?e.bgColor=n.data.personal_background_color||"#FE7C0A":e.bgColor="#FE7C0A")}))},handleBack:function(e,n){this.current!=e&&this.$emit("Callback",e,"tabBar",n)}}},a=o(4895),l=(0,(o.n(a)(),o(9453)).default)(i,(function(){var e=this,n=(e.$createElement,e._self._c,e.tabList.length);e.$mp.data=Object.assign({},{$root:{g0:n}})}),[],!1,null,"5dd584e8",null,!1,void 0,void 0).exports},4895:function(){}}]),(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["components/tabbar/index-create-component"],{},function(e){e("7039").createComponent(e(6291))}]); 
 			}); 	require("components/tabbar/index.js");
 		__wxRoute = 'components/topping/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'components/topping/index.js';	define("components/topping/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["components/topping/index"],{3513:function(n,t,o){o.r(t),o.d(t,{default:function(){return i}});var e=o(7039).default,u={data:function(){return{}},props:{right:{default:function(){return 20}},bottom:{default:function(){return 180}},scrollTop:{default:function(){return 0}},condition:{default:function(){return 300}},isIntraCityShop:{default:function(){return!1}}},methods:{show:function(){this.showLock=!0},hide:function(){this.showLock=!1},topping:function(){e.pageScrollTo({scrollTop:0,duration:300})}}},c=o(4074),i=(0,(o.n(c)(),o(9453)).default)(u,(function(){this.$createElement;this._self._c}),[],!1,null,"0663b6f4",null,!1,void 0,void 0).exports},4074:function(){}}]),(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["components/topping/index-create-component"],{},function(n){n("7039").createComponent(n(3513))}]); 
 			}); 	require("components/topping/index.js");
 		__wxRoute = 'components/xp-picker/xp-picker';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'components/xp-picker/xp-picker.js';	define("components/xp-picker/xp-picker.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["components/xp-picker/xp-picker"],{6773:function(e,t,r){r.r(t),r.d(t,{default:function(){return c}});var n=r(9510),i=r(1644);function o(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return s(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?s(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,i=function(){};return{s:i,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,l=!0,a=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return l=e.done,e},e:function(e){a=!0,o=e},f:function(){try{l||null==r.return||r.return()}finally{if(a)throw o}}}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var l={name:"XpPicker",data:function(){return{isError:!0,isConfirm:!1,pickerVisible:!1,template:{},cols:[],selected:[]}},props:{mode:{type:String,default:"ymd"},animation:{type:Boolean,default:!0},height:{type:[Number,String],default:35},"action-position":{type:String,default:"top"},"year-range":{type:Array,default:function(){return[2010,null]}},value:{type:String,default:null},history:{type:Boolean,default:!1}},watch:{mode:function(){this.render()}},computed:{hasSlot:function(){return!!this.$slots.default},modeArr:function(){return this.mode.split("")},units:function(){var e=[];for(var t in this.template)-1!==this.mode.indexOf(t)&&e.push(this.template[t].text);return e}},created:function(){this.render()},methods:{render:function(){this.assert(),this.template=(0,i.templateFactory)(this),this.initCols(),this.initSelected()},assert:function(){if(-1==="ymdhis".indexOf(this.mode))throw new Error("render error，illegal 'mode'");if(null==(0,i.getLocalTime)(this.mode))throw new Error("render error，the 'mode' is not found");if(null!=this.value&&this.value.split(/-|:|\s/).length!=this.modeArr.length)throw new Error("render error，because the 'value' cannot be formatted as 'mode'");if(2!==this.yearRange.length)throw new Error("render error，because the length of array 'year-rang' must be 2");this.isError=!1},initCols:function(){var e,t=o(this.mode);try{for(t.s();!(e=t.n()).done;){var r=e.value,i=this.template[r].range;this.fillCol.apply(this,[r].concat((0,n.default)(i)))}}catch(e){t.e(e)}finally{t.f()}},initSelected:function(){var e=this.value||(0,i.getLocalTime)(this.mode);this.setSelected(e)},fillCol:function(e,t,r){for(var n=this.mode.indexOf(e),o=[],s=t;s<=r;s++)o.push((0,i.fmtNumber)(s));this.$set(this.cols,n,o)},setSelected:function(e){for(var t=e.split(/-|:|\s/),r=this.cols,n=0;n<r.length;n++)this.$set(this.selected,n,r[n].indexOf(t[n]))},resolveCurrentDt:function(){for(var e="",t=0;t<this.selected.length;t++)e+=this.cols[t][this.selected[t]]+this.units[t];var r=e.replace("年","-").replace("月","-").replace("日"," ").replace("时",":").replace("分",":").replace("秒","");return this.mode.endsWith("s")||(r=r.substring(0,r.length-1)),r},show:function(){this.history&&this.isConfirm||this.initSelected(),this.pickerVisible=!0},_confirm:function(){this.isError||this.$emit("confirm",this._getResult()),this.isConfirm||(this.isConfirm=!0),this.pickerVisible=!1},_getResult:function(){var e={value:this.resolveCurrentDt()},t=(0,i.time2Timestamp)(e.value);return isNaN(t)||(e.timestamp=t),e},_cancel:function(){this.$emit("cancel"),this.pickerVisible=!1},_change:function(e){for(var t,r=e.detail.value,n=0;n<r.length;n++)if(r[n]!==this.selected[n]){t=this.modeArr[n];break}if(this.selected=r,-1!==this.mode.indexOf("d")&&("y"===t||"m"===t)){var o=this.resolveCurrentDt();this.fillCol("d",1,(0,i.getDate)(o))}}}},a=r(7366),c=(0,(r.n(a)(),r(9453)).default)(l,(function(){this.$createElement;this._self._c}),[],!1,null,"cc9b9d70",null,!1,void 0,void 0).exports},7366:function(){}}]),(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["components/xp-picker/xp-picker-create-component"],{},function(e){e("7039").createComponent(e(6773))}]); 
 			}); 	require("components/xp-picker/xp-picker.js");
 		__wxRoute = 'pages/signReach/components/templateOne/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/signReach/components/templateOne/index.js';	define("pages/signReach/components/templateOne/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["pages/signReach/components/templateOne/index"],{3266:function(n,e,i){i.r(e),i.d(e,{default:function(){return u}});var t={xpPicker:function(){return Promise.all([i.e("common/vendor"),i.e("components/xp-picker/xp-picker")]).then(i.bind(i,6773))}},o=i(7039).default,c={data:function(){return{phoneCache:!1}},props:{configInfo:{default:function(){return{user:{},checkin:{}}}},phone:{default:function(){return""}},navHeight:{default:function(){return 0}}},computed:{completeActive:function(){return this.configInfo.user.checkin_day>=this.configInfo.checkin.min_day&&0==this.configInfo.user.exchange_status},convertedActive:function(){return 10==this.configInfo.user.exchange_status},todayCompleteActive:function(){return 10!=this.configInfo.user.exchange_status&&1==this.configInfo.user.is_checkin&&0==this.configInfo.user.exchange_status&&this.configInfo.user.checkin_day<this.configInfo.checkin.min_day},todayCompleteActive1:function(){return 10!=this.configInfo.user.exchange_status&&0==this.configInfo.user.is_checkin&&0==this.configInfo.user.exchange_status&&this.configInfo.user.checkin_day<this.configInfo.checkin.min_day}},created:function(){o.getStorageSync("phoneCache")&&(this.phoneCache=!0)},methods:{timeConfirm:function(n){this.$emit("setMsgRemind",n.value,0)},switchChange:function(n){this.$emit("setMsgRemind",n.detail.value?10:0,1)},phoneCallback:function(n){this.$emit("getPhone",n||"")},JumpSignIn:function(n){o.showLoading({title:"加载中"}),this.$emit("signIn",n)},msgTips:function(){this.$emit("openMsgTips")},clickRule:function(){this.$emit("openRule")},nav:function(){this.$utils.navRouter("/pages/home/index?current=36")}}},s=i(9039),u=(0,(i.n(s)(),i(9453)).default)(c,(function(){var n=this,e=(n.$createElement,n._self._c,!n.configInfo.user.exchange_status&&n.configInfo.exchangeConditionsRates&&n.configInfo.exchangeConditionsRates.length&&10==n.configInfo.checkin.mode),i=(n.configInfo.checkin.remind_status||n.configInfo.checkin.remind_mini_status)&&10==n.configInfo.checkin.mode&&n.configInfo.user.remind_hm?n.configInfo.user.remind_hm.substring(0,5):null,t=n.configInfo.user?n.configInfo.user.remind_hm.substring(0,5):null;n._isMounted||(n.e0=function(e){return n.$refs.picker.show()}),n.$mp.data=Object.assign({},{$root:{g0:e,g1:i,g2:t}})}),[],!1,null,"a7f2011e",null,!1,t,void 0).exports},9039:function(){}}]),(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["pages/signReach/components/templateOne/index-create-component"],{},function(n){n("7039").createComponent(n(3266))}]); 
 			}); 	require("pages/signReach/components/templateOne/index.js");
 		__wxRoute = 'pages/signReach/components/templateTwo/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/signReach/components/templateTwo/index.js';	define("pages/signReach/components/templateTwo/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["pages/signReach/components/templateTwo/index"],{7704:function(n,e,i){i.r(e),i.d(e,{default:function(){return u}});var t={xpPicker:function(){return Promise.all([i.e("common/vendor"),i.e("components/xp-picker/xp-picker")]).then(i.bind(i,6773))}},o=i(7039).default,c={data:function(){return{height:0,height1:0}},props:{configInfo:{default:function(){return{user:{},checkin:{}}}},phone:{default:function(){return""}}},computed:{completeActive:function(){return this.configInfo.user.checkin_day>=this.configInfo.checkin.min_day&&0==this.configInfo.user.exchange_status},convertedActive:function(){return 10==this.configInfo.user.exchange_status},todayCompleteActive:function(){return 10!=this.configInfo.user.exchange_status&&1==this.configInfo.user.is_checkin&&0==this.configInfo.user.exchange_status&&this.configInfo.user.checkin_day<this.configInfo.checkin.min_day},todayCompleteActive1:function(){return 10!=this.configInfo.user.exchange_status&&0==this.configInfo.user.is_checkin&&0==this.configInfo.user.exchange_status&&this.configInfo.user.checkin_day<this.configInfo.checkin.min_day}},created:function(){var n=this;o.getSystemInfo({success:function(e){n.h=e.windowHeight,n.height=n.configInfo.checkin.toptips_status?e.windowHeight-33:e.windowHeight,n.height1=n.configInfo.checkin.toptips_status?e.windowHeight-406:e.windowHeight-373}})},methods:{timeConfirm:function(n){this.$emit("setMsgRemind",n.value,0)},switchChange:function(){var n=10;this.configInfo.user.remind_status&&(n=0),this.$emit("setMsgRemind",n,1)},phoneCallback:function(n){this.$emit("getPhone",n||"")},JumpSignIn:function(n){o.showLoading({title:"加载中"}),this.$emit("signIn",n)},msgTips:function(){this.$emit("openMsgTips")},clickRule:function(){this.$emit("openRule")},nav:function(){this.$utils.navRouter("/pages/home/index?current=36")}}},s=i(8501),u=(0,(i.n(s)(),i(9453)).default)(c,(function(){var n=this,e=(n.$createElement,n._self._c,10==n.configInfo.checkin.mode&&(n.configInfo.checkin.remind_status||n.configInfo.checkin.remind_mini_status)&&n.configInfo.user.remind_hm?n.configInfo.user.remind_hm.substring(0,5):null),i=10==n.configInfo.checkin.mode?!n.configInfo.user.exchange_status&&n.configInfo.exchangeConditionsRates&&n.configInfo.exchangeConditionsRates.length:null,t=n.configInfo.user?n.configInfo.user.remind_hm.substring(0,5):null;n._isMounted||(n.e0=function(e){return n.$refs.picker.show()}),n.$mp.data=Object.assign({},{$root:{g0:e,g1:i,g2:t}})}),[],!1,null,"551818c0",null,!1,t,void 0).exports},8501:function(){}}]),(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["pages/signReach/components/templateTwo/index-create-component"],{},function(n){n("7039").createComponent(n(7704))}]); 
 			}); 	require("pages/signReach/components/templateTwo/index.js");
 		__wxRoute = 'pages/home/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/home/index.js';	define("pages/home/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";require("../../@babel/runtime/helpers/Arrayincludes"),(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["pages/home/index","common/main"],{2074:function(t,e,i){i.r(e),i.d(e,{default:function(){return c}});var n=i(9510),o=i(7039).default,s=i(8793).default,a={components:{customCard:function(){i.e("components/customCard/index").then(function(){return resolve(i(2064))}.bind(null,i)).catch(i.oe)}},onPageScroll:function(t){this.scrollTop=t.scrollTop},data:function(){return{nick_name:"省钱公告",money:0,switchPsition:0,isShowSwitch:!1,switchTop:0,city:"",scrollTop:0,scrollColor:"none",user:{hm_uid:""},share:{},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],expireTime:"",tickerReject:null,RejectPop:!1,path:"",appid:"",jumpPopup:!1,accountsid:o.getStorageSync("accountsId"),sq_qrcode_img_url:"",sq_status:"",modules:[],guidestep:1,singleItemPop:!1,singleItemInfo:{activity_img_url:""},tipsPop:!1,progressingInfo:{},tipsText:"",tipsTime:"",guide:!1,qrcode_type:-1,qrcode_img_url:"",isShowTips:!1,topHeight:0,bgColor:"#FFFFFF",navHeight:0,menuButtonObject:{},backLock:!1,indicatorDots:!1,autoplay:!0,interval:2e3,intervalGift:3e3,current:0,duration:500,iconList:[],iconPage:0,iconPageNum:0,from:{page_id:"",map_lat:"",map_lon:"",keyword:"",platform:"",only_rebate:"",only_order:"",sort:"",able_join:"",plan_source:""},address:"",list:[],phone:"",notTips:!1,loadIcon:"false",empty_list:[],ticker:null,place_order:[],isAdd:!0,OrderRejected:{},OrderRejectedList:[],SpecialEdition:!1}},onReachBottom:function(){this.pullUp()},onShareAppMessage:function(t){var e;return e=o.getStorageSync("isScenes")?"/pages/home/index?current=36&uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/home/index?current=36&uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onShareTimeline:function(t){var e;return e=o.getStorageSync("isScenes")?"/pages/home/index?current=36&uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/home/index?current=36&uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},created:function(){var t=this,e=s.getMenuButtonBoundingClientRect();this.menuButtonObject=e,s.getSystemInfo({success:function(i){var n=i.statusBarHeight,o=n+e.height+2*(e.top-n);t.navHeight=o}}),o.$on("newOrder",(function(){t.getProgressing()})),o.$on("updateList",(function(){t.from.page_id="",t.notTips=!1,t.loadIcon=!1,t.isAdd=!0,t.getList()})),o.$on("login",(function(){t.init(),t.getShowTipsStatus(),t.getQrcode_img(),t.getInviteConfig(),t.getMtWithdrawalRule(),o.getStorageSync("bwcPhone")&&(t.getProgressing(),t.getOrderRejected(),t.getUserInfo())})),this.init(),this.$utils.hasLogin()&&(this.getQrcode_img(),this.getInviteConfig(),this.getProgressing(),this.getOrderRejected(),o.$on("sqpopup",(function(){t.openSq()})),o.$on("openJumpPopup",(function(e){t.appid=e.id,t.path=e.path,t.jumpPopup=!0})),this.getMtWithdrawalRule())},filters:{limitTimeFilter:function(t){if(t>0){var e,i,n;e=parseInt(t/3600),i=parseInt((t-60*e*60)/60),n=parseInt(t-60*e*60-60*i),e<10&&(e="0"+e),i<10&&(i="0"+i),n<10&&(n="0"+n);var o={hour:e,min:i,seconds:n};return"".concat(o.hour," : ").concat(o.min," : ").concat(o.seconds," ")}return"00 : 00 : 00 "}},mounted:function(){o.pageScrollTo({scrollTop:0,duration:0});var t=getCurrentPages().length;this.backLock=1!=t,this.getShowTipsStatus()},methods:{getMtWithdrawalRule:function(){var t=this;this.$http.getMtWithdrawalRule().then((function(e){200==e.code&&(t.money=e.data.config.user_total_income,t.nick_name=e.data.config.app_name,o.setStorageSync("app_name",t.nick_name))}))},getCurrent:function(t){this.current=t.detail.current},getUserInfo:function(){var t=this;this.$http.getUserInfo().then((function(e){200==e.code&&(t.user=e.data.user,t.getShareInfo())}))},getShareInfo:function(){var t=this;this.$common.getSharePath().then((function(e){console.log(e,"分享配置"),t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return!1;if(2==t.shareSwitch){var i=t.extend.filter((function(t){return"36"==t.index}));if(!i||"1"!=i[0].switch)return void o.hideShareMenu();e=i[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(i){t.shareTitle=i.shareTitle,t.shareUrl=i.shareUrl,1==t.shareSwitch&&t.pathList.includes("36")||2==t.shareSwitch&&e?o.showShareMenu():o.hideShareMenu()}))}))},modify:function(){o.navigateTo({url:"/subpackage/uploadImage/index?order_sn="+this.OrderRejected.order_sn}),this.closeRejected()},getOrderRejected:function(){var t=this;this.$http.getOrderRejected().then((function(e){200==e.code&&(t.OrderRejectedList=e.data,console.log(t.OrderRejectedList,"驳回列表"),t.setShowRejected())}))},closeRejected:function(){this.RejectPop=!1,this.setShowRejected()},setShowRejected:function(){var t=o.getStorageSync("OrderRejected");console.log(t,"----");var e=[];for(var i in this.OrderRejectedList)if(this.tickerReject&&(clearInterval(this.tickerReject),this.tickerReject=null),this.OrderRejected={},!t.includes(this.OrderRejectedList[i].expire_time))return this.OrderRejected=this.OrderRejectedList[i],this.expireTime=this.OrderRejected.expire_time-this.OrderRejected.server_time,this.beginRejectTimer(),this.RejectPop=!0,e.push(this.OrderRejectedList[i].expire_time),void o.setStorageSync("OrderRejected",e.join(",")+","+t)},beginRejectTimer:function(){var t=this;this.tickerReject=setInterval((function(){t.expireTime>0?t.expireTime=t.expireTime-1:(clearInterval(t.tickerReject),t.tickerReject=null)}),1e3)},searchPage:function(){o.navigateTo({url:"/subpackage/searchPage/index?map_lat="+this.from.map_lat+"&map_lon="+this.from.map_lon+"&plan_source="+this.from.plan_source})},preserveImg:function(){var t=this;o.getSetting({success:function(e){console.log(e,"----333"),e.authSetting["scope.writePhotosAlbum"]?t.downImage():o.authorize({scope:"scope.writePhotosAlbum",success:function(e){t.downImage()},fail:function(e){o.showModal({title:"是否授权保存",content:"需要获取您的相册，请确认授权，否则将无法正常保存",success:function(e){e.confirm&&o.openSetting({success:function(e){t.downImage()}})}})}})},fail:function(t){console.log(t,"----")}})},downImage:function(){var t=this;o.getImageInfo({src:this.sq_qrcode_img_url,success:function(e){console.log(e,"下载"),o.saveImageToPhotosAlbum({filePath:e.path,success:function(e){t.$utils.showToast("保存成功")},fail:function(t){console.log(t,"---失败")}})}})},jumpUpload:function(){this.jumpPopup=!1},invite:function(){this.$utils.handleLoginNav()||o.navigateTo({url:"/pages/pullNewActivity/index"})},closeGuide:function(){o.setStorageSync("guideHomePop",!0),this.guide=!1,this.activePOp()},getCode:function(){if(!this.$utils.handleLoginNav())if(1==this.qrcode_type&&""!=this.qrcode_img_url)this.$refs.popup.show();else if(2==this.qrcode_type)return!1},getPublicQrcode:function(){var t=this;this.$http.getConfig().then((function(e){200==e.code&&(t.qrcode_img_url=e.data.qrcode_img_url,t.qrcode_type=1)}))},getQrcode_img:function(){var t=this;this.accountsid?(this.qrcode_type=-1,this.getPublicQrcode()):this.$http.menuConfig().then((function(e){if(console.log(e,"获取菜单配置"),200==e.code){var i=e.data.lists;t.qrcode_type=-1,i.forEach((function(e){"customer"==e.func_type&&(1==e.kefu_qrcode_type&&""!=e.kefu_qrcode_url&&(t.qrcode_img_url=e.kefu_qrcode_url),t.qrcode_type=e.kefu_qrcode_type)}))}}))},jumpUploadTips:function(){if(2==this.progressingInfo.source)5==this.tipsText?this.$utils.navRouter("/subpackage/uploadImage/index?order_sn="+this.progressingInfo.order_sn+"&isRoll=1"):this.$utils.navRouter("/subpackage/uploadImage/index?order_sn="+this.progressingInfo.order_sn);else{var t,e;t=2==this.progressingInfo.platform?this.progressingInfo.action_url.wx_mini.elm.appid:this.progressingInfo.action_url.wx_mini.mt.appid,e=this.progressingInfo.is_place_order?2==this.progressingInfo.platform?this.progressingInfo.action_url.wx_mini.elm.comment_list:this.progressingInfo.action_url.wx_mini.mt.comment_list:2==this.progressingInfo.platform?this.progressingInfo.action_url.wx_mini.elm.path:this.progressingInfo.action_url.wx_mini.mt.path,o.setClipboardData({data:this.progressingInfo.plan_name,success:function(){o.showToast({title:"复制成功",duration:2e3})}}),o.navigateToMiniProgram({appId:t,path:e,success:function(t){}})}},beginTimer:function(){var t=this;this.ticker=setInterval((function(){t.tipsTime>0?t.tipsTime=t.tipsTime-1:(clearInterval(t.ticker),t.ticker=null)}),1e3)},jumpSet:function(t){if(!this.$utils.handleLoginNav()){var e="";if(1==t)this.place_order&&1==this.place_order.show_type?e="/pages/placeOrder/index":this.$utils.showToast("活动未开启，如有疑问请联系客服");else if(2==t)e="/pages/welfare/index";else if(3==t)this.$http.getCouponPackage().then((function(t){200==t.code&&o.navigateToMiniProgram({appId:t.data.wx_mini.mini_appid,path:t.data.wx_mini.mini_path})}));else if(4==t)e="/pages/orderlist/index";else if(5==t)return this.jumpGuide();o.navigateTo({url:e})}},jumpGuide:function(){this.$utils.handleLoginNav()||o.navigateTo({url:"/subpackage/guide/index"})},pullUp:function(){this.isAdd&&(this.isAdd=!0,this.getList())},getShowTipsStatus:function(){var t=this;o.getSystemInfo({success:function(e){var i=e.statusBarHeight||0,n=o.getMenuButtonBoundingClientRect(),s=n.height+2*n.top;t.topHeight=i+s},fail:function(t){console.error("获取系统信息失败:",t)}}),this.$globalData.GET("isShowTipsClose")?this.isShowTips=!1:this.$utils.hasLogin()||(this.isShowTips=!0)},closeTips:function(){this.isShowTips=!1,this.$globalData.SET("isShowTipsClose",!0)},randomNumber:function(){return this.$utils.random(150,500)},receive:function(t){this.$utils.handleLoginNav()||this.$utils.publicNavigation(this.empty_list[t])},search:function(){this.from.page_id="",this.notTips=!1,this.loadIcon=!1,this.isAdd=!0,this.getList()},switchAbleJoin:function(t){this.switchPsition=t,this.from.able_join=1==this.from.able_join?"":1,this.search()},onlyRebate:function(){this.from.only_rebate=1,this.from.platform=-1,this.search()},switchPlatfrom:function(t){this.from.platform=t,this.from.only_rebate="",this.search()},switchTypeList:function(t,e){this.switchPsition=e,this.from.sort=2==t?"asc":"",this.from.only_order=1==t?t:"",this.search()},switchAddress:function(){this.$utils.handleLoginNav()||o.navigateTo({url:"/subpackage/map/index"})},openSq:function(){this.$utils.handleLoginNav()||(this.sq_qrcode_img_url?this.$refs.sqpopup.show():this.$utils.showToast("活动未开启，请联系客服！"))},navBanner:function(t,e){if(!this.$utils.handleLoginNav()){var i=this.modules[t].list[e];21==i.jump_type?this.openSq():this.$utils.publicNavigation(i)}},navMenu:function(t){this.$utils.handleLoginNav()||(21==t.jump_type?this.openSq():this.$utils.publicNavigation(t))},getLocation:function(){var t=this;this.$utils.getLocation().then((function(e){t.from.map_lat=e.latitude,t.from.map_lon=e.longitude,t.$globalData.SET("lat",e.latitude),t.$globalData.SET("lon",e.longitude),t.getPos(),t.list=[],t.from.page_id="",t.notTips=!1,t.loadIcon=!0,t.isAdd=!0,""!=t.from.plan_source?t.getList():t.getInfo()})).catch((function(e){t.from.map_lat="",t.from.map_lon="",t.$utils.showToast("定位获取失败，请手动定位"),t.list=[],t.from.page_id="",t.notTips=!1,t.loadIcon=!1}))},getProgressing:function(){var t=this;this.$utils.handleLoginNav()||this.$http.getProgressing().then((function(e){if(200==e.code)if(console.log(e,"引导信息------"),e.data){t.progressingInfo=e.data;var i=parseInt((new Date).getTime()/1e3);e.data.is_place_order?e.data.is_upload_credential_new?e.data.show_upload_video_credential||2!=e.data.source||(t.tipsText=5):(t.tipsText=2==e.data.source?3:4,t.tipsTime=e.data.upload_credential_expire_time-i):(t.tipsText=2==e.data.source?1:2,t.tipsTime=e.data.place_order_expire_time-i),t.tipsTime?(t.tipsPop=!0,t.beginTimer()):(t.tipsPop=!1,t.ticker&&(clearInterval(t.ticker),t.ticker=null)),5==t.tipsText&&(t.tipsPop=!0)}else t.tipsPop=!1}))},getInfo:function(){var t=this;this.$http.getIndexInfo().then((function(e){if(200==e.code){t.bgColor=e.data.background_color,t.modules=e.data.modules;var i=[];t.modules.forEach((function(e){if("newUserGift"==e.type&&1==e.status&&(1==e.config.new_user_guide&&2==e.new_style&&i.push({url:"https://img.yunzhanxinxi.com/mini/bwc/v262/jifen_banner_ic.png",index:2,new_user_guide:1}),1==e.config.credits_exchange&&i.push({url:"https://img.yunzhanxinxi.com/mini/bwc/v262/jifen_banner_ic.png",index:2,credits_exchange:1}),1==e.config.timed_challenge&&i.push({url:"https://img.yunzhanxinxi.com/mini/bwc/v262/tiaozhanshai_banner_ic.png",index:1,timed_challenge:1}),1==e.config.topdining&&i.push({url:"https://img.yunzhanxinxi.com/mini/bwc/v262/shenquan_banner_ic.png",index:3,topdining:1}),1==e.config.board&&i.push({url:"https://img.yunzhanxinxi.com/mini/bwc/v262/shengqian_banner_ic.png",index:4,board:1}),e.img=i),"om_goods"==e.type&&1==e.status&&(1!=e.config.all_city?1==e.config.meituan?t.from.platform=1:1==e.config.ele&&(t.from.platform=2):t.from.platform="",t.from.plan_source=e.config.new_plan_source,t.from.able_join=e.config.able_join,console.log(t.from,"----------请求参数")),"business"==e.type&&1==e.status&&0!=e.list.length){for(var n=[],o=0;o<e.list.length;o++)for(var s=0;s<e.list[o].length;s++)n.push(e.list[o][s]);var a=n;t.iconList=[];var r=1==e.show_type?5:4,c=1==e.style?2:1;t.iconPageNum=r*c,t.iconPage=Math.ceil(a.length/t.iconPageNum);for(var h=0;h<t.iconPage;h++)t.iconList.push(a.slice(h*t.iconPageNum,(h+1)*t.iconPageNum))}})),t.from.map_lat&&t.from.map_lon&&t.getList()}}))},refresh:function(){this.list=[],this.from.apge=1,this.notTips=!1,this.loadIcon=!1,this.isAdd=!0,this.getList()},getList:function(){var t=this;if(this.notTips||!this.isAdd)return!1;this.isAdd=!1,this.$http.getHomeList(this.from).then((function(e){if(console.log(e,"商品列表---------------"),200==e.code)if(t.loadIcon=!1,0==e.data.length?t.isAdd=!1:t.isAdd=!0,e.data.list.forEach((function(t){1==t.source&&o.request({url:t.action_url.mt_monitor.imp_monitor_url,method:"GET"})})),""==t.from.page_id?t.list=e.data.list:t.list=[].concat((0,n.default)(t.list),(0,n.default)(e.data.list)),t.from.page_id=e.data.page_id,0!=t.list.length){if(t.notTips=!1,0==t.switchTop){var i=o.getSystemInfoSync();o.createSelectorQuery().in(t).select(".bwclist").boundingClientRect((function(e){console.log(e,"-------"),e&&e.top?t.switchTop=e.top-(i.navigationBarHeight||0)-i.statusBarHeight:t.switchTop=650})).exec()}1==t.switchPsition&&o.pageScrollTo({scrollTop:t.switchTop-50,duration:300})}else t.notTips=!0}))},getPos:function(){var t=this;this.$http.getPosNew({lat:this.from.map_lat,lng:this.from.map_lon}).then((function(e){console.log(e,"---地址解析"),200==e.code&&(t.address=e.data.name,t.city=e.data.city,t.$globalData.SET("address",e.data.name),t.$globalData.SET("city",e.data.city))}))},getCouponList:function(){var t=this;this.$http.getbwcCouponList().then((function(e){200==e.code&&(t.empty_list=e.data.empty_list)}))},init:function(){var t=this;this.getInfo(),this.$globalData.GET("lat")?(this.from.map_lat=this.$globalData.GET("lat"),this.from.map_lon=this.$globalData.GET("lon"),this.city=this.$globalData.GET("city"),this.address=this.$globalData.GET("address"),this.from.map_lat&&this.from.map_lon&&this.city&&this.address||this.getLocation()):this.getLocation(),o.$on("bwcselectLocation",(function(e){t.address=e.address.title,t.from.map_lat=e.address.location.lat,t.from.map_lon=e.address.location.lng,t.city=e.address.city,t.$globalData.SET("lat",e.address.location.lat),t.$globalData.SET("lon",e.address.location.lng),t.$globalData.SET("city",e.address.city),t.$globalData.SET("address",e.address.title),t.list=[],t.from.page_id="",t.notTips=!1,t.loadIcon=!0,t.isAdd=!0,t.getInfo()})),this.getCouponList()},getToday:function(){var t=new Date;return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()},activePOp:function(){var t=this;this.$http.activePOp().then((function(e){if(console.log(e,"爆品弹窗---"),200==e.code)if(0==e.data.config.activity_status)t.singleItemPop=!1;else{var i=t.getToday(),n=o.getStorageSync(i);t.singleItemInfo=e.data.config,n?(n=JSON.parse(n)).InvitePopupId.includes(t.singleItemInfo.id)?t.singleItemPop=!1:t.singleItemPop=!0:t.singleItemPop=!0}}))},getInviteConfig:function(){var t=this;this.$http.getInviteConfig().then((function(e){200==e.code&&(!o.getStorageSync("guideHomePop")&&e.data.guide&&1==e.data.guide.status?t.guide=!0:(t.guide=!1,t.activePOp()),e.data.community&&(t.sq_status=e.data.community.community_status,t.sq_qrcode_img_url=e.data.community.qrcode_url),e.data.place_order&&(t.place_order=e.data.place_order))}))},singleClick:function(){this.$utils.publicNavigation(this.singleItemInfo),this.closeSingleItemPop()},closeSingleItemPop:function(){var t=this.getToday(),e=o.getStorageSync(t);if(e)(e=JSON.parse(e)).InvitePopupId.push(this.singleItemInfo.id),o.setStorageSync(t,JSON.stringify(e));else{var i={InvitePopupId:[this.singleItemInfo.id]};o.setStorageSync(t,JSON.stringify(i))}this.singleItemPop=!1}},onLoad:function(){this.$utils.hasLogin()&&this.getUserInfo()}},r=i(3286),c=(0,(i.n(r)(),i(9453)).default)(a,(function(){var t=this,e=(t.$createElement,t._self._c,t.scrollTop>t.switchTop&&0!=t.list.length),i=t.__map(t.modules,(function(e,i){var n=t.__get_orig(e),o="banner"==e.type&&1==e.status?e.list.length:null,s="business"==e.type&&1==e.status?t.iconList.length:null,a="business"==e.type&&1==e.status&&s>1?t.iconList.length:null,r="newUserGift"==e.type&&0!=e.listNum&&1==e.status&&1==e.new_style?e.img.length:null,c="newUserGift"==e.type&&0!=e.listNum&&1==e.status&&2==e.new_style?e.img.length:null,h="om_goods"==e.type&&1==e.status?e.config.new_plan_source.includes(5)||3==e.config.new_plan_source.length:null;return{$orig:n,g1:o,g2:s,g3:a,g4:r,g5:c,g6:h,g7:"om_goods"!=e.type||1!=e.status||h?null:1==e.config.new_plan_source.length&&(e.config.new_plan_source.includes(2)||e.config.new_plan_source.includes(3)),g8:"om_goods"==e.type&&1==e.status?t.list.length:null,l0:"om_goods"==e.type&&1==e.status&&t.notTips?t.__map(t.empty_list,(function(e,i){return{$orig:t.__get_orig(e),m0:t.randomNumber()}})):null}})),n=t.tipsPop&&5!=t.tipsText?t._f("limitTimeFilter")(t.tipsTime):null,o=t.OrderRejected?t._f("limitTimeFilter")(t.expireTime):null;t._isMounted||(t.e0=function(e){return t.$refs.popup.hide()},t.e1=function(e){return t.$refs.sqpopup.hide()},t.e2=function(e){t.guidestep=2},t.e3=function(e){e.stopPropagation(),t.tipsPop=!1},t.e4=function(e){t.jumpPopup=!1}),t.$mp.data=Object.assign({},{$root:{g0:e,l1:i,f0:n,f1:o}})}),[],!1,null,"3099f39f",null,!1,void 0,void 0).exports},7690:function(t,e,i){i.r(e),i.d(e,{default:function(){return c}});var n=i(7039).default,o=i(8793).default,s=i(7256),a={data:function(){return{backLock:!1,selectedTab:0,color:"#999999",selectedColor:"#FE7C0A",active:0,keyword:"",page:1,list:[],typeList:[],notYetData:!1,showVideo:!1,videoUrl:"",userInfo:{},addDouyin:!1,scanCode:!1,chooseDouyin:!1,dyAccountList:[],ids:[],douYinImg:"",seconed:0,isEnd:!0,goods:{}}},onReachBottom:function(){this.getList()},methods:{init:function(){this.getType()},switchTabbar:function(t){var e=t.currentTarget.dataset.path;n.switchTab({url:e})},dyCommissionWatch:function(t){return this.userInfo&&t?this.userInfo.sub_commission_status&&this.userInfo.fx_commission_config.doudian_status&&(null===(e=(t.coupon_price-0?t.coupon_price/100:t.price/100)*((t.activity_cos_ratio||t.cos_ratio)/100)*(this.userInfo.fx_commission_config.doudian_rate/100))||void 0===e?void 0:e.toFixed(2))||"0.00":0;var e},play:function(t){this.videoUrl=t.url,this.showVideo=!0},collect:function(t,e){var i=this;1==e?this.$http.geUncollectMaterial({product_id:this.list[t].product_id,material_id:this.list[t].material.id}).then((function(e){n.showToast({icon:"none",title:e.message}),200==e.code&&(i.list[t].material.is_material_collect=0)})):this.$http.getCollectMaterial({product_id:this.list[t].product_id,material_id:this.list[t].material.id}).then((function(e){n.showToast({icon:"none",title:e.message}),200==e.code&&(i.list[t].material.is_material_collect=1)}))},switchTab:function(t){this.active=t,this.page=1,this.notYetData=!1,this.getList()},search:function(){this.page=1,this.notYetData=!1,this.getList()},getType:function(){var t=this;this.$http.getMyGoodsListType().then((function(e){if(200==e.code){var i=[];i.push(e.data.categorys[0]),i.push({id:"hot",name:"热门素材",parent_id:0}),t.typeList=i,t.active=e.data.categorys[0].id,t.getList()}}))},getList:function(){var t=this;if(0==this.typeList.length)return this.getType();var e={hot_material:"hot"==this.active?1:0,keyword:this.keyword,page:this.page,first_cid:this.typeList[0].id};this.$http.getMyMateriaList(e).then((function(e){200==e.code&&(1==t.page?(n.pageScrollTo({scrollTop:0,duration:0}),t.list=e.data.list||[],e.data.list.length<1&&(t.notYetData=!0)):t.list=t.list.concat(e.data.list||[]),t.page+=1)}))},goInfo:function(t){n.navigateTo({url:"/pages_kuaidi/qualityDetail/sourceMaterial/index?id="+this.list[t].id+"&product_id="+this.list[t].product_id+"&material_id="+this.list[t].material.id})},addWindow:function(t){var e=this;this.goods=t,this.$http.getDyAccountList().then((function(t){200==t.code&&(e.chooseDouyin=!0,0==t.data.length||(t.data.forEach((function(t){t.isCheck=!1})),e.dyAccountList=t.data))}))},closeDouyin:function(){this.addDouyin=!1},toScanCode:function(){this.scanCode=!0,this.chooseDouyin=!1,this.chooseDouyin&&(this.chooseDouyin=!1),this.closeDouyin()},refreshQrCode:function(){this.douYinImg="",this.isEnd=!0,this.getDyQrCode()},getDyQrCode:function(){var t=this;this.$http.getDyAuthAddress({redirect_uri:"https://dy.yunzhanxinxi.com/html/douyin/auth-scuuess.html?is_test=0&time=".concat(Date.now())}).then((function(e){200==e.code&&t.createQrCode2(e.data.url,"douYinId",192,192)}))},createQrCode2:function(t,e,i,o){var a=this;s({width:i,height:o,canvasId:e,text:t,_this:this,callback:function(t){n.canvasToTempFilePath({canvasId:e,success:function(t){a.draw2(t.tempFilePath)},complete:function(t){}},a)}})},downSecond:function(t){var e=this,i=setInterval((function(){t-=1,e.seconed=t,(t<0||""==e.douYinImg)&&(e.isEnd=!1,clearInterval(i))}),1e3)},draw2:function(t){var e=this,i=n.createCanvasContext("douYinId",this);i.drawImage(t,0*this.rpx,0*this.rpx,192,192),i.draw(!1,(function(){n.canvasToTempFilePath({canvasId:"douYinId",quality:1,success:function(t){e.douYinImg=t.tempFilePath,e.isEnd=!0,e.seconed=60,e.downSecond(e.seconed)},fail:function(t){}},e)}))},preserveImg:function(){var t=this;n.saveImageToPhotosAlbum({filePath:t.douYinImg,success:function(e){n.showToast({title:"保存成功",icon:"success",duration:2e3}),t.closeCode()},fail:function(t){"saveImageToPhotosAlbum:fail auth deny"!==t.errMsg&&"saveImageToPhotosAlbum:fail:auth denied"!==t.errMsg||o.showModal({title:"提示",content:"需要您授权保存相册",showCancel:!1,success:function(){o.openSetting({success:function(t){t.authSetting["scope.writePhotosAlbum"]?o.showModal({title:"提示",content:"获取权限成功,再次点击按钮即可保存",showCancel:!1}):o.showModal({title:"提示",content:"获取权限失败，将无法保存到相册哦~",showCancel:!1})},fail:function(t){},complete:function(t){}})}})}})},closeCode:function(){this.scanCode=!1},closeChoose:function(){this.ids=[],this.chooseDouyin=!1},checkThis:function(t){if(t.isCheck=!t.isCheck,1==t.isCheck)this.ids.push(t.id);else{var e=this.ids.indexOf(t.id);this.ids.splice(e,1)}},addDyShowCaseProducts:function(){var t=this,e={goods_url:this.goods.detail_url,auth_id:this.ids};e.auth_id.forEach((function(t,i){e["auth_id["+i+"]"]=t})),delete e.auth_id,0!=this.ids.length?this.$http.addDyShowCaseProduct(e).then((function(e){200==e.code?n.showToast({title:"添加成功",duration:2e3}):n.showToast({title:e.message,icon:"error",duration:2e3}),t.closeChoose()})):n.showToast({title:"请选择账号",icon:"error",duration:2e3})}},mounted:function(){var t=this;n.$once("login",(function(){t.init()})),this.init(),n.pageScrollTo({scrollTop:0,duration:0});var e=getCurrentPages().length;this.backLock=1!=e}},r=i(8775),c=(0,(i.n(r)(),i(9453)).default)(a,(function(){var t=this,e=(t.$createElement,t._self._c,t.__map(t.list,(function(e,i){return{$orig:t.__get_orig(e),m0:t.dyCommissionWatch(e)}})));t.$mp.data=Object.assign({},{$root:{l0:e}})}),[],!1,null,"cc2d48a4",null,!1,void 0,void 0).exports},9910:function(t,e,i){i.r(e),i.d(e,{default:function(){return a}});var n=i(7039).default,o={data:function(){return{user:{hm_uid:""},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],backLock:!1,configInfo:{prizes:[]},prizeRecordList:[],userInfo:{},outstandingOrders:!1,index:-1,luckPosition:-1,luckDrawLock:!0,exchangeLock:!0,current:0,interval:5e3,duration:500,result:{},popupCallbackData:{},phone:"",code:"",share:{}}},created:function(){var t=this,e=getCurrentPages().length;this.backLock=1!=e,n.$on("refreshbwcPhone",(function(e){t.initPage(),t.getUserInfo()})),this.$utils.hasLogin()&&this.initPage()},methods:{getUserInfo:function(){var t=this;this.$http.getUserInfo().then((function(e){200==e.code&&(t.user=e.data.user,t.getShareInfo())}))},getShareInfo:function(){var t=this;this.$common.getSharePath().then((function(e){console.log(e,"分享配置"),t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return n.hideShareMenu(),!1;if(2==t.shareSwitch){var i=t.extend.filter((function(t){return"52"==t.index}));if(0==i.length||"1"!=i[0].switch)return void n.hideShareMenu();e=i[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(i){t.shareTitle=i.shareTitle,t.shareUrl=i.shareUrl,1==t.shareSwitch&&t.pathList.includes("52")||2==t.shareSwitch&&e?n.showShareMenu():n.hideShareMenu()}))}))},rule:function(){this.$utils.handleLoginNav()||this.$refs.popup.show()},initPage:function(){var t=this;this.$common.getUserInfo().then((function(e){t.userInfo=e,t.getlotteryConfigInfo(),t.getPrizeRecord(),t.getNotExchangeOrder()}))},getlotteryConfigInfo:function(){var t=this;this.$http.getlotteryInfo().then((function(e){200==e.code&&(t.configInfo=e.data)}))},getPrizeRecord:function(){var t=this;this.$http.carousel().then((function(e){200==e.code&&(t.prizeRecordList=e.data.list)}))},getNotExchangeOrder:function(){var t=this;this.$http.notExchangeOrder().then((function(e){if(200==e.code)if(e.data.list.length){t.outstandingOrders=!0;var i={prize_type:20,img_url:e.data.list[0].img_url,name:e.data.list[0].card_name,other_id:e.data.list[0].other_id};t.popupCallbackData=i}else t.outstandingOrders=!1}))},getCurrent:function(t){this.current=t.detail.current},loadAnimation:function(){var t=this;if(!this.$utils.handleLoginNav())return this.userInfo.score<this.configInfo.consume_score?n.showToast({title:"当前积分不足，无法参与抽奖",icon:"none",duration:2e3}):this.configInfo.today_lotterycount>=this.configInfo.today_max_lotterycount?n.showToast({title:"已达每日参与上限，请明日再来！",icon:"none",duration:2e3}):void(this.luckDrawLock&&(this.luckDrawLock=!1,this.$http.start({plate_version:this.configInfo.plate_version}).then((function(e){if(200==e.code){t.configInfo.today_lotterycount+=1,n.$emit("getUserInfo",!0);var i=setInterval((function(){t.index++,t.index>7&&(t.index=0)}),100);setTimeout((function(){t.result=e.data,t.configInfo.prizes.forEach((function(i,n){e.data.id==i.id&&(t.luckPosition=n)})),t.stop(t.luckPosition,i)}),1500)}else t.luckDrawLock=!0,466==e.code&&t.getlotteryConfigInfo()}))))},stop:function(t,e){clearInterval(e);var i=this.index+1;this.stopLuck(t,i,0,20)},stopLuck:function(t,e){var i=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3?arguments[3]:void 0;setTimeout((function(){i.index=e,n<320||e!=t?(o++,n+=o,++e>7&&(e=0),i.stopLuck(t,e,n,o)):setTimeout((function(){i.luckDrawLock=!0,i.result.prize_type&&10!=i.result.prize_type&&i.getNotExchangeOrder(),i.popupCallback(1)}),1e3)}),n)},popupCallback:function(t){var e=this;if(3!=t||this.phone)if(0==t)this.$refs.popup.show();else if(1==t){var i={};if(i.img_url=this.result.prize_img,i.prize_type=this.result.prize_type,i.name=this.result.prize_name||this.configInfo.prizes[this.luckPosition].name,i.prize_type){var n={prize_name:i.name,nickname:this.userInfo.nickname};this.prizeRecordList.splice(this.current+1,0,n)}this.popupCallbackData=i,setTimeout((function(){e.$refs.popup1.show()}),200)}else 2==t?this.$refs.popup6.hide():3==t?this.$refs.popup6.show():4==t&&(this.$refs.popup1.hide(),this.$refs.popup7.show())},getPhone:function(t){var e=this;t&&t.detail.encryptedData&&this.$http.getPhone({encryptedData:t.detail.encryptedData,iv:t.detail.iv}).then((function(t){if(200==t.code){if(!t.data.telphone)return n.showToast({title:"解密失败，请先移除小程序后重试！",icon:"none",duration:2e3});e.phone=t.data.telphone,e.$refs.popup6.show()}}))},exchange:function(t,e){var i=this;this.exchangeLock&&(this.exchangeLock=!1,this.$http.otteryExchange({id:this.result.other_id||e.other_id,telphone:t}).then((function(t){i.exchangeLock=!0,200==t.code&&(i.phone="",n.removeStorageSync("phone"),i.getNotExchangeOrder(),i.popupCallback(2),200!=t.code&&410!=t.code||n.showToast({title:t.message,icon:"success",duration:2e3}),30!=i.result.prize_type&&30!=e.prize_type||(i.code=t.data.kf_qr_img,i.popupCallback(4)))})))},nav:function(){this.$utils.handleLoginNav()||this.$utils.navRouter("/subpackage/luckDraw/record/index")}},onShareAppMessage:function(t){var e;return e=n.getStorageSync("isScenes")?"/pages/luckDraw/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/luckDraw/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onShareTimeline:function(t){var e;return e=n.getStorageSync("isScenes")?"/pages/luckDraw/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/luckDraw/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onLoad:function(){this.$utils.hasLogin()&&this.getUserInfo()}},s=i(93),a=(0,(i.n(s)(),i(9453)).default)(o,(function(){var t=this;t.$createElement;t._self._c,t._isMounted||(t.e0=function(e){t.$refs.popup1.hide(),t.pageLock=!0},t.e1=function(e){t.$refs.popup1.hide(),t.$refs.popup6.show()},t.e2=function(e){return t.$refs.popup1.hide()},t.e3=function(e){t.$refs.popup1.hide(),t.pageLock=!0},t.e4=function(e){return t.$refs.popup6.hide()},t.e5=function(e){return t.$refs.popup7.hide()},t.e6=function(e){t.$refs.popup.hide(),t.pageLock=!0})}),[],!1,null,"d4d19b92",null,!1,void 0,void 0).exports},4183:function(t,e,i){i.r(e),i.d(e,{default:function(){return a}});var n=i(7039).default,o={data:function(){return{backLock:!1,list:[],notYetData:!1,searchForm:{type:"direct",nickname:"",max_id:0,level:0},usertype:[{name:"直邀用户",value:"direct"},{name:"间邀用户",value:"indirect"}],userlevel:[],newuser:{today:0,yesterday:0,month:0},hasNextPage:!0,userinfo:null,show_type:0,show_update:2,show_tutor:0,bgColor:"",show_level:!1}},created:function(){var t=this,e=getCurrentPages().length;this.backLock=1!=e,n.$on("refreshbwcPhone",(function(){t.initPage()})),this.$utils.hasLogin()&&this.initPage()},methods:{initPage:function(){this.getShowConfig()},getUserNextLevel:function(){for(var t=0;t<this.userlevel.length;t++)if((this.userinfo.level||this.userinfo.level_info&&this.userinfo.level_info.level)==this.userlevel[t].value){this.userlevel[t+1]&&(this.userinfo.next_level=this.userlevel[t+1].value);break}},getShowConfig:function(){var t=this;this.$globalData.GET("systemconfig")?(this.show_type=this.$globalData.GET("systemconfig").my_friends_template||0,this.show_update=this.$globalData.GET("systemconfig").member_rights||2,this.show_tutor=this.$globalData.GET("systemconfig").my_superior||0,1==this.$globalData.GET("systemconfig").personal_background_status?this.bgColor=this.$globalData.GET("systemconfig").personal_background_color||"#FE2B22":this.bgColor="#FE2B22",this.getLevelInfo()):this.$http.getExamineStatus().then((function(e){200==e.code&&(t.$globalData.SET("systemconfig",e.data),t.show_type=e.data.my_friends_template||0,t.show_update=e.data.member_rights||2,t.show_tutor=e.data.my_superior||0,1==e.data.personal_background_status?t.bgColor=e.data.personal_background_color||"#FE2B22":t.bgColor="#FE2B22",t.getLevelInfo())}))},getLevelInfo:function(){var t=this;this.$globalData.GET("memberbenefits")?(this.$globalData.GET("memberbenefits").userlevel&&(this.userlevel=[{name:"全部人数",value:0,num:0}].concat((this.$globalData.GET("memberbenefits").userlevel||[]).map((function(t){return{name:t.describe,value:t.level,num:0}}))),1==this.$globalData.GET("systemconfig").member_rights&&this.userlevel.length&&(this.show_level=!0)),1==this.show_type&&(this.$globalData.GET("memberbenefits").userinfo?(this.userinfo=this.$globalData.GET("memberbenefits").userinfo,this.userinfo.level&&this.userinfo.level>1&&1==this.$globalData.GET("systemconfig").member_rights&&this.usertype.push({name:"团队用户",value:"team"}),this.getUserNextLevel()):this.getUserInfo()),this.getList()):this.$http.getUserLevel().then((function(e){200==e.code&&(t.$globalData.SET("memberbenefits",e.data.user_info,"userinfo"),t.$globalData.SET("memberbenefits",e.data.user_level,"userlevel"),e.data.user_level&&(t.userlevel=[{name:"全部人数",value:0,num:0}].concat((t.$globalData.GET("memberbenefits").userlevel||[]).map((function(t){return{name:t.describe,value:t.level,num:0}}))),1==t.$globalData.GET("systemconfig").member_rights&&t.userlevel.length&&(t.show_level=!0)),1==t.show_type&&(e.data.user_info?(t.userinfo=e.data.user_info,t.userinfo.level&&t.userinfo.level>1&&1==t.$globalData.GET("systemconfig").member_rights&&t.usertype.push({name:"团队用户",value:"team"}),t.getUserNextLevel()):t.getUserInfo()),t.getList())}))},getUserInfo:function(){var t=this;this.$globalData.GET("home")&&this.$globalData.GET("home").userInfo?(this.userinfo=this.$globalData.GET("home").userInfo,this.userinfo.level_info&&this.userinfo.level_info.level>1&&1==this.$globalData.GET("systemconfig").member_rights&&this.usertype.push({name:"团队用户",value:"team"})):this.$http.userInfo().then((function(e){e&&200==e.code&&(t.userinfo=e.data,t.$globalData.SET("home",e.data,"userInfo"),t.userinfo.level_info&&t.userinfo.level_info.level>1&&1==t.$globalData.GET("systemconfig").member_rights&&t.usertype.push({name:"团队用户",value:"team"}))}))},navMemberBenefitsUpdate:function(){n.navigateTo({url:"/subpackage/grade/index"})},navMemberBenefits:function(){1==this.show_update?n.navigateTo({url:"/subpackage/grade/index"}):console.log("隐藏会员权益，不做跳转")},navToMyTutor:function(){n.navigateTo({url:"/subpackage/myTutor/index"})},jumpOrder:function(t){n.navigateTo({url:"/pages/myOrder/index?order_hm_uid="+t.uid+"&type=2&business_id=74"})},navToDetail:function(t){console.log("navigate to detail",t),n.navigateTo({url:"/subpackage/myFans/detail/index?uid="+t.uid})},search:function(){this.$utils.handleLoginNav()||(this.hasNextPage=!0,this.list=[],this.searchForm.max_id=0,this.getList())},changeUserLevel:function(t){t.value!=this.searchForm.level&&(this.hasNextPage=!0,this.searchForm.level=t.value,this.list=[],this.searchForm.max_id=0,this.getList())},changeUserType:function(t){this.$utils.handleLoginNav()||t.value!=this.searchForm.type&&(this.hasNextPage=!0,this.searchForm.type=t.value,this.list=[],this.searchForm.max_id=0,this.getList())},getList:function(){var t=this;this.hasNextPage&&(n.showLoading(),this.$http.getFriends(this.searchForm).then((function(e){200==e.code?(e.data.friends_list&&e.data.friends_list.length&&(t.list.length?t.list=t.list.concat(e.data.friends_list):t.list=e.data.friends_list,e.data.friends_list.length?t.searchForm.max_id=t.list[t.list.length-1].created_time:(t.searchForm.max_id=0,t.hasNextPage=!1)),t.newuser=e.data.time_statistics,t.userlevel.forEach((function(t){for(var i=0;i<e.data.level_statistics.length;i++)e.data.level_statistics[i].level==t.value&&(t.num=e.data.level_statistics[i].users)})),n.hideLoading()):n.hideLoading()})).catch((function(){n.hideLoading()})))},pullUp:function(){this.page=1,this.getList(this.list[this.list.length-1].id,2)}},onReachBottom:function(){this.page=1,this.getList(this.list[this.list.length-1].id,2)}},s=i(1410),a=(0,(i.n(s)(),i(9453)).default)(o,(function(){var t=this,e=(t.$createElement,t._self._c,t.list.length);t.$mp.data=Object.assign({},{$root:{g0:e}})}),[],!1,null,"16d9cfc4",null,!1,void 0,void 0).exports},6272:function(t,e,i){i.r(e),i.d(e,{default:function(){return r}});var n=i(7039).default,o=i(8793).default,s={data:function(){return{order_hm_uid:0,navHeight:0,orderList:[],total:!1,notYetData:!1,slotLock:!1,timeSlotId:0,lodTimeSlotId:"",type:2,myOrderType:1,orderState:-1,businessList:[],scrollTop:0,backLock:!1,doukeTypeList:[{name:"全部",id:-1},{name:"已支付",id:2},{name:"已结算",id:3},{name:"已失效",id:1}],bgColor:"#fff",my_order_template:1,totleNum:"",page:1}},props:{hometype:{default:function(){return""}}},watch:{hometype:function(t){console.log(t,"-*-*-"),this.type=t},timeSlotId:function(t,e){this.slotLock&&(this.lodTimeSlotId=e)}},onPullDownRefresh:function(){this.page=1,this.getList("",2)},onPageScroll:function(t){this.scrollTop=t.scrollTop},onLoad:function(t){console.log(t,"-*-*-*-"),this.my_order_template=0,t&&(this.type=t.type,2==t.type&&t.business_id&&(this.timeSlotId=t.business_id,this.order_hm_uid=t.order_hm_uid)),n.setNavigationBarTitle({title:2==this.type?"团队订单":"我的订单"});var e=getCurrentPages().length;this.backLock=1!=e,this.$utils.hasLogin()&&this.getList()},created:function(){var t=this,e=o.getMenuButtonBoundingClientRect();o.getSystemInfo({success:function(i){var n=i.statusBarHeight,o=n+e.height+2*(e.top-n);t.navHeight=o}}),n.$on("refreshbwcPhone",(function(){t.getList(),t.getBusinessList()})),this.hometype&&(this.type=this.hometype,n.setNavigationBarTitle({title:2==this.type?"团队订单":"我的订单"})),this.$utils.hasLogin()&&this.getBusinessList()},onReachBottom:function(){if(this.page++,!(this.$refs.loadMore.loadLock||this.orderList.length<1)){if(this.total)return this.$refs.loadMore.no();this.$refs.loadMore.open(),this.getList(this.orderList[this.orderList.length-1].id)}},methods:{pullUp:function(t){this.type=t,this.page=1,this.getList(this.orderList[this.orderList.length-1].id,2)},screen:function(){this.$utils.handleLoginNav()||(this.slotLock=!0)},copyOrderCode:function(t){n.setClipboardData({data:t,success:function(){n.showToast({title:"复制成功",duration:2e3})}})},getNavHeight:function(t){this.navHeight=t},setTimeSlotId:function(t){this.timeSlotId=t},getList:function(t,e){var i=this;this.$utils.hasLogin()&&1==this.myOrderType&&(console.log(this.type,this.timeSlotId,this.order_hm_uid,"传参"),this.$http.newOrderList({type:this.type,business_id:this.timeSlotId,order_hm_uid:this.order_hm_uid,order_status:this.orderState,max_id:t||""}).then((function(o){e&&(n.hideLoading(),2==e&&n.stopPullDownRefresh()),200==o.code&&(t?(o.data.list.length<1?(i.$refs.loadMore.no(),i.total=!0):i.orderList=i.orderList.concat(o.data.list),i.$refs.loadMore.close()):(o.data.list.length<1?i.notYetData=!0:i.notYetData=!1,i.orderList=o.data.list))})))},getBusinessList:function(){var t=this;this.$http.getBusinessName().then((function(e){200==e.code&&(t.businessList=e.data)}))},businessQuery:function(){this.lodTimeSlotId="",this.slotLock=!1,n.showLoading({title:"加载中"}),this.notYetData=!1,this.$refs.loadMore.closeNo(),this.getList("",1)},listType:function(t){this.$utils.handleLoginNav()||this.orderState!=t&&(this.orderState=t,this.notYetData=!1,this.$refs.loadMore.closeNo(),this.getList("",1))},hide:function(){this.slotLock=!1,(this.lodTimeSlotId||0===this.lodTimeSlotId)&&(this.timeSlotId=this.lodTimeSlotId,this.lodTimeSlotId="")}}},a=i(3448),r=(0,(i.n(a)(),i(9453)).default)(s,(function(){var t=this;t.$createElement;t._self._c,t._isMounted||(t.e0=function(e){t.timeSlotId=0})}),[],!1,null,"4907f55e",null,!1,void 0,void 0).exports},2072:function(t,e,i){i.r(e),i.d(e,{default:function(){return r}});var n=i(7039).default,o=i(7256),s={data:function(){return{user:{hm_uid:""},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],backLock:!1,indicatorDots:!0,duration:500,list:[],qrcode:"",qrcodeLink:"",current:0,rpx:0,headPortrait:"",fullPosterList:[],headimgurlStatus:!0,authorizer_type:1,invite_code:"",invite_code_status:0,posterList:[],posterListHasHead:[],nick_name:"",head_img:"",share:{},shareData:{},safeBottom:0}},created:function(){var t=this;setTimeout((function(){var e=n.getSystemInfoSync();t.safeBottom=e.safeAreaInsets.bottom}),100);var e=getCurrentPages().length;this.backLock=1!=e,n.$on("refreshbwcPhone",(function(){t.getUserInfoA(),t.getPosterConfig(),t.$globalData.GET("home")&&t.$globalData.GET("home").userInfo&&(t.headPortrait=t.$globalData.GET("home").userInfo.headimgurl,t.invite_code=t.$globalData.GET("home").userInfo.invite_code,t.invite_code_status=t.$globalData.GET("home").userInfo.invite_code_status),t.headimgurlStatus&&t.posterListHasHead.length?t.fullPosterList=t.posterListHasHead:!t.headimgurlStatus&&t.posterList.length?t.fullPosterList=t.posterList:(t.getList(),t.getInfo(),t.$globalData.GET("home")&&t.$globalData.GET("home").userInfo?t.getCode():t.getUserInfo())})),this.$utils.hasLogin()&&(this.$globalData.GET("home")&&this.$globalData.GET("home").userInfo&&(this.headPortrait=this.$globalData.GET("home").userInfo.headimgurl,this.invite_code=this.$globalData.GET("home").userInfo.invite_code,this.invite_code_status=this.$globalData.GET("home").userInfo.invite_code_status),this.headimgurlStatus&&this.posterListHasHead.length?this.fullPosterList=this.posterListHasHead:!this.headimgurlStatus&&this.posterList.length?this.fullPosterList=this.posterList:(this.getList(),this.getInfo(),this.$globalData.GET("home")&&this.$globalData.GET("home").userInfo?this.getCode():this.getUserInfo()))},methods:{changeShareCodeName:function(t){return 0==t?"公众号二维码":1==t?"H5二维码":"小程序码"},getPosterConfig:function(){var t=this;return this.$http.getPosterConfig().then((function(e){if(200==e.code){var i=e.data;t.shareData=i||{},0!=t.shareData.jump_page_type&&1!=t.shareData.jump_page_type||t.createShareQrcode()}}))},getUserInfoA:function(){var t=this;this.$http.getUserInfo().then((function(e){200==e.code&&(t.user=e.data.user,t.getShareInfo())}))},getShareInfo:function(){var t=this;this.$common.getSharePath().then((function(e){console.log(e,"分享配置"),t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return n.hideShareMenu(),!1;if(2==t.shareSwitch){var i=t.extend.filter((function(t){return"47"==t.index}));if(0==i.length||"1"!=i[0].switch)return void n.hideShareMenu();e=i[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(i){t.shareTitle=i.shareTitle,t.shareUrl=i.shareUrl,1==t.shareSwitch&&t.pathList.includes("47")||2==t.shareSwitch&&e?n.showShareMenu():n.hideShareMenu()}))}))},login:function(){this.$utils.handleLoginNav()},time:function(t){var e=Date.parse(t),i=Date.parse(new Date)-e,n=36e5,o=24*n,s=30*o,a="";return i<o?a=parseInt(i/n)+"小时前":i<s&&i>o?a=parseInt(i/o)+"天前":(a=parseInt(i/s))>12?a="1年以前":a+="月前",a},copyDescription:function(){if(!this.list[this.current].description)return n.showToast({title:"暂无可复制文案",icon:"none",duration:2e3});n.setClipboardData({data:this.list[this.current].description,showToast:!0,success:function(t){},complete:function(t){console.log("复制完成")}}),this.addNum()},addNum:function(){this.$http.getPoserScan({poster_id:this.list[this.current].id}).then((function(t){console.log(t,"-----")}))},copyText:function(t){this.$utils.handleLoginNav()||n.setClipboardData({data:t,showToast:!0,success:function(t){},complete:function(t){console.log("复制完成")}})},getInfo:function(){var t=this;this.$http.getShareInfo({}).then((function(e){e&&200==e.code&&(t.head_img=e.data.head_img,t.nick_name=e.data.nick_name)}))},getUserInfo:function(){var t=this;this.$http.userInfo().then((function(e){e&&200==e.code&&(t.headPortrait=e.data.headimgurl,t.invite_code=e.data.invite_code,t.invite_code_status=e.data.invite_code_status,t.$globalData.SET("home",e.data,"userInfo"),t.getCode())}))},getList:function(){var t=this;this.$http.posterList({}).then((function(e){e&&200==e.code&&(t.list=e.data)}))},handleUpdateCode:function(t){this.headimgurlStatus=t,t&&this.posterListHasHead.length?this.fullPosterList=this.posterListHasHead:!t&&this.posterList.length?this.fullPosterList=this.posterList:(this.fullPosterList=t?this.posterListHasHead:this.posterList,this.createQrCode(this.qrcodeLink,"qrcode",168,168))},getCode:function(){var t=this;this.$http.popularize({}).then((function(e){200==e.code&&(t.authorizer_type=e.data.authorizer_type,t.qrcodeLink=e.data.qrcode,t.invite_code=e.data.invite_code,t.handleUpdateCode(!1))}))},chage:function(t){this.current=t.detail.current},drawHeadImg:function(t,e,i,o){var s=this,a=this;n.getImageInfo({src:a.headPortrait,success:function(i){var o=n.createCanvasContext(e,s);o.drawImage(t,0,0,164,164),o.drawImage(i.path,68,68,28,28),o.draw(!1,(function(){n.canvasToTempFilePath({canvasId:e,quality:1,success:function(t){a.list.forEach((function(e,i){a.draw(t.tempFilePath,i)}))}},s)}))},fail:function(t){n.showToast({title:"微信头像解析失败",icon:"none",duration:2e3})}})},createShareQrcode:function(){var t=this;o({width:164,height:164,x:8,y:8,correctLevel:3,canvasId:"qrcode",text:t.shareData.qr_code,callback:function(){setTimeout((function(){n.canvasToTempFilePath({canvasId:"qrcode",quality:1,success:function(e){t.shareData.qr_code=e.tempFilePath}})}),160)}})},createQrCode:function(t,e,i,s){var a=this,r=this;1==r.authorizer_type?o({_this:this,width:148,height:148,x:8,y:8,correctLevel:3,canvasId:e,text:t,callback:function(){setTimeout((function(){n.canvasToTempFilePath({canvasId:e,quality:1,success:function(t){r.qrcode=t.tempFilePath,r.headimgurlStatus?r.drawHeadImg(t.tempFilePath,e,i,s):r.list.forEach((function(t,e){r.draw(r.qrcode,e)}))}},a)}),160)}}):n.getImageInfo({src:t,success:function(t){r.qrcode=t.path,r.headimgurlStatus?r.drawHeadImg(t.path,e,i,s):r.list.forEach((function(e,i){r.draw(t.path,i)}))}})},preserveImg:function(t){var e;e="poster"===t?this.fullPosterList[this.current]:this.shareData.qr_code,n.getImageInfo({src:e,success:function(t){console.log(t,"下载"),n.saveImageToPhotosAlbum({filePath:t.path,success:function(t){n.showToast({title:"保存成功",icon:"success",duration:2e3})},fail:function(t){console.log(t,"---失败")}})}})},draw:function(t,e){var i=this,o=n.createCanvasContext("firstCanvas"+e,this),s=this;n.getImageInfo({src:s.list[e].src,success:function(a){if(o.drawImage(a.path,0,0,456,812),1==i.invite_code_status){o.setFontSize(16),o.fontWeight="700";var r=o.measureText("邀请码："+i.invite_code).width;o.fillStyle="white",o.lineWidth=1;var c=216-r/2,h=536,u=r+24,l=14;o.beginPath(),o.moveTo(c,550),o.arc(c+l,550,l,Math.PI,3*Math.PI/2),o.lineTo(c+u-l,h),o.arc(c+u-l,550,l,3*Math.PI/2,2*Math.PI),o.lineTo(c+u,557),o.arc(c+u-l,557,l,0,Math.PI/2),o.lineTo(c+l,571),o.arc(c+l,557,l,Math.PI/2,Math.PI),o.lineTo(c,550),o.closePath(),o.fill()}if(o.rect(138,582,180,180),o.setFillStyle("white"),o.fill(),o.drawImage(t,146,590,164,164),1==i.invite_code_status){o.setFontSize(16),o.fontWeight="700";var d=o.measureText("邀请码："+i.invite_code).width;o.fillStyle="#282828",o.setTextBaseline("top"),o.fillText("邀请码："+i.invite_code,(456-d)/2,546)}o.draw(!1,(function(){n.canvasToTempFilePath({canvasId:"firstCanvas"+e,quality:1,success:function(t){s.$set(s.fullPosterList,e,t.tempFilePath),s.list.length}},i)}))}})}},onShareAppMessage:function(t){var e;return e=n.getStorageSync("isScenes")?"/pages/myPoster/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/myPoster/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onShareTimeline:function(t){var e;return e=n.getStorageSync("isScenes")?"/pages/myPoster/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/myPoster/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onLoad:function(){this.$utils.hasLogin()&&(this.getUserInfoA(),this.getPosterConfig())}},a=i(5557),r=(0,(i.n(a)(),i(9453)).default)(s,(function(){var t=this,e=(t.$createElement,t._self._c,t.list.length),i=0!=e?t.time(t.list[t.current].create_time):null,n=0!=e?t.shareData&&Object.keys(t.shareData).length>0:null,o=0!=e&&n&&t.shareData.qr_code?t.changeShareCodeName(t.shareData.jump_page_type):null;t.$mp.data=Object.assign({},{$root:{g0:e,m0:i,g1:n,m1:o}})}),[],!1,null,"61d1eb36",null,!1,void 0,void 0).exports},9466:function(t,e,i){i.r(e),i.d(e,{default:function(){return d}});var n=i(7028),o=i(8238),s=i(843),a=i(8793).default,r=i(7039).default;function c(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}var h={data:function(){return{head_img:"",nick_name:"",is_show_member_right:!1,is_perfect:!1,choose:!1,tipsPop:!1,realNameTips:"",backLock:!1,qrcode:"",realname:!1,isearnest:!1,show_type:!1,nickname:"",headimgurl:"",user:{hm_uid:"",telephone:"",nickname:"微信昵称",headimgurl:"https://img.yunzhanxinxi.com/static/personal/bwc/head_portrait_ic@2x.png",money:"-",total_income:"-",month_income:"-",score:0,total_balance:"-"},is_certification:0,sub_commission_status:0,qrcode_img_url:"",phone:"",url:"",newUrl:"",isShowActivity:!1,menuConfig:{},navHeight:0,level:0,level_name:"",progress:0,nextLevel:0,nextLevel_name:""}},mounted:function(){var t=this,e=a.getMenuButtonBoundingClientRect();this.menuButtonObject=e,a.getSystemInfo({success:function(i){var n=i.statusBarHeight,o=n+e.height+2*(e.top-n);t.navHeight=o}}),r.pageScrollTo({scrollTop:0,duration:0});var i=getCurrentPages().length;this.backLock=1!=i},onPullDownRefresh:function(){r.getStorageSync("bwcPhone")?(this.getInfo(),setTimeout((function(){r.stopPullDownRefresh()}),1e3)):r.stopPullDownRefresh()},methods:{getMtWithdrawalRule:function(){var t=this;this.$http.getMtWithdrawalRule().then((function(e){200==e.code&&(console.log(e,"是否显示权益------"),t.is_show_member_right=e.data.config.is_show_member_right,t.is_show_member_right&&t.getLevelInfo())}))},getLevelInfo:function(){var t=this;this.$http.getUserLevel().then((function(e){if("200"==e.code){t.level=e.data.user_info.level,t.level_name=e.data.user_info.level_name;var i=0;for(var n in e.data.user_level)e.data.user_level[n].level==t.level&&(i=n,t.progress=parseInt(100*e.data.user_level[n].progress));e.data.user_level[parseInt(i)+1]?(t.nextLevel=e.data.user_level[parseInt(i)+1].level,t.nextLevel_name=e.data.user_level[parseInt(i)+1].describe):(t.nextLevel=!1,t.nextLevel_name=!1)}}))},GradeEquity:function(){this.$utils.handleLoginNav()||r.navigateTo({url:"/subpackage/grade/index"})},submit:function(){var t=this;return console.log(this.nickname,"----"),this.nickname?this.choose?void this.$http.setUserPerfectInfo({nickname:this.nickname,headimgurl:this.headimgurl}).then((function(e){"200"==e.code?(t.user.nickname=t.nickname,t.user.headimgurl=t.headimgurl,t.is_perfect=!1,r.showToast({icon:"none",title:"更新成功"})):r.showToast({icon:"none",title:e.message})})):this.$utils.showToast("请勾选隐私协议"):r.showToast({icon:"none",title:"请输入昵称"})},protocol:function(){r.navigateTo({url:"/subpackage/webView/h5?url="+encodeURIComponent("https://img.yunzhanxinxi.com/static/alliance/html/privacy.html?v=0001")})},changeHeadImg:function(){var t=this;r.chooseImage({count:1,sizeType:["compressed"],success:function(e){var i=e.tempFilePaths,n={};n={editionType:"routine","utm-source":o.default.utm_source,platform:o.default.platform,version:t.$store.state.version,appid:r.getStorageSync("appid")||"",hm_scene_template:"overlordMeal"},r.getStorageSync("scenesLogin")?n.Authorization=t.$store.state.scene_token:n.token=t.$store.state.token,r.uploadFile({url:o.default.url_config+"/home/overlordmeal/image/upload-avatar",filePath:i[0],name:"file",header:n,success:function(e){var i=JSON.parse(e.data);200==i.code?(console.log(i.data.url),t.headimgurl=i.data.url):(console.log(i.message),t.$utils.showToast(i.message))},fail:function(t){console.log(t)}})}})},onChooseAvatar:function(t){console.log(t,"--------");var e=this,i={};i={editionType:"routine","utm-source":o.default.utm_source,platform:o.default.platform,version:e.$store.state.version,appid:r.getStorageSync("appid")||"",hm_scene_template:"overlordMeal"},r.getStorageSync("scenesLogin")?i.Authorization=e.$store.state.scene_token:i.token=e.$store.state.token,r.uploadFile({url:o.default.url_config+"/home/overlordmeal/image/upload-avatar",filePath:t.detail.avatarUrl,name:"file",header:i,success:function(t){var i=JSON.parse(t.data);200==i.code?(console.log(i.data.url),e.headimgurl=i.data.url):(console.log(i.message),e.$utils.showToast(i.message))},fail:function(t){console.log(t)}})},Definition:function(){this.tipsPop=!0},placeOrder:function(){r.navigateTo({url:"/pages/placeOrder/index"})},invite:function(){r.navigateTo({url:"/pages/pullNewActivity/index"})},openCustomerQrcode:function(t){if(console.log(t),!this.$utils.handleLoginNav())if(1==t.kefu_qrcode_type)""!=t.kefu_qrcode_url&&(this.qrcode_img_url=t.kefu_qrcode_url),this.$refs.popup.show();else if(2==t.kefu_qrcode_type)return},goLogin:function(){this.$utils.handleLoginNav()},jumpUrl1:function(t){console.log(t),this.$utils.handleLoginNav()||t.path&&r.navigateTo({url:t.path})},keepImage:function(){var t=this;r.getSetting({success:function(e){e.authSetting["scope.writePhotosAlbum"]?r.saveImageToPhotosAlbum({filePath:t.qrcode,success:function(){r.showToast({icon:"none",title:"保存成功"})},fail:function(t){r.showToast({icon:"none",title:"保存失败"})}}):r.authorize({scope:"scope.writePhotosAlbum",success:function(){r.saveImageToPhotosAlbum({filePath:t.qrcode,success:function(){r.showToast({icon:"none",title:"保存成功"})},fail:function(t){r.showToast({icon:"none",title:"保存失败"})}})},fail:function(){r.showModal({title:"您已拒绝获取相册权限",content:"是否进入权限管理，调整授权？",success:function(t){if(t.confirm)r.openSetting({success:function(t){}});else if(t.cancel)return r.showToast({title:"已取消！"})}})}})}})},close:function(){this.realname=!1},copy:function(){this.$utils.copy(this.user.hm_uid)},jumpUrl:function(t,e){if(!this.$utils.handleLoginNav()){var i="";switch(t){case 1:i="/subpackage/set/index";break;case 2:i=!(0==this.menuConfig.invite_friend_reward_show_position.length||!this.menuConfig.invite_friend_reward_show_position.includes("withdrawal"))?"/subpackage/withdrawalList/index?img="+this.menuConfig.invite_friend_reward_background_url:"/subpackage/withdrawalList/index";break;case 3:this.isearnest=!1,i=r.getStorageSync("isScenes")?"/subpackage/webView/h5?url=".concat(encodeURIComponent(this.url)):"/subpackage/webView/h5?url=".concat(encodeURIComponent(this.newUrl));break;case 5:r.$emit("setCurrent",{current_id:37,type:e});break;case 11:i="/pages/pullNewActivity/index";break;case 12:if(0==this.is_certification)return this.isearnest=!0;i="/subpackage/withdrawal/index"}r.navigateTo({url:i})}},getInfo:function(){var t=this;this.$http.getUserInfo().then((function(e){console.log(e,"个人信息----"),200==e.code&&(t.user=e.data.user,t.is_perfect=e.data.is_perfect,t.headimgurl=t.user.headimgurl,t.nickname=t.user.nickname,t.is_certification=e.data.is_certification,t.is_perfect&&t.$http.getShareInfo({}).then((function(e){e&&200==e.code&&(t.head_img=e.data.head_img,t.nick_name=e.data.nick_name)})))})),this.$http.getConfig().then((function(e){200==e.code&&(t.qrcode_img_url=e.data.qrcode_img_url,t.sub_commission_status=e.data.sub_commission_status)})),this.getMenu(),this.getMtWithdrawalRule()},followLink:function(){this.$utils.handleLoginNav()||(console.log(this.menuConfig.guide.link_url,"----"),this.$utils.navRouter("/subpackage/webView/h5?url="+encodeURIComponent(this.menuConfig.guide.link_url)))},getMenu:function(){var t=this;this.$http.menuConfig().then((function(e){console.log(e,"获取菜单配置"),200==e.code&&(t.menuConfig=e.data,0!=t.menuConfig.invite_friend_reward_show_position.length&&t.menuConfig.invite_friend_reward_show_position.includes("userCenter")?t.show_type=!0:t.show_type=!1)}))},getRealNameUrl:function(){var t=this;this.$http.getUrl().then((function(e){"200"==e.code&&(t.url=e.data.long_url,t.realNameTips=e.data.tip)})),this.$http.getUrlNew().then((function(e){"200"==e.code&&(t.newUrl=e.data.url)}))},init:function(){this.getInfo(),this.getRealNameUrl()}},computed:function(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?c(Object(i),!0).forEach((function(e){(0,n.default)(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):c(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}({},(0,s.mapState)(["randompath"])),created:function(){var t=this;r.$on("updateUserInfo",(function(){t.$http.getUserInfo().then((function(e){console.log(e,"个人信息----"),200==e.code&&(t.user=e.data.user,t.is_certification=e.data.is_certification)}))})),r.$on("refreshbwcINfo",(function(){t.getInfo()})),r.$on("refreshbwcPhone",(function(){t.init()})),r.$on("refreshbwcGrade",(function(){t.getMtWithdrawalRule()})),this.$utils.hasLogin()&&this.init()}},u=i(5569),l=i.n(u),d=(0,(l(),i(9453)).default)(h,(function(){var t=this,e=(t.$createElement,t._self._c,t.menuConfig&&t.menuConfig.lists&&0!=t.menuConfig.lists.length);t._isMounted||(t.e0=function(e){t.isearnest=!1},t.e1=function(e){return t.$refs.popup.hide()},t.e2=function(e){t.tipsPop=!1},t.e3=function(e){t.choose=!t.choose},t.e4=function(e){t.choose=!t.choose},t.e5=function(e){t.choose=!t.choose},t.e6=function(e){t.is_perfect=!1}),t.$mp.data=Object.assign({},{$root:{g0:e}})}),[],!1,null,"5e34fd2a",null,!1,void 0,void 0).exports},9297:function(t,e,i){i.r(e),i.d(e,{default:function(){return r}});var n=i(9510),o=i(7039).default,s={data:function(){return{cont:"",mtWithdrawal:1,failRow:[],new_reason:"",reject_reason:"",isFailPop:!1,isShowQRc0de:!1,backLock:!1,tips:"是否跳转小程序下单？",user_path:"",info:{},active1:0,warfare:["店铺二维码失效","小程序店铺id失效","复制店铺不出来"],isGuza:!1,appid:"",active:0,ticker:null,tab:[{name:"全部",key:""},{name:"待上传",key:"1"},{name:"已完成",key:"3"},{name:"审核中",key:"2"},{name:"已驳回",key:"4"}],from:{page:1,state:"",order_sn:""},list:[],listTotal:{total:0,valid_total:0,valid_user_profit:0},notTips:!1,phone:"",jumpPopup:!1,id:""}},onPullDownRefresh:function(){o.getStorageSync("bwcPhone")?(this.getList(),setTimeout((function(){o.stopPullDownRefresh()}),1e3)):o.stopPullDownRefresh()},onReachBottom:function(){this.from.page++,this.$utils.hasLogin()&&this.getList()},filters:{limitTimeFilter:function(t){var e=parseInt((new Date).getTime()/1e3);if((t=parseInt(t)-e)>0){var i,n,o;i=parseInt(t/3600),n=parseInt((t-60*i*60)/60),o=parseInt(t-60*i*60-60*n),i<10&&(i="0"+i),n<10&&(n="0"+n),o<10&&(o="0"+o);var s={hour:i,min:n,seconds:o};return"".concat(s.hour,":").concat(s.min,":").concat(s.seconds," ")}return"00:00:00 "}},methods:{jumpWallet:function(){o.navigateTo({url:"/subpackage/withdrawalList/index"})},eliminate:function(){this.from.order_sn="",this.search()},getMtWithdrawalRule:function(){var t=this;this.$http.getMtWithdrawalRule().then((function(e){200==e.code&&(console.log(e,"美团规则------"),t.mtWithdrawal=e.data.config.cashback_mode)}))},closeQRcode:function(){this.isShowQRc0de=!1},pullUp:function(){this.from.page++,this.getList()},evaluate:function(t){this.info=this.list[t],this.openUrl(5)},shop:function(t){if(this.info=this.list[t],5==this.info.state||3==this.info.state)return!1;""!=this.getPlatformParameter(1)&&""!=this.getPlatformParameter(2)?this.openUrl(1):2==info.source&&(1==this.info.platform&&this.info.action_url.qrcode.mt||2==this.info.platform&&this.info.action_url.qrcode.elm)?this.openUrl(3):this.openUrl(2)},lookUploadPage:function(t){if(this.info=this.list[t],6==this.info.state||7==this.info.state)return!1;this.$utils.navRouter("/subpackage/uploadImage/index?order_sn="+this.list[t].order_sn)},getPlatformParameter:function(t){return 1==t?1==this.info.platform?this.info.action_url.wx_mini.mt.appid:this.info.action_url.wx_mini.elm.appid:2==t?1==this.info.platform?this.info.action_url.wx_mini.mt.path:this.info.action_url.wx_mini.elm.path:4==t?1==this.info.platform?this.info.action_url.wx_mini.mt.order_list:this.info.action_url.wx_mini.elm.comment_list:void 0},openUrl:function(t){if(1==t)o.navigateToMiniProgram({appId:this.getPlatformParameter(1),path:this.getPlatformParameter(2),success:function(t){}});else if(2==t){var e=this;o.setClipboardData({data:e.info.plan_name,success:function(){e.$utils.showToast("复制成功"),o.navigateToMiniProgram({appId:e.getPlatformParameter(1),path:"",success:function(t){}})}})}else 4==t?(this.isGuza=!0,this.active1=0):3==t?this.isShowQRc0de=!0:5==t&&o.navigateToMiniProgram({appId:this.getPlatformParameter(1),path:this.getPlatformParameter(4),success:function(t){}})},submitGuza:function(){var t=this;this.$http.faultReport({plan_id:this.info.id,source:this.info.source,content:this.warfare[this.active]}).then((function(e){o.showToast({icon:"none",title:e.message}),"200"==e.code&&t.closeGuza()}))},closeGuza:function(){this.isGuza=!1,this.active=0},closeJump:function(){this.jumpPopup=!1},beginTimer:function(){var t=this;this.ticker=setInterval((function(){for(var e=0,i=t.list.length;e<i;e++){var n=parseInt((new Date).getTime()/1e3),o=t.list[e].upload_credential_expire_time-n,s=t.list[e].place_order_expire_time-n,a=t.list[e].expire_time-n;o>0&&(t.list[e].upload_credential_expire_time=t.list[e].upload_credential_expire_time+.1),s>0&&(t.list[e].place_order_expire_time=t.list[e].place_order_expire_time+.1),a>0&&(t.list[e].expire_time=t.list[e].expire_time+.1)}}),1e3)},remark:function(t,e){1==e?(this.failRow=t.audit_logs,6!=t.state&&7!=t.state&&5!=t.state||(this.failRow=[]),this.new_reason=t.new_reason,this.reject_reason=""):(this.failRow=[],this.new_reason="",this.reject_reason=t.reject_reason),this.isFailPop=!0},showBigImage:function(t,e,i){if(1==i){var n=this.list[t].screenshots;o.previewImage({urls:n,current:e,indicator:!0})}else{console.log(this.failRow[t],"-*-*-");var s=this.failRow[t].audit_files.split(",");o.previewImage({urls:s,current:e,indicator:!0})}},cancelOrder:function(t){var e=this;o.showModal({title:"温馨提示",content:"是否确认取消订单?",success:function(i){i.confirm&&e.$http.cancelOrder({order_sn:e.list[t].order_sn}).then((function(t){o.showToast({icon:"none",title:t.message}),"200"==t.code&&(e.from.page=1,e.list=[],e.search())}))}})},search:function(){this.$utils.handleLoginNav()||(this.list=[],this.from.page=1,this.getList())},uploadImage:function(t){this.$utils.navRouter("/subpackage/uploadImage/index?order_sn="+this.list[t].order_sn)},uploadVideo:function(t){this.$utils.navRouter("/subpackage/uploadImage/index?order_sn="+this.list[t].order_sn+"&isRoll=1")},copy:function(t){this.$utils.copy(t)},switchTab:function(t){this.$utils.handleLoginNav()||(this.active=t,this.from.state=this.tab[t].key,this.from.page=1,this.ticker&&(clearInterval(this.ticker),this.ticker=null),this.search())},getList:function(){var t=this;this.$http.orderList(this.from).then((function(e){console.log(e,"----"),200==e.code&&(0!=e.data.length?(0!=e.data.data.length&&e.data.data.forEach((function(t){""!=t.screen_shots&&2==t.source?t.screenshots=t.screen_shots.split(","):t.screenshots=[]})),1==t.from.page?t.list=e.data.data:t.list=[].concat((0,n.default)(t.list),(0,n.default)(e.data.data))):t.list=[],0!=t.list.length?t.notTips=!1:t.notTips=!0,t.ticker||0==t.list.length||t.beginTimer())}))},getTotal:function(){var t=this;this.$http.orderStatics().then((function(e){200==e.code&&(console.log(e,"统计------"),t.listTotal={total:e.data.order_number,valid_total:e.data.order_number_valid,valid_user_profit:e.data.order_amount_valid},t.cont=e.data.rule)}))},init:function(){this.search(),this.getTotal(),this.getMtWithdrawalRule()}},props:{type:{type:Number,default:function(){return 0}}},onLoad:function(t){this.active=0,t&&(t.type||0==t.type)&&(this.active=t.type),this.from.state=this.tab[this.active].key,this.from.page=1,this.list=[],this.ticker&&(clearInterval(this.ticker),this.ticker=null),this.$utils.hasLogin()&&this.init()},created:function(){var t=this;o.$on("refreshbwcPhone",(function(){t.init()})),this.active=0,(this.type||0==this.type)&&(this.active=this.type),this.from.state=this.tab[this.active||0].key||"",this.from.page=1,this.list=[],this.ticker&&(clearInterval(this.ticker),this.ticker=null),this.$utils.hasLogin()&&(this.init(),o.$on("refreshbwcList",(function(){t.search()})))},mounted:function(){this.ticker&&(clearInterval(this.ticker),this.ticker=null),this.beginTimer(),o.pageScrollTo({scrollTop:0,duration:0});var t=getCurrentPages().length;this.backLock=1!=t}},a=i(9505),r=(0,(i.n(a)(),i(9453)).default)(s,(function(){var t=this,e=(t.$createElement,t._self._c,t.__map(t.list,(function(e,i){return{$orig:t.__get_orig(e),f0:5!=e.state&&7!=e.state&&6!=e.state&&1==e.state&&""==e.user_order_sn&&1==e.source?t._f("limitTimeFilter")(e.expire_time):null,f1:5!=e.state&&7!=e.state&&6!=e.state&&2==e.source&&e.user_order_sn&&""==e.screen_shots&&1==e.state?t._f("limitTimeFilter")(e.upload_credential_expire_time):null,f2:5!=e.state&&7!=e.state&&6!=e.state&&2==e.source&&""==e.user_order_sn&&1==e.state?t._f("limitTimeFilter")(e.place_order_expire_time):null}}))),i=t.isFailPop?t.failRow.length:null,n=t.isFailPop&&0!=i?t.__map(t.failRow,(function(e,i){return{$orig:t.__get_orig(e),l1:2!=e.audit_status&&3!=e.audit_status||!e.audit_files?null:e.audit_files.split(",")}})):null,o=t.isFailPop?0==t.failRow.length&&t.new_reason&&!t.reject_reason:null,s=t.isFailPop?0==t.failRow.length&&!t.new_reason&&t.reject_reason:null;t._isMounted||(t.e0=function(e,i){var n=arguments[arguments.length-1].currentTarget.dataset,o=n.eventParams||n["event-params"];i=o.index,t.active1=i},t.e1=function(e){t.isFailPop=!1}),t.$mp.data=Object.assign({},{$root:{l0:e,g0:i,l2:n,g1:o,g2:s}})}),[],!1,null,"3faff76a",null,!1,void 0,void 0).exports},8338:function(t,e,i){i.r(e),i.d(e,{default:function(){return r}});var n=i(9510),o=i(7039).default,s={data:function(){return{RankingTop:0,user:{hm_uid:""},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],RankingList:[],cont:"",active:0,time:"",backLock:!1,place_order:{fxOrderConfig:[],order_show_rank_status:!1},max_id:"",total_money:"0",total_count:0,total:0,notTips:!1,imageList:[],list:[],share:{}}},created:function(){var t=this,e=getCurrentPages().length;this.backLock=1!=e,o.$on("refreshbwcPhone",(function(){t.getConfig(),t.getUserInfo(),t.getRewardInfo()})),this.$utils.hasLogin()&&(this.getConfig(),this.getList(),this.getRewardInfo())},onReachBottom:function(){1==this.active&&""!=this.max_id&&this.getList()},methods:{scrollTo:function(){o.pageScrollTo({scrollTop:this.RankingTop,duration:300})},getRewardInfo:function(){var t=this;this.$http.getOrderRank().then((function(e){200==e.code&&(t.RankingList=e.data.list,t.$nextTick((function(){var e=o.getSystemInfoSync();o.createSelectorQuery().in(t).select(".RankingList").boundingClientRect((function(i){i&&i.top?t.RankingTop=i.top-(e.navigationBarHeight||0)-e.statusBarHeight:t.RankingTop=1e3,console.log(t.RankingTop)})).exec()})))}))},getUserInfo:function(){var t=this;this.$http.getUserInfo().then((function(e){200==e.code&&(t.user=e.data.user,t.getShareInfo())}))},getShareInfo:function(){var t=this;this.$common.getSharePath().then((function(e){console.log(e,"分享配置"),t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return o.hideShareMenu(),!1;if(2==t.shareSwitch){var i=t.extend.filter((function(t){return"44"==t.index}));if(0==i.length||"1"!=i[0].switch)return void o.hideShareMenu();e=i[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(i){t.shareTitle=i.shareTitle,t.shareUrl=i.shareUrl,1==t.shareSwitch&&t.pathList.includes("44")||2==t.shareSwitch&&e?o.showShareMenu():o.hideShareMenu()}))}))},switchTab:function(t){this.$utils.handleLoginNav()||(this.active=t,1==t&&(this.max_id="",this.list=[],this.getList()))},getConfig:function(){var t=this;this.$http.getInviteConfig().then((function(e){200==e.code&&e.data.place_order&&(t.place_order=e.data.place_order,t.total=0,t.place_order.fxOrderConfig.forEach((function(e){t.total=parseInt(t.total+1e4*e.superior_reward_money+.5)})),t.total=t.total/1e4,t.cont=t.place_order.description,t.cont=t.cont.replace(/\n/g,"<br />"),t.time=2==t.place_order.date_type?t.place_order.start_time.substring(0,10)+"~"+t.place_order.end_time.substring(0,10):"长期有效")}))},sharePage:function(){this.$utils.handleLoginNav()||o.navigateTo({url:"/pages/myPoster/index"})},getList:function(){var t=this;this.$http.getOrderInviteRecord({max_id:this.max_id}).then((function(e){console.log(e.data,"邀请列表"),200==e.code&&(t.imageList=[],0!=e.data.list.length&&(t.total_money=e.data.total_money,t.total_count=e.data.total_count),t.list=[].concat((0,n.default)(t.list),(0,n.default)(e.data.list)),0!=t.list.length?(t.max_id=t.list[t.list.length-1].id,t.list.forEach((function(e){t.imageList.length<5&&t.imageList.push(e.headimgurl)})),t.notTips=!1):t.notTips=!0)}))}},onShareAppMessage:function(t){var e;return e=o.getStorageSync("isScenes")?"/pages/placeOrder/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/placeOrder/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onShareTimeline:function(t){var e;return e=o.getStorageSync("isScenes")?"/pages/placeOrder/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/placeOrder/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onLoad:function(){this.$utils.hasLogin()&&this.getUserInfo()}},a=i(2932),r=(0,(i.n(a)(),i(9453)).default)(s,(function(){var t=this,e=(t.$createElement,t._self._c,t.place_order.fxOrderConfig.length),i=0!=t.imageList.length||t.place_order.order_show_rank_status&&0!=t.RankingList.length,n=i?t.place_order.order_show_rank_status&&0!=t.RankingList.length:null,o=t.place_order.order_show_rank_status&&0!=t.RankingList.length;t.$mp.data=Object.assign({},{$root:{g0:e,g1:i,g2:n,g3:o}})}),[],!1,null,"4c063932",null,!1,void 0,void 0).exports},8657:function(t,e,i){i.r(e),i.d(e,{default:function(){return a}});var n=i(7039).default,o={data:function(){return{user:{hm_uid:""},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],notYetData:!1,delta:1,cardList:[],cashList:[],couponList:[],scrollTop:0,userInfo:{},keyword:"",bgColor:"#FE2B22",backLock:!1,share:{}}},onPageScroll:function(t){this.scrollTop=t.scrollTop},onLoad:function(t){var e=getCurrentPages().length;this.backLock=1!=e,t.delta&&(this.delta=t.delta),this.$utils.hasLogin()&&this.getUserInfo()},onShareAppMessage:function(){var t;return t=n.getStorageSync("isScenes")?"/subpackage/pointsMall/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/subpackage/pointsMall/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:t,imageUrl:this.shareUrl}},onShareTimeline:function(){var t;return t=n.getStorageSync("isScenes")?"/subpackage/pointsMall/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/subpackage/pointsMall/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:t,imageUrl:this.shareUrl}},created:function(){var t=this;n.$on("refreshbwcPhone",(function(e){t.init(),t.getUserInfo()})),n.$on("Updatepoints",(function(e){t.$common.getUserInfo().then((function(e){t.userInfo=e}))})),this.$utils.hasLogin()&&this.init()},methods:{getUserInfo:function(){var t=this;this.$http.getUserInfo().then((function(e){200==e.code&&(t.user=e.data.user,t.getShareInfo())}))},getShareInfo:function(){var t=this;this.$common.getSharePath().then((function(e){console.log(e,"分享配置"),t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return n.hideShareMenu(),!1;if(2==t.shareSwitch){var i=t.extend.filter((function(t){return"51"==t.index}));if(0==i.length||"1"!=i[0].switch)return void n.hideShareMenu();e=i[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(i){t.shareTitle=i.shareTitle,t.shareUrl=i.shareUrl,1==t.shareSwitch&&t.pathList.includes("51")||2==t.shareSwitch&&e?n.showShareMenu():n.hideShareMenu()}))}))},init:function(){var t=this,e=this.getMyExchange(),i=this.getMoneyList(),n=this.getExpressCoupon();Promise.all([e,i,n]).then((function(e){t.cashList.length||t.cardList.length?t.notYetData=!1:t.notYetData=!0})),this.$common.getUserInfo().then((function(e){t.userInfo=e}))},getMoneyList:function(){var t=this;return new Promise((function(e){t.$http.moneyCardsList({keyword:t.keyword}).then((function(i){200==i.code&&(e(),t.cashList=i.data)}))}))},getMyExchange:function(){var t=this;return new Promise((function(e){t.$http.getMyExchange({keyword:t.keyword}).then((function(i){200==i.code&&(e(),t.cardList=i.data.categorys)}))}))},getExpressCoupon:function(){var t=this;return new Promise((function(e){t.$http.getExpressCoupon({keyword:t.keyword}).then((function(i){200==i.code&&(e(),t.couponList=i.data.categorys)}))}))},search:function(){if(!this.$utils.handleLoginNav()){if(!this.keyword)return n.showToast({title:"请输入关键字",icon:"none",duration:2e3});this.getMyExchange(),this.getExpressCoupon(),this.getMoneyList()}},reset:function(){this.keyword="",this.getMyExchange(),this.getExpressCoupon(),this.getMoneyList()},nav:function(t,e){this.$utils.handleLoginNav()||(0==t?this.$utils.navRouter("/subpackage/pointsMall/exchangeRecord/index"):1==t?this.$utils.navRouter("/subpackage/pointsMall/pointsExchange/index?id="+e.id+"&score="+e.score+"&item_type="+e.item_type+"&describe="+e.describe):2==t?this.$utils.navRouter("/subpackage/pointsMall/cashExchange/index?data="+JSON.stringify(e)):3==t&&this.$utils.navRouter("/subpackage/pointsMall/myIntegral/index"))}}},s=i(3927),a=(0,(i.n(s)(),i(9453)).default)(o,(function(){var t=this,e=(t.$createElement,t._self._c,t.cashList.length),i=t.cardList.length,n=t.couponList.length;t.$mp.data=Object.assign({},{$root:{g0:e,g1:i,g2:n}})}),[],!1,null,"0818cad3",null,!1,void 0,void 0).exports},6210:function(t,e,i){i.r(e),i.d(e,{default:function(){return r}});var n=i(9510),o=i(7039).default,s={data:function(){return{user:{hm_uid:""},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],RankingList:[],cont:"",active:0,invite:{},time:"",list:[],max_id:"",total_money:"0",total_count:0,notTips:!1,imageList:[],rankList:[],backLock:!1,share:{}}},created:function(){var t=this,e=getCurrentPages().length;this.backLock=1!=e,o.$on("refreshbwcPhone",(function(){t.getConfig(),t.getUserInfo()})),this.$utils.hasLogin()&&(this.getConfig(),this.getList(),this.getRewardInfo())},onReachBottom:function(){1==this.active&&""!=this.max_id&&this.getList()},methods:{scrollTo:function(){o.pageScrollTo({scrollTop:this.RankingTop,duration:300})},getUserInfo:function(){var t=this;this.$http.getUserInfo().then((function(e){200==e.code&&(t.user=e.data.user,t.getShareInfo())}))},getShareInfo:function(){var t=this;this.$common.getSharePath().then((function(e){console.log(e,"分享配置"),t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return o.hideShareMenu(),!1;if(2==t.shareSwitch){var i=t.extend.filter((function(t){return"45"==t.index}));if(0==i.length||"1"!=i[0].switch)return void o.hideShareMenu();e=i[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(i){t.shareTitle=i.shareTitle,t.shareUrl=i.shareUrl,1==t.shareSwitch&&t.pathList.includes("45")||2==t.shareSwitch&&e?o.showShareMenu():o.hideShareMenu()}))}))},getRewardInfo:function(){var t=this;this.$http.getRewardInfo().then((function(e){200==e.code&&(t.RankingList=e.data.list,t.$nextTick((function(){var e=o.getSystemInfoSync();o.createSelectorQuery().in(t).select(".RankingList").boundingClientRect((function(i){i&&i.top?t.RankingTop=i.top-(e.navigationBarHeight||0)-e.statusBarHeight:t.RankingTop=1e3,console.log(t.RankingTop)})).exec()})))}))},switchTab:function(t){this.$utils.handleLoginNav()||(this.active=t,1==this.active&&(this.max_id="",this.list=[],this.getList()))},getConfig:function(){var t=this;this.$http.getInviteConfig().then((function(e){200==e.code&&e.data.invite&&(t.invite=e.data.invite,t.cont=t.invite.description,t.cont=t.cont.replace(/\n/g,"<br />"),t.time=2==t.invite.date_type?t.invite.start_time.substring(0,10)+"~"+t.invite.end_time.substring(0,10):"长期有效")}))},sharePage:function(){this.$utils.handleLoginNav()||o.navigateTo({url:"/pages/myPoster/index"})},getList:function(){var t=this;this.$http.getInviteRecord({max_id:this.max_id}).then((function(e){console.log(e,"邀请列表"),200==e.code&&(t.imageList=[],0!=e.data.list.length&&(t.total_money=e.data.total_money,t.total_count=e.data.total_count),t.list=[].concat((0,n.default)(t.list),(0,n.default)(e.data.list)),0!=t.list.length?(t.max_id=t.list[t.list.length-1].id,t.list.forEach((function(e,i){i<5&&t.imageList.push(e.headimgurl)})),t.notTips=!1):t.notTips=!0)}))}},onShareAppMessage:function(t){var e;return e=o.getStorageSync("isScenes")?"/pages/pullNewActivity/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/pullNewActivity/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onShareTimeline:function(t){var e;return e=o.getStorageSync("isScenes")?"/pages/pullNewActivity/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/pullNewActivity/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onLoad:function(){this.$utils.hasLogin()&&this.getUserInfo()}},a=i(3957),r=(0,(i.n(a)(),i(9453)).default)(s,(function(){var t=this,e=(t.$createElement,t._self._c,0!=t.imageList.length||t.invite.show_rank_status&&0!=t.RankingList.length),i=e?t.invite.show_rank_status&&0!=t.RankingList.length:null,n=t.invite.show_rank_status&&0!=t.RankingList.length;t.$mp.data=Object.assign({},{$root:{g0:e,g1:i,g2:n}})}),[],!1,null,"105310f4",null,!1,void 0,void 0).exports},5204:function(t,e,i){i.r(e),i.d(e,{default:function(){return r}});var n=i(7039).default,o=i(8793).default,s={components:{templateOne:function(){i.e("pages/signReach/components/templateOne/index").then(function(){return resolve(i(3266))}.bind(null,i)).catch(i.oe)},templateTwo:function(){i.e("pages/signReach/components/templateTwo/index").then(function(){return resolve(i(7704))}.bind(null,i)).catch(i.oe)}},data:function(){return{user:{hm_uid:""},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],isLogin:!1,backLock:!1,configInfo:{checkin:{skin:0,status:1},user:{}},phone:"",cardIndex:0,msgRemindLock:!0,pageLock:!1,navHeight:0,score:0,share:{}}},computed:{templateOneActive:function(){return 1==this.configInfo.checkin.skin&&this.configInfo.checkin.status&&this.pageLock},templateTwoActive:function(){return 2==this.configInfo.checkin.skin&&this.configInfo.checkin.status&&this.pageLock}},created:function(){var t=this,e=getCurrentPages().length;if(this.backLock=1!=e,n.$on("refreshbwcPhone",(function(){t.getConfig(),t.getUserInfo()})),!this.$utils.hasLogin())return this.isLogin=!0,!1;this.isLogin=!1,n.getStorageSync("bwcphone")&&(this.phone=n.getStorageSync("bwcphone")),this.getConfig()},methods:{getUserInfo:function(){var t=this;this.$http.getUserInfo().then((function(e){200==e.code&&(t.user=e.data.user,t.getShareInfo())}))},getShareInfo:function(){var t=this;this.$common.getSharePath().then((function(e){console.log(e,"分享配置"),t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return!1;if(2==t.shareSwitch){var i=t.extend.filter((function(t){return"50"==t.index}));if(0==i.length||"1"!=i[0].switch)return void n.hideShareMenu();e=i[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(i){t.shareTitle=i.shareTitle,t.shareUrl=i.shareUrl,1==t.shareSwitch&&t.pathList.includes("50")||2==t.shareSwitch&&e?n.showShareMenu():n.hideShareMenu()}))}))},login:function(){this.$utils.handleLoginNav()},getNavHeight:function(t){this.navHeight=t},elmMtQuery:function(t){0==t?this.getLinkInfo(1,t):1==t&&this.getLinkInfo(4,t)},getConfig:function(){var t=this;this.$http.checkinInfo({}).then((function(e){200==e.code&&(t.pageLock=!0,t.configInfo=e.data)}))},setMsgRemind:function(t,e){var i=this;if(this.msgRemindLock){10==t&&1==e&&o.getSetting({withSubscriptions:!0,success:function(t){t.subscriptionsSetting&&t.subscriptionsSetting.mainSwitch?o.requestSubscribeMessage({tmplIds:i.configInfo.checkin.remind_template_id.split(","),success:function(t){},fail:function(t){setTimeout((function(){n.showToast({title:"不正确的小程序模板消息id，"+t.errCode,icon:"none",duration:2500})}),200)}}):o.openSetting()},fail:function(){o.requestSubscribeMessage({tmplIds:i.configInfo.checkin.remind_template_id.split(","),success:function(t){},fail:function(t){setTimeout((function(){n.showToast({title:"不正确的小程序模板消息id，"+t.errCode,icon:"none",duration:2500})}),200)}})}}),this.msgRemindLock=!1;var s={};0==e?s.remind_hm=t+":00":s.remind_status=t,this.$http.setRemind(s).then((function(n){i.msgRemindLock=!0,200==n.code&&(0==e?i.configInfo.user.remind_hm=t:i.configInfo.user.remind_status=t)}))}},navLink:function(t){var e=this;this.configInfo.checkin.remind_mini_status&&10==this.configInfo.checkin.mode?o.getSetting({withSubscriptions:!0,success:function(i){i.subscriptionsSetting&&i.subscriptionsSetting.mainSwitch?e.sendMpTipsNews(t):o.openSetting()},fail:function(){e.sendMpTipsNews(t)}}):this.hitCard(t)},sendMpTipsNews:function(t){var e=this;o.requestSubscribeMessage({tmplIds:this.configInfo.checkin.remind_template_id.split(","),success:function(i){e.hitCard(t)},fail:function(t){setTimeout((function(){n.showToast({title:"不正确的小程序模板消息id，"+t.errCode,icon:"none",duration:2500})}),200)}})},hitCard:function(t){var e=this;if(0==t&&!this.$globalData.GET("mt"))return this.elmMtQuery(t);if(1==t&&!this.$globalData.GET("elm"))return this.elmMtQuery(t);n.hideLoading();var i;i=0==t?this.$globalData.GET("mt"):this.$globalData.GET("elm"),n.navigateToMiniProgram({appId:i.mini_appid,path:i.mini_path,success:function(i){1!=e.configInfo.user.is_checkin&&e.configInfo.checkin.status&&e.$http.checkin({type:0==t?10:20}).then((function(t){200==t.code&&(e.getConfig(),20==e.configInfo.checkin.mode&&(e.$refs.popup3.show(),e.score=t.data.score))}))}})},getLinkInfo:function(t,e){var i=this;this.$http.getShare({link_id:t,is_mini:1,is_mini_qrcode:1}).then((function(n){200==n.code&&(4==t?i.$globalData.SET("elm",n.data):i.$globalData.SET("mt",n.data),i.hitCard(e))}))},getPhone:function(t){var e=this;(t&&t.detail.encryptedData||this.phone)&&(this.phone?this.$refs.popup2.show():this.$http.getPhone({encryptedData:t.detail.encryptedData,iv:t.detail.iv}).then((function(t){if(200==t.code){if(!t.data.telphone)return n.showToast({title:"解密失败，请先移除小程序后重试！",icon:"none",duration:2e3});e.phone=t.data.telphone,n.setStorageSync("phone",e.phone),e.$refs.popup2.show()}})))},exchange:function(){var t=this;if(!this.configInfo.cards||!this.configInfo.cards[this.cardIndex])return n.showToast({title:"请选择兑换卡券",icon:"none",duration:2e3});this.$http.checkinExchange({telphone:this.phone,card_id:this.configInfo.cards[this.cardIndex].id}).then((function(e){200==e.code&&n.showToast({title:"兑换成功",icon:"none",duration:2e3}),t.$refs.popup2.hide(),setTimeout((function(){t.getConfig(),10==t.configInfo.checkin.kf_qr_status&&t.$refs.popup1.show(),n.removeStorageSync("phone"),t.phone=""}),2e3)}))},preserveCode:function(){var t=this;n.getImageInfo({src:this.configInfo.checkin.kf_qr_img,success:function(e){n.saveImageToPhotosAlbum({filePath:e.path,success:function(e){t.$refs.popup1.hide(),n.showToast({title:"保存成功",icon:"success",duration:2e3})}})}})},msgTips:function(){n.showToast({title:"你已兑换过卡券啦，如需帮助可联系公众号客服~",icon:"none",duration:3e3})},nav:function(){var t=getCurrentPages().length;console.log(t,"----"),1==t?n.redirectTo({url:"/pages/home/index?current=36"}):n.navigateBack({delta:1})}},onShareAppMessage:function(t){var e;return e=n.getStorageSync("isScenes")?"/pages/signReach/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/signReach/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onShareTimeline:function(t){var e;return e=n.getStorageSync("isScenes")?"/pages/signReach/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/signReach/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onLoad:function(){this.$utils.hasLogin()&&this.getUserInfo()}},a=i(391),r=(0,(i.n(a)(),i(9453)).default)(s,(function(){var t=this;t.$createElement;t._self._c,t._isMounted||(t.e0=function(e){return t.$refs.popup.show()},t.e1=function(e){return t.$refs.popup.show()},t.e2=function(e){return t.$refs.popup.hide()},t.e3=function(e){return t.$refs.popup1.hide()},t.e4=function(e,i){var n=arguments[arguments.length-1].currentTarget.dataset,o=n.eventParams||n["event-params"];i=o.index,t.cardIndex=i},t.e5=function(e){return t.$refs.popup2.hide()},t.e6=function(e){return t.$refs.popup3.hide()})}),[],!1,null,"648d1cf5",null,!1,void 0,void 0).exports},2103:function(t,e,i){i.r(e),i.d(e,{default:function(){return r}});var n=i(7028),o=i(7039).default,s={data:function(){var t;return t={user:{hm_uid:""},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],backLock:!1},(0,n.default)(t,"user",{score:0}),(0,n.default)(t,"integral_config",{sign_in:0,lottery_turntable:0,invite:0,place_order:0,credits_exchange:0}),(0,n.default)(t,"checkinInfo",!1),(0,n.default)(t,"empty_list",[]),(0,n.default)(t,"isShow",!1),(0,n.default)(t,"share",{}),t},methods:{getUserInfo:function(){var t=this;this.$http.getUserInfo().then((function(e){200==e.code&&(t.user=e.data.user,t.getShareInfo())}))},getShareInfo:function(){var t=this;this.$common.getSharePath().then((function(e){t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return o.hideShareMenu(),!1;if(2==t.shareSwitch){var i=t.extend.filter((function(t){return"43"==t.index}));if(0==i.length||"1"!=i[0].switch)return void o.hideShareMenu();e=i[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(i){t.shareTitle=i.shareTitle,t.shareUrl=i.shareUrl,1==t.shareSwitch&&t.pathList.includes("43")||2==t.shareSwitch&&e?o.showShareMenu():o.hideShareMenu()}))}))},receive:function(t){this.$utils.handleLoginNav()||this.$utils.publicNavigation(this.empty_list[t])},getCouponList:function(){var t=this;this.$http.getbwcCouponList().then((function(e){200==e.code&&(t.empty_list=e.data.empty_list,t.isShow=!0)}))},randomNumber:function(){return this.$utils.random(150,500)},init:function(){var t=this;this.$http.getInviteConfig().then((function(e){200==e.code&&(console.log(e,"配置----"),e.data.integral_config&&(t.integral_config=e.data.integral_config,!t.integral_config||t.integral_config.sign_in||t.integral_config.place_order||t.integral_config.invite||t.integral_config.lottery_turntable||t.integral_config.credits_exchange?t.isShow=!1:t.getCouponList()))})),this.$http.getUserInfo().then((function(e){console.log(e,"个人信息----"),200==e.code&&(t.user=e.data.user)})),this.$http.checkinInfo({}).then((function(e){200==e.code&&(t.checkinInfo=e.data.user.is_checkin)}))},jump:function(t){if(!this.$utils.handleLoginNav()){var e="";1==t?e="/pages/signReach/index":2==t?e="/pages/pullNewActivity/index":3==t?e="/pages/luckDraw/index":4==t&&(e="/pages/pointsMall/index"),o.navigateTo({url:e})}},backHome:function(){1==getCurrentPages().length?"/pages/home/index"!=getCurrentPages()[0].route?this.$utils.navRouter("/pages/home/index?current=36"):o.$emit("setCurrent",{current_id:36}):o.navigateBack({delta:1})}},created:function(){var t=this,e=getCurrentPages().length;this.backLock=1!=e,o.$once("refreshbwcPhone",(function(){t.init(),t.getUserInfo()})),this.$utils.hasLogin()&&this.init()},onLoad:function(){this.$utils.hasLogin()&&this.getUserInfo()},onShareAppMessage:function(t){var e;return e=o.getStorageSync("isScenes")?"/pages/welfare/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/welfare/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onShareTimeline:function(t){var e;return e=o.getStorageSync("isScenes")?"/pages/welfare/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/welfare/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}}},a=i(2665),r=(0,(i.n(a)(),i(9453)).default)(s,(function(){var t=this,e=(t.$createElement,t._self._c,t.isShow?t.__map(t.empty_list,(function(e,i){return{$orig:t.__get_orig(e),m0:t.randomNumber()}})):null);t.$mp.data=Object.assign({},{$root:{l0:e}})}),[],!1,null,"29fc4a78",null,!1,void 0,void 0).exports},810:function(t,e,i){i.r(e),i(5476);var n=i(2074),o=i(7690),s=i(9297),a=i(9466),r=i(2103),c=i(8338),h=i(6210),u=i(4183),l=i(2072),d=i(6272),g=i(5204),f=i(8657),p=i(9910),m=i(7039).default,_={data:function(){return{scrollTop:0,jumppop:!1,jumpAppid:"",switchType:"",pathList:[],type:"",bwcLock:!1,libraryLock:!1,orderlistLock:!1,myLock:!1,welfareLock:!1,placeOrderLock:!1,pullnewactivityLock:!1,myFansLock:!1,myPosterLock:!1,myOrderLock:!1,teamOrderLock:!1,signReachLock:!1,pointsMallLock:!1,luckDrawLock:!1,shareTitle:"",shareUrl:"",shareSwitch:1,extend:[],share:{},tabList:[],options:{},current:0,user:{hm_uid:""},tabbars:[{current:36,icon:"https://img.yunzhanxinxi.com/static/mini/new_bottom_button/bawangcan_home.png",icon_on:"https://img.yunzhanxinxi.com/static/mini/new_bottom_button/bawangcan_home.png",id:34,is_default:1,jump_config:{id:-1,current:36,url:"",original_id:"",appid:"",pagepath:""},jump_type:4,name:"首页",new_icon:"https://img.yunzhanxinxi.com/static/mini/new_bottom_button/bawangcan_home.png",scene_template_ids:[4,11,12,13,14,15],select_img:"",select_text_color:"",unselect_img:"",unselect_text_color:""},{current:37,icon:"https://img.yunzhanxinxi.com/static/mini/new_bottom_button/bawangcan_dingdan.png",icon_on:"https://img.yunzhanxinxi.com/static/mini/new_bottom_button/bawangcan_dingdan.png",id:35,is_default:0,jump_config:{id:-1,current:37,url:"",original_id:"",appid:"",pagepath:""},jump_type:4,name:"订单",new_icon:"https://img.yunzhanxinxi.com/static/mini/new_bottom_button/bawangcan_dingdan.png",scene_template_ids:[4,11,12,13,14,15],select_img:"",select_text_color:"",unselect_img:"",unselect_text_color:""},{current:38,icon:"https://img.yunzhanxinxi.com/static/mini/new_bottom_button/bawangcan_wode.png",icon_on:"https://img.yunzhanxinxi.com/static/mini/new_bottom_button/bawangcan_wode.png",id:36,is_default:0,jump_config:{id:-1,current:38,url:"",original_id:"",appid:"",pagepath:""},jump_type:4,name:"我的",new_icon:"https://img.yunzhanxinxi.com/static/mini/new_bottom_button/bawangcan_wode.png",scene_template_ids:[4,11,12,13,14,15],select_img:"",select_text_color:"",unselect_img:"",unselect_text_color:""}]}},components:{bwc:n.default,library:o.default,orderlist:s.default,my:a.default,welfare:r.default,placeOrder:c.default,pullnewactivity:h.default,myFans:u.default,myPoster:l.default,myOrder:d.default,teamOrder:d.default,signReach:g.default,pointsMall:f.default,luckDraw:p.default},onPageScroll:function(t){this.bwcLock&&(this.$refs.bwc.scrollTop=t.scrollTop)},onReachBottom:function(){36==this.current?this.$refs.bwc.pullUp():32==this.current?this.$refs.library.getList():37==this.current?this.$refs.orderlist.pullUp():44==this.current?this.$refs.placeOrder.getList():45==this.current?this.$refs.pullnewactivity.getList():48==this.current?this.$refs.myOrder.pullUp(1):49==this.current?this.$refs.teamOrder.pullUp(2):46==this.current&&this.$refs.myFans.pullUp()},onLoad:function(t){var e=this;this.init(t),m.$on("login",(function(){console.log(t,"-----------"),e.init(t),e.$utils.hasLogin()&&e.getUserInfo()})),m.$on("bindPhonePop",(function(){e.$refs.notPhone.show()})),m.$on("setCurrent",(function(t){var i=!1;(t.type||0==t.type)&&(e.type=t.type),e.tabList.forEach((function(e){e.current==t.current_id&&(i=!0)})),i?(e.current=t.current_id,e.switchTab(e.current)):m.navigateTo({url:"/pages/orderlist/index?type="+e.type})}))},onShow:function(){var t=this;this.$store.state.micro_scene?this.$http.getMiniSkipInfo().then((function(e){console.log(e,"跳转路径"),200==e.code&&(null!=e.data&&"1"==e.data.switch?(t.jumpAppid=e.data.appid,m.hideShareMenu(),t.jumppop=!0):(t.jumpAppid="",t.jumppop=!1))})):(this.jumpAppid="",this.jumppop=!1),this.$utils.hasLogin()&&this.getUserInfo()},onShareAppMessage:function(t){var e;return e=m.getStorageSync("isScenes")?"/pages/home/index?current="+this.current+"&uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/home/index?current="+this.current+"&uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onShareTimeline:function(t){var e;return e=m.getStorageSync("isScenes")?"/pages/home/index?current="+this.current+"&uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/home/index?current="+this.current+"&uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},methods:{JumpMiniProgram:function(){m.navigateToMiniProgram({appId:this.jumpAppid,path:"",success:function(t){}})},init:function(t){0==t.current&&(t.current=36),t.current&&(this.options=t),m.getStorageSync("isScenes")?(this.tabList=this.tabbars,this.tabList&&this.tabList.length&&(this.current=this.tabList[0].jump_config.current),this.options&&(this.options.current||0==this.options.current)&&(this.current=this.options.current),this.switchTab(this.current)):this.getTabbarSet()},getUserInfo:function(){var t=this;this.$http.getUserInfo().then((function(e){console.log(e,"个人信息----"),200==e.code&&(t.user=e.data.user,t.getbwcShare())}))},getTabbarSet:function(){var t=this;this.$http.getTabbar().then((function(e){console.log(e.data.tabbars,"底部菜单设置----"),200==e.code&&(t.tabList=e.data.tabbars,t.tabList&&t.tabList.length&&(t.current=t.tabList[0].jump_config.current),t.options&&(t.options.current||0==t.options.current)?t.current=t.options.current:t.tabList.forEach((function(e){1==e.is_default&&(t.current=e.jump_config.current)})),t.switchTab(t.current))}))},navTab:function(t,e){console.log(t,"----"),37==t&&(this.type=0),this.jumpAppid||(this.current=t,this.switchTab(t,e))},switchTab:function(t,e){var i=this;0==t&&(this.tabList.filter((function(t){return t.jump_config&&0==t.jump_config.current}))[0]||(t=this.tabList[0].jump_config.current));var n={jump_type:4};if(this.tabList.forEach((function(t){t.jump_config&&t.jump_config.current})),1==n.jump_type)this.$utils.publicNavigation(n);else if(2==n.jump_type)this.$utils.publicNavigation(n);else if(3==n.jump_type||5==n.jump_type){if(n.jump_config&&11==n.jump_config.id){if(!this.phone||!this.filmLink)return;return void this.$utils.navRouter("/subpackage/webView/h5?type=2&url="+encodeURIComponent(this.filmLink))}this.$utils.publicNavigation(n)}else if(4==n.jump_type){if(-1==t)return n.jump_config&&n.jump_config.pagepath?void this.$utils.navRouter(n.jump_config.pagepath):utils.showToast("jump_type:4，小程序 path 不存在!",3e3);if(this.bwcLock=!1,this.libraryLock=!1,this.orderlistLock=!1,this.myLock=!1,this.welfareLock=!1,this.placeOrderLock=!1,this.pullnewactivityLock=!1,this.myFansLock=!1,this.myPosterLock=!1,this.myOrderLock=!1,this.teamOrderLock=!1,this.signReachLock=!1,this.pointsMallLock=!1,this.luckDrawLock=!1,e&&(this.options={}),36==t?this.bwcLock=!0:32==t?(m.setNavigationBarTitle({title:"素材库"}),this.libraryLock=!0):37==t?(m.setNavigationBarTitle({title:"订单"}),this.orderlistLock=!0):38==t?(m.setNavigationBarTitle({title:""}),this.myLock=!0):43==t?(m.setNavigationBarTitle({title:"超值福利"}),this.welfareLock=!0):44==t?(m.setNavigationBarTitle({title:"下单奖励活动"}),this.placeOrderLock=!0):45==t?(m.setNavigationBarTitle({title:"邀请好友"}),this.pullnewactivityLock=!0):46==t?(m.setNavigationBarTitle({title:"我的好友"}),this.myFansLock=!0):47==t?(m.setNavigationBarTitle({title:"我的海报"}),this.myPosterLock=!0):48==t?(m.setNavigationBarTitle({title:"我的订单"}),this.myOrderLock=!0,this.$nextTick((function(){i.$refs.myOrder.getList()}))):49==t?(m.setNavigationBarTitle({title:"团队订单"}),this.teamOrderLock=!0,this.$nextTick((function(){i.$refs.teamOrder.getList()}))):50==t?(m.setNavigationBarTitle({title:"签到打卡"}),this.signReachLock=!0):51==t?(m.setNavigationBarTitle({title:"积分商城"}),this.pointsMallLock=!0):52==t&&(m.setNavigationBarTitle({title:"转盘抽奖"}),this.luckDrawLock=!0),!this.$utils.hasLogin())return;this.getbwcShare(),m.$emit("setCardNavTab",!0)}},getStatus:function(){var t=this;this.$http.getbwcIsAudit().then((function(e){if(200==e.code){m.hideLoading();var i=e.data.is_audit;console.log(i,"-*-*-"),1==i?t.libraryLock=!0:t.orderlistLock=!0}}))},getbwcShare:function(){var t=this;this.$common.getSharePath().then((function(e){console.log(e,"分享配置"),t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return m.hideShareMenu(),!1;if(2==t.shareSwitch){var i=t.extend.filter((function(e){return e.index==t.current}));if(0==i.length||"1"!=i[0].switch)return void m.hideShareMenu();e=i[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(i){console.log(i,t.current,"分享"),t.shareTitle=i.shareTitle,t.shareUrl=i.shareUrl,1==t.shareSwitch&&t.pathList.includes(""+t.current)||2==t.shareSwitch&&e?m.showShareMenu():m.hideShareMenu()}))}))}}},v=i(709),w=(0,(i.n(v)(),i(9453)).default)(_,(function(){this.$createElement;this._self._c}),[],!1,null,"0d5ef94d",null,!1,void 0,void 0).exports,y=i(8793).default,S=i(7039).createPage;y.__webpack_require_UNI_MP_PLUGIN__=i,S(w)},1762:function(t,e,i){i.r(e),i.d(e,{default:function(){return b}});var n=i(7028),o=i(5476),s=i(5293),a=(i(214),i(2412)),r=i(188),c=i(7039).default,h=i(8793).default,u={data:{micro_scene:"",addWxCardLock:!1,hasClosed:!1,sceneArr:[1007,1008,1011,1012,1013,1014,1047,1048,1049,1058,1067,1073,1074,1081,1082,1091,1095,1096,1102,1107,1157,1160,1167,1185,1208]},onLaunch:function(t){console.log("App Launch",t,this.$route,this.$store),this.initMini(t)},onShow:function(t){var e=this;console.log("App Show",t),console.log("后台进入前台");var i,n,o,a,r;this.hasClosed&&["pages/home/index","subpackage/activity/index","pages/bwc/index","pages/welfare/index","pages/placeOrder/index","pages/pullnewactivity/index","pages/myPoster/index","subpackage/businessSettleIn/index","pages/signReach/index","pages/pointsMall/index","pages/luckDraw/index","subpackage/redPacket/index"].includes(t.path)&&((null!==(i=t.query)&&void 0!==i&&i.uid||t.uid)&&(this.$store.commit("setUid",(null===(r=t.query)||void 0===r?void 0:r.uid)||t.uid),console.log(this.$store.state.uid,"uid-------------")),(null!==(n=t.query)&&void 0!==n&&n.micro_scene||t.micro_scene)&&this.initMini(t),(null!==(o=t.query)&&void 0!==o&&o.uri||t.uri||null!==(a=t.query)&&void 0!==a&&a.scene)&&this.initMini(t));this.updateMini(),this.sceneArr.indexOf(t.scene-0)>=0&&(this.hasClosed&&this.addWxCardLock?(this.addWxCardLock=!1,this.hasClosed=!1,console.log("刚从卡券返回，不再打开")):setTimeout((function(){var i;(null!=t&&null!==(i=t.query)&&void 0!==i&&i.card_id||t.card_id)&&!e.$store.state.token&&(0,s.default)(),e.addWxCard(t)}),100))},onHide:function(){console.log("App Hide"),this.hasClosed=!0},methods:{initMini:function(t){var e,i,n,o,a,r,h,u=this;if(console.log(t,"--------小程序---"),this.$store.commit("setToken",""),this.$store.commit("setSceneToken",""),c.removeStorageSync("token"),c.removeStorageSync("scene_token"),console.log(c.getAccountInfoSync().miniProgram.appId,"appid"),this.$store.commit("setAppid",c.getAccountInfoSync().miniProgram.appId),null!==(e=t.query)&&void 0!==e&&e.uid?this.$store.commit("setUid",t.query.uid):t.uid&&this.$store.commit("setUid",t.uid),null!==(i=t.query)&&void 0!==i&&i.micro_scene?(this.$store.commit("setMicroScenes",t.query.micro_scene),this.micro_scene=null===(r=t.query)||void 0===r?void 0:r.micro_scene):t.micro_scene?(this.$store.commit("setMicroScenes",t.micro_scene),this.micro_scene=t.micro_scene):(this.$store.commit("setMicroScenes",""),this.micro_scene=""),null!==(n=t.query)&&void 0!==n&&n.utm_source?this.$store.commit("setUtmSource",t.query.utm_source):t.utm_source?this.$store.commit("setUtmSource",t.utm_source):this.$store.commit("setUtmSource",""),null!==(o=t.query)&&void 0!==o&&o.uri)c.setStorageSync("redPackUri",null===(h=t.query)||void 0===h?void 0:h.uri);else if(t.uri)c.setStorageSync("redPackUri",t.uri);else if(null!==(a=t.query)&&void 0!==a&&a.scene){var l;c.setStorageSync("redPackUri",decodeURIComponent(null===(l=t.query)||void 0===l?void 0:l.scene).split("=")[1])}else c.setStorageSync("redPackUri","");decodeURIComponent(t.scene).split("&").every((function(t){var e=t.split("=");return"uid"==e[0]?(u.$store.commit("setUid",e[1]||""),!1):"micro_scene"!=e[0]||(u.$store.commit("setMicroScenes",e[1]||""),!1)})),this.$store.state.micro_scene?this.$http.getMiniSkipInfo().then((function(t){200==t.code&&(null!=t.data&&"0"!=t.data.switch||(0,s.default)())})):(0,s.default)(),c.$once("login",(function(){console.log(t,"onlaunch中 登陆后执行"),u.sceneArr.indexOf(t.scene-0)>=0&&u.addWxCard(t)}))},initH5:function(t){var e=this;if(console.log(t,"H5传参"),r.default.SET("h5QueryInfo",t),c.removeStorageSync("access_token"),t.uid&&this.$store.commit("setUid",t.uid),t.miniEnAccounts&&c.setStorageSync("miniEnAccounts",t.miniEnAccounts),t.pid&&this.$store.commit("setPid",t.pid),c.setStorageSync("url",location.href.split("#")[0]),t.miniEnPid&&this.$store.commit("setMiniEnPid",t.miniEnPid),t.hm_scene&&this.$store.commit("setScene",t.hm_scene),this.$store.commit("setRandomPath",this.$route.params.randompath||(new Date).getTime()),t.appid)c.removeStorageSync("accountsId"),c.removeStorageSync("miniEnAccounts"),c.removeStorageSync("new_plan_source"),this.$store.commit("setAppid",a.default.getUrlParam("appid")),c.setStorageSync("appid",a.default.getUrlParam("appid"));else if(t.accountsId)return console.log(t.accountsId,c.getStorageSync("accountsId"),"-------accountsId---------"),t.access_token&&c.setStorageSync("access_token",t.access_token),t.realName?(c.setStorageSync("miniEnAccounts",t.miniEnAccounts),console.log(c.getStorageInfoSync("miniEnAccounts"),"miniEnAccounts----")):c.getStorageSync("accountsId")!=t.accountsId&&(c.removeStorageSync("miniEnAccounts"),c.removeStorageSync("bwcPhone")),t.new_plan_source?c.setStorageSync("new_plan_source",t.new_plan_source):c.removeStorageSync("new_plan_source"),c.removeStorageSync(c.getStorageSync("appid")),c.removeStorageSync("appid"),c.removeStorageSync("appidLogin"),c.setStorageSync("accountsId",t.accountsId),void this.$store.commit("setAccountsId",t.accountsId);c.$once("login",(function(){t.card_id&&e.addWxCard(t)})),console.log("=========".concat(this.$store.state.appid+"="+this.$store.state.token+"="+this.$store.state.kuaiditoken+"="+this.$store.state.phone,"==========="));var i="";c.getStorageSync("H5code")!=a.default.getUrlParam("code")&&(i=a.default.getUrlParam("code")),c.getStorageSync("accountsId")||this.$http.h5Login({code:i,appid:a.default.getUrlParam("appid")||"",invite_id:a.default.getUrlParam("uid")||"",authorize_type:a.default.getUrlParam("authorize_type")||0}).then((function(t){200==t.code&&t.data.token&&(console.log(t,"登录--"),c.setStorageSync("appid",t.data.appid),c.setStorageSync("H5code",a.default.getUrlParam("code")),e.$store.commit("setAppid",t.data.appid),c.setStorageSync(c.getStorageSync("appid"),t.data.token),e.$store.state.appid&&c.setStorageSync("appidLogin",!0),t.data.mobile?(c.setStorageSync("bwcPhone",t.data.mobile),c.$emit("refreshbwcPhone")):c.removeStorageSync("bwcPhone"),c.$emit("login",{login:!0}),console.log(location.search,"路径------------"),"/"==e.$route.path&&(e.$store.commit("setlocationSearch",location.search),c.getStorageSync("new_plan_source")?c.reLaunch({url:"/pages/home/index1/"+(e.$store.state.randompath||(new Date).getTime())+(location.search?"&":"?")+"uid="+t.data.uid+"&new_plan_source="+c.getStorageSync("new_plan_source")}):c.reLaunch({url:"/pages/home/index1/"+(e.$store.state.randompath||(new Date).getTime())+(location.search?"&":"?")+"uid="+t.data.uid})))}))},updateMini:function(){if(c.canIUse("getUpdateManager")){var t=c.getUpdateManager();t.onCheckForUpdate((function(e){e&&(t.onUpdateReady((function(){c.showModal({title:"更新提示",content:"新版本已经准备好，是否重启应用？",success:function(e){e.confirm&&t.applyUpdate()}})})),t.onUpdateFailed((function(){c.showModal({title:"已经有新版本了哟~",content:"新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"})})))}))}else{"微信",c.showModal({title:"提示",content:"当前".concat("微信","版本过低，请更新").concat("微信","版本！"),success:function(t){t.confirm&&h.updateWeChatApp()}})}},addWxCard:function(t){var e;if(console.log("addWxCard","addWxCard 方法 刚进入"),this.$utils.hasLogin()){console.log("addWxCard","addWxCard 方法 用户已经登录");var i=this;if(null!==(e=t.query)&&void 0!==e&&e.card_id||t.card_id){var n;console.log("addWxCard","参数中包含card_id");var o=(null===(n=t.query)||void 0===n?void 0:n.card_id)||t.card_id;i.$http.getWxCardInfo({card_id:o}).then((function(t){if(200==t.code){if(console.log("addWxCard","正常获取到cardinfo"),i.addWxCardLock)return;i.addWxCardLock=!0;var e="",n=getCurrentPages();n&&n.length&&(e=n[n.length-1].route),console.log(t.data,e,"霸王餐信息",t.data.receiving_status);var s=t.data.authorizer_appid;if(1==t.data.boot_page_status&&-1==e.indexOf("/subpackage/cardboot/index"))return i.$globalData.SET("card",t.data.card_info,"cardinfo"),i.$globalData.SET("card",t.data.card_color,"cardcolor"),i.$globalData.SET("card",s,"appid"),i.$globalData.SET("card",o,"cardid"),i.$globalData.SET("card",t.data.receiving_status,"receiving_status"),i.$globalData.SET("card",t.data.card_code,"card_code"),void c.navigateTo({url:"/subpackage/cardboot/index"});t.data.receiving_status?(console.log("opencard","app"),i.openCard(o,t.data.card_code)):i.$http.getWxCardApiTicket({appid:s,card_id:o}).then((function(t){200==t.code&&h.addCard({cardList:[{cardId:o,cardExt:JSON.stringify(t.data)}],success:function(t){console.log("addWxCard success",t),i.$http.getCardCode({encrypt_code:t.cardList[0].code,authorizer_appid:s}).then((function(t){console.log("解码会员卡号",t),200==t.code&&i.openCard(o,t.data.code)}))}})}))}}))}}}}},l=i(4862),d=i.n(l),g=(0,(d(),i(9453)).default)(u,void 0,void 0,!1,null,null,null,!1,void 0,void 0).exports,f=i(9209),p=i(7668),m=i(1460),_=i(8793).default,v=i(7039).createApp;function w(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function y(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?w(Object(i),!0).forEach((function(e){(0,n.default)(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):w(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}_.__webpack_require_UNI_MP_PLUGIN__=i;o.default.component("notYetData",(function(){i.e("components/notYetData/index").then(function(){return resolve(i(8286))}.bind(null,i)).catch(i.oe)})),o.default.component("popup",(function(){i.e("components/popup/index").then(function(){return resolve(i(8152))}.bind(null,i)).catch(i.oe)})),o.default.component("loadMore",(function(){i.e("components/loadMore/index").then(function(){return resolve(i(8394))}.bind(null,i)).catch(i.oe)})),o.default.component("topping",(function(){i.e("components/topping/index").then(function(){return resolve(i(3513))}.bind(null,i)).catch(i.oe)})),o.default.component("loginPop",(function(){i.e("components/loginPop/index").then(function(){return resolve(i(5995))}.bind(null,i)).catch(i.oe)})),o.default.component("notPhone",(function(){i.e("components/notPhone/index").then(function(){return resolve(i(7565))}.bind(null,i)).catch(i.oe)})),o.default.component("list",(function(){i.e("components/list/index").then(function(){return resolve(i(4524))}.bind(null,i)).catch(i.oe)})),o.default.config.productionTip=!1,o.default.prototype.$utils=a.default,o.default.prototype.$common=m.default,o.default.prototype.$http=p.default,o.default.prototype.$globalData=r.default,o.default.prototype.$nav=a.default.nav;o.default.component("tabbar",(function(){i.e("components/tabbar/index").then(function(){return resolve(i(6291))}.bind(null,i)).catch(i.oe)}));o.default.component("navbar",(function(){i.e("components/navbar/index").then(function(){return resolve(i(1041))}.bind(null,i)).catch(i.oe)})),g.mpType="app";var S=new o.default(y(y({},g),{},{store:f.default}));v(S).$mount();var b=S},4862:function(){},3286:function(){},709:function(){},8775:function(){},93:function(){},1410:function(){},3448:function(){},5557:function(){},5569:function(){},9505:function(){},2932:function(){},3927:function(){},3957:function(){},391:function(){},2665:function(){}},function(t){t.O(0,["common/vendor"],(function(){return e=810,t(t.s=e);var e})),t.O()}]); 
 			}); 	require("pages/home/index.js");
 		__wxRoute = 'pages/library/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/library/index.js';	define("pages/library/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["pages/library/index"],{7690:function(t,i,o){o.r(i),o.d(i,{default:function(){return d}});var e=o(7039).default,s=o(8793).default,n=o(7256),a={data:function(){return{backLock:!1,selectedTab:0,color:"#999999",selectedColor:"#FE7C0A",active:0,keyword:"",page:1,list:[],typeList:[],notYetData:!1,showVideo:!1,videoUrl:"",userInfo:{},addDouyin:!1,scanCode:!1,chooseDouyin:!1,dyAccountList:[],ids:[],douYinImg:"",seconed:0,isEnd:!0,goods:{}}},onReachBottom:function(){this.getList()},methods:{init:function(){this.getType()},switchTabbar:function(t){var i=t.currentTarget.dataset.path;e.switchTab({url:i})},dyCommissionWatch:function(t){return this.userInfo&&t?this.userInfo.sub_commission_status&&this.userInfo.fx_commission_config.doudian_status&&(null===(i=(t.coupon_price-0?t.coupon_price/100:t.price/100)*((t.activity_cos_ratio||t.cos_ratio)/100)*(this.userInfo.fx_commission_config.doudian_rate/100))||void 0===i?void 0:i.toFixed(2))||"0.00":0;var i},play:function(t){this.videoUrl=t.url,this.showVideo=!0},collect:function(t,i){var o=this;1==i?this.$http.geUncollectMaterial({product_id:this.list[t].product_id,material_id:this.list[t].material.id}).then((function(i){e.showToast({icon:"none",title:i.message}),200==i.code&&(o.list[t].material.is_material_collect=0)})):this.$http.getCollectMaterial({product_id:this.list[t].product_id,material_id:this.list[t].material.id}).then((function(i){e.showToast({icon:"none",title:i.message}),200==i.code&&(o.list[t].material.is_material_collect=1)}))},switchTab:function(t){this.active=t,this.page=1,this.notYetData=!1,this.getList()},search:function(){this.page=1,this.notYetData=!1,this.getList()},getType:function(){var t=this;this.$http.getMyGoodsListType().then((function(i){if(200==i.code){var o=[];o.push(i.data.categorys[0]),o.push({id:"hot",name:"热门素材",parent_id:0}),t.typeList=o,t.active=i.data.categorys[0].id,t.getList()}}))},getList:function(){var t=this;if(0==this.typeList.length)return this.getType();var i={hot_material:"hot"==this.active?1:0,keyword:this.keyword,page:this.page,first_cid:this.typeList[0].id};this.$http.getMyMateriaList(i).then((function(i){200==i.code&&(1==t.page?(e.pageScrollTo({scrollTop:0,duration:0}),t.list=i.data.list||[],i.data.list.length<1&&(t.notYetData=!0)):t.list=t.list.concat(i.data.list||[]),t.page+=1)}))},goInfo:function(t){e.navigateTo({url:"/pages_kuaidi/qualityDetail/sourceMaterial/index?id="+this.list[t].id+"&product_id="+this.list[t].product_id+"&material_id="+this.list[t].material.id})},addWindow:function(t){var i=this;this.goods=t,this.$http.getDyAccountList().then((function(t){200==t.code&&(i.chooseDouyin=!0,0==t.data.length||(t.data.forEach((function(t){t.isCheck=!1})),i.dyAccountList=t.data))}))},closeDouyin:function(){this.addDouyin=!1},toScanCode:function(){this.scanCode=!0,this.chooseDouyin=!1,this.chooseDouyin&&(this.chooseDouyin=!1),this.closeDouyin()},refreshQrCode:function(){this.douYinImg="",this.isEnd=!0,this.getDyQrCode()},getDyQrCode:function(){var t=this;this.$http.getDyAuthAddress({redirect_uri:"https://dy.yunzhanxinxi.com/html/douyin/auth-scuuess.html?is_test=0&time=".concat(Date.now())}).then((function(i){200==i.code&&t.createQrCode2(i.data.url,"douYinId",192,192)}))},createQrCode2:function(t,i,o,s){var a=this;n({width:o,height:s,canvasId:i,text:t,_this:this,callback:function(t){e.canvasToTempFilePath({canvasId:i,success:function(t){a.draw2(t.tempFilePath)},complete:function(t){}},a)}})},downSecond:function(t){var i=this,o=setInterval((function(){t-=1,i.seconed=t,(t<0||""==i.douYinImg)&&(i.isEnd=!1,clearInterval(o))}),1e3)},draw2:function(t){var i=this,o=e.createCanvasContext("douYinId",this);o.drawImage(t,0*this.rpx,0*this.rpx,192,192),o.draw(!1,(function(){e.canvasToTempFilePath({canvasId:"douYinId",quality:1,success:function(t){i.douYinImg=t.tempFilePath,i.isEnd=!0,i.seconed=60,i.downSecond(i.seconed)},fail:function(t){}},i)}))},preserveImg:function(){var t=this;e.saveImageToPhotosAlbum({filePath:t.douYinImg,success:function(i){e.showToast({title:"保存成功",icon:"success",duration:2e3}),t.closeCode()},fail:function(t){"saveImageToPhotosAlbum:fail auth deny"!==t.errMsg&&"saveImageToPhotosAlbum:fail:auth denied"!==t.errMsg||s.showModal({title:"提示",content:"需要您授权保存相册",showCancel:!1,success:function(){s.openSetting({success:function(t){t.authSetting["scope.writePhotosAlbum"]?s.showModal({title:"提示",content:"获取权限成功,再次点击按钮即可保存",showCancel:!1}):s.showModal({title:"提示",content:"获取权限失败，将无法保存到相册哦~",showCancel:!1})},fail:function(t){},complete:function(t){}})}})}})},closeCode:function(){this.scanCode=!1},closeChoose:function(){this.ids=[],this.chooseDouyin=!1},checkThis:function(t){if(t.isCheck=!t.isCheck,1==t.isCheck)this.ids.push(t.id);else{var i=this.ids.indexOf(t.id);this.ids.splice(i,1)}},addDyShowCaseProducts:function(){var t=this,i={goods_url:this.goods.detail_url,auth_id:this.ids};i.auth_id.forEach((function(t,o){i["auth_id["+o+"]"]=t})),delete i.auth_id,0!=this.ids.length?this.$http.addDyShowCaseProduct(i).then((function(i){200==i.code?e.showToast({title:"添加成功",duration:2e3}):e.showToast({title:i.message,icon:"error",duration:2e3}),t.closeChoose()})):e.showToast({title:"请选择账号",icon:"error",duration:2e3})}},mounted:function(){var t=this;e.$once("login",(function(){t.init()})),this.init(),e.pageScrollTo({scrollTop:0,duration:0});var i=getCurrentPages().length;this.backLock=1!=i}},c=o(8775),d=(0,(o.n(c)(),o(9453)).default)(a,(function(){var t=this,i=(t.$createElement,t._self._c,t.__map(t.list,(function(i,o){return{$orig:t.__get_orig(i),m0:t.dyCommissionWatch(i)}})));t.$mp.data=Object.assign({},{$root:{l0:i}})}),[],!1,null,"cc2d48a4",null,!1,void 0,void 0).exports},5554:function(t,i,o){o.r(i),o(5476);var e=o(7690),s=o(8793).default,n=o(7039).createPage;s.__webpack_require_UNI_MP_PLUGIN__=o,n(e.default)},8775:function(){}},function(t){t.O(0,["common/vendor"],(function(){return i=5554,t(t.s=i);var i})),t.O()}]); 
 			}); 	require("pages/library/index.js");
 		__wxRoute = 'pages/bwc/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/bwc/index.js';	define("pages/bwc/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";require("../../@babel/runtime/helpers/Arrayincludes"),(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["pages/bwc/index"],{2074:function(t,e,i){i.r(e),i.d(e,{default:function(){return c}});var n=i(9510),o=i(7039).default,s=i(8793).default,a={components:{customCard:function(){i.e("components/customCard/index").then(function(){return resolve(i(2064))}.bind(null,i)).catch(i.oe)}},onPageScroll:function(t){this.scrollTop=t.scrollTop},data:function(){return{nick_name:"省钱公告",money:0,switchPsition:0,isShowSwitch:!1,switchTop:0,city:"",scrollTop:0,scrollColor:"none",user:{hm_uid:""},share:{},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],expireTime:"",tickerReject:null,RejectPop:!1,path:"",appid:"",jumpPopup:!1,accountsid:o.getStorageSync("accountsId"),sq_qrcode_img_url:"",sq_status:"",modules:[],guidestep:1,singleItemPop:!1,singleItemInfo:{activity_img_url:""},tipsPop:!1,progressingInfo:{},tipsText:"",tipsTime:"",guide:!1,qrcode_type:-1,qrcode_img_url:"",isShowTips:!1,topHeight:0,bgColor:"#FFFFFF",navHeight:0,menuButtonObject:{},backLock:!1,indicatorDots:!1,autoplay:!0,interval:2e3,intervalGift:3e3,current:0,duration:500,iconList:[],iconPage:0,iconPageNum:0,from:{page_id:"",map_lat:"",map_lon:"",keyword:"",platform:"",only_rebate:"",only_order:"",sort:"",able_join:"",plan_source:""},address:"",list:[],phone:"",notTips:!1,loadIcon:"false",empty_list:[],ticker:null,place_order:[],isAdd:!0,OrderRejected:{},OrderRejectedList:[],SpecialEdition:!1}},onReachBottom:function(){this.pullUp()},onShareAppMessage:function(t){var e;return e=o.getStorageSync("isScenes")?"/pages/home/index?current=36&uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/home/index?current=36&uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onShareTimeline:function(t){var e;return e=o.getStorageSync("isScenes")?"/pages/home/index?current=36&uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/home/index?current=36&uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},created:function(){var t=this,e=s.getMenuButtonBoundingClientRect();this.menuButtonObject=e,s.getSystemInfo({success:function(i){var n=i.statusBarHeight,o=n+e.height+2*(e.top-n);t.navHeight=o}}),o.$on("newOrder",(function(){t.getProgressing()})),o.$on("updateList",(function(){t.from.page_id="",t.notTips=!1,t.loadIcon=!1,t.isAdd=!0,t.getList()})),o.$on("login",(function(){t.init(),t.getShowTipsStatus(),t.getQrcode_img(),t.getInviteConfig(),t.getMtWithdrawalRule(),o.getStorageSync("bwcPhone")&&(t.getProgressing(),t.getOrderRejected(),t.getUserInfo())})),this.init(),this.$utils.hasLogin()&&(this.getQrcode_img(),this.getInviteConfig(),this.getProgressing(),this.getOrderRejected(),o.$on("sqpopup",(function(){t.openSq()})),o.$on("openJumpPopup",(function(e){t.appid=e.id,t.path=e.path,t.jumpPopup=!0})),this.getMtWithdrawalRule())},filters:{limitTimeFilter:function(t){if(t>0){var e,i,n;e=parseInt(t/3600),i=parseInt((t-60*e*60)/60),n=parseInt(t-60*e*60-60*i),e<10&&(e="0"+e),i<10&&(i="0"+i),n<10&&(n="0"+n);var o={hour:e,min:i,seconds:n};return"".concat(o.hour," : ").concat(o.min," : ").concat(o.seconds," ")}return"00 : 00 : 00 "}},mounted:function(){o.pageScrollTo({scrollTop:0,duration:0});var t=getCurrentPages().length;this.backLock=1!=t,this.getShowTipsStatus()},methods:{getMtWithdrawalRule:function(){var t=this;this.$http.getMtWithdrawalRule().then((function(e){200==e.code&&(t.money=e.data.config.user_total_income,t.nick_name=e.data.config.app_name,o.setStorageSync("app_name",t.nick_name))}))},getCurrent:function(t){this.current=t.detail.current},getUserInfo:function(){var t=this;this.$http.getUserInfo().then((function(e){200==e.code&&(t.user=e.data.user,t.getShareInfo())}))},getShareInfo:function(){var t=this;this.$common.getSharePath().then((function(e){console.log(e,"分享配置"),t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return!1;if(2==t.shareSwitch){var i=t.extend.filter((function(t){return"36"==t.index}));if(!i||"1"!=i[0].switch)return void o.hideShareMenu();e=i[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(i){t.shareTitle=i.shareTitle,t.shareUrl=i.shareUrl,1==t.shareSwitch&&t.pathList.includes("36")||2==t.shareSwitch&&e?o.showShareMenu():o.hideShareMenu()}))}))},modify:function(){o.navigateTo({url:"/subpackage/uploadImage/index?order_sn="+this.OrderRejected.order_sn}),this.closeRejected()},getOrderRejected:function(){var t=this;this.$http.getOrderRejected().then((function(e){200==e.code&&(t.OrderRejectedList=e.data,console.log(t.OrderRejectedList,"驳回列表"),t.setShowRejected())}))},closeRejected:function(){this.RejectPop=!1,this.setShowRejected()},setShowRejected:function(){var t=o.getStorageSync("OrderRejected");console.log(t,"----");var e=[];for(var i in this.OrderRejectedList)if(this.tickerReject&&(clearInterval(this.tickerReject),this.tickerReject=null),this.OrderRejected={},!t.includes(this.OrderRejectedList[i].expire_time))return this.OrderRejected=this.OrderRejectedList[i],this.expireTime=this.OrderRejected.expire_time-this.OrderRejected.server_time,this.beginRejectTimer(),this.RejectPop=!0,e.push(this.OrderRejectedList[i].expire_time),void o.setStorageSync("OrderRejected",e.join(",")+","+t)},beginRejectTimer:function(){var t=this;this.tickerReject=setInterval((function(){t.expireTime>0?t.expireTime=t.expireTime-1:(clearInterval(t.tickerReject),t.tickerReject=null)}),1e3)},searchPage:function(){o.navigateTo({url:"/subpackage/searchPage/index?map_lat="+this.from.map_lat+"&map_lon="+this.from.map_lon+"&plan_source="+this.from.plan_source})},preserveImg:function(){var t=this;o.getSetting({success:function(e){console.log(e,"----333"),e.authSetting["scope.writePhotosAlbum"]?t.downImage():o.authorize({scope:"scope.writePhotosAlbum",success:function(e){t.downImage()},fail:function(e){o.showModal({title:"是否授权保存",content:"需要获取您的相册，请确认授权，否则将无法正常保存",success:function(e){e.confirm&&o.openSetting({success:function(e){t.downImage()}})}})}})},fail:function(t){console.log(t,"----")}})},downImage:function(){var t=this;o.getImageInfo({src:this.sq_qrcode_img_url,success:function(e){console.log(e,"下载"),o.saveImageToPhotosAlbum({filePath:e.path,success:function(e){t.$utils.showToast("保存成功")},fail:function(t){console.log(t,"---失败")}})}})},jumpUpload:function(){this.jumpPopup=!1},invite:function(){this.$utils.handleLoginNav()||o.navigateTo({url:"/pages/pullNewActivity/index"})},closeGuide:function(){o.setStorageSync("guideHomePop",!0),this.guide=!1,this.activePOp()},getCode:function(){if(!this.$utils.handleLoginNav())if(1==this.qrcode_type&&""!=this.qrcode_img_url)this.$refs.popup.show();else if(2==this.qrcode_type)return!1},getPublicQrcode:function(){var t=this;this.$http.getConfig().then((function(e){200==e.code&&(t.qrcode_img_url=e.data.qrcode_img_url,t.qrcode_type=1)}))},getQrcode_img:function(){var t=this;this.accountsid?(this.qrcode_type=-1,this.getPublicQrcode()):this.$http.menuConfig().then((function(e){if(console.log(e,"获取菜单配置"),200==e.code){var i=e.data.lists;t.qrcode_type=-1,i.forEach((function(e){"customer"==e.func_type&&(1==e.kefu_qrcode_type&&""!=e.kefu_qrcode_url&&(t.qrcode_img_url=e.kefu_qrcode_url),t.qrcode_type=e.kefu_qrcode_type)}))}}))},jumpUploadTips:function(){if(2==this.progressingInfo.source)5==this.tipsText?this.$utils.navRouter("/subpackage/uploadImage/index?order_sn="+this.progressingInfo.order_sn+"&isRoll=1"):this.$utils.navRouter("/subpackage/uploadImage/index?order_sn="+this.progressingInfo.order_sn);else{var t,e;t=2==this.progressingInfo.platform?this.progressingInfo.action_url.wx_mini.elm.appid:this.progressingInfo.action_url.wx_mini.mt.appid,e=this.progressingInfo.is_place_order?2==this.progressingInfo.platform?this.progressingInfo.action_url.wx_mini.elm.comment_list:this.progressingInfo.action_url.wx_mini.mt.comment_list:2==this.progressingInfo.platform?this.progressingInfo.action_url.wx_mini.elm.path:this.progressingInfo.action_url.wx_mini.mt.path,o.setClipboardData({data:this.progressingInfo.plan_name,success:function(){o.showToast({title:"复制成功",duration:2e3})}}),o.navigateToMiniProgram({appId:t,path:e,success:function(t){}})}},beginTimer:function(){var t=this;this.ticker=setInterval((function(){t.tipsTime>0?t.tipsTime=t.tipsTime-1:(clearInterval(t.ticker),t.ticker=null)}),1e3)},jumpSet:function(t){if(!this.$utils.handleLoginNav()){var e="";if(1==t)this.place_order&&1==this.place_order.show_type?e="/pages/placeOrder/index":this.$utils.showToast("活动未开启，如有疑问请联系客服");else if(2==t)e="/pages/welfare/index";else if(3==t)this.$http.getCouponPackage().then((function(t){200==t.code&&o.navigateToMiniProgram({appId:t.data.wx_mini.mini_appid,path:t.data.wx_mini.mini_path})}));else if(4==t)e="/pages/orderlist/index";else if(5==t)return this.jumpGuide();o.navigateTo({url:e})}},jumpGuide:function(){this.$utils.handleLoginNav()||o.navigateTo({url:"/subpackage/guide/index"})},pullUp:function(){this.isAdd&&(this.isAdd=!0,this.getList())},getShowTipsStatus:function(){var t=this;o.getSystemInfo({success:function(e){var i=e.statusBarHeight||0,n=o.getMenuButtonBoundingClientRect(),s=n.height+2*n.top;t.topHeight=i+s},fail:function(t){console.error("获取系统信息失败:",t)}}),this.$globalData.GET("isShowTipsClose")?this.isShowTips=!1:this.$utils.hasLogin()||(this.isShowTips=!0)},closeTips:function(){this.isShowTips=!1,this.$globalData.SET("isShowTipsClose",!0)},randomNumber:function(){return this.$utils.random(150,500)},receive:function(t){this.$utils.handleLoginNav()||this.$utils.publicNavigation(this.empty_list[t])},search:function(){this.from.page_id="",this.notTips=!1,this.loadIcon=!1,this.isAdd=!0,this.getList()},switchAbleJoin:function(t){this.switchPsition=t,this.from.able_join=1==this.from.able_join?"":1,this.search()},onlyRebate:function(){this.from.only_rebate=1,this.from.platform=-1,this.search()},switchPlatfrom:function(t){this.from.platform=t,this.from.only_rebate="",this.search()},switchTypeList:function(t,e){this.switchPsition=e,this.from.sort=2==t?"asc":"",this.from.only_order=1==t?t:"",this.search()},switchAddress:function(){this.$utils.handleLoginNav()||o.navigateTo({url:"/subpackage/map/index"})},openSq:function(){this.$utils.handleLoginNav()||(this.sq_qrcode_img_url?this.$refs.sqpopup.show():this.$utils.showToast("活动未开启，请联系客服！"))},navBanner:function(t,e){if(!this.$utils.handleLoginNav()){var i=this.modules[t].list[e];21==i.jump_type?this.openSq():this.$utils.publicNavigation(i)}},navMenu:function(t){this.$utils.handleLoginNav()||(21==t.jump_type?this.openSq():this.$utils.publicNavigation(t))},getLocation:function(){var t=this;this.$utils.getLocation().then((function(e){t.from.map_lat=e.latitude,t.from.map_lon=e.longitude,t.$globalData.SET("lat",e.latitude),t.$globalData.SET("lon",e.longitude),t.getPos(),t.list=[],t.from.page_id="",t.notTips=!1,t.loadIcon=!0,t.isAdd=!0,""!=t.from.plan_source?t.getList():t.getInfo()})).catch((function(e){t.from.map_lat="",t.from.map_lon="",t.$utils.showToast("定位获取失败，请手动定位"),t.list=[],t.from.page_id="",t.notTips=!1,t.loadIcon=!1}))},getProgressing:function(){var t=this;this.$utils.handleLoginNav()||this.$http.getProgressing().then((function(e){if(200==e.code)if(console.log(e,"引导信息------"),e.data){t.progressingInfo=e.data;var i=parseInt((new Date).getTime()/1e3);e.data.is_place_order?e.data.is_upload_credential_new?e.data.show_upload_video_credential||2!=e.data.source||(t.tipsText=5):(t.tipsText=2==e.data.source?3:4,t.tipsTime=e.data.upload_credential_expire_time-i):(t.tipsText=2==e.data.source?1:2,t.tipsTime=e.data.place_order_expire_time-i),t.tipsTime?(t.tipsPop=!0,t.beginTimer()):(t.tipsPop=!1,t.ticker&&(clearInterval(t.ticker),t.ticker=null)),5==t.tipsText&&(t.tipsPop=!0)}else t.tipsPop=!1}))},getInfo:function(){var t=this;this.$http.getIndexInfo().then((function(e){if(200==e.code){t.bgColor=e.data.background_color,t.modules=e.data.modules;var i=[];t.modules.forEach((function(e){if("newUserGift"==e.type&&1==e.status&&(1==e.config.new_user_guide&&2==e.new_style&&i.push({url:"https://img.yunzhanxinxi.com/mini/bwc/v262/jifen_banner_ic.png",index:2,new_user_guide:1}),1==e.config.credits_exchange&&i.push({url:"https://img.yunzhanxinxi.com/mini/bwc/v262/jifen_banner_ic.png",index:2,credits_exchange:1}),1==e.config.timed_challenge&&i.push({url:"https://img.yunzhanxinxi.com/mini/bwc/v262/tiaozhanshai_banner_ic.png",index:1,timed_challenge:1}),1==e.config.topdining&&i.push({url:"https://img.yunzhanxinxi.com/mini/bwc/v262/shenquan_banner_ic.png",index:3,topdining:1}),1==e.config.board&&i.push({url:"https://img.yunzhanxinxi.com/mini/bwc/v262/shengqian_banner_ic.png",index:4,board:1}),e.img=i),"om_goods"==e.type&&1==e.status&&(1!=e.config.all_city?1==e.config.meituan?t.from.platform=1:1==e.config.ele&&(t.from.platform=2):t.from.platform="",t.from.plan_source=e.config.new_plan_source,t.from.able_join=e.config.able_join,console.log(t.from,"----------请求参数")),"business"==e.type&&1==e.status&&0!=e.list.length){for(var n=[],o=0;o<e.list.length;o++)for(var s=0;s<e.list[o].length;s++)n.push(e.list[o][s]);var a=n;t.iconList=[];var r=1==e.show_type?5:4,c=1==e.style?2:1;t.iconPageNum=r*c,t.iconPage=Math.ceil(a.length/t.iconPageNum);for(var l=0;l<t.iconPage;l++)t.iconList.push(a.slice(l*t.iconPageNum,(l+1)*t.iconPageNum))}})),t.from.map_lat&&t.from.map_lon&&t.getList()}}))},refresh:function(){this.list=[],this.from.apge=1,this.notTips=!1,this.loadIcon=!1,this.isAdd=!0,this.getList()},getList:function(){var t=this;if(this.notTips||!this.isAdd)return!1;this.isAdd=!1,this.$http.getHomeList(this.from).then((function(e){if(console.log(e,"商品列表---------------"),200==e.code)if(t.loadIcon=!1,0==e.data.length?t.isAdd=!1:t.isAdd=!0,e.data.list.forEach((function(t){1==t.source&&o.request({url:t.action_url.mt_monitor.imp_monitor_url,method:"GET"})})),""==t.from.page_id?t.list=e.data.list:t.list=[].concat((0,n.default)(t.list),(0,n.default)(e.data.list)),t.from.page_id=e.data.page_id,0!=t.list.length){if(t.notTips=!1,0==t.switchTop){var i=o.getSystemInfoSync();o.createSelectorQuery().in(t).select(".bwclist").boundingClientRect((function(e){console.log(e,"-------"),e&&e.top?t.switchTop=e.top-(i.navigationBarHeight||0)-i.statusBarHeight:t.switchTop=650})).exec()}1==t.switchPsition&&o.pageScrollTo({scrollTop:t.switchTop-50,duration:300})}else t.notTips=!0}))},getPos:function(){var t=this;this.$http.getPosNew({lat:this.from.map_lat,lng:this.from.map_lon}).then((function(e){console.log(e,"---地址解析"),200==e.code&&(t.address=e.data.name,t.city=e.data.city,t.$globalData.SET("address",e.data.name),t.$globalData.SET("city",e.data.city))}))},getCouponList:function(){var t=this;this.$http.getbwcCouponList().then((function(e){200==e.code&&(t.empty_list=e.data.empty_list)}))},init:function(){var t=this;this.getInfo(),this.$globalData.GET("lat")?(this.from.map_lat=this.$globalData.GET("lat"),this.from.map_lon=this.$globalData.GET("lon"),this.city=this.$globalData.GET("city"),this.address=this.$globalData.GET("address"),this.from.map_lat&&this.from.map_lon&&this.city&&this.address||this.getLocation()):this.getLocation(),o.$on("bwcselectLocation",(function(e){t.address=e.address.title,t.from.map_lat=e.address.location.lat,t.from.map_lon=e.address.location.lng,t.city=e.address.city,t.$globalData.SET("lat",e.address.location.lat),t.$globalData.SET("lon",e.address.location.lng),t.$globalData.SET("city",e.address.city),t.$globalData.SET("address",e.address.title),t.list=[],t.from.page_id="",t.notTips=!1,t.loadIcon=!0,t.isAdd=!0,t.getInfo()})),this.getCouponList()},getToday:function(){var t=new Date;return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()},activePOp:function(){var t=this;this.$http.activePOp().then((function(e){if(console.log(e,"爆品弹窗---"),200==e.code)if(0==e.data.config.activity_status)t.singleItemPop=!1;else{var i=t.getToday(),n=o.getStorageSync(i);t.singleItemInfo=e.data.config,n?(n=JSON.parse(n)).InvitePopupId.includes(t.singleItemInfo.id)?t.singleItemPop=!1:t.singleItemPop=!0:t.singleItemPop=!0}}))},getInviteConfig:function(){var t=this;this.$http.getInviteConfig().then((function(e){200==e.code&&(!o.getStorageSync("guideHomePop")&&e.data.guide&&1==e.data.guide.status?t.guide=!0:(t.guide=!1,t.activePOp()),e.data.community&&(t.sq_status=e.data.community.community_status,t.sq_qrcode_img_url=e.data.community.qrcode_url),e.data.place_order&&(t.place_order=e.data.place_order))}))},singleClick:function(){this.$utils.publicNavigation(this.singleItemInfo),this.closeSingleItemPop()},closeSingleItemPop:function(){var t=this.getToday(),e=o.getStorageSync(t);if(e)(e=JSON.parse(e)).InvitePopupId.push(this.singleItemInfo.id),o.setStorageSync(t,JSON.stringify(e));else{var i={InvitePopupId:[this.singleItemInfo.id]};o.setStorageSync(t,JSON.stringify(i))}this.singleItemPop=!1}},onLoad:function(){this.$utils.hasLogin()&&this.getUserInfo()}},r=i(3286),c=(0,(i.n(r)(),i(9453)).default)(a,(function(){var t=this,e=(t.$createElement,t._self._c,t.scrollTop>t.switchTop&&0!=t.list.length),i=t.__map(t.modules,(function(e,i){var n=t.__get_orig(e),o="banner"==e.type&&1==e.status?e.list.length:null,s="business"==e.type&&1==e.status?t.iconList.length:null,a="business"==e.type&&1==e.status&&s>1?t.iconList.length:null,r="newUserGift"==e.type&&0!=e.listNum&&1==e.status&&1==e.new_style?e.img.length:null,c="newUserGift"==e.type&&0!=e.listNum&&1==e.status&&2==e.new_style?e.img.length:null,l="om_goods"==e.type&&1==e.status?e.config.new_plan_source.includes(5)||3==e.config.new_plan_source.length:null;return{$orig:n,g1:o,g2:s,g3:a,g4:r,g5:c,g6:l,g7:"om_goods"!=e.type||1!=e.status||l?null:1==e.config.new_plan_source.length&&(e.config.new_plan_source.includes(2)||e.config.new_plan_source.includes(3)),g8:"om_goods"==e.type&&1==e.status?t.list.length:null,l0:"om_goods"==e.type&&1==e.status&&t.notTips?t.__map(t.empty_list,(function(e,i){return{$orig:t.__get_orig(e),m0:t.randomNumber()}})):null}})),n=t.tipsPop&&5!=t.tipsText?t._f("limitTimeFilter")(t.tipsTime):null,o=t.OrderRejected?t._f("limitTimeFilter")(t.expireTime):null;t._isMounted||(t.e0=function(e){return t.$refs.popup.hide()},t.e1=function(e){return t.$refs.sqpopup.hide()},t.e2=function(e){t.guidestep=2},t.e3=function(e){e.stopPropagation(),t.tipsPop=!1},t.e4=function(e){t.jumpPopup=!1}),t.$mp.data=Object.assign({},{$root:{g0:e,l1:i,f0:n,f1:o}})}),[],!1,null,"3099f39f",null,!1,void 0,void 0).exports},5178:function(t,e,i){i.r(e),i(5476);var n=i(2074),o=i(8793).default,s=i(7039).createPage;o.__webpack_require_UNI_MP_PLUGIN__=i,s(n.default)},3286:function(){}},function(t){t.O(0,["common/vendor"],(function(){return e=5178,t(t.s=e);var e})),t.O()}]); 
 			}); 	require("pages/bwc/index.js");
 		__wxRoute = 'pages/welfare/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/welfare/index.js';	define("pages/welfare/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["pages/welfare/index"],{2103:function(e,t,i){i.r(t),i.d(t,{default:function(){return h}});var n=i(7028),r=i(7039).default,a={data:function(){var e;return e={user:{hm_uid:""},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],backLock:!1},(0,n.default)(e,"user",{score:0}),(0,n.default)(e,"integral_config",{sign_in:0,lottery_turntable:0,invite:0,place_order:0,credits_exchange:0}),(0,n.default)(e,"checkinInfo",!1),(0,n.default)(e,"empty_list",[]),(0,n.default)(e,"isShow",!1),(0,n.default)(e,"share",{}),e},methods:{getUserInfo:function(){var e=this;this.$http.getUserInfo().then((function(t){200==t.code&&(e.user=t.data.user,e.getShareInfo())}))},getShareInfo:function(){var e=this;this.$common.getSharePath().then((function(t){e.switchType=t.switch,e.pathList=t.share_index,e.shareSwitch=t.share_switch,e.extend=t.extend})).then((function(){var t=0;if(0==e.switchType)return r.hideShareMenu(),!1;if(2==e.shareSwitch){var i=e.extend.filter((function(e){return"43"==e.index}));if(0==i.length||"1"!=i[0].switch)return void r.hideShareMenu();t=i[0].template_id}e.$common.getShareInfo({templateId:t,shareSwitch:e.shareSwitch}).then((function(i){e.shareTitle=i.shareTitle,e.shareUrl=i.shareUrl,1==e.shareSwitch&&e.pathList.includes("43")||2==e.shareSwitch&&t?r.showShareMenu():r.hideShareMenu()}))}))},receive:function(e){this.$utils.handleLoginNav()||this.$utils.publicNavigation(this.empty_list[e])},getCouponList:function(){var e=this;this.$http.getbwcCouponList().then((function(t){200==t.code&&(e.empty_list=t.data.empty_list,e.isShow=!0)}))},randomNumber:function(){return this.$utils.random(150,500)},init:function(){var e=this;this.$http.getInviteConfig().then((function(t){200==t.code&&(console.log(t,"配置----"),t.data.integral_config&&(e.integral_config=t.data.integral_config,!e.integral_config||e.integral_config.sign_in||e.integral_config.place_order||e.integral_config.invite||e.integral_config.lottery_turntable||e.integral_config.credits_exchange?e.isShow=!1:e.getCouponList()))})),this.$http.getUserInfo().then((function(t){console.log(t,"个人信息----"),200==t.code&&(e.user=t.data.user)})),this.$http.checkinInfo({}).then((function(t){200==t.code&&(e.checkinInfo=t.data.user.is_checkin)}))},jump:function(e){if(!this.$utils.handleLoginNav()){var t="";1==e?t="/pages/signReach/index":2==e?t="/pages/pullNewActivity/index":3==e?t="/pages/luckDraw/index":4==e&&(t="/pages/pointsMall/index"),r.navigateTo({url:t})}},backHome:function(){1==getCurrentPages().length?"/pages/home/index"!=getCurrentPages()[0].route?this.$utils.navRouter("/pages/home/index?current=36"):r.$emit("setCurrent",{current_id:36}):r.navigateBack({delta:1})}},created:function(){var e=this,t=getCurrentPages().length;this.backLock=1!=t,r.$once("refreshbwcPhone",(function(){e.init(),e.getUserInfo()})),this.$utils.hasLogin()&&this.init()},onLoad:function(){this.$utils.hasLogin()&&this.getUserInfo()},onShareAppMessage:function(e){var t;return t=r.getStorageSync("isScenes")?"/pages/welfare/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/welfare/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:t,imageUrl:this.shareUrl}},onShareTimeline:function(e){var t;return t=r.getStorageSync("isScenes")?"/pages/welfare/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/welfare/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:t,imageUrl:this.shareUrl}}},s=i(2665),h=(0,(i.n(s)(),i(9453)).default)(a,(function(){var e=this,t=(e.$createElement,e._self._c,e.isShow?e.__map(e.empty_list,(function(t,i){return{$orig:e.__get_orig(t),m0:e.randomNumber()}})):null);e.$mp.data=Object.assign({},{$root:{l0:t}})}),[],!1,null,"29fc4a78",null,!1,void 0,void 0).exports},3659:function(e,t,i){i.r(t),i(5476);var n=i(2103),r=i(8793).default,a=i(7039).createPage;r.__webpack_require_UNI_MP_PLUGIN__=i,a(n.default)},2665:function(){}},function(e){e.O(0,["common/vendor"],(function(){return t=3659,e(e.s=t);var t})),e.O()}]); 
 			}); 	require("pages/welfare/index.js");
 		__wxRoute = 'pages/home/index1';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/home/index1.js';	define("pages/home/index1.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";require("../../@babel/runtime/helpers/Arrayincludes"),(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["pages/home/index1","common/main"],{2074:function(t,e,i){i.r(e),i.d(e,{default:function(){return c}});var n=i(9510),o=i(7039).default,s=i(8793).default,a={components:{customCard:function(){i.e("components/customCard/index").then(function(){return resolve(i(2064))}.bind(null,i)).catch(i.oe)}},onPageScroll:function(t){this.scrollTop=t.scrollTop},data:function(){return{nick_name:"省钱公告",money:0,switchPsition:0,isShowSwitch:!1,switchTop:0,city:"",scrollTop:0,scrollColor:"none",user:{hm_uid:""},share:{},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],expireTime:"",tickerReject:null,RejectPop:!1,path:"",appid:"",jumpPopup:!1,accountsid:o.getStorageSync("accountsId"),sq_qrcode_img_url:"",sq_status:"",modules:[],guidestep:1,singleItemPop:!1,singleItemInfo:{activity_img_url:""},tipsPop:!1,progressingInfo:{},tipsText:"",tipsTime:"",guide:!1,qrcode_type:-1,qrcode_img_url:"",isShowTips:!1,topHeight:0,bgColor:"#FFFFFF",navHeight:0,menuButtonObject:{},backLock:!1,indicatorDots:!1,autoplay:!0,interval:2e3,intervalGift:3e3,current:0,duration:500,iconList:[],iconPage:0,iconPageNum:0,from:{page_id:"",map_lat:"",map_lon:"",keyword:"",platform:"",only_rebate:"",only_order:"",sort:"",able_join:"",plan_source:""},address:"",list:[],phone:"",notTips:!1,loadIcon:"false",empty_list:[],ticker:null,place_order:[],isAdd:!0,OrderRejected:{},OrderRejectedList:[],SpecialEdition:!1}},onReachBottom:function(){this.pullUp()},onShareAppMessage:function(t){var e;return e=o.getStorageSync("isScenes")?"/pages/home/index?current=36&uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/home/index?current=36&uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onShareTimeline:function(t){var e;return e=o.getStorageSync("isScenes")?"/pages/home/index?current=36&uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/home/index?current=36&uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},created:function(){var t=this,e=s.getMenuButtonBoundingClientRect();this.menuButtonObject=e,s.getSystemInfo({success:function(i){var n=i.statusBarHeight,o=n+e.height+2*(e.top-n);t.navHeight=o}}),o.$on("newOrder",(function(){t.getProgressing()})),o.$on("updateList",(function(){t.from.page_id="",t.notTips=!1,t.loadIcon=!1,t.isAdd=!0,t.getList()})),o.$on("login",(function(){t.init(),t.getShowTipsStatus(),t.getQrcode_img(),t.getInviteConfig(),t.getMtWithdrawalRule(),o.getStorageSync("bwcPhone")&&(t.getProgressing(),t.getOrderRejected(),t.getUserInfo())})),this.init(),this.$utils.hasLogin()&&(this.getQrcode_img(),this.getInviteConfig(),this.getProgressing(),this.getOrderRejected(),o.$on("sqpopup",(function(){t.openSq()})),o.$on("openJumpPopup",(function(e){t.appid=e.id,t.path=e.path,t.jumpPopup=!0})),this.getMtWithdrawalRule())},filters:{limitTimeFilter:function(t){if(t>0){var e,i,n;e=parseInt(t/3600),i=parseInt((t-60*e*60)/60),n=parseInt(t-60*e*60-60*i),e<10&&(e="0"+e),i<10&&(i="0"+i),n<10&&(n="0"+n);var o={hour:e,min:i,seconds:n};return"".concat(o.hour," : ").concat(o.min," : ").concat(o.seconds," ")}return"00 : 00 : 00 "}},mounted:function(){o.pageScrollTo({scrollTop:0,duration:0});var t=getCurrentPages().length;this.backLock=1!=t,this.getShowTipsStatus()},methods:{getMtWithdrawalRule:function(){var t=this;this.$http.getMtWithdrawalRule().then((function(e){200==e.code&&(t.money=e.data.config.user_total_income,t.nick_name=e.data.config.app_name,o.setStorageSync("app_name",t.nick_name))}))},getCurrent:function(t){this.current=t.detail.current},getUserInfo:function(){var t=this;this.$http.getUserInfo().then((function(e){200==e.code&&(t.user=e.data.user,t.getShareInfo())}))},getShareInfo:function(){var t=this;this.$common.getSharePath().then((function(e){console.log(e,"分享配置"),t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return!1;if(2==t.shareSwitch){var i=t.extend.filter((function(t){return"36"==t.index}));if(!i||"1"!=i[0].switch)return void o.hideShareMenu();e=i[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(i){t.shareTitle=i.shareTitle,t.shareUrl=i.shareUrl,1==t.shareSwitch&&t.pathList.includes("36")||2==t.shareSwitch&&e?o.showShareMenu():o.hideShareMenu()}))}))},modify:function(){o.navigateTo({url:"/subpackage/uploadImage/index?order_sn="+this.OrderRejected.order_sn}),this.closeRejected()},getOrderRejected:function(){var t=this;this.$http.getOrderRejected().then((function(e){200==e.code&&(t.OrderRejectedList=e.data,console.log(t.OrderRejectedList,"驳回列表"),t.setShowRejected())}))},closeRejected:function(){this.RejectPop=!1,this.setShowRejected()},setShowRejected:function(){var t=o.getStorageSync("OrderRejected");console.log(t,"----");var e=[];for(var i in this.OrderRejectedList)if(this.tickerReject&&(clearInterval(this.tickerReject),this.tickerReject=null),this.OrderRejected={},!t.includes(this.OrderRejectedList[i].expire_time))return this.OrderRejected=this.OrderRejectedList[i],this.expireTime=this.OrderRejected.expire_time-this.OrderRejected.server_time,this.beginRejectTimer(),this.RejectPop=!0,e.push(this.OrderRejectedList[i].expire_time),void o.setStorageSync("OrderRejected",e.join(",")+","+t)},beginRejectTimer:function(){var t=this;this.tickerReject=setInterval((function(){t.expireTime>0?t.expireTime=t.expireTime-1:(clearInterval(t.tickerReject),t.tickerReject=null)}),1e3)},searchPage:function(){o.navigateTo({url:"/subpackage/searchPage/index?map_lat="+this.from.map_lat+"&map_lon="+this.from.map_lon+"&plan_source="+this.from.plan_source})},preserveImg:function(){var t=this;o.getSetting({success:function(e){console.log(e,"----333"),e.authSetting["scope.writePhotosAlbum"]?t.downImage():o.authorize({scope:"scope.writePhotosAlbum",success:function(e){t.downImage()},fail:function(e){o.showModal({title:"是否授权保存",content:"需要获取您的相册，请确认授权，否则将无法正常保存",success:function(e){e.confirm&&o.openSetting({success:function(e){t.downImage()}})}})}})},fail:function(t){console.log(t,"----")}})},downImage:function(){var t=this;o.getImageInfo({src:this.sq_qrcode_img_url,success:function(e){console.log(e,"下载"),o.saveImageToPhotosAlbum({filePath:e.path,success:function(e){t.$utils.showToast("保存成功")},fail:function(t){console.log(t,"---失败")}})}})},jumpUpload:function(){this.jumpPopup=!1},invite:function(){this.$utils.handleLoginNav()||o.navigateTo({url:"/pages/pullNewActivity/index"})},closeGuide:function(){o.setStorageSync("guideHomePop",!0),this.guide=!1,this.activePOp()},getCode:function(){if(!this.$utils.handleLoginNav())if(1==this.qrcode_type&&""!=this.qrcode_img_url)this.$refs.popup.show();else if(2==this.qrcode_type)return!1},getPublicQrcode:function(){var t=this;this.$http.getConfig().then((function(e){200==e.code&&(t.qrcode_img_url=e.data.qrcode_img_url,t.qrcode_type=1)}))},getQrcode_img:function(){var t=this;this.accountsid?(this.qrcode_type=-1,this.getPublicQrcode()):this.$http.menuConfig().then((function(e){if(console.log(e,"获取菜单配置"),200==e.code){var i=e.data.lists;t.qrcode_type=-1,i.forEach((function(e){"customer"==e.func_type&&(1==e.kefu_qrcode_type&&""!=e.kefu_qrcode_url&&(t.qrcode_img_url=e.kefu_qrcode_url),t.qrcode_type=e.kefu_qrcode_type)}))}}))},jumpUploadTips:function(){if(2==this.progressingInfo.source)5==this.tipsText?this.$utils.navRouter("/subpackage/uploadImage/index?order_sn="+this.progressingInfo.order_sn+"&isRoll=1"):this.$utils.navRouter("/subpackage/uploadImage/index?order_sn="+this.progressingInfo.order_sn);else{var t,e;t=2==this.progressingInfo.platform?this.progressingInfo.action_url.wx_mini.elm.appid:this.progressingInfo.action_url.wx_mini.mt.appid,e=this.progressingInfo.is_place_order?2==this.progressingInfo.platform?this.progressingInfo.action_url.wx_mini.elm.comment_list:this.progressingInfo.action_url.wx_mini.mt.comment_list:2==this.progressingInfo.platform?this.progressingInfo.action_url.wx_mini.elm.path:this.progressingInfo.action_url.wx_mini.mt.path,o.setClipboardData({data:this.progressingInfo.plan_name,success:function(){o.showToast({title:"复制成功",duration:2e3})}}),o.navigateToMiniProgram({appId:t,path:e,success:function(t){}})}},beginTimer:function(){var t=this;this.ticker=setInterval((function(){t.tipsTime>0?t.tipsTime=t.tipsTime-1:(clearInterval(t.ticker),t.ticker=null)}),1e3)},jumpSet:function(t){if(!this.$utils.handleLoginNav()){var e="";if(1==t)this.place_order&&1==this.place_order.show_type?e="/pages/placeOrder/index":this.$utils.showToast("活动未开启，如有疑问请联系客服");else if(2==t)e="/pages/welfare/index";else if(3==t)this.$http.getCouponPackage().then((function(t){200==t.code&&o.navigateToMiniProgram({appId:t.data.wx_mini.mini_appid,path:t.data.wx_mini.mini_path})}));else if(4==t)e="/pages/orderlist/index";else if(5==t)return this.jumpGuide();o.navigateTo({url:e})}},jumpGuide:function(){this.$utils.handleLoginNav()||o.navigateTo({url:"/subpackage/guide/index"})},pullUp:function(){this.isAdd&&(this.isAdd=!0,this.getList())},getShowTipsStatus:function(){var t=this;o.getSystemInfo({success:function(e){var i=e.statusBarHeight||0,n=o.getMenuButtonBoundingClientRect(),s=n.height+2*n.top;t.topHeight=i+s},fail:function(t){console.error("获取系统信息失败:",t)}}),this.$globalData.GET("isShowTipsClose")?this.isShowTips=!1:this.$utils.hasLogin()||(this.isShowTips=!0)},closeTips:function(){this.isShowTips=!1,this.$globalData.SET("isShowTipsClose",!0)},randomNumber:function(){return this.$utils.random(150,500)},receive:function(t){this.$utils.handleLoginNav()||this.$utils.publicNavigation(this.empty_list[t])},search:function(){this.from.page_id="",this.notTips=!1,this.loadIcon=!1,this.isAdd=!0,this.getList()},switchAbleJoin:function(t){this.switchPsition=t,this.from.able_join=1==this.from.able_join?"":1,this.search()},onlyRebate:function(){this.from.only_rebate=1,this.from.platform=-1,this.search()},switchPlatfrom:function(t){this.from.platform=t,this.from.only_rebate="",this.search()},switchTypeList:function(t,e){this.switchPsition=e,this.from.sort=2==t?"asc":"",this.from.only_order=1==t?t:"",this.search()},switchAddress:function(){this.$utils.handleLoginNav()||o.navigateTo({url:"/subpackage/map/index"})},openSq:function(){this.$utils.handleLoginNav()||(this.sq_qrcode_img_url?this.$refs.sqpopup.show():this.$utils.showToast("活动未开启，请联系客服！"))},navBanner:function(t,e){if(!this.$utils.handleLoginNav()){var i=this.modules[t].list[e];21==i.jump_type?this.openSq():this.$utils.publicNavigation(i)}},navMenu:function(t){this.$utils.handleLoginNav()||(21==t.jump_type?this.openSq():this.$utils.publicNavigation(t))},getLocation:function(){var t=this;this.$utils.getLocation().then((function(e){t.from.map_lat=e.latitude,t.from.map_lon=e.longitude,t.$globalData.SET("lat",e.latitude),t.$globalData.SET("lon",e.longitude),t.getPos(),t.list=[],t.from.page_id="",t.notTips=!1,t.loadIcon=!0,t.isAdd=!0,""!=t.from.plan_source?t.getList():t.getInfo()})).catch((function(e){t.from.map_lat="",t.from.map_lon="",t.$utils.showToast("定位获取失败，请手动定位"),t.list=[],t.from.page_id="",t.notTips=!1,t.loadIcon=!1}))},getProgressing:function(){var t=this;this.$utils.handleLoginNav()||this.$http.getProgressing().then((function(e){if(200==e.code)if(console.log(e,"引导信息------"),e.data){t.progressingInfo=e.data;var i=parseInt((new Date).getTime()/1e3);e.data.is_place_order?e.data.is_upload_credential_new?e.data.show_upload_video_credential||2!=e.data.source||(t.tipsText=5):(t.tipsText=2==e.data.source?3:4,t.tipsTime=e.data.upload_credential_expire_time-i):(t.tipsText=2==e.data.source?1:2,t.tipsTime=e.data.place_order_expire_time-i),t.tipsTime?(t.tipsPop=!0,t.beginTimer()):(t.tipsPop=!1,t.ticker&&(clearInterval(t.ticker),t.ticker=null)),5==t.tipsText&&(t.tipsPop=!0)}else t.tipsPop=!1}))},getInfo:function(){var t=this;this.$http.getIndexInfo().then((function(e){if(200==e.code){t.bgColor=e.data.background_color,t.modules=e.data.modules;var i=[];t.modules.forEach((function(e){if("newUserGift"==e.type&&1==e.status&&(1==e.config.new_user_guide&&2==e.new_style&&i.push({url:"https://img.yunzhanxinxi.com/mini/bwc/v262/jifen_banner_ic.png",index:2,new_user_guide:1}),1==e.config.credits_exchange&&i.push({url:"https://img.yunzhanxinxi.com/mini/bwc/v262/jifen_banner_ic.png",index:2,credits_exchange:1}),1==e.config.timed_challenge&&i.push({url:"https://img.yunzhanxinxi.com/mini/bwc/v262/tiaozhanshai_banner_ic.png",index:1,timed_challenge:1}),1==e.config.topdining&&i.push({url:"https://img.yunzhanxinxi.com/mini/bwc/v262/shenquan_banner_ic.png",index:3,topdining:1}),1==e.config.board&&i.push({url:"https://img.yunzhanxinxi.com/mini/bwc/v262/shengqian_banner_ic.png",index:4,board:1}),e.img=i),"om_goods"==e.type&&1==e.status&&(1!=e.config.all_city?1==e.config.meituan?t.from.platform=1:1==e.config.ele&&(t.from.platform=2):t.from.platform="",t.from.plan_source=e.config.new_plan_source,t.from.able_join=e.config.able_join,console.log(t.from,"----------请求参数")),"business"==e.type&&1==e.status&&0!=e.list.length){for(var n=[],o=0;o<e.list.length;o++)for(var s=0;s<e.list[o].length;s++)n.push(e.list[o][s]);var a=n;t.iconList=[];var r=1==e.show_type?5:4,c=1==e.style?2:1;t.iconPageNum=r*c,t.iconPage=Math.ceil(a.length/t.iconPageNum);for(var h=0;h<t.iconPage;h++)t.iconList.push(a.slice(h*t.iconPageNum,(h+1)*t.iconPageNum))}})),t.from.map_lat&&t.from.map_lon&&t.getList()}}))},refresh:function(){this.list=[],this.from.apge=1,this.notTips=!1,this.loadIcon=!1,this.isAdd=!0,this.getList()},getList:function(){var t=this;if(this.notTips||!this.isAdd)return!1;this.isAdd=!1,this.$http.getHomeList(this.from).then((function(e){if(console.log(e,"商品列表---------------"),200==e.code)if(t.loadIcon=!1,0==e.data.length?t.isAdd=!1:t.isAdd=!0,e.data.list.forEach((function(t){1==t.source&&o.request({url:t.action_url.mt_monitor.imp_monitor_url,method:"GET"})})),""==t.from.page_id?t.list=e.data.list:t.list=[].concat((0,n.default)(t.list),(0,n.default)(e.data.list)),t.from.page_id=e.data.page_id,0!=t.list.length){if(t.notTips=!1,0==t.switchTop){var i=o.getSystemInfoSync();o.createSelectorQuery().in(t).select(".bwclist").boundingClientRect((function(e){console.log(e,"-------"),e&&e.top?t.switchTop=e.top-(i.navigationBarHeight||0)-i.statusBarHeight:t.switchTop=650})).exec()}1==t.switchPsition&&o.pageScrollTo({scrollTop:t.switchTop-50,duration:300})}else t.notTips=!0}))},getPos:function(){var t=this;this.$http.getPosNew({lat:this.from.map_lat,lng:this.from.map_lon}).then((function(e){console.log(e,"---地址解析"),200==e.code&&(t.address=e.data.name,t.city=e.data.city,t.$globalData.SET("address",e.data.name),t.$globalData.SET("city",e.data.city))}))},getCouponList:function(){var t=this;this.$http.getbwcCouponList().then((function(e){200==e.code&&(t.empty_list=e.data.empty_list)}))},init:function(){var t=this;this.getInfo(),this.$globalData.GET("lat")?(this.from.map_lat=this.$globalData.GET("lat"),this.from.map_lon=this.$globalData.GET("lon"),this.city=this.$globalData.GET("city"),this.address=this.$globalData.GET("address"),this.from.map_lat&&this.from.map_lon&&this.city&&this.address||this.getLocation()):this.getLocation(),o.$on("bwcselectLocation",(function(e){t.address=e.address.title,t.from.map_lat=e.address.location.lat,t.from.map_lon=e.address.location.lng,t.city=e.address.city,t.$globalData.SET("lat",e.address.location.lat),t.$globalData.SET("lon",e.address.location.lng),t.$globalData.SET("city",e.address.city),t.$globalData.SET("address",e.address.title),t.list=[],t.from.page_id="",t.notTips=!1,t.loadIcon=!0,t.isAdd=!0,t.getInfo()})),this.getCouponList()},getToday:function(){var t=new Date;return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()},activePOp:function(){var t=this;this.$http.activePOp().then((function(e){if(console.log(e,"爆品弹窗---"),200==e.code)if(0==e.data.config.activity_status)t.singleItemPop=!1;else{var i=t.getToday(),n=o.getStorageSync(i);t.singleItemInfo=e.data.config,n?(n=JSON.parse(n)).InvitePopupId.includes(t.singleItemInfo.id)?t.singleItemPop=!1:t.singleItemPop=!0:t.singleItemPop=!0}}))},getInviteConfig:function(){var t=this;this.$http.getInviteConfig().then((function(e){200==e.code&&(!o.getStorageSync("guideHomePop")&&e.data.guide&&1==e.data.guide.status?t.guide=!0:(t.guide=!1,t.activePOp()),e.data.community&&(t.sq_status=e.data.community.community_status,t.sq_qrcode_img_url=e.data.community.qrcode_url),e.data.place_order&&(t.place_order=e.data.place_order))}))},singleClick:function(){this.$utils.publicNavigation(this.singleItemInfo),this.closeSingleItemPop()},closeSingleItemPop:function(){var t=this.getToday(),e=o.getStorageSync(t);if(e)(e=JSON.parse(e)).InvitePopupId.push(this.singleItemInfo.id),o.setStorageSync(t,JSON.stringify(e));else{var i={InvitePopupId:[this.singleItemInfo.id]};o.setStorageSync(t,JSON.stringify(i))}this.singleItemPop=!1}},onLoad:function(){this.$utils.hasLogin()&&this.getUserInfo()}},r=i(3286),c=(0,(i.n(r)(),i(9453)).default)(a,(function(){var t=this,e=(t.$createElement,t._self._c,t.scrollTop>t.switchTop&&0!=t.list.length),i=t.__map(t.modules,(function(e,i){var n=t.__get_orig(e),o="banner"==e.type&&1==e.status?e.list.length:null,s="business"==e.type&&1==e.status?t.iconList.length:null,a="business"==e.type&&1==e.status&&s>1?t.iconList.length:null,r="newUserGift"==e.type&&0!=e.listNum&&1==e.status&&1==e.new_style?e.img.length:null,c="newUserGift"==e.type&&0!=e.listNum&&1==e.status&&2==e.new_style?e.img.length:null,h="om_goods"==e.type&&1==e.status?e.config.new_plan_source.includes(5)||3==e.config.new_plan_source.length:null;return{$orig:n,g1:o,g2:s,g3:a,g4:r,g5:c,g6:h,g7:"om_goods"!=e.type||1!=e.status||h?null:1==e.config.new_plan_source.length&&(e.config.new_plan_source.includes(2)||e.config.new_plan_source.includes(3)),g8:"om_goods"==e.type&&1==e.status?t.list.length:null,l0:"om_goods"==e.type&&1==e.status&&t.notTips?t.__map(t.empty_list,(function(e,i){return{$orig:t.__get_orig(e),m0:t.randomNumber()}})):null}})),n=t.tipsPop&&5!=t.tipsText?t._f("limitTimeFilter")(t.tipsTime):null,o=t.OrderRejected?t._f("limitTimeFilter")(t.expireTime):null;t._isMounted||(t.e0=function(e){return t.$refs.popup.hide()},t.e1=function(e){return t.$refs.sqpopup.hide()},t.e2=function(e){t.guidestep=2},t.e3=function(e){e.stopPropagation(),t.tipsPop=!1},t.e4=function(e){t.jumpPopup=!1}),t.$mp.data=Object.assign({},{$root:{g0:e,l1:i,f0:n,f1:o}})}),[],!1,null,"3099f39f",null,!1,void 0,void 0).exports},7690:function(t,e,i){i.r(e),i.d(e,{default:function(){return c}});var n=i(7039).default,o=i(8793).default,s=i(7256),a={data:function(){return{backLock:!1,selectedTab:0,color:"#999999",selectedColor:"#FE7C0A",active:0,keyword:"",page:1,list:[],typeList:[],notYetData:!1,showVideo:!1,videoUrl:"",userInfo:{},addDouyin:!1,scanCode:!1,chooseDouyin:!1,dyAccountList:[],ids:[],douYinImg:"",seconed:0,isEnd:!0,goods:{}}},onReachBottom:function(){this.getList()},methods:{init:function(){this.getType()},switchTabbar:function(t){var e=t.currentTarget.dataset.path;n.switchTab({url:e})},dyCommissionWatch:function(t){return this.userInfo&&t?this.userInfo.sub_commission_status&&this.userInfo.fx_commission_config.doudian_status&&(null===(e=(t.coupon_price-0?t.coupon_price/100:t.price/100)*((t.activity_cos_ratio||t.cos_ratio)/100)*(this.userInfo.fx_commission_config.doudian_rate/100))||void 0===e?void 0:e.toFixed(2))||"0.00":0;var e},play:function(t){this.videoUrl=t.url,this.showVideo=!0},collect:function(t,e){var i=this;1==e?this.$http.geUncollectMaterial({product_id:this.list[t].product_id,material_id:this.list[t].material.id}).then((function(e){n.showToast({icon:"none",title:e.message}),200==e.code&&(i.list[t].material.is_material_collect=0)})):this.$http.getCollectMaterial({product_id:this.list[t].product_id,material_id:this.list[t].material.id}).then((function(e){n.showToast({icon:"none",title:e.message}),200==e.code&&(i.list[t].material.is_material_collect=1)}))},switchTab:function(t){this.active=t,this.page=1,this.notYetData=!1,this.getList()},search:function(){this.page=1,this.notYetData=!1,this.getList()},getType:function(){var t=this;this.$http.getMyGoodsListType().then((function(e){if(200==e.code){var i=[];i.push(e.data.categorys[0]),i.push({id:"hot",name:"热门素材",parent_id:0}),t.typeList=i,t.active=e.data.categorys[0].id,t.getList()}}))},getList:function(){var t=this;if(0==this.typeList.length)return this.getType();var e={hot_material:"hot"==this.active?1:0,keyword:this.keyword,page:this.page,first_cid:this.typeList[0].id};this.$http.getMyMateriaList(e).then((function(e){200==e.code&&(1==t.page?(n.pageScrollTo({scrollTop:0,duration:0}),t.list=e.data.list||[],e.data.list.length<1&&(t.notYetData=!0)):t.list=t.list.concat(e.data.list||[]),t.page+=1)}))},goInfo:function(t){n.navigateTo({url:"/pages_kuaidi/qualityDetail/sourceMaterial/index?id="+this.list[t].id+"&product_id="+this.list[t].product_id+"&material_id="+this.list[t].material.id})},addWindow:function(t){var e=this;this.goods=t,this.$http.getDyAccountList().then((function(t){200==t.code&&(e.chooseDouyin=!0,0==t.data.length||(t.data.forEach((function(t){t.isCheck=!1})),e.dyAccountList=t.data))}))},closeDouyin:function(){this.addDouyin=!1},toScanCode:function(){this.scanCode=!0,this.chooseDouyin=!1,this.chooseDouyin&&(this.chooseDouyin=!1),this.closeDouyin()},refreshQrCode:function(){this.douYinImg="",this.isEnd=!0,this.getDyQrCode()},getDyQrCode:function(){var t=this;this.$http.getDyAuthAddress({redirect_uri:"https://dy.yunzhanxinxi.com/html/douyin/auth-scuuess.html?is_test=0&time=".concat(Date.now())}).then((function(e){200==e.code&&t.createQrCode2(e.data.url,"douYinId",192,192)}))},createQrCode2:function(t,e,i,o){var a=this;s({width:i,height:o,canvasId:e,text:t,_this:this,callback:function(t){n.canvasToTempFilePath({canvasId:e,success:function(t){a.draw2(t.tempFilePath)},complete:function(t){}},a)}})},downSecond:function(t){var e=this,i=setInterval((function(){t-=1,e.seconed=t,(t<0||""==e.douYinImg)&&(e.isEnd=!1,clearInterval(i))}),1e3)},draw2:function(t){var e=this,i=n.createCanvasContext("douYinId",this);i.drawImage(t,0*this.rpx,0*this.rpx,192,192),i.draw(!1,(function(){n.canvasToTempFilePath({canvasId:"douYinId",quality:1,success:function(t){e.douYinImg=t.tempFilePath,e.isEnd=!0,e.seconed=60,e.downSecond(e.seconed)},fail:function(t){}},e)}))},preserveImg:function(){var t=this;n.saveImageToPhotosAlbum({filePath:t.douYinImg,success:function(e){n.showToast({title:"保存成功",icon:"success",duration:2e3}),t.closeCode()},fail:function(t){"saveImageToPhotosAlbum:fail auth deny"!==t.errMsg&&"saveImageToPhotosAlbum:fail:auth denied"!==t.errMsg||o.showModal({title:"提示",content:"需要您授权保存相册",showCancel:!1,success:function(){o.openSetting({success:function(t){t.authSetting["scope.writePhotosAlbum"]?o.showModal({title:"提示",content:"获取权限成功,再次点击按钮即可保存",showCancel:!1}):o.showModal({title:"提示",content:"获取权限失败，将无法保存到相册哦~",showCancel:!1})},fail:function(t){},complete:function(t){}})}})}})},closeCode:function(){this.scanCode=!1},closeChoose:function(){this.ids=[],this.chooseDouyin=!1},checkThis:function(t){if(t.isCheck=!t.isCheck,1==t.isCheck)this.ids.push(t.id);else{var e=this.ids.indexOf(t.id);this.ids.splice(e,1)}},addDyShowCaseProducts:function(){var t=this,e={goods_url:this.goods.detail_url,auth_id:this.ids};e.auth_id.forEach((function(t,i){e["auth_id["+i+"]"]=t})),delete e.auth_id,0!=this.ids.length?this.$http.addDyShowCaseProduct(e).then((function(e){200==e.code?n.showToast({title:"添加成功",duration:2e3}):n.showToast({title:e.message,icon:"error",duration:2e3}),t.closeChoose()})):n.showToast({title:"请选择账号",icon:"error",duration:2e3})}},mounted:function(){var t=this;n.$once("login",(function(){t.init()})),this.init(),n.pageScrollTo({scrollTop:0,duration:0});var e=getCurrentPages().length;this.backLock=1!=e}},r=i(8775),c=(0,(i.n(r)(),i(9453)).default)(a,(function(){var t=this,e=(t.$createElement,t._self._c,t.__map(t.list,(function(e,i){return{$orig:t.__get_orig(e),m0:t.dyCommissionWatch(e)}})));t.$mp.data=Object.assign({},{$root:{l0:e}})}),[],!1,null,"cc2d48a4",null,!1,void 0,void 0).exports},9910:function(t,e,i){i.r(e),i.d(e,{default:function(){return a}});var n=i(7039).default,o={data:function(){return{user:{hm_uid:""},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],backLock:!1,configInfo:{prizes:[]},prizeRecordList:[],userInfo:{},outstandingOrders:!1,index:-1,luckPosition:-1,luckDrawLock:!0,exchangeLock:!0,current:0,interval:5e3,duration:500,result:{},popupCallbackData:{},phone:"",code:"",share:{}}},created:function(){var t=this,e=getCurrentPages().length;this.backLock=1!=e,n.$on("refreshbwcPhone",(function(e){t.initPage(),t.getUserInfo()})),this.$utils.hasLogin()&&this.initPage()},methods:{getUserInfo:function(){var t=this;this.$http.getUserInfo().then((function(e){200==e.code&&(t.user=e.data.user,t.getShareInfo())}))},getShareInfo:function(){var t=this;this.$common.getSharePath().then((function(e){console.log(e,"分享配置"),t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return n.hideShareMenu(),!1;if(2==t.shareSwitch){var i=t.extend.filter((function(t){return"52"==t.index}));if(0==i.length||"1"!=i[0].switch)return void n.hideShareMenu();e=i[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(i){t.shareTitle=i.shareTitle,t.shareUrl=i.shareUrl,1==t.shareSwitch&&t.pathList.includes("52")||2==t.shareSwitch&&e?n.showShareMenu():n.hideShareMenu()}))}))},rule:function(){this.$utils.handleLoginNav()||this.$refs.popup.show()},initPage:function(){var t=this;this.$common.getUserInfo().then((function(e){t.userInfo=e,t.getlotteryConfigInfo(),t.getPrizeRecord(),t.getNotExchangeOrder()}))},getlotteryConfigInfo:function(){var t=this;this.$http.getlotteryInfo().then((function(e){200==e.code&&(t.configInfo=e.data)}))},getPrizeRecord:function(){var t=this;this.$http.carousel().then((function(e){200==e.code&&(t.prizeRecordList=e.data.list)}))},getNotExchangeOrder:function(){var t=this;this.$http.notExchangeOrder().then((function(e){if(200==e.code)if(e.data.list.length){t.outstandingOrders=!0;var i={prize_type:20,img_url:e.data.list[0].img_url,name:e.data.list[0].card_name,other_id:e.data.list[0].other_id};t.popupCallbackData=i}else t.outstandingOrders=!1}))},getCurrent:function(t){this.current=t.detail.current},loadAnimation:function(){var t=this;if(!this.$utils.handleLoginNav())return this.userInfo.score<this.configInfo.consume_score?n.showToast({title:"当前积分不足，无法参与抽奖",icon:"none",duration:2e3}):this.configInfo.today_lotterycount>=this.configInfo.today_max_lotterycount?n.showToast({title:"已达每日参与上限，请明日再来！",icon:"none",duration:2e3}):void(this.luckDrawLock&&(this.luckDrawLock=!1,this.$http.start({plate_version:this.configInfo.plate_version}).then((function(e){if(200==e.code){t.configInfo.today_lotterycount+=1,n.$emit("getUserInfo",!0);var i=setInterval((function(){t.index++,t.index>7&&(t.index=0)}),100);setTimeout((function(){t.result=e.data,t.configInfo.prizes.forEach((function(i,n){e.data.id==i.id&&(t.luckPosition=n)})),t.stop(t.luckPosition,i)}),1500)}else t.luckDrawLock=!0,466==e.code&&t.getlotteryConfigInfo()}))))},stop:function(t,e){clearInterval(e);var i=this.index+1;this.stopLuck(t,i,0,20)},stopLuck:function(t,e){var i=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3?arguments[3]:void 0;setTimeout((function(){i.index=e,n<320||e!=t?(o++,n+=o,++e>7&&(e=0),i.stopLuck(t,e,n,o)):setTimeout((function(){i.luckDrawLock=!0,i.result.prize_type&&10!=i.result.prize_type&&i.getNotExchangeOrder(),i.popupCallback(1)}),1e3)}),n)},popupCallback:function(t){var e=this;if(3!=t||this.phone)if(0==t)this.$refs.popup.show();else if(1==t){var i={};if(i.img_url=this.result.prize_img,i.prize_type=this.result.prize_type,i.name=this.result.prize_name||this.configInfo.prizes[this.luckPosition].name,i.prize_type){var n={prize_name:i.name,nickname:this.userInfo.nickname};this.prizeRecordList.splice(this.current+1,0,n)}this.popupCallbackData=i,setTimeout((function(){e.$refs.popup1.show()}),200)}else 2==t?this.$refs.popup6.hide():3==t?this.$refs.popup6.show():4==t&&(this.$refs.popup1.hide(),this.$refs.popup7.show())},getPhone:function(t){var e=this;t&&t.detail.encryptedData&&this.$http.getPhone({encryptedData:t.detail.encryptedData,iv:t.detail.iv}).then((function(t){if(200==t.code){if(!t.data.telphone)return n.showToast({title:"解密失败，请先移除小程序后重试！",icon:"none",duration:2e3});e.phone=t.data.telphone,e.$refs.popup6.show()}}))},exchange:function(t,e){var i=this;this.exchangeLock&&(this.exchangeLock=!1,this.$http.otteryExchange({id:this.result.other_id||e.other_id,telphone:t}).then((function(t){i.exchangeLock=!0,200==t.code&&(i.phone="",n.removeStorageSync("phone"),i.getNotExchangeOrder(),i.popupCallback(2),200!=t.code&&410!=t.code||n.showToast({title:t.message,icon:"success",duration:2e3}),30!=i.result.prize_type&&30!=e.prize_type||(i.code=t.data.kf_qr_img,i.popupCallback(4)))})))},nav:function(){this.$utils.handleLoginNav()||this.$utils.navRouter("/subpackage/luckDraw/record/index")}},onShareAppMessage:function(t){var e;return e=n.getStorageSync("isScenes")?"/pages/luckDraw/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/luckDraw/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onShareTimeline:function(t){var e;return e=n.getStorageSync("isScenes")?"/pages/luckDraw/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/luckDraw/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onLoad:function(){this.$utils.hasLogin()&&this.getUserInfo()}},s=i(93),a=(0,(i.n(s)(),i(9453)).default)(o,(function(){var t=this;t.$createElement;t._self._c,t._isMounted||(t.e0=function(e){t.$refs.popup1.hide(),t.pageLock=!0},t.e1=function(e){t.$refs.popup1.hide(),t.$refs.popup6.show()},t.e2=function(e){return t.$refs.popup1.hide()},t.e3=function(e){t.$refs.popup1.hide(),t.pageLock=!0},t.e4=function(e){return t.$refs.popup6.hide()},t.e5=function(e){return t.$refs.popup7.hide()},t.e6=function(e){t.$refs.popup.hide(),t.pageLock=!0})}),[],!1,null,"d4d19b92",null,!1,void 0,void 0).exports},4183:function(t,e,i){i.r(e),i.d(e,{default:function(){return a}});var n=i(7039).default,o={data:function(){return{backLock:!1,list:[],notYetData:!1,searchForm:{type:"direct",nickname:"",max_id:0,level:0},usertype:[{name:"直邀用户",value:"direct"},{name:"间邀用户",value:"indirect"}],userlevel:[],newuser:{today:0,yesterday:0,month:0},hasNextPage:!0,userinfo:null,show_type:0,show_update:2,show_tutor:0,bgColor:"",show_level:!1}},created:function(){var t=this,e=getCurrentPages().length;this.backLock=1!=e,n.$on("refreshbwcPhone",(function(){t.initPage()})),this.$utils.hasLogin()&&this.initPage()},methods:{initPage:function(){this.getShowConfig()},getUserNextLevel:function(){for(var t=0;t<this.userlevel.length;t++)if((this.userinfo.level||this.userinfo.level_info&&this.userinfo.level_info.level)==this.userlevel[t].value){this.userlevel[t+1]&&(this.userinfo.next_level=this.userlevel[t+1].value);break}},getShowConfig:function(){var t=this;this.$globalData.GET("systemconfig")?(this.show_type=this.$globalData.GET("systemconfig").my_friends_template||0,this.show_update=this.$globalData.GET("systemconfig").member_rights||2,this.show_tutor=this.$globalData.GET("systemconfig").my_superior||0,1==this.$globalData.GET("systemconfig").personal_background_status?this.bgColor=this.$globalData.GET("systemconfig").personal_background_color||"#FE2B22":this.bgColor="#FE2B22",this.getLevelInfo()):this.$http.getExamineStatus().then((function(e){200==e.code&&(t.$globalData.SET("systemconfig",e.data),t.show_type=e.data.my_friends_template||0,t.show_update=e.data.member_rights||2,t.show_tutor=e.data.my_superior||0,1==e.data.personal_background_status?t.bgColor=e.data.personal_background_color||"#FE2B22":t.bgColor="#FE2B22",t.getLevelInfo())}))},getLevelInfo:function(){var t=this;this.$globalData.GET("memberbenefits")?(this.$globalData.GET("memberbenefits").userlevel&&(this.userlevel=[{name:"全部人数",value:0,num:0}].concat((this.$globalData.GET("memberbenefits").userlevel||[]).map((function(t){return{name:t.describe,value:t.level,num:0}}))),1==this.$globalData.GET("systemconfig").member_rights&&this.userlevel.length&&(this.show_level=!0)),1==this.show_type&&(this.$globalData.GET("memberbenefits").userinfo?(this.userinfo=this.$globalData.GET("memberbenefits").userinfo,this.userinfo.level&&this.userinfo.level>1&&1==this.$globalData.GET("systemconfig").member_rights&&this.usertype.push({name:"团队用户",value:"team"}),this.getUserNextLevel()):this.getUserInfo()),this.getList()):this.$http.getUserLevel().then((function(e){200==e.code&&(t.$globalData.SET("memberbenefits",e.data.user_info,"userinfo"),t.$globalData.SET("memberbenefits",e.data.user_level,"userlevel"),e.data.user_level&&(t.userlevel=[{name:"全部人数",value:0,num:0}].concat((t.$globalData.GET("memberbenefits").userlevel||[]).map((function(t){return{name:t.describe,value:t.level,num:0}}))),1==t.$globalData.GET("systemconfig").member_rights&&t.userlevel.length&&(t.show_level=!0)),1==t.show_type&&(e.data.user_info?(t.userinfo=e.data.user_info,t.userinfo.level&&t.userinfo.level>1&&1==t.$globalData.GET("systemconfig").member_rights&&t.usertype.push({name:"团队用户",value:"team"}),t.getUserNextLevel()):t.getUserInfo()),t.getList())}))},getUserInfo:function(){var t=this;this.$globalData.GET("home")&&this.$globalData.GET("home").userInfo?(this.userinfo=this.$globalData.GET("home").userInfo,this.userinfo.level_info&&this.userinfo.level_info.level>1&&1==this.$globalData.GET("systemconfig").member_rights&&this.usertype.push({name:"团队用户",value:"team"})):this.$http.userInfo().then((function(e){e&&200==e.code&&(t.userinfo=e.data,t.$globalData.SET("home",e.data,"userInfo"),t.userinfo.level_info&&t.userinfo.level_info.level>1&&1==t.$globalData.GET("systemconfig").member_rights&&t.usertype.push({name:"团队用户",value:"team"}))}))},navMemberBenefitsUpdate:function(){n.navigateTo({url:"/subpackage/grade/index"})},navMemberBenefits:function(){1==this.show_update?n.navigateTo({url:"/subpackage/grade/index"}):console.log("隐藏会员权益，不做跳转")},navToMyTutor:function(){n.navigateTo({url:"/subpackage/myTutor/index"})},jumpOrder:function(t){n.navigateTo({url:"/pages/myOrder/index?order_hm_uid="+t.uid+"&type=2&business_id=74"})},navToDetail:function(t){console.log("navigate to detail",t),n.navigateTo({url:"/subpackage/myFans/detail/index?uid="+t.uid})},search:function(){this.$utils.handleLoginNav()||(this.hasNextPage=!0,this.list=[],this.searchForm.max_id=0,this.getList())},changeUserLevel:function(t){t.value!=this.searchForm.level&&(this.hasNextPage=!0,this.searchForm.level=t.value,this.list=[],this.searchForm.max_id=0,this.getList())},changeUserType:function(t){this.$utils.handleLoginNav()||t.value!=this.searchForm.type&&(this.hasNextPage=!0,this.searchForm.type=t.value,this.list=[],this.searchForm.max_id=0,this.getList())},getList:function(){var t=this;this.hasNextPage&&(n.showLoading(),this.$http.getFriends(this.searchForm).then((function(e){200==e.code?(e.data.friends_list&&e.data.friends_list.length&&(t.list.length?t.list=t.list.concat(e.data.friends_list):t.list=e.data.friends_list,e.data.friends_list.length?t.searchForm.max_id=t.list[t.list.length-1].created_time:(t.searchForm.max_id=0,t.hasNextPage=!1)),t.newuser=e.data.time_statistics,t.userlevel.forEach((function(t){for(var i=0;i<e.data.level_statistics.length;i++)e.data.level_statistics[i].level==t.value&&(t.num=e.data.level_statistics[i].users)})),n.hideLoading()):n.hideLoading()})).catch((function(){n.hideLoading()})))},pullUp:function(){this.page=1,this.getList(this.list[this.list.length-1].id,2)}},onReachBottom:function(){this.page=1,this.getList(this.list[this.list.length-1].id,2)}},s=i(1410),a=(0,(i.n(s)(),i(9453)).default)(o,(function(){var t=this,e=(t.$createElement,t._self._c,t.list.length);t.$mp.data=Object.assign({},{$root:{g0:e}})}),[],!1,null,"16d9cfc4",null,!1,void 0,void 0).exports},6272:function(t,e,i){i.r(e),i.d(e,{default:function(){return r}});var n=i(7039).default,o=i(8793).default,s={data:function(){return{order_hm_uid:0,navHeight:0,orderList:[],total:!1,notYetData:!1,slotLock:!1,timeSlotId:0,lodTimeSlotId:"",type:2,myOrderType:1,orderState:-1,businessList:[],scrollTop:0,backLock:!1,doukeTypeList:[{name:"全部",id:-1},{name:"已支付",id:2},{name:"已结算",id:3},{name:"已失效",id:1}],bgColor:"#fff",my_order_template:1,totleNum:"",page:1}},props:{hometype:{default:function(){return""}}},watch:{hometype:function(t){console.log(t,"-*-*-"),this.type=t},timeSlotId:function(t,e){this.slotLock&&(this.lodTimeSlotId=e)}},onPullDownRefresh:function(){this.page=1,this.getList("",2)},onPageScroll:function(t){this.scrollTop=t.scrollTop},onLoad:function(t){console.log(t,"-*-*-*-"),this.my_order_template=0,t&&(this.type=t.type,2==t.type&&t.business_id&&(this.timeSlotId=t.business_id,this.order_hm_uid=t.order_hm_uid)),n.setNavigationBarTitle({title:2==this.type?"团队订单":"我的订单"});var e=getCurrentPages().length;this.backLock=1!=e,this.$utils.hasLogin()&&this.getList()},created:function(){var t=this,e=o.getMenuButtonBoundingClientRect();o.getSystemInfo({success:function(i){var n=i.statusBarHeight,o=n+e.height+2*(e.top-n);t.navHeight=o}}),n.$on("refreshbwcPhone",(function(){t.getList(),t.getBusinessList()})),this.hometype&&(this.type=this.hometype,n.setNavigationBarTitle({title:2==this.type?"团队订单":"我的订单"})),this.$utils.hasLogin()&&this.getBusinessList()},onReachBottom:function(){if(this.page++,!(this.$refs.loadMore.loadLock||this.orderList.length<1)){if(this.total)return this.$refs.loadMore.no();this.$refs.loadMore.open(),this.getList(this.orderList[this.orderList.length-1].id)}},methods:{pullUp:function(t){this.type=t,this.page=1,this.getList(this.orderList[this.orderList.length-1].id,2)},screen:function(){this.$utils.handleLoginNav()||(this.slotLock=!0)},copyOrderCode:function(t){n.setClipboardData({data:t,success:function(){n.showToast({title:"复制成功",duration:2e3})}})},getNavHeight:function(t){this.navHeight=t},setTimeSlotId:function(t){this.timeSlotId=t},getList:function(t,e){var i=this;this.$utils.hasLogin()&&1==this.myOrderType&&(console.log(this.type,this.timeSlotId,this.order_hm_uid,"传参"),this.$http.newOrderList({type:this.type,business_id:this.timeSlotId,order_hm_uid:this.order_hm_uid,order_status:this.orderState,max_id:t||""}).then((function(o){e&&(n.hideLoading(),2==e&&n.stopPullDownRefresh()),200==o.code&&(t?(o.data.list.length<1?(i.$refs.loadMore.no(),i.total=!0):i.orderList=i.orderList.concat(o.data.list),i.$refs.loadMore.close()):(o.data.list.length<1?i.notYetData=!0:i.notYetData=!1,i.orderList=o.data.list))})))},getBusinessList:function(){var t=this;this.$http.getBusinessName().then((function(e){200==e.code&&(t.businessList=e.data)}))},businessQuery:function(){this.lodTimeSlotId="",this.slotLock=!1,n.showLoading({title:"加载中"}),this.notYetData=!1,this.$refs.loadMore.closeNo(),this.getList("",1)},listType:function(t){this.$utils.handleLoginNav()||this.orderState!=t&&(this.orderState=t,this.notYetData=!1,this.$refs.loadMore.closeNo(),this.getList("",1))},hide:function(){this.slotLock=!1,(this.lodTimeSlotId||0===this.lodTimeSlotId)&&(this.timeSlotId=this.lodTimeSlotId,this.lodTimeSlotId="")}}},a=i(3448),r=(0,(i.n(a)(),i(9453)).default)(s,(function(){var t=this;t.$createElement;t._self._c,t._isMounted||(t.e0=function(e){t.timeSlotId=0})}),[],!1,null,"4907f55e",null,!1,void 0,void 0).exports},2072:function(t,e,i){i.r(e),i.d(e,{default:function(){return r}});var n=i(7039).default,o=i(7256),s={data:function(){return{user:{hm_uid:""},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],backLock:!1,indicatorDots:!0,duration:500,list:[],qrcode:"",qrcodeLink:"",current:0,rpx:0,headPortrait:"",fullPosterList:[],headimgurlStatus:!0,authorizer_type:1,invite_code:"",invite_code_status:0,posterList:[],posterListHasHead:[],nick_name:"",head_img:"",share:{},shareData:{},safeBottom:0}},created:function(){var t=this;setTimeout((function(){var e=n.getSystemInfoSync();t.safeBottom=e.safeAreaInsets.bottom}),100);var e=getCurrentPages().length;this.backLock=1!=e,n.$on("refreshbwcPhone",(function(){t.getUserInfoA(),t.getPosterConfig(),t.$globalData.GET("home")&&t.$globalData.GET("home").userInfo&&(t.headPortrait=t.$globalData.GET("home").userInfo.headimgurl,t.invite_code=t.$globalData.GET("home").userInfo.invite_code,t.invite_code_status=t.$globalData.GET("home").userInfo.invite_code_status),t.headimgurlStatus&&t.posterListHasHead.length?t.fullPosterList=t.posterListHasHead:!t.headimgurlStatus&&t.posterList.length?t.fullPosterList=t.posterList:(t.getList(),t.getInfo(),t.$globalData.GET("home")&&t.$globalData.GET("home").userInfo?t.getCode():t.getUserInfo())})),this.$utils.hasLogin()&&(this.$globalData.GET("home")&&this.$globalData.GET("home").userInfo&&(this.headPortrait=this.$globalData.GET("home").userInfo.headimgurl,this.invite_code=this.$globalData.GET("home").userInfo.invite_code,this.invite_code_status=this.$globalData.GET("home").userInfo.invite_code_status),this.headimgurlStatus&&this.posterListHasHead.length?this.fullPosterList=this.posterListHasHead:!this.headimgurlStatus&&this.posterList.length?this.fullPosterList=this.posterList:(this.getList(),this.getInfo(),this.$globalData.GET("home")&&this.$globalData.GET("home").userInfo?this.getCode():this.getUserInfo()))},methods:{changeShareCodeName:function(t){return 0==t?"公众号二维码":1==t?"H5二维码":"小程序码"},getPosterConfig:function(){var t=this;return this.$http.getPosterConfig().then((function(e){if(200==e.code){var i=e.data;t.shareData=i||{},0!=t.shareData.jump_page_type&&1!=t.shareData.jump_page_type||t.createShareQrcode()}}))},getUserInfoA:function(){var t=this;this.$http.getUserInfo().then((function(e){200==e.code&&(t.user=e.data.user,t.getShareInfo())}))},getShareInfo:function(){var t=this;this.$common.getSharePath().then((function(e){console.log(e,"分享配置"),t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return n.hideShareMenu(),!1;if(2==t.shareSwitch){var i=t.extend.filter((function(t){return"47"==t.index}));if(0==i.length||"1"!=i[0].switch)return void n.hideShareMenu();e=i[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(i){t.shareTitle=i.shareTitle,t.shareUrl=i.shareUrl,1==t.shareSwitch&&t.pathList.includes("47")||2==t.shareSwitch&&e?n.showShareMenu():n.hideShareMenu()}))}))},login:function(){this.$utils.handleLoginNav()},time:function(t){var e=Date.parse(t),i=Date.parse(new Date)-e,n=36e5,o=24*n,s=30*o,a="";return i<o?a=parseInt(i/n)+"小时前":i<s&&i>o?a=parseInt(i/o)+"天前":(a=parseInt(i/s))>12?a="1年以前":a+="月前",a},copyDescription:function(){if(!this.list[this.current].description)return n.showToast({title:"暂无可复制文案",icon:"none",duration:2e3});n.setClipboardData({data:this.list[this.current].description,showToast:!0,success:function(t){},complete:function(t){console.log("复制完成")}}),this.addNum()},addNum:function(){this.$http.getPoserScan({poster_id:this.list[this.current].id}).then((function(t){console.log(t,"-----")}))},copyText:function(t){this.$utils.handleLoginNav()||n.setClipboardData({data:t,showToast:!0,success:function(t){},complete:function(t){console.log("复制完成")}})},getInfo:function(){var t=this;this.$http.getShareInfo({}).then((function(e){e&&200==e.code&&(t.head_img=e.data.head_img,t.nick_name=e.data.nick_name)}))},getUserInfo:function(){var t=this;this.$http.userInfo().then((function(e){e&&200==e.code&&(t.headPortrait=e.data.headimgurl,t.invite_code=e.data.invite_code,t.invite_code_status=e.data.invite_code_status,t.$globalData.SET("home",e.data,"userInfo"),t.getCode())}))},getList:function(){var t=this;this.$http.posterList({}).then((function(e){e&&200==e.code&&(t.list=e.data)}))},handleUpdateCode:function(t){this.headimgurlStatus=t,t&&this.posterListHasHead.length?this.fullPosterList=this.posterListHasHead:!t&&this.posterList.length?this.fullPosterList=this.posterList:(this.fullPosterList=t?this.posterListHasHead:this.posterList,this.createQrCode(this.qrcodeLink,"qrcode",168,168))},getCode:function(){var t=this;this.$http.popularize({}).then((function(e){200==e.code&&(t.authorizer_type=e.data.authorizer_type,t.qrcodeLink=e.data.qrcode,t.invite_code=e.data.invite_code,t.handleUpdateCode(!1))}))},chage:function(t){this.current=t.detail.current},drawHeadImg:function(t,e,i,o){var s=this,a=this;n.getImageInfo({src:a.headPortrait,success:function(i){var o=n.createCanvasContext(e,s);o.drawImage(t,0,0,164,164),o.drawImage(i.path,68,68,28,28),o.draw(!1,(function(){n.canvasToTempFilePath({canvasId:e,quality:1,success:function(t){a.list.forEach((function(e,i){a.draw(t.tempFilePath,i)}))}},s)}))},fail:function(t){n.showToast({title:"微信头像解析失败",icon:"none",duration:2e3})}})},createShareQrcode:function(){var t=this;o({width:164,height:164,x:8,y:8,correctLevel:3,canvasId:"qrcode",text:t.shareData.qr_code,callback:function(){setTimeout((function(){n.canvasToTempFilePath({canvasId:"qrcode",quality:1,success:function(e){t.shareData.qr_code=e.tempFilePath}})}),160)}})},createQrCode:function(t,e,i,s){var a=this,r=this;1==r.authorizer_type?o({_this:this,width:148,height:148,x:8,y:8,correctLevel:3,canvasId:e,text:t,callback:function(){setTimeout((function(){n.canvasToTempFilePath({canvasId:e,quality:1,success:function(t){r.qrcode=t.tempFilePath,r.headimgurlStatus?r.drawHeadImg(t.tempFilePath,e,i,s):r.list.forEach((function(t,e){r.draw(r.qrcode,e)}))}},a)}),160)}}):n.getImageInfo({src:t,success:function(t){r.qrcode=t.path,r.headimgurlStatus?r.drawHeadImg(t.path,e,i,s):r.list.forEach((function(e,i){r.draw(t.path,i)}))}})},preserveImg:function(t){var e;e="poster"===t?this.fullPosterList[this.current]:this.shareData.qr_code,n.getImageInfo({src:e,success:function(t){console.log(t,"下载"),n.saveImageToPhotosAlbum({filePath:t.path,success:function(t){n.showToast({title:"保存成功",icon:"success",duration:2e3})},fail:function(t){console.log(t,"---失败")}})}})},draw:function(t,e){var i=this,o=n.createCanvasContext("firstCanvas"+e,this),s=this;n.getImageInfo({src:s.list[e].src,success:function(a){if(o.drawImage(a.path,0,0,456,812),1==i.invite_code_status){o.setFontSize(16),o.fontWeight="700";var r=o.measureText("邀请码："+i.invite_code).width;o.fillStyle="white",o.lineWidth=1;var c=216-r/2,h=536,u=r+24,l=14;o.beginPath(),o.moveTo(c,550),o.arc(c+l,550,l,Math.PI,3*Math.PI/2),o.lineTo(c+u-l,h),o.arc(c+u-l,550,l,3*Math.PI/2,2*Math.PI),o.lineTo(c+u,557),o.arc(c+u-l,557,l,0,Math.PI/2),o.lineTo(c+l,571),o.arc(c+l,557,l,Math.PI/2,Math.PI),o.lineTo(c,550),o.closePath(),o.fill()}if(o.rect(138,582,180,180),o.setFillStyle("white"),o.fill(),o.drawImage(t,146,590,164,164),1==i.invite_code_status){o.setFontSize(16),o.fontWeight="700";var d=o.measureText("邀请码："+i.invite_code).width;o.fillStyle="#282828",o.setTextBaseline("top"),o.fillText("邀请码："+i.invite_code,(456-d)/2,546)}o.draw(!1,(function(){n.canvasToTempFilePath({canvasId:"firstCanvas"+e,quality:1,success:function(t){s.$set(s.fullPosterList,e,t.tempFilePath),s.list.length}},i)}))}})}},onShareAppMessage:function(t){var e;return e=n.getStorageSync("isScenes")?"/pages/myPoster/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/myPoster/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onShareTimeline:function(t){var e;return e=n.getStorageSync("isScenes")?"/pages/myPoster/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/myPoster/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onLoad:function(){this.$utils.hasLogin()&&(this.getUserInfoA(),this.getPosterConfig())}},a=i(5557),r=(0,(i.n(a)(),i(9453)).default)(s,(function(){var t=this,e=(t.$createElement,t._self._c,t.list.length),i=0!=e?t.time(t.list[t.current].create_time):null,n=0!=e?t.shareData&&Object.keys(t.shareData).length>0:null,o=0!=e&&n&&t.shareData.qr_code?t.changeShareCodeName(t.shareData.jump_page_type):null;t.$mp.data=Object.assign({},{$root:{g0:e,m0:i,g1:n,m1:o}})}),[],!1,null,"61d1eb36",null,!1,void 0,void 0).exports},9466:function(t,e,i){i.r(e),i.d(e,{default:function(){return d}});var n=i(7028),o=i(8238),s=i(843),a=i(8793).default,r=i(7039).default;function c(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}var h={data:function(){return{head_img:"",nick_name:"",is_show_member_right:!1,is_perfect:!1,choose:!1,tipsPop:!1,realNameTips:"",backLock:!1,qrcode:"",realname:!1,isearnest:!1,show_type:!1,nickname:"",headimgurl:"",user:{hm_uid:"",telephone:"",nickname:"微信昵称",headimgurl:"https://img.yunzhanxinxi.com/static/personal/bwc/head_portrait_ic@2x.png",money:"-",total_income:"-",month_income:"-",score:0,total_balance:"-"},is_certification:0,sub_commission_status:0,qrcode_img_url:"",phone:"",url:"",newUrl:"",isShowActivity:!1,menuConfig:{},navHeight:0,level:0,level_name:"",progress:0,nextLevel:0,nextLevel_name:""}},mounted:function(){var t=this,e=a.getMenuButtonBoundingClientRect();this.menuButtonObject=e,a.getSystemInfo({success:function(i){var n=i.statusBarHeight,o=n+e.height+2*(e.top-n);t.navHeight=o}}),r.pageScrollTo({scrollTop:0,duration:0});var i=getCurrentPages().length;this.backLock=1!=i},onPullDownRefresh:function(){r.getStorageSync("bwcPhone")?(this.getInfo(),setTimeout((function(){r.stopPullDownRefresh()}),1e3)):r.stopPullDownRefresh()},methods:{getMtWithdrawalRule:function(){var t=this;this.$http.getMtWithdrawalRule().then((function(e){200==e.code&&(console.log(e,"是否显示权益------"),t.is_show_member_right=e.data.config.is_show_member_right,t.is_show_member_right&&t.getLevelInfo())}))},getLevelInfo:function(){var t=this;this.$http.getUserLevel().then((function(e){if("200"==e.code){t.level=e.data.user_info.level,t.level_name=e.data.user_info.level_name;var i=0;for(var n in e.data.user_level)e.data.user_level[n].level==t.level&&(i=n,t.progress=parseInt(100*e.data.user_level[n].progress));e.data.user_level[parseInt(i)+1]?(t.nextLevel=e.data.user_level[parseInt(i)+1].level,t.nextLevel_name=e.data.user_level[parseInt(i)+1].describe):(t.nextLevel=!1,t.nextLevel_name=!1)}}))},GradeEquity:function(){this.$utils.handleLoginNav()||r.navigateTo({url:"/subpackage/grade/index"})},submit:function(){var t=this;return console.log(this.nickname,"----"),this.nickname?this.choose?void this.$http.setUserPerfectInfo({nickname:this.nickname,headimgurl:this.headimgurl}).then((function(e){"200"==e.code?(t.user.nickname=t.nickname,t.user.headimgurl=t.headimgurl,t.is_perfect=!1,r.showToast({icon:"none",title:"更新成功"})):r.showToast({icon:"none",title:e.message})})):this.$utils.showToast("请勾选隐私协议"):r.showToast({icon:"none",title:"请输入昵称"})},protocol:function(){r.navigateTo({url:"/subpackage/webView/h5?url="+encodeURIComponent("https://img.yunzhanxinxi.com/static/alliance/html/privacy.html?v=0001")})},changeHeadImg:function(){var t=this;r.chooseImage({count:1,sizeType:["compressed"],success:function(e){var i=e.tempFilePaths,n={};n={editionType:"routine","utm-source":o.default.utm_source,platform:o.default.platform,version:t.$store.state.version,appid:r.getStorageSync("appid")||"",hm_scene_template:"overlordMeal"},r.getStorageSync("scenesLogin")?n.Authorization=t.$store.state.scene_token:n.token=t.$store.state.token,r.uploadFile({url:o.default.url_config+"/home/overlordmeal/image/upload-avatar",filePath:i[0],name:"file",header:n,success:function(e){var i=JSON.parse(e.data);200==i.code?(console.log(i.data.url),t.headimgurl=i.data.url):(console.log(i.message),t.$utils.showToast(i.message))},fail:function(t){console.log(t)}})}})},onChooseAvatar:function(t){console.log(t,"--------");var e=this,i={};i={editionType:"routine","utm-source":o.default.utm_source,platform:o.default.platform,version:e.$store.state.version,appid:r.getStorageSync("appid")||"",hm_scene_template:"overlordMeal"},r.getStorageSync("scenesLogin")?i.Authorization=e.$store.state.scene_token:i.token=e.$store.state.token,r.uploadFile({url:o.default.url_config+"/home/overlordmeal/image/upload-avatar",filePath:t.detail.avatarUrl,name:"file",header:i,success:function(t){var i=JSON.parse(t.data);200==i.code?(console.log(i.data.url),e.headimgurl=i.data.url):(console.log(i.message),e.$utils.showToast(i.message))},fail:function(t){console.log(t)}})},Definition:function(){this.tipsPop=!0},placeOrder:function(){r.navigateTo({url:"/pages/placeOrder/index"})},invite:function(){r.navigateTo({url:"/pages/pullNewActivity/index"})},openCustomerQrcode:function(t){if(console.log(t),!this.$utils.handleLoginNav())if(1==t.kefu_qrcode_type)""!=t.kefu_qrcode_url&&(this.qrcode_img_url=t.kefu_qrcode_url),this.$refs.popup.show();else if(2==t.kefu_qrcode_type)return},goLogin:function(){this.$utils.handleLoginNav()},jumpUrl1:function(t){console.log(t),this.$utils.handleLoginNav()||t.path&&r.navigateTo({url:t.path})},keepImage:function(){var t=this;r.getSetting({success:function(e){e.authSetting["scope.writePhotosAlbum"]?r.saveImageToPhotosAlbum({filePath:t.qrcode,success:function(){r.showToast({icon:"none",title:"保存成功"})},fail:function(t){r.showToast({icon:"none",title:"保存失败"})}}):r.authorize({scope:"scope.writePhotosAlbum",success:function(){r.saveImageToPhotosAlbum({filePath:t.qrcode,success:function(){r.showToast({icon:"none",title:"保存成功"})},fail:function(t){r.showToast({icon:"none",title:"保存失败"})}})},fail:function(){r.showModal({title:"您已拒绝获取相册权限",content:"是否进入权限管理，调整授权？",success:function(t){if(t.confirm)r.openSetting({success:function(t){}});else if(t.cancel)return r.showToast({title:"已取消！"})}})}})}})},close:function(){this.realname=!1},copy:function(){this.$utils.copy(this.user.hm_uid)},jumpUrl:function(t,e){if(!this.$utils.handleLoginNav()){var i="";switch(t){case 1:i="/subpackage/set/index";break;case 2:i=!(0==this.menuConfig.invite_friend_reward_show_position.length||!this.menuConfig.invite_friend_reward_show_position.includes("withdrawal"))?"/subpackage/withdrawalList/index?img="+this.menuConfig.invite_friend_reward_background_url:"/subpackage/withdrawalList/index";break;case 3:this.isearnest=!1,i=r.getStorageSync("isScenes")?"/subpackage/webView/h5?url=".concat(encodeURIComponent(this.url)):"/subpackage/webView/h5?url=".concat(encodeURIComponent(this.newUrl));break;case 5:r.$emit("setCurrent",{current_id:37,type:e});break;case 11:i="/pages/pullNewActivity/index";break;case 12:if(0==this.is_certification)return this.isearnest=!0;i="/subpackage/withdrawal/index"}r.navigateTo({url:i})}},getInfo:function(){var t=this;this.$http.getUserInfo().then((function(e){console.log(e,"个人信息----"),200==e.code&&(t.user=e.data.user,t.is_perfect=e.data.is_perfect,t.headimgurl=t.user.headimgurl,t.nickname=t.user.nickname,t.is_certification=e.data.is_certification,t.is_perfect&&t.$http.getShareInfo({}).then((function(e){e&&200==e.code&&(t.head_img=e.data.head_img,t.nick_name=e.data.nick_name)})))})),this.$http.getConfig().then((function(e){200==e.code&&(t.qrcode_img_url=e.data.qrcode_img_url,t.sub_commission_status=e.data.sub_commission_status)})),this.getMenu(),this.getMtWithdrawalRule()},followLink:function(){this.$utils.handleLoginNav()||(console.log(this.menuConfig.guide.link_url,"----"),this.$utils.navRouter("/subpackage/webView/h5?url="+encodeURIComponent(this.menuConfig.guide.link_url)))},getMenu:function(){var t=this;this.$http.menuConfig().then((function(e){console.log(e,"获取菜单配置"),200==e.code&&(t.menuConfig=e.data,0!=t.menuConfig.invite_friend_reward_show_position.length&&t.menuConfig.invite_friend_reward_show_position.includes("userCenter")?t.show_type=!0:t.show_type=!1)}))},getRealNameUrl:function(){var t=this;this.$http.getUrl().then((function(e){"200"==e.code&&(t.url=e.data.long_url,t.realNameTips=e.data.tip)})),this.$http.getUrlNew().then((function(e){"200"==e.code&&(t.newUrl=e.data.url)}))},init:function(){this.getInfo(),this.getRealNameUrl()}},computed:function(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?c(Object(i),!0).forEach((function(e){(0,n.default)(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):c(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}({},(0,s.mapState)(["randompath"])),created:function(){var t=this;r.$on("updateUserInfo",(function(){t.$http.getUserInfo().then((function(e){console.log(e,"个人信息----"),200==e.code&&(t.user=e.data.user,t.is_certification=e.data.is_certification)}))})),r.$on("refreshbwcINfo",(function(){t.getInfo()})),r.$on("refreshbwcPhone",(function(){t.init()})),r.$on("refreshbwcGrade",(function(){t.getMtWithdrawalRule()})),this.$utils.hasLogin()&&this.init()}},u=i(5569),l=i.n(u),d=(0,(l(),i(9453)).default)(h,(function(){var t=this,e=(t.$createElement,t._self._c,t.menuConfig&&t.menuConfig.lists&&0!=t.menuConfig.lists.length);t._isMounted||(t.e0=function(e){t.isearnest=!1},t.e1=function(e){return t.$refs.popup.hide()},t.e2=function(e){t.tipsPop=!1},t.e3=function(e){t.choose=!t.choose},t.e4=function(e){t.choose=!t.choose},t.e5=function(e){t.choose=!t.choose},t.e6=function(e){t.is_perfect=!1}),t.$mp.data=Object.assign({},{$root:{g0:e}})}),[],!1,null,"5e34fd2a",null,!1,void 0,void 0).exports},9297:function(t,e,i){i.r(e),i.d(e,{default:function(){return r}});var n=i(9510),o=i(7039).default,s={data:function(){return{cont:"",mtWithdrawal:1,failRow:[],new_reason:"",reject_reason:"",isFailPop:!1,isShowQRc0de:!1,backLock:!1,tips:"是否跳转小程序下单？",user_path:"",info:{},active1:0,warfare:["店铺二维码失效","小程序店铺id失效","复制店铺不出来"],isGuza:!1,appid:"",active:0,ticker:null,tab:[{name:"全部",key:""},{name:"待上传",key:"1"},{name:"已完成",key:"3"},{name:"审核中",key:"2"},{name:"已驳回",key:"4"}],from:{page:1,state:"",order_sn:""},list:[],listTotal:{total:0,valid_total:0,valid_user_profit:0},notTips:!1,phone:"",jumpPopup:!1,id:""}},onPullDownRefresh:function(){o.getStorageSync("bwcPhone")?(this.getList(),setTimeout((function(){o.stopPullDownRefresh()}),1e3)):o.stopPullDownRefresh()},onReachBottom:function(){this.from.page++,this.$utils.hasLogin()&&this.getList()},filters:{limitTimeFilter:function(t){var e=parseInt((new Date).getTime()/1e3);if((t=parseInt(t)-e)>0){var i,n,o;i=parseInt(t/3600),n=parseInt((t-60*i*60)/60),o=parseInt(t-60*i*60-60*n),i<10&&(i="0"+i),n<10&&(n="0"+n),o<10&&(o="0"+o);var s={hour:i,min:n,seconds:o};return"".concat(s.hour,":").concat(s.min,":").concat(s.seconds," ")}return"00:00:00 "}},methods:{jumpWallet:function(){o.navigateTo({url:"/subpackage/withdrawalList/index"})},eliminate:function(){this.from.order_sn="",this.search()},getMtWithdrawalRule:function(){var t=this;this.$http.getMtWithdrawalRule().then((function(e){200==e.code&&(console.log(e,"美团规则------"),t.mtWithdrawal=e.data.config.cashback_mode)}))},closeQRcode:function(){this.isShowQRc0de=!1},pullUp:function(){this.from.page++,this.getList()},evaluate:function(t){this.info=this.list[t],this.openUrl(5)},shop:function(t){if(this.info=this.list[t],5==this.info.state||3==this.info.state)return!1;""!=this.getPlatformParameter(1)&&""!=this.getPlatformParameter(2)?this.openUrl(1):2==info.source&&(1==this.info.platform&&this.info.action_url.qrcode.mt||2==this.info.platform&&this.info.action_url.qrcode.elm)?this.openUrl(3):this.openUrl(2)},lookUploadPage:function(t){if(this.info=this.list[t],6==this.info.state||7==this.info.state)return!1;this.$utils.navRouter("/subpackage/uploadImage/index?order_sn="+this.list[t].order_sn)},getPlatformParameter:function(t){return 1==t?1==this.info.platform?this.info.action_url.wx_mini.mt.appid:this.info.action_url.wx_mini.elm.appid:2==t?1==this.info.platform?this.info.action_url.wx_mini.mt.path:this.info.action_url.wx_mini.elm.path:4==t?1==this.info.platform?this.info.action_url.wx_mini.mt.order_list:this.info.action_url.wx_mini.elm.comment_list:void 0},openUrl:function(t){if(1==t)o.navigateToMiniProgram({appId:this.getPlatformParameter(1),path:this.getPlatformParameter(2),success:function(t){}});else if(2==t){var e=this;o.setClipboardData({data:e.info.plan_name,success:function(){e.$utils.showToast("复制成功"),o.navigateToMiniProgram({appId:e.getPlatformParameter(1),path:"",success:function(t){}})}})}else 4==t?(this.isGuza=!0,this.active1=0):3==t?this.isShowQRc0de=!0:5==t&&o.navigateToMiniProgram({appId:this.getPlatformParameter(1),path:this.getPlatformParameter(4),success:function(t){}})},submitGuza:function(){var t=this;this.$http.faultReport({plan_id:this.info.id,source:this.info.source,content:this.warfare[this.active]}).then((function(e){o.showToast({icon:"none",title:e.message}),"200"==e.code&&t.closeGuza()}))},closeGuza:function(){this.isGuza=!1,this.active=0},closeJump:function(){this.jumpPopup=!1},beginTimer:function(){var t=this;this.ticker=setInterval((function(){for(var e=0,i=t.list.length;e<i;e++){var n=parseInt((new Date).getTime()/1e3),o=t.list[e].upload_credential_expire_time-n,s=t.list[e].place_order_expire_time-n,a=t.list[e].expire_time-n;o>0&&(t.list[e].upload_credential_expire_time=t.list[e].upload_credential_expire_time+.1),s>0&&(t.list[e].place_order_expire_time=t.list[e].place_order_expire_time+.1),a>0&&(t.list[e].expire_time=t.list[e].expire_time+.1)}}),1e3)},remark:function(t,e){1==e?(this.failRow=t.audit_logs,6!=t.state&&7!=t.state&&5!=t.state||(this.failRow=[]),this.new_reason=t.new_reason,this.reject_reason=""):(this.failRow=[],this.new_reason="",this.reject_reason=t.reject_reason),this.isFailPop=!0},showBigImage:function(t,e,i){if(1==i){var n=this.list[t].screenshots;o.previewImage({urls:n,current:e,indicator:!0})}else{console.log(this.failRow[t],"-*-*-");var s=this.failRow[t].audit_files.split(",");o.previewImage({urls:s,current:e,indicator:!0})}},cancelOrder:function(t){var e=this;o.showModal({title:"温馨提示",content:"是否确认取消订单?",success:function(i){i.confirm&&e.$http.cancelOrder({order_sn:e.list[t].order_sn}).then((function(t){o.showToast({icon:"none",title:t.message}),"200"==t.code&&(e.from.page=1,e.list=[],e.search())}))}})},search:function(){this.$utils.handleLoginNav()||(this.list=[],this.from.page=1,this.getList())},uploadImage:function(t){this.$utils.navRouter("/subpackage/uploadImage/index?order_sn="+this.list[t].order_sn)},uploadVideo:function(t){this.$utils.navRouter("/subpackage/uploadImage/index?order_sn="+this.list[t].order_sn+"&isRoll=1")},copy:function(t){this.$utils.copy(t)},switchTab:function(t){this.$utils.handleLoginNav()||(this.active=t,this.from.state=this.tab[t].key,this.from.page=1,this.ticker&&(clearInterval(this.ticker),this.ticker=null),this.search())},getList:function(){var t=this;this.$http.orderList(this.from).then((function(e){console.log(e,"----"),200==e.code&&(0!=e.data.length?(0!=e.data.data.length&&e.data.data.forEach((function(t){""!=t.screen_shots&&2==t.source?t.screenshots=t.screen_shots.split(","):t.screenshots=[]})),1==t.from.page?t.list=e.data.data:t.list=[].concat((0,n.default)(t.list),(0,n.default)(e.data.data))):t.list=[],0!=t.list.length?t.notTips=!1:t.notTips=!0,t.ticker||0==t.list.length||t.beginTimer())}))},getTotal:function(){var t=this;this.$http.orderStatics().then((function(e){200==e.code&&(console.log(e,"统计------"),t.listTotal={total:e.data.order_number,valid_total:e.data.order_number_valid,valid_user_profit:e.data.order_amount_valid},t.cont=e.data.rule)}))},init:function(){this.search(),this.getTotal(),this.getMtWithdrawalRule()}},props:{type:{type:Number,default:function(){return 0}}},onLoad:function(t){this.active=0,t&&(t.type||0==t.type)&&(this.active=t.type),this.from.state=this.tab[this.active].key,this.from.page=1,this.list=[],this.ticker&&(clearInterval(this.ticker),this.ticker=null),this.$utils.hasLogin()&&this.init()},created:function(){var t=this;o.$on("refreshbwcPhone",(function(){t.init()})),this.active=0,(this.type||0==this.type)&&(this.active=this.type),this.from.state=this.tab[this.active||0].key||"",this.from.page=1,this.list=[],this.ticker&&(clearInterval(this.ticker),this.ticker=null),this.$utils.hasLogin()&&(this.init(),o.$on("refreshbwcList",(function(){t.search()})))},mounted:function(){this.ticker&&(clearInterval(this.ticker),this.ticker=null),this.beginTimer(),o.pageScrollTo({scrollTop:0,duration:0});var t=getCurrentPages().length;this.backLock=1!=t}},a=i(9505),r=(0,(i.n(a)(),i(9453)).default)(s,(function(){var t=this,e=(t.$createElement,t._self._c,t.__map(t.list,(function(e,i){return{$orig:t.__get_orig(e),f0:5!=e.state&&7!=e.state&&6!=e.state&&1==e.state&&""==e.user_order_sn&&1==e.source?t._f("limitTimeFilter")(e.expire_time):null,f1:5!=e.state&&7!=e.state&&6!=e.state&&2==e.source&&e.user_order_sn&&""==e.screen_shots&&1==e.state?t._f("limitTimeFilter")(e.upload_credential_expire_time):null,f2:5!=e.state&&7!=e.state&&6!=e.state&&2==e.source&&""==e.user_order_sn&&1==e.state?t._f("limitTimeFilter")(e.place_order_expire_time):null}}))),i=t.isFailPop?t.failRow.length:null,n=t.isFailPop&&0!=i?t.__map(t.failRow,(function(e,i){return{$orig:t.__get_orig(e),l1:2!=e.audit_status&&3!=e.audit_status||!e.audit_files?null:e.audit_files.split(",")}})):null,o=t.isFailPop?0==t.failRow.length&&t.new_reason&&!t.reject_reason:null,s=t.isFailPop?0==t.failRow.length&&!t.new_reason&&t.reject_reason:null;t._isMounted||(t.e0=function(e,i){var n=arguments[arguments.length-1].currentTarget.dataset,o=n.eventParams||n["event-params"];i=o.index,t.active1=i},t.e1=function(e){t.isFailPop=!1}),t.$mp.data=Object.assign({},{$root:{l0:e,g0:i,l2:n,g1:o,g2:s}})}),[],!1,null,"3faff76a",null,!1,void 0,void 0).exports},8338:function(t,e,i){i.r(e),i.d(e,{default:function(){return r}});var n=i(9510),o=i(7039).default,s={data:function(){return{RankingTop:0,user:{hm_uid:""},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],RankingList:[],cont:"",active:0,time:"",backLock:!1,place_order:{fxOrderConfig:[],order_show_rank_status:!1},max_id:"",total_money:"0",total_count:0,total:0,notTips:!1,imageList:[],list:[],share:{}}},created:function(){var t=this,e=getCurrentPages().length;this.backLock=1!=e,o.$on("refreshbwcPhone",(function(){t.getConfig(),t.getUserInfo(),t.getRewardInfo()})),this.$utils.hasLogin()&&(this.getConfig(),this.getList(),this.getRewardInfo())},onReachBottom:function(){1==this.active&&""!=this.max_id&&this.getList()},methods:{scrollTo:function(){o.pageScrollTo({scrollTop:this.RankingTop,duration:300})},getRewardInfo:function(){var t=this;this.$http.getOrderRank().then((function(e){200==e.code&&(t.RankingList=e.data.list,t.$nextTick((function(){var e=o.getSystemInfoSync();o.createSelectorQuery().in(t).select(".RankingList").boundingClientRect((function(i){i&&i.top?t.RankingTop=i.top-(e.navigationBarHeight||0)-e.statusBarHeight:t.RankingTop=1e3,console.log(t.RankingTop)})).exec()})))}))},getUserInfo:function(){var t=this;this.$http.getUserInfo().then((function(e){200==e.code&&(t.user=e.data.user,t.getShareInfo())}))},getShareInfo:function(){var t=this;this.$common.getSharePath().then((function(e){console.log(e,"分享配置"),t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return o.hideShareMenu(),!1;if(2==t.shareSwitch){var i=t.extend.filter((function(t){return"44"==t.index}));if(0==i.length||"1"!=i[0].switch)return void o.hideShareMenu();e=i[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(i){t.shareTitle=i.shareTitle,t.shareUrl=i.shareUrl,1==t.shareSwitch&&t.pathList.includes("44")||2==t.shareSwitch&&e?o.showShareMenu():o.hideShareMenu()}))}))},switchTab:function(t){this.$utils.handleLoginNav()||(this.active=t,1==t&&(this.max_id="",this.list=[],this.getList()))},getConfig:function(){var t=this;this.$http.getInviteConfig().then((function(e){200==e.code&&e.data.place_order&&(t.place_order=e.data.place_order,t.total=0,t.place_order.fxOrderConfig.forEach((function(e){t.total=parseInt(t.total+1e4*e.superior_reward_money+.5)})),t.total=t.total/1e4,t.cont=t.place_order.description,t.cont=t.cont.replace(/\n/g,"<br />"),t.time=2==t.place_order.date_type?t.place_order.start_time.substring(0,10)+"~"+t.place_order.end_time.substring(0,10):"长期有效")}))},sharePage:function(){this.$utils.handleLoginNav()||o.navigateTo({url:"/pages/myPoster/index"})},getList:function(){var t=this;this.$http.getOrderInviteRecord({max_id:this.max_id}).then((function(e){console.log(e.data,"邀请列表"),200==e.code&&(t.imageList=[],0!=e.data.list.length&&(t.total_money=e.data.total_money,t.total_count=e.data.total_count),t.list=[].concat((0,n.default)(t.list),(0,n.default)(e.data.list)),0!=t.list.length?(t.max_id=t.list[t.list.length-1].id,t.list.forEach((function(e){t.imageList.length<5&&t.imageList.push(e.headimgurl)})),t.notTips=!1):t.notTips=!0)}))}},onShareAppMessage:function(t){var e;return e=o.getStorageSync("isScenes")?"/pages/placeOrder/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/placeOrder/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onShareTimeline:function(t){var e;return e=o.getStorageSync("isScenes")?"/pages/placeOrder/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/placeOrder/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onLoad:function(){this.$utils.hasLogin()&&this.getUserInfo()}},a=i(2932),r=(0,(i.n(a)(),i(9453)).default)(s,(function(){var t=this,e=(t.$createElement,t._self._c,t.place_order.fxOrderConfig.length),i=0!=t.imageList.length||t.place_order.order_show_rank_status&&0!=t.RankingList.length,n=i?t.place_order.order_show_rank_status&&0!=t.RankingList.length:null,o=t.place_order.order_show_rank_status&&0!=t.RankingList.length;t.$mp.data=Object.assign({},{$root:{g0:e,g1:i,g2:n,g3:o}})}),[],!1,null,"4c063932",null,!1,void 0,void 0).exports},8657:function(t,e,i){i.r(e),i.d(e,{default:function(){return a}});var n=i(7039).default,o={data:function(){return{user:{hm_uid:""},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],notYetData:!1,delta:1,cardList:[],cashList:[],couponList:[],scrollTop:0,userInfo:{},keyword:"",bgColor:"#FE2B22",backLock:!1,share:{}}},onPageScroll:function(t){this.scrollTop=t.scrollTop},onLoad:function(t){var e=getCurrentPages().length;this.backLock=1!=e,t.delta&&(this.delta=t.delta),this.$utils.hasLogin()&&this.getUserInfo()},onShareAppMessage:function(){var t;return t=n.getStorageSync("isScenes")?"/subpackage/pointsMall/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/subpackage/pointsMall/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:t,imageUrl:this.shareUrl}},onShareTimeline:function(){var t;return t=n.getStorageSync("isScenes")?"/subpackage/pointsMall/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/subpackage/pointsMall/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:t,imageUrl:this.shareUrl}},created:function(){var t=this;n.$on("refreshbwcPhone",(function(e){t.init(),t.getUserInfo()})),n.$on("Updatepoints",(function(e){t.$common.getUserInfo().then((function(e){t.userInfo=e}))})),this.$utils.hasLogin()&&this.init()},methods:{getUserInfo:function(){var t=this;this.$http.getUserInfo().then((function(e){200==e.code&&(t.user=e.data.user,t.getShareInfo())}))},getShareInfo:function(){var t=this;this.$common.getSharePath().then((function(e){console.log(e,"分享配置"),t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return n.hideShareMenu(),!1;if(2==t.shareSwitch){var i=t.extend.filter((function(t){return"51"==t.index}));if(0==i.length||"1"!=i[0].switch)return void n.hideShareMenu();e=i[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(i){t.shareTitle=i.shareTitle,t.shareUrl=i.shareUrl,1==t.shareSwitch&&t.pathList.includes("51")||2==t.shareSwitch&&e?n.showShareMenu():n.hideShareMenu()}))}))},init:function(){var t=this,e=this.getMyExchange(),i=this.getMoneyList(),n=this.getExpressCoupon();Promise.all([e,i,n]).then((function(e){t.cashList.length||t.cardList.length?t.notYetData=!1:t.notYetData=!0})),this.$common.getUserInfo().then((function(e){t.userInfo=e}))},getMoneyList:function(){var t=this;return new Promise((function(e){t.$http.moneyCardsList({keyword:t.keyword}).then((function(i){200==i.code&&(e(),t.cashList=i.data)}))}))},getMyExchange:function(){var t=this;return new Promise((function(e){t.$http.getMyExchange({keyword:t.keyword}).then((function(i){200==i.code&&(e(),t.cardList=i.data.categorys)}))}))},getExpressCoupon:function(){var t=this;return new Promise((function(e){t.$http.getExpressCoupon({keyword:t.keyword}).then((function(i){200==i.code&&(e(),t.couponList=i.data.categorys)}))}))},search:function(){if(!this.$utils.handleLoginNav()){if(!this.keyword)return n.showToast({title:"请输入关键字",icon:"none",duration:2e3});this.getMyExchange(),this.getExpressCoupon(),this.getMoneyList()}},reset:function(){this.keyword="",this.getMyExchange(),this.getExpressCoupon(),this.getMoneyList()},nav:function(t,e){this.$utils.handleLoginNav()||(0==t?this.$utils.navRouter("/subpackage/pointsMall/exchangeRecord/index"):1==t?this.$utils.navRouter("/subpackage/pointsMall/pointsExchange/index?id="+e.id+"&score="+e.score+"&item_type="+e.item_type+"&describe="+e.describe):2==t?this.$utils.navRouter("/subpackage/pointsMall/cashExchange/index?data="+JSON.stringify(e)):3==t&&this.$utils.navRouter("/subpackage/pointsMall/myIntegral/index"))}}},s=i(3927),a=(0,(i.n(s)(),i(9453)).default)(o,(function(){var t=this,e=(t.$createElement,t._self._c,t.cashList.length),i=t.cardList.length,n=t.couponList.length;t.$mp.data=Object.assign({},{$root:{g0:e,g1:i,g2:n}})}),[],!1,null,"0818cad3",null,!1,void 0,void 0).exports},6210:function(t,e,i){i.r(e),i.d(e,{default:function(){return r}});var n=i(9510),o=i(7039).default,s={data:function(){return{user:{hm_uid:""},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],RankingList:[],cont:"",active:0,invite:{},time:"",list:[],max_id:"",total_money:"0",total_count:0,notTips:!1,imageList:[],rankList:[],backLock:!1,share:{}}},created:function(){var t=this,e=getCurrentPages().length;this.backLock=1!=e,o.$on("refreshbwcPhone",(function(){t.getConfig(),t.getUserInfo()})),this.$utils.hasLogin()&&(this.getConfig(),this.getList(),this.getRewardInfo())},onReachBottom:function(){1==this.active&&""!=this.max_id&&this.getList()},methods:{scrollTo:function(){o.pageScrollTo({scrollTop:this.RankingTop,duration:300})},getUserInfo:function(){var t=this;this.$http.getUserInfo().then((function(e){200==e.code&&(t.user=e.data.user,t.getShareInfo())}))},getShareInfo:function(){var t=this;this.$common.getSharePath().then((function(e){console.log(e,"分享配置"),t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return o.hideShareMenu(),!1;if(2==t.shareSwitch){var i=t.extend.filter((function(t){return"45"==t.index}));if(0==i.length||"1"!=i[0].switch)return void o.hideShareMenu();e=i[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(i){t.shareTitle=i.shareTitle,t.shareUrl=i.shareUrl,1==t.shareSwitch&&t.pathList.includes("45")||2==t.shareSwitch&&e?o.showShareMenu():o.hideShareMenu()}))}))},getRewardInfo:function(){var t=this;this.$http.getRewardInfo().then((function(e){200==e.code&&(t.RankingList=e.data.list,t.$nextTick((function(){var e=o.getSystemInfoSync();o.createSelectorQuery().in(t).select(".RankingList").boundingClientRect((function(i){i&&i.top?t.RankingTop=i.top-(e.navigationBarHeight||0)-e.statusBarHeight:t.RankingTop=1e3,console.log(t.RankingTop)})).exec()})))}))},switchTab:function(t){this.$utils.handleLoginNav()||(this.active=t,1==this.active&&(this.max_id="",this.list=[],this.getList()))},getConfig:function(){var t=this;this.$http.getInviteConfig().then((function(e){200==e.code&&e.data.invite&&(t.invite=e.data.invite,t.cont=t.invite.description,t.cont=t.cont.replace(/\n/g,"<br />"),t.time=2==t.invite.date_type?t.invite.start_time.substring(0,10)+"~"+t.invite.end_time.substring(0,10):"长期有效")}))},sharePage:function(){this.$utils.handleLoginNav()||o.navigateTo({url:"/pages/myPoster/index"})},getList:function(){var t=this;this.$http.getInviteRecord({max_id:this.max_id}).then((function(e){console.log(e,"邀请列表"),200==e.code&&(t.imageList=[],0!=e.data.list.length&&(t.total_money=e.data.total_money,t.total_count=e.data.total_count),t.list=[].concat((0,n.default)(t.list),(0,n.default)(e.data.list)),0!=t.list.length?(t.max_id=t.list[t.list.length-1].id,t.list.forEach((function(e,i){i<5&&t.imageList.push(e.headimgurl)})),t.notTips=!1):t.notTips=!0)}))}},onShareAppMessage:function(t){var e;return e=o.getStorageSync("isScenes")?"/pages/pullNewActivity/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/pullNewActivity/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onShareTimeline:function(t){var e;return e=o.getStorageSync("isScenes")?"/pages/pullNewActivity/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/pullNewActivity/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onLoad:function(){this.$utils.hasLogin()&&this.getUserInfo()}},a=i(3957),r=(0,(i.n(a)(),i(9453)).default)(s,(function(){var t=this,e=(t.$createElement,t._self._c,0!=t.imageList.length||t.invite.show_rank_status&&0!=t.RankingList.length),i=e?t.invite.show_rank_status&&0!=t.RankingList.length:null,n=t.invite.show_rank_status&&0!=t.RankingList.length;t.$mp.data=Object.assign({},{$root:{g0:e,g1:i,g2:n}})}),[],!1,null,"105310f4",null,!1,void 0,void 0).exports},5204:function(t,e,i){i.r(e),i.d(e,{default:function(){return r}});var n=i(7039).default,o=i(8793).default,s={components:{templateOne:function(){i.e("pages/signReach/components/templateOne/index").then(function(){return resolve(i(3266))}.bind(null,i)).catch(i.oe)},templateTwo:function(){i.e("pages/signReach/components/templateTwo/index").then(function(){return resolve(i(7704))}.bind(null,i)).catch(i.oe)}},data:function(){return{user:{hm_uid:""},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],isLogin:!1,backLock:!1,configInfo:{checkin:{skin:0,status:1},user:{}},phone:"",cardIndex:0,msgRemindLock:!0,pageLock:!1,navHeight:0,score:0,share:{}}},computed:{templateOneActive:function(){return 1==this.configInfo.checkin.skin&&this.configInfo.checkin.status&&this.pageLock},templateTwoActive:function(){return 2==this.configInfo.checkin.skin&&this.configInfo.checkin.status&&this.pageLock}},created:function(){var t=this,e=getCurrentPages().length;if(this.backLock=1!=e,n.$on("refreshbwcPhone",(function(){t.getConfig(),t.getUserInfo()})),!this.$utils.hasLogin())return this.isLogin=!0,!1;this.isLogin=!1,n.getStorageSync("bwcphone")&&(this.phone=n.getStorageSync("bwcphone")),this.getConfig()},methods:{getUserInfo:function(){var t=this;this.$http.getUserInfo().then((function(e){200==e.code&&(t.user=e.data.user,t.getShareInfo())}))},getShareInfo:function(){var t=this;this.$common.getSharePath().then((function(e){console.log(e,"分享配置"),t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return!1;if(2==t.shareSwitch){var i=t.extend.filter((function(t){return"50"==t.index}));if(0==i.length||"1"!=i[0].switch)return void n.hideShareMenu();e=i[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(i){t.shareTitle=i.shareTitle,t.shareUrl=i.shareUrl,1==t.shareSwitch&&t.pathList.includes("50")||2==t.shareSwitch&&e?n.showShareMenu():n.hideShareMenu()}))}))},login:function(){this.$utils.handleLoginNav()},getNavHeight:function(t){this.navHeight=t},elmMtQuery:function(t){0==t?this.getLinkInfo(1,t):1==t&&this.getLinkInfo(4,t)},getConfig:function(){var t=this;this.$http.checkinInfo({}).then((function(e){200==e.code&&(t.pageLock=!0,t.configInfo=e.data)}))},setMsgRemind:function(t,e){var i=this;if(this.msgRemindLock){10==t&&1==e&&o.getSetting({withSubscriptions:!0,success:function(t){t.subscriptionsSetting&&t.subscriptionsSetting.mainSwitch?o.requestSubscribeMessage({tmplIds:i.configInfo.checkin.remind_template_id.split(","),success:function(t){},fail:function(t){setTimeout((function(){n.showToast({title:"不正确的小程序模板消息id，"+t.errCode,icon:"none",duration:2500})}),200)}}):o.openSetting()},fail:function(){o.requestSubscribeMessage({tmplIds:i.configInfo.checkin.remind_template_id.split(","),success:function(t){},fail:function(t){setTimeout((function(){n.showToast({title:"不正确的小程序模板消息id，"+t.errCode,icon:"none",duration:2500})}),200)}})}}),this.msgRemindLock=!1;var s={};0==e?s.remind_hm=t+":00":s.remind_status=t,this.$http.setRemind(s).then((function(n){i.msgRemindLock=!0,200==n.code&&(0==e?i.configInfo.user.remind_hm=t:i.configInfo.user.remind_status=t)}))}},navLink:function(t){var e=this;this.configInfo.checkin.remind_mini_status&&10==this.configInfo.checkin.mode?o.getSetting({withSubscriptions:!0,success:function(i){i.subscriptionsSetting&&i.subscriptionsSetting.mainSwitch?e.sendMpTipsNews(t):o.openSetting()},fail:function(){e.sendMpTipsNews(t)}}):this.hitCard(t)},sendMpTipsNews:function(t){var e=this;o.requestSubscribeMessage({tmplIds:this.configInfo.checkin.remind_template_id.split(","),success:function(i){e.hitCard(t)},fail:function(t){setTimeout((function(){n.showToast({title:"不正确的小程序模板消息id，"+t.errCode,icon:"none",duration:2500})}),200)}})},hitCard:function(t){var e=this;if(0==t&&!this.$globalData.GET("mt"))return this.elmMtQuery(t);if(1==t&&!this.$globalData.GET("elm"))return this.elmMtQuery(t);n.hideLoading();var i;i=0==t?this.$globalData.GET("mt"):this.$globalData.GET("elm"),n.navigateToMiniProgram({appId:i.mini_appid,path:i.mini_path,success:function(i){1!=e.configInfo.user.is_checkin&&e.configInfo.checkin.status&&e.$http.checkin({type:0==t?10:20}).then((function(t){200==t.code&&(e.getConfig(),20==e.configInfo.checkin.mode&&(e.$refs.popup3.show(),e.score=t.data.score))}))}})},getLinkInfo:function(t,e){var i=this;this.$http.getShare({link_id:t,is_mini:1,is_mini_qrcode:1}).then((function(n){200==n.code&&(4==t?i.$globalData.SET("elm",n.data):i.$globalData.SET("mt",n.data),i.hitCard(e))}))},getPhone:function(t){var e=this;(t&&t.detail.encryptedData||this.phone)&&(this.phone?this.$refs.popup2.show():this.$http.getPhone({encryptedData:t.detail.encryptedData,iv:t.detail.iv}).then((function(t){if(200==t.code){if(!t.data.telphone)return n.showToast({title:"解密失败，请先移除小程序后重试！",icon:"none",duration:2e3});e.phone=t.data.telphone,n.setStorageSync("phone",e.phone),e.$refs.popup2.show()}})))},exchange:function(){var t=this;if(!this.configInfo.cards||!this.configInfo.cards[this.cardIndex])return n.showToast({title:"请选择兑换卡券",icon:"none",duration:2e3});this.$http.checkinExchange({telphone:this.phone,card_id:this.configInfo.cards[this.cardIndex].id}).then((function(e){200==e.code&&n.showToast({title:"兑换成功",icon:"none",duration:2e3}),t.$refs.popup2.hide(),setTimeout((function(){t.getConfig(),10==t.configInfo.checkin.kf_qr_status&&t.$refs.popup1.show(),n.removeStorageSync("phone"),t.phone=""}),2e3)}))},preserveCode:function(){var t=this;n.getImageInfo({src:this.configInfo.checkin.kf_qr_img,success:function(e){n.saveImageToPhotosAlbum({filePath:e.path,success:function(e){t.$refs.popup1.hide(),n.showToast({title:"保存成功",icon:"success",duration:2e3})}})}})},msgTips:function(){n.showToast({title:"你已兑换过卡券啦，如需帮助可联系公众号客服~",icon:"none",duration:3e3})},nav:function(){var t=getCurrentPages().length;console.log(t,"----"),1==t?n.redirectTo({url:"/pages/home/index?current=36"}):n.navigateBack({delta:1})}},onShareAppMessage:function(t){var e;return e=n.getStorageSync("isScenes")?"/pages/signReach/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/signReach/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onShareTimeline:function(t){var e;return e=n.getStorageSync("isScenes")?"/pages/signReach/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/signReach/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onLoad:function(){this.$utils.hasLogin()&&this.getUserInfo()}},a=i(391),r=(0,(i.n(a)(),i(9453)).default)(s,(function(){var t=this;t.$createElement;t._self._c,t._isMounted||(t.e0=function(e){return t.$refs.popup.show()},t.e1=function(e){return t.$refs.popup.show()},t.e2=function(e){return t.$refs.popup.hide()},t.e3=function(e){return t.$refs.popup1.hide()},t.e4=function(e,i){var n=arguments[arguments.length-1].currentTarget.dataset,o=n.eventParams||n["event-params"];i=o.index,t.cardIndex=i},t.e5=function(e){return t.$refs.popup2.hide()},t.e6=function(e){return t.$refs.popup3.hide()})}),[],!1,null,"648d1cf5",null,!1,void 0,void 0).exports},2103:function(t,e,i){i.r(e),i.d(e,{default:function(){return r}});var n=i(7028),o=i(7039).default,s={data:function(){var t;return t={user:{hm_uid:""},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],backLock:!1},(0,n.default)(t,"user",{score:0}),(0,n.default)(t,"integral_config",{sign_in:0,lottery_turntable:0,invite:0,place_order:0,credits_exchange:0}),(0,n.default)(t,"checkinInfo",!1),(0,n.default)(t,"empty_list",[]),(0,n.default)(t,"isShow",!1),(0,n.default)(t,"share",{}),t},methods:{getUserInfo:function(){var t=this;this.$http.getUserInfo().then((function(e){200==e.code&&(t.user=e.data.user,t.getShareInfo())}))},getShareInfo:function(){var t=this;this.$common.getSharePath().then((function(e){t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return o.hideShareMenu(),!1;if(2==t.shareSwitch){var i=t.extend.filter((function(t){return"43"==t.index}));if(0==i.length||"1"!=i[0].switch)return void o.hideShareMenu();e=i[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(i){t.shareTitle=i.shareTitle,t.shareUrl=i.shareUrl,1==t.shareSwitch&&t.pathList.includes("43")||2==t.shareSwitch&&e?o.showShareMenu():o.hideShareMenu()}))}))},receive:function(t){this.$utils.handleLoginNav()||this.$utils.publicNavigation(this.empty_list[t])},getCouponList:function(){var t=this;this.$http.getbwcCouponList().then((function(e){200==e.code&&(t.empty_list=e.data.empty_list,t.isShow=!0)}))},randomNumber:function(){return this.$utils.random(150,500)},init:function(){var t=this;this.$http.getInviteConfig().then((function(e){200==e.code&&(console.log(e,"配置----"),e.data.integral_config&&(t.integral_config=e.data.integral_config,!t.integral_config||t.integral_config.sign_in||t.integral_config.place_order||t.integral_config.invite||t.integral_config.lottery_turntable||t.integral_config.credits_exchange?t.isShow=!1:t.getCouponList()))})),this.$http.getUserInfo().then((function(e){console.log(e,"个人信息----"),200==e.code&&(t.user=e.data.user)})),this.$http.checkinInfo({}).then((function(e){200==e.code&&(t.checkinInfo=e.data.user.is_checkin)}))},jump:function(t){if(!this.$utils.handleLoginNav()){var e="";1==t?e="/pages/signReach/index":2==t?e="/pages/pullNewActivity/index":3==t?e="/pages/luckDraw/index":4==t&&(e="/pages/pointsMall/index"),o.navigateTo({url:e})}},backHome:function(){1==getCurrentPages().length?"/pages/home/index"!=getCurrentPages()[0].route?this.$utils.navRouter("/pages/home/index?current=36"):o.$emit("setCurrent",{current_id:36}):o.navigateBack({delta:1})}},created:function(){var t=this,e=getCurrentPages().length;this.backLock=1!=e,o.$once("refreshbwcPhone",(function(){t.init(),t.getUserInfo()})),this.$utils.hasLogin()&&this.init()},onLoad:function(){this.$utils.hasLogin()&&this.getUserInfo()},onShareAppMessage:function(t){var e;return e=o.getStorageSync("isScenes")?"/pages/welfare/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/welfare/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onShareTimeline:function(t){var e;return e=o.getStorageSync("isScenes")?"/pages/welfare/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/welfare/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}}},a=i(2665),r=(0,(i.n(a)(),i(9453)).default)(s,(function(){var t=this,e=(t.$createElement,t._self._c,t.isShow?t.__map(t.empty_list,(function(e,i){return{$orig:t.__get_orig(e),m0:t.randomNumber()}})):null);t.$mp.data=Object.assign({},{$root:{l0:e}})}),[],!1,null,"29fc4a78",null,!1,void 0,void 0).exports},6742:function(t,e,i){i.r(e),i(5476);var n=i(2074),o=i(7690),s=i(9297),a=i(9466),r=i(2103),c=i(8338),h=i(6210),u=i(4183),l=i(2072),d=i(6272),g=i(5204),f=i(8657),p=i(9910),m=i(7039).default,_={data:function(){return{scrollTop:0,jumppop:!1,jumpAppid:"",switchType:"",pathList:[],type:"",bwcLock:!1,libraryLock:!1,orderlistLock:!1,myLock:!1,welfareLock:!1,placeOrderLock:!1,pullnewactivityLock:!1,myFansLock:!1,myPosterLock:!1,myOrderLock:!1,teamOrderLock:!1,signReachLock:!1,pointsMallLock:!1,luckDrawLock:!1,shareTitle:"",shareUrl:"",shareSwitch:1,extend:[],share:{},tabList:[],options:{},current:0,user:{hm_uid:""},tabbars:[{current:36,icon:"https://img.yunzhanxinxi.com/static/mini/new_bottom_button/bawangcan_home.png",icon_on:"https://img.yunzhanxinxi.com/static/mini/new_bottom_button/bawangcan_home.png",id:34,is_default:1,jump_config:{id:-1,current:36,url:"",original_id:"",appid:"",pagepath:""},jump_type:4,name:"首页",new_icon:"https://img.yunzhanxinxi.com/static/mini/new_bottom_button/bawangcan_home.png",scene_template_ids:[4,11,12,13,14,15],select_img:"",select_text_color:"",unselect_img:"",unselect_text_color:""},{current:37,icon:"https://img.yunzhanxinxi.com/static/mini/new_bottom_button/bawangcan_dingdan.png",icon_on:"https://img.yunzhanxinxi.com/static/mini/new_bottom_button/bawangcan_dingdan.png",id:35,is_default:0,jump_config:{id:-1,current:37,url:"",original_id:"",appid:"",pagepath:""},jump_type:4,name:"订单",new_icon:"https://img.yunzhanxinxi.com/static/mini/new_bottom_button/bawangcan_dingdan.png",scene_template_ids:[4,11,12,13,14,15],select_img:"",select_text_color:"",unselect_img:"",unselect_text_color:""},{current:38,icon:"https://img.yunzhanxinxi.com/static/mini/new_bottom_button/bawangcan_wode.png",icon_on:"https://img.yunzhanxinxi.com/static/mini/new_bottom_button/bawangcan_wode.png",id:36,is_default:0,jump_config:{id:-1,current:38,url:"",original_id:"",appid:"",pagepath:""},jump_type:4,name:"我的",new_icon:"https://img.yunzhanxinxi.com/static/mini/new_bottom_button/bawangcan_wode.png",scene_template_ids:[4,11,12,13,14,15],select_img:"",select_text_color:"",unselect_img:"",unselect_text_color:""}]}},components:{bwc:n.default,library:o.default,orderlist:s.default,my:a.default,welfare:r.default,placeOrder:c.default,pullnewactivity:h.default,myFans:u.default,myPoster:l.default,myOrder:d.default,teamOrder:d.default,signReach:g.default,pointsMall:f.default,luckDraw:p.default},onPageScroll:function(t){this.bwcLock&&(this.$refs.bwc.scrollTop=t.scrollTop)},onReachBottom:function(){36==this.current?this.$refs.bwc.pullUp():32==this.current?this.$refs.library.getList():37==this.current?this.$refs.orderlist.pullUp():44==this.current?this.$refs.placeOrder.getList():45==this.current?this.$refs.pullnewactivity.getList():48==this.current?this.$refs.myOrder.pullUp(1):49==this.current?this.$refs.teamOrder.pullUp(2):46==this.current&&this.$refs.myFans.pullUp()},onLoad:function(t){var e=this;this.init(t),m.$on("login",(function(){console.log(t,"-----------"),e.init(t),e.$utils.hasLogin()&&e.getUserInfo()})),m.$on("bindPhonePop",(function(){e.$refs.notPhone.show()})),m.$on("setCurrent",(function(t){var i=!1;(t.type||0==t.type)&&(e.type=t.type),e.tabList.forEach((function(e){e.current==t.current_id&&(i=!0)})),i?(e.current=t.current_id,e.switchTab(e.current)):m.navigateTo({url:"/pages/orderlist/index?type="+e.type})}))},onShow:function(){var t=this;this.$store.state.micro_scene?this.$http.getMiniSkipInfo().then((function(e){console.log(e,"跳转路径"),200==e.code&&(null!=e.data&&"1"==e.data.switch?(t.jumpAppid=e.data.appid,m.hideShareMenu(),t.jumppop=!0):(t.jumpAppid="",t.jumppop=!1))})):(this.jumpAppid="",this.jumppop=!1),this.$utils.hasLogin()&&this.getUserInfo()},onShareAppMessage:function(t){var e;return e=m.getStorageSync("isScenes")?"/pages/home/index?current="+this.current+"&uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/home/index?current="+this.current+"&uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onShareTimeline:function(t){var e;return e=m.getStorageSync("isScenes")?"/pages/home/index?current="+this.current+"&uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/home/index?current="+this.current+"&uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},methods:{JumpMiniProgram:function(){m.navigateToMiniProgram({appId:this.jumpAppid,path:"",success:function(t){}})},init:function(t){0==t.current&&(t.current=36),t.current&&(this.options=t),m.getStorageSync("isScenes")?(this.tabList=this.tabbars,this.tabList&&this.tabList.length&&(this.current=this.tabList[0].jump_config.current),this.options&&(this.options.current||0==this.options.current)&&(this.current=this.options.current),this.switchTab(this.current)):this.getTabbarSet()},getUserInfo:function(){var t=this;this.$http.getUserInfo().then((function(e){console.log(e,"个人信息----"),200==e.code&&(t.user=e.data.user,t.getbwcShare())}))},getTabbarSet:function(){var t=this;this.$http.getTabbar().then((function(e){console.log(e.data.tabbars,"底部菜单设置----"),200==e.code&&(t.tabList=e.data.tabbars,t.tabList&&t.tabList.length&&(t.current=t.tabList[0].jump_config.current),t.options&&(t.options.current||0==t.options.current)?t.current=t.options.current:t.tabList.forEach((function(e){1==e.is_default&&(t.current=e.jump_config.current)})),t.switchTab(t.current))}))},navTab:function(t,e){console.log(t,"----"),37==t&&(this.type=0),this.jumpAppid||(this.current=t,this.switchTab(t,e))},switchTab:function(t,e){var i=this;0==t&&(this.tabList.filter((function(t){return t.jump_config&&0==t.jump_config.current}))[0]||(t=this.tabList[0].jump_config.current));var n={jump_type:4};if(this.tabList.forEach((function(t){t.jump_config&&t.jump_config.current})),1==n.jump_type)this.$utils.publicNavigation(n);else if(2==n.jump_type)this.$utils.publicNavigation(n);else if(3==n.jump_type||5==n.jump_type){if(n.jump_config&&11==n.jump_config.id){if(!this.phone||!this.filmLink)return;return void this.$utils.navRouter("/subpackage/webView/h5?type=2&url="+encodeURIComponent(this.filmLink))}this.$utils.publicNavigation(n)}else if(4==n.jump_type){if(-1==t)return n.jump_config&&n.jump_config.pagepath?void this.$utils.navRouter(n.jump_config.pagepath):utils.showToast("jump_type:4，小程序 path 不存在!",3e3);if(this.bwcLock=!1,this.libraryLock=!1,this.orderlistLock=!1,this.myLock=!1,this.welfareLock=!1,this.placeOrderLock=!1,this.pullnewactivityLock=!1,this.myFansLock=!1,this.myPosterLock=!1,this.myOrderLock=!1,this.teamOrderLock=!1,this.signReachLock=!1,this.pointsMallLock=!1,this.luckDrawLock=!1,e&&(this.options={}),36==t?this.bwcLock=!0:32==t?(m.setNavigationBarTitle({title:"素材库"}),this.libraryLock=!0):37==t?(m.setNavigationBarTitle({title:"订单"}),this.orderlistLock=!0):38==t?(m.setNavigationBarTitle({title:""}),this.myLock=!0):43==t?(m.setNavigationBarTitle({title:"超值福利"}),this.welfareLock=!0):44==t?(m.setNavigationBarTitle({title:"下单奖励活动"}),this.placeOrderLock=!0):45==t?(m.setNavigationBarTitle({title:"邀请好友"}),this.pullnewactivityLock=!0):46==t?(m.setNavigationBarTitle({title:"我的好友"}),this.myFansLock=!0):47==t?(m.setNavigationBarTitle({title:"我的海报"}),this.myPosterLock=!0):48==t?(m.setNavigationBarTitle({title:"我的订单"}),this.myOrderLock=!0,this.$nextTick((function(){i.$refs.myOrder.getList()}))):49==t?(m.setNavigationBarTitle({title:"团队订单"}),this.teamOrderLock=!0,this.$nextTick((function(){i.$refs.teamOrder.getList()}))):50==t?(m.setNavigationBarTitle({title:"签到打卡"}),this.signReachLock=!0):51==t?(m.setNavigationBarTitle({title:"积分商城"}),this.pointsMallLock=!0):52==t&&(m.setNavigationBarTitle({title:"转盘抽奖"}),this.luckDrawLock=!0),!this.$utils.hasLogin())return;this.getbwcShare(),m.$emit("setCardNavTab",!0)}},getStatus:function(){var t=this;this.$http.getbwcIsAudit().then((function(e){if(200==e.code){m.hideLoading();var i=e.data.is_audit;console.log(i,"-*-*-"),1==i?t.libraryLock=!0:t.orderlistLock=!0}}))},getbwcShare:function(){var t=this;this.$common.getSharePath().then((function(e){console.log(e,"分享配置"),t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return m.hideShareMenu(),!1;if(2==t.shareSwitch){var i=t.extend.filter((function(e){return e.index==t.current}));if(0==i.length||"1"!=i[0].switch)return void m.hideShareMenu();e=i[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(i){console.log(i,t.current,"分享"),36==t.current||0==t.current?t.shareTitle=m.getStorageSync("app_name")||i.shareTitle:t.shareTitle=i.shareTitle,t.shareUrl=i.shareUrl,1==t.shareSwitch&&t.pathList.includes(""+t.current)||2==t.shareSwitch&&e?m.showShareMenu():m.hideShareMenu()}))}))}}},v=i(8943),w=(0,(i.n(v)(),i(9453)).default)(_,(function(){this.$createElement;this._self._c}),[],!1,null,"5f01189a",null,!1,void 0,void 0).exports,y=i(8793).default,S=i(7039).createPage;y.__webpack_require_UNI_MP_PLUGIN__=i,S(w)},1762:function(t,e,i){i.r(e),i.d(e,{default:function(){return b}});var n=i(7028),o=i(5476),s=i(5293),a=(i(214),i(2412)),r=i(188),c=i(7039).default,h=i(8793).default,u={data:{micro_scene:"",addWxCardLock:!1,hasClosed:!1,sceneArr:[1007,1008,1011,1012,1013,1014,1047,1048,1049,1058,1067,1073,1074,1081,1082,1091,1095,1096,1102,1107,1157,1160,1167,1185,1208]},onLaunch:function(t){console.log("App Launch",t,this.$route,this.$store),this.initMini(t)},onShow:function(t){var e=this;console.log("App Show",t),console.log("后台进入前台");var i,n,o,a,r;this.hasClosed&&["pages/home/index","subpackage/activity/index","pages/bwc/index","pages/welfare/index","pages/placeOrder/index","pages/pullnewactivity/index","pages/myPoster/index","subpackage/businessSettleIn/index","pages/signReach/index","pages/pointsMall/index","pages/luckDraw/index","subpackage/redPacket/index"].includes(t.path)&&((null!==(i=t.query)&&void 0!==i&&i.uid||t.uid)&&(this.$store.commit("setUid",(null===(r=t.query)||void 0===r?void 0:r.uid)||t.uid),console.log(this.$store.state.uid,"uid-------------")),(null!==(n=t.query)&&void 0!==n&&n.micro_scene||t.micro_scene)&&this.initMini(t),(null!==(o=t.query)&&void 0!==o&&o.uri||t.uri||null!==(a=t.query)&&void 0!==a&&a.scene)&&this.initMini(t));this.updateMini(),this.sceneArr.indexOf(t.scene-0)>=0&&(this.hasClosed&&this.addWxCardLock?(this.addWxCardLock=!1,this.hasClosed=!1,console.log("刚从卡券返回，不再打开")):setTimeout((function(){var i;(null!=t&&null!==(i=t.query)&&void 0!==i&&i.card_id||t.card_id)&&!e.$store.state.token&&(0,s.default)(),e.addWxCard(t)}),100))},onHide:function(){console.log("App Hide"),this.hasClosed=!0},methods:{initMini:function(t){var e,i,n,o,a,r,h,u=this;if(console.log(t,"--------小程序---"),this.$store.commit("setToken",""),this.$store.commit("setSceneToken",""),c.removeStorageSync("token"),c.removeStorageSync("scene_token"),console.log(c.getAccountInfoSync().miniProgram.appId,"appid"),this.$store.commit("setAppid",c.getAccountInfoSync().miniProgram.appId),null!==(e=t.query)&&void 0!==e&&e.uid?this.$store.commit("setUid",t.query.uid):t.uid&&this.$store.commit("setUid",t.uid),null!==(i=t.query)&&void 0!==i&&i.micro_scene?(this.$store.commit("setMicroScenes",t.query.micro_scene),this.micro_scene=null===(r=t.query)||void 0===r?void 0:r.micro_scene):t.micro_scene?(this.$store.commit("setMicroScenes",t.micro_scene),this.micro_scene=t.micro_scene):(this.$store.commit("setMicroScenes",""),this.micro_scene=""),null!==(n=t.query)&&void 0!==n&&n.utm_source?this.$store.commit("setUtmSource",t.query.utm_source):t.utm_source?this.$store.commit("setUtmSource",t.utm_source):this.$store.commit("setUtmSource",""),null!==(o=t.query)&&void 0!==o&&o.uri)c.setStorageSync("redPackUri",null===(h=t.query)||void 0===h?void 0:h.uri);else if(t.uri)c.setStorageSync("redPackUri",t.uri);else if(null!==(a=t.query)&&void 0!==a&&a.scene){var l;c.setStorageSync("redPackUri",decodeURIComponent(null===(l=t.query)||void 0===l?void 0:l.scene).split("=")[1])}else c.setStorageSync("redPackUri","");decodeURIComponent(t.scene).split("&").every((function(t){var e=t.split("=");return"uid"==e[0]?(u.$store.commit("setUid",e[1]||""),!1):"micro_scene"!=e[0]||(u.$store.commit("setMicroScenes",e[1]||""),!1)})),this.$store.state.micro_scene?this.$http.getMiniSkipInfo().then((function(t){200==t.code&&(null!=t.data&&"0"!=t.data.switch||(0,s.default)())})):(0,s.default)(),c.$once("login",(function(){console.log(t,"onlaunch中 登陆后执行"),u.sceneArr.indexOf(t.scene-0)>=0&&u.addWxCard(t)}))},initH5:function(t){var e=this;if(console.log(t,"H5传参"),r.default.SET("h5QueryInfo",t),c.removeStorageSync("access_token"),t.uid&&this.$store.commit("setUid",t.uid),t.miniEnAccounts&&c.setStorageSync("miniEnAccounts",t.miniEnAccounts),t.pid&&this.$store.commit("setPid",t.pid),c.setStorageSync("url",location.href.split("#")[0]),t.miniEnPid&&this.$store.commit("setMiniEnPid",t.miniEnPid),t.hm_scene&&this.$store.commit("setScene",t.hm_scene),this.$store.commit("setRandomPath",this.$route.params.randompath||(new Date).getTime()),t.appid)c.removeStorageSync("accountsId"),c.removeStorageSync("miniEnAccounts"),c.removeStorageSync("new_plan_source"),this.$store.commit("setAppid",a.default.getUrlParam("appid")),c.setStorageSync("appid",a.default.getUrlParam("appid"));else if(t.accountsId)return console.log(t.accountsId,c.getStorageSync("accountsId"),"-------accountsId---------"),t.access_token&&c.setStorageSync("access_token",t.access_token),t.realName?(c.setStorageSync("miniEnAccounts",t.miniEnAccounts),console.log(c.getStorageInfoSync("miniEnAccounts"),"miniEnAccounts----")):c.getStorageSync("accountsId")!=t.accountsId&&(c.removeStorageSync("miniEnAccounts"),c.removeStorageSync("bwcPhone")),t.new_plan_source?c.setStorageSync("new_plan_source",t.new_plan_source):c.removeStorageSync("new_plan_source"),c.removeStorageSync(c.getStorageSync("appid")),c.removeStorageSync("appid"),c.removeStorageSync("appidLogin"),c.setStorageSync("accountsId",t.accountsId),void this.$store.commit("setAccountsId",t.accountsId);c.$once("login",(function(){t.card_id&&e.addWxCard(t)})),console.log("=========".concat(this.$store.state.appid+"="+this.$store.state.token+"="+this.$store.state.kuaiditoken+"="+this.$store.state.phone,"==========="));var i="";c.getStorageSync("H5code")!=a.default.getUrlParam("code")&&(i=a.default.getUrlParam("code")),c.getStorageSync("accountsId")||this.$http.h5Login({code:i,appid:a.default.getUrlParam("appid")||"",invite_id:a.default.getUrlParam("uid")||"",authorize_type:a.default.getUrlParam("authorize_type")||0}).then((function(t){200==t.code&&t.data.token&&(console.log(t,"登录--"),c.setStorageSync("appid",t.data.appid),c.setStorageSync("H5code",a.default.getUrlParam("code")),e.$store.commit("setAppid",t.data.appid),c.setStorageSync(c.getStorageSync("appid"),t.data.token),e.$store.state.appid&&c.setStorageSync("appidLogin",!0),t.data.mobile?(c.setStorageSync("bwcPhone",t.data.mobile),c.$emit("refreshbwcPhone")):c.removeStorageSync("bwcPhone"),c.$emit("login",{login:!0}),console.log(location.search,"路径------------"),"/"==e.$route.path&&(e.$store.commit("setlocationSearch",location.search),c.getStorageSync("new_plan_source")?c.reLaunch({url:"/pages/home/index1/"+(e.$store.state.randompath||(new Date).getTime())+(location.search?"&":"?")+"uid="+t.data.uid+"&new_plan_source="+c.getStorageSync("new_plan_source")}):c.reLaunch({url:"/pages/home/index1/"+(e.$store.state.randompath||(new Date).getTime())+(location.search?"&":"?")+"uid="+t.data.uid})))}))},updateMini:function(){if(c.canIUse("getUpdateManager")){var t=c.getUpdateManager();t.onCheckForUpdate((function(e){e&&(t.onUpdateReady((function(){c.showModal({title:"更新提示",content:"新版本已经准备好，是否重启应用？",success:function(e){e.confirm&&t.applyUpdate()}})})),t.onUpdateFailed((function(){c.showModal({title:"已经有新版本了哟~",content:"新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"})})))}))}else{"微信",c.showModal({title:"提示",content:"当前".concat("微信","版本过低，请更新").concat("微信","版本！"),success:function(t){t.confirm&&h.updateWeChatApp()}})}},addWxCard:function(t){var e;if(console.log("addWxCard","addWxCard 方法 刚进入"),this.$utils.hasLogin()){console.log("addWxCard","addWxCard 方法 用户已经登录");var i=this;if(null!==(e=t.query)&&void 0!==e&&e.card_id||t.card_id){var n;console.log("addWxCard","参数中包含card_id");var o=(null===(n=t.query)||void 0===n?void 0:n.card_id)||t.card_id;i.$http.getWxCardInfo({card_id:o}).then((function(t){if(200==t.code){if(console.log("addWxCard","正常获取到cardinfo"),i.addWxCardLock)return;i.addWxCardLock=!0;var e="",n=getCurrentPages();n&&n.length&&(e=n[n.length-1].route),console.log(t.data,e,"霸王餐信息",t.data.receiving_status);var s=t.data.authorizer_appid;if(1==t.data.boot_page_status&&-1==e.indexOf("/subpackage/cardboot/index"))return i.$globalData.SET("card",t.data.card_info,"cardinfo"),i.$globalData.SET("card",t.data.card_color,"cardcolor"),i.$globalData.SET("card",s,"appid"),i.$globalData.SET("card",o,"cardid"),i.$globalData.SET("card",t.data.receiving_status,"receiving_status"),i.$globalData.SET("card",t.data.card_code,"card_code"),void c.navigateTo({url:"/subpackage/cardboot/index"});t.data.receiving_status?(console.log("opencard","app"),i.openCard(o,t.data.card_code)):i.$http.getWxCardApiTicket({appid:s,card_id:o}).then((function(t){200==t.code&&h.addCard({cardList:[{cardId:o,cardExt:JSON.stringify(t.data)}],success:function(t){console.log("addWxCard success",t),i.$http.getCardCode({encrypt_code:t.cardList[0].code,authorizer_appid:s}).then((function(t){console.log("解码会员卡号",t),200==t.code&&i.openCard(o,t.data.code)}))}})}))}}))}}}}},l=i(4862),d=i.n(l),g=(0,(d(),i(9453)).default)(u,void 0,void 0,!1,null,null,null,!1,void 0,void 0).exports,f=i(9209),p=i(7668),m=i(1460),_=i(8793).default,v=i(7039).createApp;function w(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function y(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?w(Object(i),!0).forEach((function(e){(0,n.default)(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):w(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}_.__webpack_require_UNI_MP_PLUGIN__=i;o.default.component("notYetData",(function(){i.e("components/notYetData/index").then(function(){return resolve(i(8286))}.bind(null,i)).catch(i.oe)})),o.default.component("popup",(function(){i.e("components/popup/index").then(function(){return resolve(i(8152))}.bind(null,i)).catch(i.oe)})),o.default.component("loadMore",(function(){i.e("components/loadMore/index").then(function(){return resolve(i(8394))}.bind(null,i)).catch(i.oe)})),o.default.component("topping",(function(){i.e("components/topping/index").then(function(){return resolve(i(3513))}.bind(null,i)).catch(i.oe)})),o.default.component("loginPop",(function(){i.e("components/loginPop/index").then(function(){return resolve(i(5995))}.bind(null,i)).catch(i.oe)})),o.default.component("notPhone",(function(){i.e("components/notPhone/index").then(function(){return resolve(i(7565))}.bind(null,i)).catch(i.oe)})),o.default.component("list",(function(){i.e("components/list/index").then(function(){return resolve(i(4524))}.bind(null,i)).catch(i.oe)})),o.default.config.productionTip=!1,o.default.prototype.$utils=a.default,o.default.prototype.$common=m.default,o.default.prototype.$http=p.default,o.default.prototype.$globalData=r.default,o.default.prototype.$nav=a.default.nav;o.default.component("tabbar",(function(){i.e("components/tabbar/index").then(function(){return resolve(i(6291))}.bind(null,i)).catch(i.oe)}));o.default.component("navbar",(function(){i.e("components/navbar/index").then(function(){return resolve(i(1041))}.bind(null,i)).catch(i.oe)})),g.mpType="app";var S=new o.default(y(y({},g),{},{store:f.default}));v(S).$mount();var b=S},4862:function(){},3286:function(){},8943:function(){},8775:function(){},93:function(){},1410:function(){},3448:function(){},5557:function(){},5569:function(){},9505:function(){},2932:function(){},3927:function(){},3957:function(){},391:function(){},2665:function(){}},function(t){t.O(0,["common/vendor"],(function(){return e=6742,t(t.s=e);var e})),t.O()}]); 
 			}); 	require("pages/home/index1.js");
 		__wxRoute = 'pages/orderlist/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/orderlist/index.js';	define("pages/orderlist/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["pages/orderlist/index"],{9297:function(t,i,e){e.r(i),e.d(i,{default:function(){return r}});var s=e(9510),a=e(7039).default,n={data:function(){return{cont:"",mtWithdrawal:1,failRow:[],new_reason:"",reject_reason:"",isFailPop:!1,isShowQRc0de:!1,backLock:!1,tips:"是否跳转小程序下单？",user_path:"",info:{},active1:0,warfare:["店铺二维码失效","小程序店铺id失效","复制店铺不出来"],isGuza:!1,appid:"",active:0,ticker:null,tab:[{name:"全部",key:""},{name:"待上传",key:"1"},{name:"已完成",key:"3"},{name:"审核中",key:"2"},{name:"已驳回",key:"4"}],from:{page:1,state:"",order_sn:""},list:[],listTotal:{total:0,valid_total:0,valid_user_profit:0},notTips:!1,phone:"",jumpPopup:!1,id:""}},onPullDownRefresh:function(){a.getStorageSync("bwcPhone")?(this.getList(),setTimeout((function(){a.stopPullDownRefresh()}),1e3)):a.stopPullDownRefresh()},onReachBottom:function(){this.from.page++,this.$utils.hasLogin()&&this.getList()},filters:{limitTimeFilter:function(t){var i=parseInt((new Date).getTime()/1e3);if((t=parseInt(t)-i)>0){var e,s,a;e=parseInt(t/3600),s=parseInt((t-60*e*60)/60),a=parseInt(t-60*e*60-60*s),e<10&&(e="0"+e),s<10&&(s="0"+s),a<10&&(a="0"+a);var n={hour:e,min:s,seconds:a};return"".concat(n.hour,":").concat(n.min,":").concat(n.seconds," ")}return"00:00:00 "}},methods:{jumpWallet:function(){a.navigateTo({url:"/subpackage/withdrawalList/index"})},eliminate:function(){this.from.order_sn="",this.search()},getMtWithdrawalRule:function(){var t=this;this.$http.getMtWithdrawalRule().then((function(i){200==i.code&&(console.log(i,"美团规则------"),t.mtWithdrawal=i.data.config.cashback_mode)}))},closeQRcode:function(){this.isShowQRc0de=!1},pullUp:function(){this.from.page++,this.getList()},evaluate:function(t){this.info=this.list[t],this.openUrl(5)},shop:function(t){if(this.info=this.list[t],5==this.info.state||3==this.info.state)return!1;""!=this.getPlatformParameter(1)&&""!=this.getPlatformParameter(2)?this.openUrl(1):2==info.source&&(1==this.info.platform&&this.info.action_url.qrcode.mt||2==this.info.platform&&this.info.action_url.qrcode.elm)?this.openUrl(3):this.openUrl(2)},lookUploadPage:function(t){if(this.info=this.list[t],6==this.info.state||7==this.info.state)return!1;this.$utils.navRouter("/subpackage/uploadImage/index?order_sn="+this.list[t].order_sn)},getPlatformParameter:function(t){return 1==t?1==this.info.platform?this.info.action_url.wx_mini.mt.appid:this.info.action_url.wx_mini.elm.appid:2==t?1==this.info.platform?this.info.action_url.wx_mini.mt.path:this.info.action_url.wx_mini.elm.path:4==t?1==this.info.platform?this.info.action_url.wx_mini.mt.order_list:this.info.action_url.wx_mini.elm.comment_list:void 0},openUrl:function(t){if(1==t)a.navigateToMiniProgram({appId:this.getPlatformParameter(1),path:this.getPlatformParameter(2),success:function(t){}});else if(2==t){var i=this;a.setClipboardData({data:i.info.plan_name,success:function(){i.$utils.showToast("复制成功"),a.navigateToMiniProgram({appId:i.getPlatformParameter(1),path:"",success:function(t){}})}})}else 4==t?(this.isGuza=!0,this.active1=0):3==t?this.isShowQRc0de=!0:5==t&&a.navigateToMiniProgram({appId:this.getPlatformParameter(1),path:this.getPlatformParameter(4),success:function(t){}})},submitGuza:function(){var t=this;this.$http.faultReport({plan_id:this.info.id,source:this.info.source,content:this.warfare[this.active]}).then((function(i){a.showToast({icon:"none",title:i.message}),"200"==i.code&&t.closeGuza()}))},closeGuza:function(){this.isGuza=!1,this.active=0},closeJump:function(){this.jumpPopup=!1},beginTimer:function(){var t=this;this.ticker=setInterval((function(){for(var i=0,e=t.list.length;i<e;i++){var s=parseInt((new Date).getTime()/1e3),a=t.list[i].upload_credential_expire_time-s,n=t.list[i].place_order_expire_time-s,o=t.list[i].expire_time-s;a>0&&(t.list[i].upload_credential_expire_time=t.list[i].upload_credential_expire_time+.1),n>0&&(t.list[i].place_order_expire_time=t.list[i].place_order_expire_time+.1),o>0&&(t.list[i].expire_time=t.list[i].expire_time+.1)}}),1e3)},remark:function(t,i){1==i?(this.failRow=t.audit_logs,6!=t.state&&7!=t.state&&5!=t.state||(this.failRow=[]),this.new_reason=t.new_reason,this.reject_reason=""):(this.failRow=[],this.new_reason="",this.reject_reason=t.reject_reason),this.isFailPop=!0},showBigImage:function(t,i,e){if(1==e){var s=this.list[t].screenshots;a.previewImage({urls:s,current:i,indicator:!0})}else{console.log(this.failRow[t],"-*-*-");var n=this.failRow[t].audit_files.split(",");a.previewImage({urls:n,current:i,indicator:!0})}},cancelOrder:function(t){var i=this;a.showModal({title:"温馨提示",content:"是否确认取消订单?",success:function(e){e.confirm&&i.$http.cancelOrder({order_sn:i.list[t].order_sn}).then((function(t){a.showToast({icon:"none",title:t.message}),"200"==t.code&&(i.from.page=1,i.list=[],i.search())}))}})},search:function(){this.$utils.handleLoginNav()||(this.list=[],this.from.page=1,this.getList())},uploadImage:function(t){this.$utils.navRouter("/subpackage/uploadImage/index?order_sn="+this.list[t].order_sn)},uploadVideo:function(t){this.$utils.navRouter("/subpackage/uploadImage/index?order_sn="+this.list[t].order_sn+"&isRoll=1")},copy:function(t){this.$utils.copy(t)},switchTab:function(t){this.$utils.handleLoginNav()||(this.active=t,this.from.state=this.tab[t].key,this.from.page=1,this.ticker&&(clearInterval(this.ticker),this.ticker=null),this.search())},getList:function(){var t=this;this.$http.orderList(this.from).then((function(i){console.log(i,"----"),200==i.code&&(0!=i.data.length?(0!=i.data.data.length&&i.data.data.forEach((function(t){""!=t.screen_shots&&2==t.source?t.screenshots=t.screen_shots.split(","):t.screenshots=[]})),1==t.from.page?t.list=i.data.data:t.list=[].concat((0,s.default)(t.list),(0,s.default)(i.data.data))):t.list=[],0!=t.list.length?t.notTips=!1:t.notTips=!0,t.ticker||0==t.list.length||t.beginTimer())}))},getTotal:function(){var t=this;this.$http.orderStatics().then((function(i){200==i.code&&(console.log(i,"统计------"),t.listTotal={total:i.data.order_number,valid_total:i.data.order_number_valid,valid_user_profit:i.data.order_amount_valid},t.cont=i.data.rule)}))},init:function(){this.search(),this.getTotal(),this.getMtWithdrawalRule()}},props:{type:{type:Number,default:function(){return 0}}},onLoad:function(t){this.active=0,t&&(t.type||0==t.type)&&(this.active=t.type),this.from.state=this.tab[this.active].key,this.from.page=1,this.list=[],this.ticker&&(clearInterval(this.ticker),this.ticker=null),this.$utils.hasLogin()&&this.init()},created:function(){var t=this;a.$on("refreshbwcPhone",(function(){t.init()})),this.active=0,(this.type||0==this.type)&&(this.active=this.type),this.from.state=this.tab[this.active||0].key||"",this.from.page=1,this.list=[],this.ticker&&(clearInterval(this.ticker),this.ticker=null),this.$utils.hasLogin()&&(this.init(),a.$on("refreshbwcList",(function(){t.search()})))},mounted:function(){this.ticker&&(clearInterval(this.ticker),this.ticker=null),this.beginTimer(),a.pageScrollTo({scrollTop:0,duration:0});var t=getCurrentPages().length;this.backLock=1!=t}},o=e(9505),r=(0,(e.n(o)(),e(9453)).default)(n,(function(){var t=this,i=(t.$createElement,t._self._c,t.__map(t.list,(function(i,e){return{$orig:t.__get_orig(i),f0:5!=i.state&&7!=i.state&&6!=i.state&&1==i.state&&""==i.user_order_sn&&1==i.source?t._f("limitTimeFilter")(i.expire_time):null,f1:5!=i.state&&7!=i.state&&6!=i.state&&2==i.source&&i.user_order_sn&&""==i.screen_shots&&1==i.state?t._f("limitTimeFilter")(i.upload_credential_expire_time):null,f2:5!=i.state&&7!=i.state&&6!=i.state&&2==i.source&&""==i.user_order_sn&&1==i.state?t._f("limitTimeFilter")(i.place_order_expire_time):null}}))),e=t.isFailPop?t.failRow.length:null,s=t.isFailPop&&0!=e?t.__map(t.failRow,(function(i,e){return{$orig:t.__get_orig(i),l1:2!=i.audit_status&&3!=i.audit_status||!i.audit_files?null:i.audit_files.split(",")}})):null,a=t.isFailPop?0==t.failRow.length&&t.new_reason&&!t.reject_reason:null,n=t.isFailPop?0==t.failRow.length&&!t.new_reason&&t.reject_reason:null;t._isMounted||(t.e0=function(i,e){var s=arguments[arguments.length-1].currentTarget.dataset,a=s.eventParams||s["event-params"];e=a.index,t.active1=e},t.e1=function(i){t.isFailPop=!1}),t.$mp.data=Object.assign({},{$root:{l0:i,g0:e,l2:s,g1:a,g2:n}})}),[],!1,null,"3faff76a",null,!1,void 0,void 0).exports},2283:function(t,i,e){e.r(i),e(5476);var s=e(9297),a=e(8793).default,n=e(7039).createPage;a.__webpack_require_UNI_MP_PLUGIN__=e,n(s.default)},9505:function(){}},function(t){t.O(0,["common/vendor"],(function(){return i=2283,t(t.s=i);var i})),t.O()}]); 
 			}); 	require("pages/orderlist/index.js");
 		__wxRoute = 'pages/my/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/my/index.js';	define("pages/my/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";require("../../@babel/runtime/helpers/Arrayincludes"),(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["pages/my/index","common/main"],{9466:function(e,t,n){n.r(t),n.d(t,{default:function(){return h}});var o=n(7028),i=n(8238),a=n(843),c=n(8793).default,r=n(7039).default;function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}var u={data:function(){return{head_img:"",nick_name:"",is_show_member_right:!1,is_perfect:!1,choose:!1,tipsPop:!1,realNameTips:"",backLock:!1,qrcode:"",realname:!1,isearnest:!1,show_type:!1,nickname:"",headimgurl:"",user:{hm_uid:"",telephone:"",nickname:"微信昵称",headimgurl:"https://img.yunzhanxinxi.com/static/personal/bwc/head_portrait_ic@2x.png",money:"-",total_income:"-",month_income:"-",score:0,total_balance:"-"},is_certification:0,sub_commission_status:0,qrcode_img_url:"",phone:"",url:"",newUrl:"",isShowActivity:!1,menuConfig:{},navHeight:0,level:0,level_name:"",progress:0,nextLevel:0,nextLevel_name:""}},mounted:function(){var e=this,t=c.getMenuButtonBoundingClientRect();this.menuButtonObject=t,c.getSystemInfo({success:function(n){var o=n.statusBarHeight,i=o+t.height+2*(t.top-o);e.navHeight=i}}),r.pageScrollTo({scrollTop:0,duration:0});var n=getCurrentPages().length;this.backLock=1!=n},onPullDownRefresh:function(){r.getStorageSync("bwcPhone")?(this.getInfo(),setTimeout((function(){r.stopPullDownRefresh()}),1e3)):r.stopPullDownRefresh()},methods:{getMtWithdrawalRule:function(){var e=this;this.$http.getMtWithdrawalRule().then((function(t){200==t.code&&(console.log(t,"是否显示权益------"),e.is_show_member_right=t.data.config.is_show_member_right,e.is_show_member_right&&e.getLevelInfo())}))},getLevelInfo:function(){var e=this;this.$http.getUserLevel().then((function(t){if("200"==t.code){e.level=t.data.user_info.level,e.level_name=t.data.user_info.level_name;var n=0;for(var o in t.data.user_level)t.data.user_level[o].level==e.level&&(n=o,e.progress=parseInt(100*t.data.user_level[o].progress));t.data.user_level[parseInt(n)+1]?(e.nextLevel=t.data.user_level[parseInt(n)+1].level,e.nextLevel_name=t.data.user_level[parseInt(n)+1].describe):(e.nextLevel=!1,e.nextLevel_name=!1)}}))},GradeEquity:function(){this.$utils.handleLoginNav()||r.navigateTo({url:"/subpackage/grade/index"})},submit:function(){var e=this;return console.log(this.nickname,"----"),this.nickname?this.choose?void this.$http.setUserPerfectInfo({nickname:this.nickname,headimgurl:this.headimgurl}).then((function(t){"200"==t.code?(e.user.nickname=e.nickname,e.user.headimgurl=e.headimgurl,e.is_perfect=!1,r.showToast({icon:"none",title:"更新成功"})):r.showToast({icon:"none",title:t.message})})):this.$utils.showToast("请勾选隐私协议"):r.showToast({icon:"none",title:"请输入昵称"})},protocol:function(){r.navigateTo({url:"/subpackage/webView/h5?url="+encodeURIComponent("https://img.yunzhanxinxi.com/static/alliance/html/privacy.html?v=0001")})},changeHeadImg:function(){var e=this;r.chooseImage({count:1,sizeType:["compressed"],success:function(t){var n=t.tempFilePaths,o={};o={editionType:"routine","utm-source":i.default.utm_source,platform:i.default.platform,version:e.$store.state.version,appid:r.getStorageSync("appid")||"",hm_scene_template:"overlordMeal"},r.getStorageSync("scenesLogin")?o.Authorization=e.$store.state.scene_token:o.token=e.$store.state.token,r.uploadFile({url:i.default.url_config+"/home/overlordmeal/image/upload-avatar",filePath:n[0],name:"file",header:o,success:function(t){var n=JSON.parse(t.data);200==n.code?(console.log(n.data.url),e.headimgurl=n.data.url):(console.log(n.message),e.$utils.showToast(n.message))},fail:function(e){console.log(e)}})}})},onChooseAvatar:function(e){console.log(e,"--------");var t=this,n={};n={editionType:"routine","utm-source":i.default.utm_source,platform:i.default.platform,version:t.$store.state.version,appid:r.getStorageSync("appid")||"",hm_scene_template:"overlordMeal"},r.getStorageSync("scenesLogin")?n.Authorization=t.$store.state.scene_token:n.token=t.$store.state.token,r.uploadFile({url:i.default.url_config+"/home/overlordmeal/image/upload-avatar",filePath:e.detail.avatarUrl,name:"file",header:n,success:function(e){var n=JSON.parse(e.data);200==n.code?(console.log(n.data.url),t.headimgurl=n.data.url):(console.log(n.message),t.$utils.showToast(n.message))},fail:function(e){console.log(e)}})},Definition:function(){this.tipsPop=!0},placeOrder:function(){r.navigateTo({url:"/pages/placeOrder/index"})},invite:function(){r.navigateTo({url:"/pages/pullNewActivity/index"})},openCustomerQrcode:function(e){if(console.log(e),!this.$utils.handleLoginNav())if(1==e.kefu_qrcode_type)""!=e.kefu_qrcode_url&&(this.qrcode_img_url=e.kefu_qrcode_url),this.$refs.popup.show();else if(2==e.kefu_qrcode_type)return},goLogin:function(){this.$utils.handleLoginNav()},jumpUrl1:function(e){console.log(e),this.$utils.handleLoginNav()||e.path&&r.navigateTo({url:e.path})},keepImage:function(){var e=this;r.getSetting({success:function(t){t.authSetting["scope.writePhotosAlbum"]?r.saveImageToPhotosAlbum({filePath:e.qrcode,success:function(){r.showToast({icon:"none",title:"保存成功"})},fail:function(e){r.showToast({icon:"none",title:"保存失败"})}}):r.authorize({scope:"scope.writePhotosAlbum",success:function(){r.saveImageToPhotosAlbum({filePath:e.qrcode,success:function(){r.showToast({icon:"none",title:"保存成功"})},fail:function(e){r.showToast({icon:"none",title:"保存失败"})}})},fail:function(){r.showModal({title:"您已拒绝获取相册权限",content:"是否进入权限管理，调整授权？",success:function(e){if(e.confirm)r.openSetting({success:function(e){}});else if(e.cancel)return r.showToast({title:"已取消！"})}})}})}})},close:function(){this.realname=!1},copy:function(){this.$utils.copy(this.user.hm_uid)},jumpUrl:function(e,t){if(!this.$utils.handleLoginNav()){var n="";switch(e){case 1:n="/subpackage/set/index";break;case 2:n=!(0==this.menuConfig.invite_friend_reward_show_position.length||!this.menuConfig.invite_friend_reward_show_position.includes("withdrawal"))?"/subpackage/withdrawalList/index?img="+this.menuConfig.invite_friend_reward_background_url:"/subpackage/withdrawalList/index";break;case 3:this.isearnest=!1,n=r.getStorageSync("isScenes")?"/subpackage/webView/h5?url=".concat(encodeURIComponent(this.url)):"/subpackage/webView/h5?url=".concat(encodeURIComponent(this.newUrl));break;case 5:r.$emit("setCurrent",{current_id:37,type:t});break;case 11:n="/pages/pullNewActivity/index";break;case 12:if(0==this.is_certification)return this.isearnest=!0;n="/subpackage/withdrawal/index"}r.navigateTo({url:n})}},getInfo:function(){var e=this;this.$http.getUserInfo().then((function(t){console.log(t,"个人信息----"),200==t.code&&(e.user=t.data.user,e.is_perfect=t.data.is_perfect,e.headimgurl=e.user.headimgurl,e.nickname=e.user.nickname,e.is_certification=t.data.is_certification,e.is_perfect&&e.$http.getShareInfo({}).then((function(t){t&&200==t.code&&(e.head_img=t.data.head_img,e.nick_name=t.data.nick_name)})))})),this.$http.getConfig().then((function(t){200==t.code&&(e.qrcode_img_url=t.data.qrcode_img_url,e.sub_commission_status=t.data.sub_commission_status)})),this.getMenu(),this.getMtWithdrawalRule()},followLink:function(){this.$utils.handleLoginNav()||(console.log(this.menuConfig.guide.link_url,"----"),this.$utils.navRouter("/subpackage/webView/h5?url="+encodeURIComponent(this.menuConfig.guide.link_url)))},getMenu:function(){var e=this;this.$http.menuConfig().then((function(t){console.log(t,"获取菜单配置"),200==t.code&&(e.menuConfig=t.data,0!=e.menuConfig.invite_friend_reward_show_position.length&&e.menuConfig.invite_friend_reward_show_position.includes("userCenter")?e.show_type=!0:e.show_type=!1)}))},getRealNameUrl:function(){var e=this;this.$http.getUrl().then((function(t){"200"==t.code&&(e.url=t.data.long_url,e.realNameTips=t.data.tip)})),this.$http.getUrlNew().then((function(t){"200"==t.code&&(e.newUrl=t.data.url)}))},init:function(){this.getInfo(),this.getRealNameUrl()}},computed:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){(0,o.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},(0,a.mapState)(["randompath"])),created:function(){var e=this;r.$on("updateUserInfo",(function(){e.$http.getUserInfo().then((function(t){console.log(t,"个人信息----"),200==t.code&&(e.user=t.data.user,e.is_certification=t.data.is_certification)}))})),r.$on("refreshbwcINfo",(function(){e.getInfo()})),r.$on("refreshbwcPhone",(function(){e.init()})),r.$on("refreshbwcGrade",(function(){e.getMtWithdrawalRule()})),this.$utils.hasLogin()&&this.init()}},l=n(5569),d=n.n(l),h=(0,(d(),n(9453)).default)(u,(function(){var e=this,t=(e.$createElement,e._self._c,e.menuConfig&&e.menuConfig.lists&&0!=e.menuConfig.lists.length);e._isMounted||(e.e0=function(t){e.isearnest=!1},e.e1=function(t){return e.$refs.popup.hide()},e.e2=function(t){e.tipsPop=!1},e.e3=function(t){e.choose=!e.choose},e.e4=function(t){e.choose=!e.choose},e.e5=function(t){e.choose=!e.choose},e.e6=function(t){e.is_perfect=!1}),e.$mp.data=Object.assign({},{$root:{g0:t}})}),[],!1,null,"5e34fd2a",null,!1,void 0,void 0).exports},9683:function(e,t,n){n.r(t),n(5476);var o=n(9466),i=n(8793).default,a=n(7039).createPage;i.__webpack_require_UNI_MP_PLUGIN__=n,a(o.default)},1762:function(e,t,n){n.r(t),n.d(t,{default:function(){return w}});var o=n(7028),i=n(5476),a=n(5293),c=(n(214),n(2412)),r=n(188),s=n(7039).default,u=n(8793).default,l={data:{micro_scene:"",addWxCardLock:!1,hasClosed:!1,sceneArr:[1007,1008,1011,1012,1013,1014,1047,1048,1049,1058,1067,1073,1074,1081,1082,1091,1095,1096,1102,1107,1157,1160,1167,1185,1208]},onLaunch:function(e){console.log("App Launch",e,this.$route,this.$store),this.initMini(e)},onShow:function(e){var t=this;console.log("App Show",e),console.log("后台进入前台");var n,o,i,c,r;this.hasClosed&&["pages/home/index","subpackage/activity/index","pages/bwc/index","pages/welfare/index","pages/placeOrder/index","pages/pullnewactivity/index","pages/myPoster/index","subpackage/businessSettleIn/index","pages/signReach/index","pages/pointsMall/index","pages/luckDraw/index","subpackage/redPacket/index"].includes(e.path)&&((null!==(n=e.query)&&void 0!==n&&n.uid||e.uid)&&(this.$store.commit("setUid",(null===(r=e.query)||void 0===r?void 0:r.uid)||e.uid),console.log(this.$store.state.uid,"uid-------------")),(null!==(o=e.query)&&void 0!==o&&o.micro_scene||e.micro_scene)&&this.initMini(e),(null!==(i=e.query)&&void 0!==i&&i.uri||e.uri||null!==(c=e.query)&&void 0!==c&&c.scene)&&this.initMini(e));this.updateMini(),this.sceneArr.indexOf(e.scene-0)>=0&&(this.hasClosed&&this.addWxCardLock?(this.addWxCardLock=!1,this.hasClosed=!1,console.log("刚从卡券返回，不再打开")):setTimeout((function(){var n;(null!=e&&null!==(n=e.query)&&void 0!==n&&n.card_id||e.card_id)&&!t.$store.state.token&&(0,a.default)(),t.addWxCard(e)}),100))},onHide:function(){console.log("App Hide"),this.hasClosed=!0},methods:{initMini:function(e){var t,n,o,i,c,r,u,l=this;if(console.log(e,"--------小程序---"),this.$store.commit("setToken",""),this.$store.commit("setSceneToken",""),s.removeStorageSync("token"),s.removeStorageSync("scene_token"),console.log(s.getAccountInfoSync().miniProgram.appId,"appid"),this.$store.commit("setAppid",s.getAccountInfoSync().miniProgram.appId),null!==(t=e.query)&&void 0!==t&&t.uid?this.$store.commit("setUid",e.query.uid):e.uid&&this.$store.commit("setUid",e.uid),null!==(n=e.query)&&void 0!==n&&n.micro_scene?(this.$store.commit("setMicroScenes",e.query.micro_scene),this.micro_scene=null===(r=e.query)||void 0===r?void 0:r.micro_scene):e.micro_scene?(this.$store.commit("setMicroScenes",e.micro_scene),this.micro_scene=e.micro_scene):(this.$store.commit("setMicroScenes",""),this.micro_scene=""),null!==(o=e.query)&&void 0!==o&&o.utm_source?this.$store.commit("setUtmSource",e.query.utm_source):e.utm_source?this.$store.commit("setUtmSource",e.utm_source):this.$store.commit("setUtmSource",""),null!==(i=e.query)&&void 0!==i&&i.uri)s.setStorageSync("redPackUri",null===(u=e.query)||void 0===u?void 0:u.uri);else if(e.uri)s.setStorageSync("redPackUri",e.uri);else if(null!==(c=e.query)&&void 0!==c&&c.scene){var d;s.setStorageSync("redPackUri",decodeURIComponent(null===(d=e.query)||void 0===d?void 0:d.scene).split("=")[1])}else s.setStorageSync("redPackUri","");decodeURIComponent(e.scene).split("&").every((function(e){var t=e.split("=");return"uid"==t[0]?(l.$store.commit("setUid",t[1]||""),!1):"micro_scene"!=t[0]||(l.$store.commit("setMicroScenes",t[1]||""),!1)})),this.$store.state.micro_scene?this.$http.getMiniSkipInfo().then((function(e){200==e.code&&(null!=e.data&&"0"!=e.data.switch||(0,a.default)())})):(0,a.default)(),s.$once("login",(function(){console.log(e,"onlaunch中 登陆后执行"),l.sceneArr.indexOf(e.scene-0)>=0&&l.addWxCard(e)}))},initH5:function(e){var t=this;if(console.log(e,"H5传参"),r.default.SET("h5QueryInfo",e),s.removeStorageSync("access_token"),e.uid&&this.$store.commit("setUid",e.uid),e.miniEnAccounts&&s.setStorageSync("miniEnAccounts",e.miniEnAccounts),e.pid&&this.$store.commit("setPid",e.pid),s.setStorageSync("url",location.href.split("#")[0]),e.miniEnPid&&this.$store.commit("setMiniEnPid",e.miniEnPid),e.hm_scene&&this.$store.commit("setScene",e.hm_scene),this.$store.commit("setRandomPath",this.$route.params.randompath||(new Date).getTime()),e.appid)s.removeStorageSync("accountsId"),s.removeStorageSync("miniEnAccounts"),s.removeStorageSync("new_plan_source"),this.$store.commit("setAppid",c.default.getUrlParam("appid")),s.setStorageSync("appid",c.default.getUrlParam("appid"));else if(e.accountsId)return console.log(e.accountsId,s.getStorageSync("accountsId"),"-------accountsId---------"),e.access_token&&s.setStorageSync("access_token",e.access_token),e.realName?(s.setStorageSync("miniEnAccounts",e.miniEnAccounts),console.log(s.getStorageInfoSync("miniEnAccounts"),"miniEnAccounts----")):s.getStorageSync("accountsId")!=e.accountsId&&(s.removeStorageSync("miniEnAccounts"),s.removeStorageSync("bwcPhone")),e.new_plan_source?s.setStorageSync("new_plan_source",e.new_plan_source):s.removeStorageSync("new_plan_source"),s.removeStorageSync(s.getStorageSync("appid")),s.removeStorageSync("appid"),s.removeStorageSync("appidLogin"),s.setStorageSync("accountsId",e.accountsId),void this.$store.commit("setAccountsId",e.accountsId);s.$once("login",(function(){e.card_id&&t.addWxCard(e)})),console.log("=========".concat(this.$store.state.appid+"="+this.$store.state.token+"="+this.$store.state.kuaiditoken+"="+this.$store.state.phone,"==========="));var n="";s.getStorageSync("H5code")!=c.default.getUrlParam("code")&&(n=c.default.getUrlParam("code")),s.getStorageSync("accountsId")||this.$http.h5Login({code:n,appid:c.default.getUrlParam("appid")||"",invite_id:c.default.getUrlParam("uid")||"",authorize_type:c.default.getUrlParam("authorize_type")||0}).then((function(e){200==e.code&&e.data.token&&(console.log(e,"登录--"),s.setStorageSync("appid",e.data.appid),s.setStorageSync("H5code",c.default.getUrlParam("code")),t.$store.commit("setAppid",e.data.appid),s.setStorageSync(s.getStorageSync("appid"),e.data.token),t.$store.state.appid&&s.setStorageSync("appidLogin",!0),e.data.mobile?(s.setStorageSync("bwcPhone",e.data.mobile),s.$emit("refreshbwcPhone")):s.removeStorageSync("bwcPhone"),s.$emit("login",{login:!0}),console.log(location.search,"路径------------"),"/"==t.$route.path&&(t.$store.commit("setlocationSearch",location.search),s.getStorageSync("new_plan_source")?s.reLaunch({url:"/pages/home/index1/"+(t.$store.state.randompath||(new Date).getTime())+(location.search?"&":"?")+"uid="+e.data.uid+"&new_plan_source="+s.getStorageSync("new_plan_source")}):s.reLaunch({url:"/pages/home/index1/"+(t.$store.state.randompath||(new Date).getTime())+(location.search?"&":"?")+"uid="+e.data.uid})))}))},updateMini:function(){if(s.canIUse("getUpdateManager")){var e=s.getUpdateManager();e.onCheckForUpdate((function(t){t&&(e.onUpdateReady((function(){s.showModal({title:"更新提示",content:"新版本已经准备好，是否重启应用？",success:function(t){t.confirm&&e.applyUpdate()}})})),e.onUpdateFailed((function(){s.showModal({title:"已经有新版本了哟~",content:"新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"})})))}))}else{"微信",s.showModal({title:"提示",content:"当前".concat("微信","版本过低，请更新").concat("微信","版本！"),success:function(e){e.confirm&&u.updateWeChatApp()}})}},addWxCard:function(e){var t;if(console.log("addWxCard","addWxCard 方法 刚进入"),this.$utils.hasLogin()){console.log("addWxCard","addWxCard 方法 用户已经登录");var n=this;if(null!==(t=e.query)&&void 0!==t&&t.card_id||e.card_id){var o;console.log("addWxCard","参数中包含card_id");var i=(null===(o=e.query)||void 0===o?void 0:o.card_id)||e.card_id;n.$http.getWxCardInfo({card_id:i}).then((function(e){if(200==e.code){if(console.log("addWxCard","正常获取到cardinfo"),n.addWxCardLock)return;n.addWxCardLock=!0;var t="",o=getCurrentPages();o&&o.length&&(t=o[o.length-1].route),console.log(e.data,t,"霸王餐信息",e.data.receiving_status);var a=e.data.authorizer_appid;if(1==e.data.boot_page_status&&-1==t.indexOf("/subpackage/cardboot/index"))return n.$globalData.SET("card",e.data.card_info,"cardinfo"),n.$globalData.SET("card",e.data.card_color,"cardcolor"),n.$globalData.SET("card",a,"appid"),n.$globalData.SET("card",i,"cardid"),n.$globalData.SET("card",e.data.receiving_status,"receiving_status"),n.$globalData.SET("card",e.data.card_code,"card_code"),void s.navigateTo({url:"/subpackage/cardboot/index"});e.data.receiving_status?(console.log("opencard","app"),n.openCard(i,e.data.card_code)):n.$http.getWxCardApiTicket({appid:a,card_id:i}).then((function(e){200==e.code&&u.addCard({cardList:[{cardId:i,cardExt:JSON.stringify(e.data)}],success:function(e){console.log("addWxCard success",e),n.$http.getCardCode({encrypt_code:e.cardList[0].code,authorizer_appid:a}).then((function(e){console.log("解码会员卡号",e),200==e.code&&n.openCard(i,e.data.code)}))}})}))}}))}}}}},d=n(4862),h=n.n(d),p=(0,(h(),n(9453)).default)(l,void 0,void 0,!1,null,null,null,!1,void 0,void 0).exports,g=n(9209),f=n(7668),m=n(1460),_=n(8793).default,v=n(7039).createApp;function S(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?S(Object(n),!0).forEach((function(t){(0,o.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):S(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}_.__webpack_require_UNI_MP_PLUGIN__=n;i.default.component("notYetData",(function(){n.e("components/notYetData/index").then(function(){return resolve(n(8286))}.bind(null,n)).catch(n.oe)})),i.default.component("popup",(function(){n.e("components/popup/index").then(function(){return resolve(n(8152))}.bind(null,n)).catch(n.oe)})),i.default.component("loadMore",(function(){n.e("components/loadMore/index").then(function(){return resolve(n(8394))}.bind(null,n)).catch(n.oe)})),i.default.component("topping",(function(){n.e("components/topping/index").then(function(){return resolve(n(3513))}.bind(null,n)).catch(n.oe)})),i.default.component("loginPop",(function(){n.e("components/loginPop/index").then(function(){return resolve(n(5995))}.bind(null,n)).catch(n.oe)})),i.default.component("notPhone",(function(){n.e("components/notPhone/index").then(function(){return resolve(n(7565))}.bind(null,n)).catch(n.oe)})),i.default.component("list",(function(){n.e("components/list/index").then(function(){return resolve(n(4524))}.bind(null,n)).catch(n.oe)})),i.default.config.productionTip=!1,i.default.prototype.$utils=c.default,i.default.prototype.$common=m.default,i.default.prototype.$http=f.default,i.default.prototype.$globalData=r.default,i.default.prototype.$nav=c.default.nav;i.default.component("tabbar",(function(){n.e("components/tabbar/index").then(function(){return resolve(n(6291))}.bind(null,n)).catch(n.oe)}));i.default.component("navbar",(function(){n.e("components/navbar/index").then(function(){return resolve(n(1041))}.bind(null,n)).catch(n.oe)})),p.mpType="app";var b=new i.default(y(y({},p),{},{store:g.default}));v(b).$mount();var w=b},4862:function(){},5569:function(){}},function(e){e.O(0,["common/vendor"],(function(){return t=9683,e(e.s=t);var t})),e.O()}]); 
 			}); 	require("pages/my/index.js");
 		__wxRoute = 'pages/placeOrder/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/placeOrder/index.js';	define("pages/placeOrder/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["pages/placeOrder/index"],{8338:function(t,e,i){i.r(e),i.d(e,{default:function(){return o}});var n=i(9510),a=i(7039).default,r={data:function(){return{RankingTop:0,user:{hm_uid:""},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],RankingList:[],cont:"",active:0,time:"",backLock:!1,place_order:{fxOrderConfig:[],order_show_rank_status:!1},max_id:"",total_money:"0",total_count:0,total:0,notTips:!1,imageList:[],list:[],share:{}}},created:function(){var t=this,e=getCurrentPages().length;this.backLock=1!=e,a.$on("refreshbwcPhone",(function(){t.getConfig(),t.getUserInfo(),t.getRewardInfo()})),this.$utils.hasLogin()&&(this.getConfig(),this.getList(),this.getRewardInfo())},onReachBottom:function(){1==this.active&&""!=this.max_id&&this.getList()},methods:{scrollTo:function(){a.pageScrollTo({scrollTop:this.RankingTop,duration:300})},getRewardInfo:function(){var t=this;this.$http.getOrderRank().then((function(e){200==e.code&&(t.RankingList=e.data.list,t.$nextTick((function(){var e=a.getSystemInfoSync();a.createSelectorQuery().in(t).select(".RankingList").boundingClientRect((function(i){i&&i.top?t.RankingTop=i.top-(e.navigationBarHeight||0)-e.statusBarHeight:t.RankingTop=1e3,console.log(t.RankingTop)})).exec()})))}))},getUserInfo:function(){var t=this;this.$http.getUserInfo().then((function(e){200==e.code&&(t.user=e.data.user,t.getShareInfo())}))},getShareInfo:function(){var t=this;this.$common.getSharePath().then((function(e){console.log(e,"分享配置"),t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return a.hideShareMenu(),!1;if(2==t.shareSwitch){var i=t.extend.filter((function(t){return"44"==t.index}));if(0==i.length||"1"!=i[0].switch)return void a.hideShareMenu();e=i[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(i){t.shareTitle=i.shareTitle,t.shareUrl=i.shareUrl,1==t.shareSwitch&&t.pathList.includes("44")||2==t.shareSwitch&&e?a.showShareMenu():a.hideShareMenu()}))}))},switchTab:function(t){this.$utils.handleLoginNav()||(this.active=t,1==t&&(this.max_id="",this.list=[],this.getList()))},getConfig:function(){var t=this;this.$http.getInviteConfig().then((function(e){200==e.code&&e.data.place_order&&(t.place_order=e.data.place_order,t.total=0,t.place_order.fxOrderConfig.forEach((function(e){t.total=parseInt(t.total+1e4*e.superior_reward_money+.5)})),t.total=t.total/1e4,t.cont=t.place_order.description,t.cont=t.cont.replace(/\n/g,"<br />"),t.time=2==t.place_order.date_type?t.place_order.start_time.substring(0,10)+"~"+t.place_order.end_time.substring(0,10):"长期有效")}))},sharePage:function(){this.$utils.handleLoginNav()||a.navigateTo({url:"/pages/myPoster/index"})},getList:function(){var t=this;this.$http.getOrderInviteRecord({max_id:this.max_id}).then((function(e){console.log(e.data,"邀请列表"),200==e.code&&(t.imageList=[],0!=e.data.list.length&&(t.total_money=e.data.total_money,t.total_count=e.data.total_count),t.list=[].concat((0,n.default)(t.list),(0,n.default)(e.data.list)),0!=t.list.length?(t.max_id=t.list[t.list.length-1].id,t.list.forEach((function(e){t.imageList.length<5&&t.imageList.push(e.headimgurl)})),t.notTips=!1):t.notTips=!0)}))}},onShareAppMessage:function(t){var e;return e=a.getStorageSync("isScenes")?"/pages/placeOrder/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/placeOrder/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onShareTimeline:function(t){var e;return e=a.getStorageSync("isScenes")?"/pages/placeOrder/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/placeOrder/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onLoad:function(){this.$utils.hasLogin()&&this.getUserInfo()}},s=i(2932),o=(0,(i.n(s)(),i(9453)).default)(r,(function(){var t=this,e=(t.$createElement,t._self._c,t.place_order.fxOrderConfig.length),i=0!=t.imageList.length||t.place_order.order_show_rank_status&&0!=t.RankingList.length,n=i?t.place_order.order_show_rank_status&&0!=t.RankingList.length:null,a=t.place_order.order_show_rank_status&&0!=t.RankingList.length;t.$mp.data=Object.assign({},{$root:{g0:e,g1:i,g2:n,g3:a}})}),[],!1,null,"4c063932",null,!1,void 0,void 0).exports},259:function(t,e,i){i.r(e),i(5476);var n=i(8338),a=i(8793).default,r=i(7039).createPage;a.__webpack_require_UNI_MP_PLUGIN__=i,r(n.default)},2932:function(){}},function(t){t.O(0,["common/vendor"],(function(){return e=259,t(t.s=e);var e})),t.O()}]); 
 			}); 	require("pages/placeOrder/index.js");
 		__wxRoute = 'pages/myFans/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/myFans/index.js';	define("pages/myFans/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["pages/myFans/index"],{4183:function(e,t,s){s.r(t),s.d(t,{default:function(){return l}});var a=s(7039).default,i={data:function(){return{backLock:!1,list:[],notYetData:!1,searchForm:{type:"direct",nickname:"",max_id:0,level:0},usertype:[{name:"直邀用户",value:"direct"},{name:"间邀用户",value:"indirect"}],userlevel:[],newuser:{today:0,yesterday:0,month:0},hasNextPage:!0,userinfo:null,show_type:0,show_update:2,show_tutor:0,bgColor:"",show_level:!1}},created:function(){var e=this,t=getCurrentPages().length;this.backLock=1!=t,a.$on("refreshbwcPhone",(function(){e.initPage()})),this.$utils.hasLogin()&&this.initPage()},methods:{initPage:function(){this.getShowConfig()},getUserNextLevel:function(){for(var e=0;e<this.userlevel.length;e++)if((this.userinfo.level||this.userinfo.level_info&&this.userinfo.level_info.level)==this.userlevel[e].value){this.userlevel[e+1]&&(this.userinfo.next_level=this.userlevel[e+1].value);break}},getShowConfig:function(){var e=this;this.$globalData.GET("systemconfig")?(this.show_type=this.$globalData.GET("systemconfig").my_friends_template||0,this.show_update=this.$globalData.GET("systemconfig").member_rights||2,this.show_tutor=this.$globalData.GET("systemconfig").my_superior||0,1==this.$globalData.GET("systemconfig").personal_background_status?this.bgColor=this.$globalData.GET("systemconfig").personal_background_color||"#FE2B22":this.bgColor="#FE2B22",this.getLevelInfo()):this.$http.getExamineStatus().then((function(t){200==t.code&&(e.$globalData.SET("systemconfig",t.data),e.show_type=t.data.my_friends_template||0,e.show_update=t.data.member_rights||2,e.show_tutor=t.data.my_superior||0,1==t.data.personal_background_status?e.bgColor=t.data.personal_background_color||"#FE2B22":e.bgColor="#FE2B22",e.getLevelInfo())}))},getLevelInfo:function(){var e=this;this.$globalData.GET("memberbenefits")?(this.$globalData.GET("memberbenefits").userlevel&&(this.userlevel=[{name:"全部人数",value:0,num:0}].concat((this.$globalData.GET("memberbenefits").userlevel||[]).map((function(e){return{name:e.describe,value:e.level,num:0}}))),1==this.$globalData.GET("systemconfig").member_rights&&this.userlevel.length&&(this.show_level=!0)),1==this.show_type&&(this.$globalData.GET("memberbenefits").userinfo?(this.userinfo=this.$globalData.GET("memberbenefits").userinfo,this.userinfo.level&&this.userinfo.level>1&&1==this.$globalData.GET("systemconfig").member_rights&&this.usertype.push({name:"团队用户",value:"team"}),this.getUserNextLevel()):this.getUserInfo()),this.getList()):this.$http.getUserLevel().then((function(t){200==t.code&&(e.$globalData.SET("memberbenefits",t.data.user_info,"userinfo"),e.$globalData.SET("memberbenefits",t.data.user_level,"userlevel"),t.data.user_level&&(e.userlevel=[{name:"全部人数",value:0,num:0}].concat((e.$globalData.GET("memberbenefits").userlevel||[]).map((function(e){return{name:e.describe,value:e.level,num:0}}))),1==e.$globalData.GET("systemconfig").member_rights&&e.userlevel.length&&(e.show_level=!0)),1==e.show_type&&(t.data.user_info?(e.userinfo=t.data.user_info,e.userinfo.level&&e.userinfo.level>1&&1==e.$globalData.GET("systemconfig").member_rights&&e.usertype.push({name:"团队用户",value:"team"}),e.getUserNextLevel()):e.getUserInfo()),e.getList())}))},getUserInfo:function(){var e=this;this.$globalData.GET("home")&&this.$globalData.GET("home").userInfo?(this.userinfo=this.$globalData.GET("home").userInfo,this.userinfo.level_info&&this.userinfo.level_info.level>1&&1==this.$globalData.GET("systemconfig").member_rights&&this.usertype.push({name:"团队用户",value:"team"})):this.$http.userInfo().then((function(t){t&&200==t.code&&(e.userinfo=t.data,e.$globalData.SET("home",t.data,"userInfo"),e.userinfo.level_info&&e.userinfo.level_info.level>1&&1==e.$globalData.GET("systemconfig").member_rights&&e.usertype.push({name:"团队用户",value:"team"}))}))},navMemberBenefitsUpdate:function(){a.navigateTo({url:"/subpackage/grade/index"})},navMemberBenefits:function(){1==this.show_update?a.navigateTo({url:"/subpackage/grade/index"}):console.log("隐藏会员权益，不做跳转")},navToMyTutor:function(){a.navigateTo({url:"/subpackage/myTutor/index"})},jumpOrder:function(e){a.navigateTo({url:"/pages/myOrder/index?order_hm_uid="+e.uid+"&type=2&business_id=74"})},navToDetail:function(e){console.log("navigate to detail",e),a.navigateTo({url:"/subpackage/myFans/detail/index?uid="+e.uid})},search:function(){this.$utils.handleLoginNav()||(this.hasNextPage=!0,this.list=[],this.searchForm.max_id=0,this.getList())},changeUserLevel:function(e){e.value!=this.searchForm.level&&(this.hasNextPage=!0,this.searchForm.level=e.value,this.list=[],this.searchForm.max_id=0,this.getList())},changeUserType:function(e){this.$utils.handleLoginNav()||e.value!=this.searchForm.type&&(this.hasNextPage=!0,this.searchForm.type=e.value,this.list=[],this.searchForm.max_id=0,this.getList())},getList:function(){var e=this;this.hasNextPage&&(a.showLoading(),this.$http.getFriends(this.searchForm).then((function(t){200==t.code?(t.data.friends_list&&t.data.friends_list.length&&(e.list.length?e.list=e.list.concat(t.data.friends_list):e.list=t.data.friends_list,t.data.friends_list.length?e.searchForm.max_id=e.list[e.list.length-1].created_time:(e.searchForm.max_id=0,e.hasNextPage=!1)),e.newuser=t.data.time_statistics,e.userlevel.forEach((function(e){for(var s=0;s<t.data.level_statistics.length;s++)t.data.level_statistics[s].level==e.value&&(e.num=t.data.level_statistics[s].users)})),a.hideLoading()):a.hideLoading()})).catch((function(){a.hideLoading()})))},pullUp:function(){this.page=1,this.getList(this.list[this.list.length-1].id,2)}},onReachBottom:function(){this.page=1,this.getList(this.list[this.list.length-1].id,2)}},n=s(1410),l=(0,(s.n(n)(),s(9453)).default)(i,(function(){var e=this,t=(e.$createElement,e._self._c,e.list.length);e.$mp.data=Object.assign({},{$root:{g0:t}})}),[],!1,null,"16d9cfc4",null,!1,void 0,void 0).exports},1990:function(e,t,s){s.r(t),s(5476);var a=s(4183),i=s(8793).default,n=s(7039).createPage;i.__webpack_require_UNI_MP_PLUGIN__=s,n(a.default)},1410:function(){}},function(e){e.O(0,["common/vendor"],(function(){return t=1990,e(e.s=t);var t})),e.O()}]); 
 			}); 	require("pages/myFans/index.js");
 		__wxRoute = 'pages/myOrder/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/myOrder/index.js';	define("pages/myOrder/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["pages/myOrder/index"],{6272:function(t,e,i){i.r(e),i.d(e,{default:function(){return r}});var s=i(7039).default,o=i(8793).default,n={data:function(){return{order_hm_uid:0,navHeight:0,orderList:[],total:!1,notYetData:!1,slotLock:!1,timeSlotId:0,lodTimeSlotId:"",type:2,myOrderType:1,orderState:-1,businessList:[],scrollTop:0,backLock:!1,doukeTypeList:[{name:"全部",id:-1},{name:"已支付",id:2},{name:"已结算",id:3},{name:"已失效",id:1}],bgColor:"#fff",my_order_template:1,totleNum:"",page:1}},props:{hometype:{default:function(){return""}}},watch:{hometype:function(t){console.log(t,"-*-*-"),this.type=t},timeSlotId:function(t,e){this.slotLock&&(this.lodTimeSlotId=e)}},onPullDownRefresh:function(){this.page=1,this.getList("",2)},onPageScroll:function(t){this.scrollTop=t.scrollTop},onLoad:function(t){console.log(t,"-*-*-*-"),this.my_order_template=0,t&&(this.type=t.type,2==t.type&&t.business_id&&(this.timeSlotId=t.business_id,this.order_hm_uid=t.order_hm_uid)),s.setNavigationBarTitle({title:2==this.type?"团队订单":"我的订单"});var e=getCurrentPages().length;this.backLock=1!=e,this.$utils.hasLogin()&&this.getList()},created:function(){var t=this,e=o.getMenuButtonBoundingClientRect();o.getSystemInfo({success:function(i){var s=i.statusBarHeight,o=s+e.height+2*(e.top-s);t.navHeight=o}}),s.$on("refreshbwcPhone",(function(){t.getList(),t.getBusinessList()})),this.hometype&&(this.type=this.hometype,s.setNavigationBarTitle({title:2==this.type?"团队订单":"我的订单"})),this.$utils.hasLogin()&&this.getBusinessList()},onReachBottom:function(){if(this.page++,!(this.$refs.loadMore.loadLock||this.orderList.length<1)){if(this.total)return this.$refs.loadMore.no();this.$refs.loadMore.open(),this.getList(this.orderList[this.orderList.length-1].id)}},methods:{pullUp:function(t){this.type=t,this.page=1,this.getList(this.orderList[this.orderList.length-1].id,2)},screen:function(){this.$utils.handleLoginNav()||(this.slotLock=!0)},copyOrderCode:function(t){s.setClipboardData({data:t,success:function(){s.showToast({title:"复制成功",duration:2e3})}})},getNavHeight:function(t){this.navHeight=t},setTimeSlotId:function(t){this.timeSlotId=t},getList:function(t,e){var i=this;this.$utils.hasLogin()&&1==this.myOrderType&&(console.log(this.type,this.timeSlotId,this.order_hm_uid,"传参"),this.$http.newOrderList({type:this.type,business_id:this.timeSlotId,order_hm_uid:this.order_hm_uid,order_status:this.orderState,max_id:t||""}).then((function(o){e&&(s.hideLoading(),2==e&&s.stopPullDownRefresh()),200==o.code&&(t?(o.data.list.length<1?(i.$refs.loadMore.no(),i.total=!0):i.orderList=i.orderList.concat(o.data.list),i.$refs.loadMore.close()):(o.data.list.length<1?i.notYetData=!0:i.notYetData=!1,i.orderList=o.data.list))})))},getBusinessList:function(){var t=this;this.$http.getBusinessName().then((function(e){200==e.code&&(t.businessList=e.data)}))},businessQuery:function(){this.lodTimeSlotId="",this.slotLock=!1,s.showLoading({title:"加载中"}),this.notYetData=!1,this.$refs.loadMore.closeNo(),this.getList("",1)},listType:function(t){this.$utils.handleLoginNav()||this.orderState!=t&&(this.orderState=t,this.notYetData=!1,this.$refs.loadMore.closeNo(),this.getList("",1))},hide:function(){this.slotLock=!1,(this.lodTimeSlotId||0===this.lodTimeSlotId)&&(this.timeSlotId=this.lodTimeSlotId,this.lodTimeSlotId="")}}},h=i(3448),r=(0,(i.n(h)(),i(9453)).default)(n,(function(){var t=this;t.$createElement;t._self._c,t._isMounted||(t.e0=function(e){t.timeSlotId=0})}),[],!1,null,"4907f55e",null,!1,void 0,void 0).exports},1229:function(t,e,i){i.r(e),i(5476);var s=i(6272),o=i(8793).default,n=i(7039).createPage;o.__webpack_require_UNI_MP_PLUGIN__=i,n(s.default)},3448:function(){}},function(t){t.O(0,["common/vendor"],(function(){return e=1229,t(t.s=e);var e})),t.O()}]); 
 			}); 	require("pages/myOrder/index.js");
 		__wxRoute = 'pages/pullNewActivity/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/pullNewActivity/index.js';	define("pages/pullNewActivity/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["pages/pullNewActivity/index"],{6210:function(t,e,i){i.r(e),i.d(e,{default:function(){return h}});var n=i(9510),s=i(7039).default,a={data:function(){return{user:{hm_uid:""},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],RankingList:[],cont:"",active:0,invite:{},time:"",list:[],max_id:"",total_money:"0",total_count:0,notTips:!1,imageList:[],rankList:[],backLock:!1,share:{}}},created:function(){var t=this,e=getCurrentPages().length;this.backLock=1!=e,s.$on("refreshbwcPhone",(function(){t.getConfig(),t.getUserInfo()})),this.$utils.hasLogin()&&(this.getConfig(),this.getList(),this.getRewardInfo())},onReachBottom:function(){1==this.active&&""!=this.max_id&&this.getList()},methods:{scrollTo:function(){s.pageScrollTo({scrollTop:this.RankingTop,duration:300})},getUserInfo:function(){var t=this;this.$http.getUserInfo().then((function(e){200==e.code&&(t.user=e.data.user,t.getShareInfo())}))},getShareInfo:function(){var t=this;this.$common.getSharePath().then((function(e){console.log(e,"分享配置"),t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return s.hideShareMenu(),!1;if(2==t.shareSwitch){var i=t.extend.filter((function(t){return"45"==t.index}));if(0==i.length||"1"!=i[0].switch)return void s.hideShareMenu();e=i[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(i){t.shareTitle=i.shareTitle,t.shareUrl=i.shareUrl,1==t.shareSwitch&&t.pathList.includes("45")||2==t.shareSwitch&&e?s.showShareMenu():s.hideShareMenu()}))}))},getRewardInfo:function(){var t=this;this.$http.getRewardInfo().then((function(e){200==e.code&&(t.RankingList=e.data.list,t.$nextTick((function(){var e=s.getSystemInfoSync();s.createSelectorQuery().in(t).select(".RankingList").boundingClientRect((function(i){i&&i.top?t.RankingTop=i.top-(e.navigationBarHeight||0)-e.statusBarHeight:t.RankingTop=1e3,console.log(t.RankingTop)})).exec()})))}))},switchTab:function(t){this.$utils.handleLoginNav()||(this.active=t,1==this.active&&(this.max_id="",this.list=[],this.getList()))},getConfig:function(){var t=this;this.$http.getInviteConfig().then((function(e){200==e.code&&e.data.invite&&(t.invite=e.data.invite,t.cont=t.invite.description,t.cont=t.cont.replace(/\n/g,"<br />"),t.time=2==t.invite.date_type?t.invite.start_time.substring(0,10)+"~"+t.invite.end_time.substring(0,10):"长期有效")}))},sharePage:function(){this.$utils.handleLoginNav()||s.navigateTo({url:"/pages/myPoster/index"})},getList:function(){var t=this;this.$http.getInviteRecord({max_id:this.max_id}).then((function(e){console.log(e,"邀请列表"),200==e.code&&(t.imageList=[],0!=e.data.list.length&&(t.total_money=e.data.total_money,t.total_count=e.data.total_count),t.list=[].concat((0,n.default)(t.list),(0,n.default)(e.data.list)),0!=t.list.length?(t.max_id=t.list[t.list.length-1].id,t.list.forEach((function(e,i){i<5&&t.imageList.push(e.headimgurl)})),t.notTips=!1):t.notTips=!0)}))}},onShareAppMessage:function(t){var e;return e=s.getStorageSync("isScenes")?"/pages/pullNewActivity/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/pullNewActivity/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onShareTimeline:function(t){var e;return e=s.getStorageSync("isScenes")?"/pages/pullNewActivity/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/pullNewActivity/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onLoad:function(){this.$utils.hasLogin()&&this.getUserInfo()}},o=i(3957),h=(0,(i.n(o)(),i(9453)).default)(a,(function(){var t=this,e=(t.$createElement,t._self._c,0!=t.imageList.length||t.invite.show_rank_status&&0!=t.RankingList.length),i=e?t.invite.show_rank_status&&0!=t.RankingList.length:null,n=t.invite.show_rank_status&&0!=t.RankingList.length;t.$mp.data=Object.assign({},{$root:{g0:e,g1:i,g2:n}})}),[],!1,null,"105310f4",null,!1,void 0,void 0).exports},5801:function(t,e,i){i.r(e),i(5476);var n=i(6210),s=i(8793).default,a=i(7039).createPage;s.__webpack_require_UNI_MP_PLUGIN__=i,a(n.default)},3957:function(){}},function(t){t.O(0,["common/vendor"],(function(){return e=5801,t(t.s=e);var e})),t.O()}]); 
 			}); 	require("pages/pullNewActivity/index.js");
 		__wxRoute = 'pages/myPoster/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/myPoster/index.js';	define("pages/myPoster/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["pages/myPoster/index"],{2072:function(t,e,a){a.r(e),a.d(e,{default:function(){return r}});var i=a(7039).default,s=a(7256),o={data:function(){return{user:{hm_uid:""},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],backLock:!1,indicatorDots:!0,duration:500,list:[],qrcode:"",qrcodeLink:"",current:0,rpx:0,headPortrait:"",fullPosterList:[],headimgurlStatus:!0,authorizer_type:1,invite_code:"",invite_code_status:0,posterList:[],posterListHasHead:[],nick_name:"",head_img:"",share:{},shareData:{},safeBottom:0}},created:function(){var t=this;setTimeout((function(){var e=i.getSystemInfoSync();t.safeBottom=e.safeAreaInsets.bottom}),100);var e=getCurrentPages().length;this.backLock=1!=e,i.$on("refreshbwcPhone",(function(){t.getUserInfoA(),t.getPosterConfig(),t.$globalData.GET("home")&&t.$globalData.GET("home").userInfo&&(t.headPortrait=t.$globalData.GET("home").userInfo.headimgurl,t.invite_code=t.$globalData.GET("home").userInfo.invite_code,t.invite_code_status=t.$globalData.GET("home").userInfo.invite_code_status),t.headimgurlStatus&&t.posterListHasHead.length?t.fullPosterList=t.posterListHasHead:!t.headimgurlStatus&&t.posterList.length?t.fullPosterList=t.posterList:(t.getList(),t.getInfo(),t.$globalData.GET("home")&&t.$globalData.GET("home").userInfo?t.getCode():t.getUserInfo())})),this.$utils.hasLogin()&&(this.$globalData.GET("home")&&this.$globalData.GET("home").userInfo&&(this.headPortrait=this.$globalData.GET("home").userInfo.headimgurl,this.invite_code=this.$globalData.GET("home").userInfo.invite_code,this.invite_code_status=this.$globalData.GET("home").userInfo.invite_code_status),this.headimgurlStatus&&this.posterListHasHead.length?this.fullPosterList=this.posterListHasHead:!this.headimgurlStatus&&this.posterList.length?this.fullPosterList=this.posterList:(this.getList(),this.getInfo(),this.$globalData.GET("home")&&this.$globalData.GET("home").userInfo?this.getCode():this.getUserInfo()))},methods:{changeShareCodeName:function(t){return 0==t?"公众号二维码":1==t?"H5二维码":"小程序码"},getPosterConfig:function(){var t=this;return this.$http.getPosterConfig().then((function(e){if(200==e.code){var a=e.data;t.shareData=a||{},0!=t.shareData.jump_page_type&&1!=t.shareData.jump_page_type||t.createShareQrcode()}}))},getUserInfoA:function(){var t=this;this.$http.getUserInfo().then((function(e){200==e.code&&(t.user=e.data.user,t.getShareInfo())}))},getShareInfo:function(){var t=this;this.$common.getSharePath().then((function(e){console.log(e,"分享配置"),t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return i.hideShareMenu(),!1;if(2==t.shareSwitch){var a=t.extend.filter((function(t){return"47"==t.index}));if(0==a.length||"1"!=a[0].switch)return void i.hideShareMenu();e=a[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(a){t.shareTitle=a.shareTitle,t.shareUrl=a.shareUrl,1==t.shareSwitch&&t.pathList.includes("47")||2==t.shareSwitch&&e?i.showShareMenu():i.hideShareMenu()}))}))},login:function(){this.$utils.handleLoginNav()},time:function(t){var e=Date.parse(t),a=Date.parse(new Date)-e,i=36e5,s=24*i,o=30*s,n="";return a<s?n=parseInt(a/i)+"小时前":a<o&&a>s?n=parseInt(a/s)+"天前":(n=parseInt(a/o))>12?n="1年以前":n+="月前",n},copyDescription:function(){if(!this.list[this.current].description)return i.showToast({title:"暂无可复制文案",icon:"none",duration:2e3});i.setClipboardData({data:this.list[this.current].description,showToast:!0,success:function(t){},complete:function(t){console.log("复制完成")}}),this.addNum()},addNum:function(){this.$http.getPoserScan({poster_id:this.list[this.current].id}).then((function(t){console.log(t,"-----")}))},copyText:function(t){this.$utils.handleLoginNav()||i.setClipboardData({data:t,showToast:!0,success:function(t){},complete:function(t){console.log("复制完成")}})},getInfo:function(){var t=this;this.$http.getShareInfo({}).then((function(e){e&&200==e.code&&(t.head_img=e.data.head_img,t.nick_name=e.data.nick_name)}))},getUserInfo:function(){var t=this;this.$http.userInfo().then((function(e){e&&200==e.code&&(t.headPortrait=e.data.headimgurl,t.invite_code=e.data.invite_code,t.invite_code_status=e.data.invite_code_status,t.$globalData.SET("home",e.data,"userInfo"),t.getCode())}))},getList:function(){var t=this;this.$http.posterList({}).then((function(e){e&&200==e.code&&(t.list=e.data)}))},handleUpdateCode:function(t){this.headimgurlStatus=t,t&&this.posterListHasHead.length?this.fullPosterList=this.posterListHasHead:!t&&this.posterList.length?this.fullPosterList=this.posterList:(this.fullPosterList=t?this.posterListHasHead:this.posterList,this.createQrCode(this.qrcodeLink,"qrcode",168,168))},getCode:function(){var t=this;this.$http.popularize({}).then((function(e){200==e.code&&(t.authorizer_type=e.data.authorizer_type,t.qrcodeLink=e.data.qrcode,t.invite_code=e.data.invite_code,t.handleUpdateCode(!1))}))},chage:function(t){this.current=t.detail.current},drawHeadImg:function(t,e,a,s){var o=this,n=this;i.getImageInfo({src:n.headPortrait,success:function(a){var s=i.createCanvasContext(e,o);s.drawImage(t,0,0,164,164),s.drawImage(a.path,68,68,28,28),s.draw(!1,(function(){i.canvasToTempFilePath({canvasId:e,quality:1,success:function(t){n.list.forEach((function(e,a){n.draw(t.tempFilePath,a)}))}},o)}))},fail:function(t){i.showToast({title:"微信头像解析失败",icon:"none",duration:2e3})}})},createShareQrcode:function(){var t=this;s({width:164,height:164,x:8,y:8,correctLevel:3,canvasId:"qrcode",text:t.shareData.qr_code,callback:function(){setTimeout((function(){i.canvasToTempFilePath({canvasId:"qrcode",quality:1,success:function(e){t.shareData.qr_code=e.tempFilePath}})}),160)}})},createQrCode:function(t,e,a,o){var n=this,r=this;1==r.authorizer_type?s({_this:this,width:148,height:148,x:8,y:8,correctLevel:3,canvasId:e,text:t,callback:function(){setTimeout((function(){i.canvasToTempFilePath({canvasId:e,quality:1,success:function(t){r.qrcode=t.tempFilePath,r.headimgurlStatus?r.drawHeadImg(t.tempFilePath,e,a,o):r.list.forEach((function(t,e){r.draw(r.qrcode,e)}))}},n)}),160)}}):i.getImageInfo({src:t,success:function(t){r.qrcode=t.path,r.headimgurlStatus?r.drawHeadImg(t.path,e,a,o):r.list.forEach((function(e,a){r.draw(t.path,a)}))}})},preserveImg:function(t){var e;e="poster"===t?this.fullPosterList[this.current]:this.shareData.qr_code,i.getImageInfo({src:e,success:function(t){console.log(t,"下载"),i.saveImageToPhotosAlbum({filePath:t.path,success:function(t){i.showToast({title:"保存成功",icon:"success",duration:2e3})},fail:function(t){console.log(t,"---失败")}})}})},draw:function(t,e){var a=this,s=i.createCanvasContext("firstCanvas"+e,this),o=this;i.getImageInfo({src:o.list[e].src,success:function(n){if(s.drawImage(n.path,0,0,456,812),1==a.invite_code_status){s.setFontSize(16),s.fontWeight="700";var r=s.measureText("邀请码："+a.invite_code).width;s.fillStyle="white",s.lineWidth=1;var h=216-r/2,c=536,u=r+24,l=14;s.beginPath(),s.moveTo(h,550),s.arc(h+l,550,l,Math.PI,3*Math.PI/2),s.lineTo(h+u-l,c),s.arc(h+u-l,550,l,3*Math.PI/2,2*Math.PI),s.lineTo(h+u,557),s.arc(h+u-l,557,l,0,Math.PI/2),s.lineTo(h+l,571),s.arc(h+l,557,l,Math.PI/2,Math.PI),s.lineTo(h,550),s.closePath(),s.fill()}if(s.rect(138,582,180,180),s.setFillStyle("white"),s.fill(),s.drawImage(t,146,590,164,164),1==a.invite_code_status){s.setFontSize(16),s.fontWeight="700";var d=s.measureText("邀请码："+a.invite_code).width;s.fillStyle="#282828",s.setTextBaseline("top"),s.fillText("邀请码："+a.invite_code,(456-d)/2,546)}s.draw(!1,(function(){i.canvasToTempFilePath({canvasId:"firstCanvas"+e,quality:1,success:function(t){o.$set(o.fullPosterList,e,t.tempFilePath),o.list.length}},a)}))}})}},onShareAppMessage:function(t){var e;return e=i.getStorageSync("isScenes")?"/pages/myPoster/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/myPoster/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onShareTimeline:function(t){var e;return e=i.getStorageSync("isScenes")?"/pages/myPoster/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/myPoster/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:e,imageUrl:this.shareUrl}},onLoad:function(){this.$utils.hasLogin()&&(this.getUserInfoA(),this.getPosterConfig())}},n=a(5557),r=(0,(a.n(n)(),a(9453)).default)(o,(function(){var t=this,e=(t.$createElement,t._self._c,t.list.length),a=0!=e?t.time(t.list[t.current].create_time):null,i=0!=e?t.shareData&&Object.keys(t.shareData).length>0:null,s=0!=e&&i&&t.shareData.qr_code?t.changeShareCodeName(t.shareData.jump_page_type):null;t.$mp.data=Object.assign({},{$root:{g0:e,m0:a,g1:i,m1:s}})}),[],!1,null,"61d1eb36",null,!1,void 0,void 0).exports},896:function(t,e,a){a.r(e),a(5476);var i=a(2072),s=a(8793).default,o=a(7039).createPage;s.__webpack_require_UNI_MP_PLUGIN__=a,o(i.default)},5557:function(){}},function(t){t.O(0,["common/vendor"],(function(){return e=896,t(t.s=e);var e})),t.O()}]); 
 			}); 	require("pages/myPoster/index.js");
 		__wxRoute = 'pages/signReach/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/signReach/index.js';	define("pages/signReach/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["pages/signReach/index"],{5204:function(e,t,n){n.r(t),n.d(t,{default:function(){return a}});var i=n(7039).default,s=n(8793).default,o={components:{templateOne:function(){n.e("pages/signReach/components/templateOne/index").then(function(){return resolve(n(3266))}.bind(null,n)).catch(n.oe)},templateTwo:function(){n.e("pages/signReach/components/templateTwo/index").then(function(){return resolve(n(7704))}.bind(null,n)).catch(n.oe)}},data:function(){return{user:{hm_uid:""},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],isLogin:!1,backLock:!1,configInfo:{checkin:{skin:0,status:1},user:{}},phone:"",cardIndex:0,msgRemindLock:!0,pageLock:!1,navHeight:0,score:0,share:{}}},computed:{templateOneActive:function(){return 1==this.configInfo.checkin.skin&&this.configInfo.checkin.status&&this.pageLock},templateTwoActive:function(){return 2==this.configInfo.checkin.skin&&this.configInfo.checkin.status&&this.pageLock}},created:function(){var e=this,t=getCurrentPages().length;if(this.backLock=1!=t,i.$on("refreshbwcPhone",(function(){e.getConfig(),e.getUserInfo()})),!this.$utils.hasLogin())return this.isLogin=!0,!1;this.isLogin=!1,i.getStorageSync("bwcphone")&&(this.phone=i.getStorageSync("bwcphone")),this.getConfig()},methods:{getUserInfo:function(){var e=this;this.$http.getUserInfo().then((function(t){200==t.code&&(e.user=t.data.user,e.getShareInfo())}))},getShareInfo:function(){var e=this;this.$common.getSharePath().then((function(t){console.log(t,"分享配置"),e.switchType=t.switch,e.pathList=t.share_index,e.shareSwitch=t.share_switch,e.extend=t.extend})).then((function(){var t=0;if(0==e.switchType)return!1;if(2==e.shareSwitch){var n=e.extend.filter((function(e){return"50"==e.index}));if(0==n.length||"1"!=n[0].switch)return void i.hideShareMenu();t=n[0].template_id}e.$common.getShareInfo({templateId:t,shareSwitch:e.shareSwitch}).then((function(n){e.shareTitle=n.shareTitle,e.shareUrl=n.shareUrl,1==e.shareSwitch&&e.pathList.includes("50")||2==e.shareSwitch&&t?i.showShareMenu():i.hideShareMenu()}))}))},login:function(){this.$utils.handleLoginNav()},getNavHeight:function(e){this.navHeight=e},elmMtQuery:function(e){0==e?this.getLinkInfo(1,e):1==e&&this.getLinkInfo(4,e)},getConfig:function(){var e=this;this.$http.checkinInfo({}).then((function(t){200==t.code&&(e.pageLock=!0,e.configInfo=t.data)}))},setMsgRemind:function(e,t){var n=this;if(this.msgRemindLock){10==e&&1==t&&s.getSetting({withSubscriptions:!0,success:function(e){e.subscriptionsSetting&&e.subscriptionsSetting.mainSwitch?s.requestSubscribeMessage({tmplIds:n.configInfo.checkin.remind_template_id.split(","),success:function(e){},fail:function(e){setTimeout((function(){i.showToast({title:"不正确的小程序模板消息id，"+e.errCode,icon:"none",duration:2500})}),200)}}):s.openSetting()},fail:function(){s.requestSubscribeMessage({tmplIds:n.configInfo.checkin.remind_template_id.split(","),success:function(e){},fail:function(e){setTimeout((function(){i.showToast({title:"不正确的小程序模板消息id，"+e.errCode,icon:"none",duration:2500})}),200)}})}}),this.msgRemindLock=!1;var o={};0==t?o.remind_hm=e+":00":o.remind_status=e,this.$http.setRemind(o).then((function(i){n.msgRemindLock=!0,200==i.code&&(0==t?n.configInfo.user.remind_hm=e:n.configInfo.user.remind_status=e)}))}},navLink:function(e){var t=this;this.configInfo.checkin.remind_mini_status&&10==this.configInfo.checkin.mode?s.getSetting({withSubscriptions:!0,success:function(n){n.subscriptionsSetting&&n.subscriptionsSetting.mainSwitch?t.sendMpTipsNews(e):s.openSetting()},fail:function(){t.sendMpTipsNews(e)}}):this.hitCard(e)},sendMpTipsNews:function(e){var t=this;s.requestSubscribeMessage({tmplIds:this.configInfo.checkin.remind_template_id.split(","),success:function(n){t.hitCard(e)},fail:function(e){setTimeout((function(){i.showToast({title:"不正确的小程序模板消息id，"+e.errCode,icon:"none",duration:2500})}),200)}})},hitCard:function(e){var t=this;if(0==e&&!this.$globalData.GET("mt"))return this.elmMtQuery(e);if(1==e&&!this.$globalData.GET("elm"))return this.elmMtQuery(e);i.hideLoading();var n;n=0==e?this.$globalData.GET("mt"):this.$globalData.GET("elm"),i.navigateToMiniProgram({appId:n.mini_appid,path:n.mini_path,success:function(n){1!=t.configInfo.user.is_checkin&&t.configInfo.checkin.status&&t.$http.checkin({type:0==e?10:20}).then((function(e){200==e.code&&(t.getConfig(),20==t.configInfo.checkin.mode&&(t.$refs.popup3.show(),t.score=e.data.score))}))}})},getLinkInfo:function(e,t){var n=this;this.$http.getShare({link_id:e,is_mini:1,is_mini_qrcode:1}).then((function(i){200==i.code&&(4==e?n.$globalData.SET("elm",i.data):n.$globalData.SET("mt",i.data),n.hitCard(t))}))},getPhone:function(e){var t=this;(e&&e.detail.encryptedData||this.phone)&&(this.phone?this.$refs.popup2.show():this.$http.getPhone({encryptedData:e.detail.encryptedData,iv:e.detail.iv}).then((function(e){if(200==e.code){if(!e.data.telphone)return i.showToast({title:"解密失败，请先移除小程序后重试！",icon:"none",duration:2e3});t.phone=e.data.telphone,i.setStorageSync("phone",t.phone),t.$refs.popup2.show()}})))},exchange:function(){var e=this;if(!this.configInfo.cards||!this.configInfo.cards[this.cardIndex])return i.showToast({title:"请选择兑换卡券",icon:"none",duration:2e3});this.$http.checkinExchange({telphone:this.phone,card_id:this.configInfo.cards[this.cardIndex].id}).then((function(t){200==t.code&&i.showToast({title:"兑换成功",icon:"none",duration:2e3}),e.$refs.popup2.hide(),setTimeout((function(){e.getConfig(),10==e.configInfo.checkin.kf_qr_status&&e.$refs.popup1.show(),i.removeStorageSync("phone"),e.phone=""}),2e3)}))},preserveCode:function(){var e=this;i.getImageInfo({src:this.configInfo.checkin.kf_qr_img,success:function(t){i.saveImageToPhotosAlbum({filePath:t.path,success:function(t){e.$refs.popup1.hide(),i.showToast({title:"保存成功",icon:"success",duration:2e3})}})}})},msgTips:function(){i.showToast({title:"你已兑换过卡券啦，如需帮助可联系公众号客服~",icon:"none",duration:3e3})},nav:function(){var e=getCurrentPages().length;console.log(e,"----"),1==e?i.redirectTo({url:"/pages/home/index?current=36"}):i.navigateBack({delta:1})}},onShareAppMessage:function(e){var t;return t=i.getStorageSync("isScenes")?"/pages/signReach/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/signReach/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:t,imageUrl:this.shareUrl}},onShareTimeline:function(e){var t;return t=i.getStorageSync("isScenes")?"/pages/signReach/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/signReach/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:t,imageUrl:this.shareUrl}},onLoad:function(){this.$utils.hasLogin()&&this.getUserInfo()}},c=n(391),a=(0,(n.n(c)(),n(9453)).default)(o,(function(){var e=this;e.$createElement;e._self._c,e._isMounted||(e.e0=function(t){return e.$refs.popup.show()},e.e1=function(t){return e.$refs.popup.show()},e.e2=function(t){return e.$refs.popup.hide()},e.e3=function(t){return e.$refs.popup1.hide()},e.e4=function(t,n){var i=arguments[arguments.length-1].currentTarget.dataset,s=i.eventParams||i["event-params"];n=s.index,e.cardIndex=n},e.e5=function(t){return e.$refs.popup2.hide()},e.e6=function(t){return e.$refs.popup3.hide()})}),[],!1,null,"648d1cf5",null,!1,void 0,void 0).exports},8077:function(e,t,n){n.r(t),n(5476);var i=n(5204),s=n(8793).default,o=n(7039).createPage;s.__webpack_require_UNI_MP_PLUGIN__=n,o(i.default)},391:function(){}},function(e){e.O(0,["common/vendor"],(function(){return t=8077,e(e.s=t);var t})),e.O()}]); 
 			}); 	require("pages/signReach/index.js");
 		__wxRoute = 'pages/pointsMall/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/pointsMall/index.js';	define("pages/pointsMall/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["pages/pointsMall/index"],{8657:function(t,e,n){n.r(e),n.d(e,{default:function(){return a}});var i=n(7039).default,s={data:function(){return{user:{hm_uid:""},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],notYetData:!1,delta:1,cardList:[],cashList:[],couponList:[],scrollTop:0,userInfo:{},keyword:"",bgColor:"#FE2B22",backLock:!1,share:{}}},onPageScroll:function(t){this.scrollTop=t.scrollTop},onLoad:function(t){var e=getCurrentPages().length;this.backLock=1!=e,t.delta&&(this.delta=t.delta),this.$utils.hasLogin()&&this.getUserInfo()},onShareAppMessage:function(){var t;return t=i.getStorageSync("isScenes")?"/subpackage/pointsMall/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/subpackage/pointsMall/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:t,imageUrl:this.shareUrl}},onShareTimeline:function(){var t;return t=i.getStorageSync("isScenes")?"/subpackage/pointsMall/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/subpackage/pointsMall/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:t,imageUrl:this.shareUrl}},created:function(){var t=this;i.$on("refreshbwcPhone",(function(e){t.init(),t.getUserInfo()})),i.$on("Updatepoints",(function(e){t.$common.getUserInfo().then((function(e){t.userInfo=e}))})),this.$utils.hasLogin()&&this.init()},methods:{getUserInfo:function(){var t=this;this.$http.getUserInfo().then((function(e){200==e.code&&(t.user=e.data.user,t.getShareInfo())}))},getShareInfo:function(){var t=this;this.$common.getSharePath().then((function(e){console.log(e,"分享配置"),t.switchType=e.switch,t.pathList=e.share_index,t.shareSwitch=e.share_switch,t.extend=e.extend})).then((function(){var e=0;if(0==t.switchType)return i.hideShareMenu(),!1;if(2==t.shareSwitch){var n=t.extend.filter((function(t){return"51"==t.index}));if(0==n.length||"1"!=n[0].switch)return void i.hideShareMenu();e=n[0].template_id}t.$common.getShareInfo({templateId:e,shareSwitch:t.shareSwitch}).then((function(n){t.shareTitle=n.shareTitle,t.shareUrl=n.shareUrl,1==t.shareSwitch&&t.pathList.includes("51")||2==t.shareSwitch&&e?i.showShareMenu():i.hideShareMenu()}))}))},init:function(){var t=this,e=this.getMyExchange(),n=this.getMoneyList(),i=this.getExpressCoupon();Promise.all([e,n,i]).then((function(e){t.cashList.length||t.cardList.length?t.notYetData=!1:t.notYetData=!0})),this.$common.getUserInfo().then((function(e){t.userInfo=e}))},getMoneyList:function(){var t=this;return new Promise((function(e){t.$http.moneyCardsList({keyword:t.keyword}).then((function(n){200==n.code&&(e(),t.cashList=n.data)}))}))},getMyExchange:function(){var t=this;return new Promise((function(e){t.$http.getMyExchange({keyword:t.keyword}).then((function(n){200==n.code&&(e(),t.cardList=n.data.categorys)}))}))},getExpressCoupon:function(){var t=this;return new Promise((function(e){t.$http.getExpressCoupon({keyword:t.keyword}).then((function(n){200==n.code&&(e(),t.couponList=n.data.categorys)}))}))},search:function(){if(!this.$utils.handleLoginNav()){if(!this.keyword)return i.showToast({title:"请输入关键字",icon:"none",duration:2e3});this.getMyExchange(),this.getExpressCoupon(),this.getMoneyList()}},reset:function(){this.keyword="",this.getMyExchange(),this.getExpressCoupon(),this.getMoneyList()},nav:function(t,e){this.$utils.handleLoginNav()||(0==t?this.$utils.navRouter("/subpackage/pointsMall/exchangeRecord/index"):1==t?this.$utils.navRouter("/subpackage/pointsMall/pointsExchange/index?id="+e.id+"&score="+e.score+"&item_type="+e.item_type+"&describe="+e.describe):2==t?this.$utils.navRouter("/subpackage/pointsMall/cashExchange/index?data="+JSON.stringify(e)):3==t&&this.$utils.navRouter("/subpackage/pointsMall/myIntegral/index"))}}},o=n(3927),a=(0,(n.n(o)(),n(9453)).default)(s,(function(){var t=this,e=(t.$createElement,t._self._c,t.cashList.length),n=t.cardList.length,i=t.couponList.length;t.$mp.data=Object.assign({},{$root:{g0:e,g1:n,g2:i}})}),[],!1,null,"0818cad3",null,!1,void 0,void 0).exports},3200:function(t,e,n){n.r(e),n(5476);var i=n(8657),s=n(8793).default,o=n(7039).createPage;s.__webpack_require_UNI_MP_PLUGIN__=n,o(i.default)},3927:function(){}},function(t){t.O(0,["common/vendor"],(function(){return e=3200,t(t.s=e);var e})),t.O()}]); 
 			}); 	require("pages/pointsMall/index.js");
 		__wxRoute = 'pages/luckDraw/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/luckDraw/index.js';	define("pages/luckDraw/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["pages/luckDraw/index"],{9910:function(e,t,i){i.r(t),i.d(t,{default:function(){return s}});var n=i(7039).default,o={data:function(){return{user:{hm_uid:""},shareTitle:"",shareUrl:"",switchType:"",pathList:[],shareSwitch:1,extend:[],backLock:!1,configInfo:{prizes:[]},prizeRecordList:[],userInfo:{},outstandingOrders:!1,index:-1,luckPosition:-1,luckDrawLock:!0,exchangeLock:!0,current:0,interval:5e3,duration:500,result:{},popupCallbackData:{},phone:"",code:"",share:{}}},created:function(){var e=this,t=getCurrentPages().length;this.backLock=1!=t,n.$on("refreshbwcPhone",(function(t){e.initPage(),e.getUserInfo()})),this.$utils.hasLogin()&&this.initPage()},methods:{getUserInfo:function(){var e=this;this.$http.getUserInfo().then((function(t){200==t.code&&(e.user=t.data.user,e.getShareInfo())}))},getShareInfo:function(){var e=this;this.$common.getSharePath().then((function(t){console.log(t,"分享配置"),e.switchType=t.switch,e.pathList=t.share_index,e.shareSwitch=t.share_switch,e.extend=t.extend})).then((function(){var t=0;if(0==e.switchType)return n.hideShareMenu(),!1;if(2==e.shareSwitch){var i=e.extend.filter((function(e){return"52"==e.index}));if(0==i.length||"1"!=i[0].switch)return void n.hideShareMenu();t=i[0].template_id}e.$common.getShareInfo({templateId:t,shareSwitch:e.shareSwitch}).then((function(i){e.shareTitle=i.shareTitle,e.shareUrl=i.shareUrl,1==e.shareSwitch&&e.pathList.includes("52")||2==e.shareSwitch&&t?n.showShareMenu():n.hideShareMenu()}))}))},rule:function(){this.$utils.handleLoginNav()||this.$refs.popup.show()},initPage:function(){var e=this;this.$common.getUserInfo().then((function(t){e.userInfo=t,e.getlotteryConfigInfo(),e.getPrizeRecord(),e.getNotExchangeOrder()}))},getlotteryConfigInfo:function(){var e=this;this.$http.getlotteryInfo().then((function(t){200==t.code&&(e.configInfo=t.data)}))},getPrizeRecord:function(){var e=this;this.$http.carousel().then((function(t){200==t.code&&(e.prizeRecordList=t.data.list)}))},getNotExchangeOrder:function(){var e=this;this.$http.notExchangeOrder().then((function(t){if(200==t.code)if(t.data.list.length){e.outstandingOrders=!0;var i={prize_type:20,img_url:t.data.list[0].img_url,name:t.data.list[0].card_name,other_id:t.data.list[0].other_id};e.popupCallbackData=i}else e.outstandingOrders=!1}))},getCurrent:function(e){this.current=e.detail.current},loadAnimation:function(){var e=this;if(!this.$utils.handleLoginNav())return this.userInfo.score<this.configInfo.consume_score?n.showToast({title:"当前积分不足，无法参与抽奖",icon:"none",duration:2e3}):this.configInfo.today_lotterycount>=this.configInfo.today_max_lotterycount?n.showToast({title:"已达每日参与上限，请明日再来！",icon:"none",duration:2e3}):void(this.luckDrawLock&&(this.luckDrawLock=!1,this.$http.start({plate_version:this.configInfo.plate_version}).then((function(t){if(200==t.code){e.configInfo.today_lotterycount+=1,n.$emit("getUserInfo",!0);var i=setInterval((function(){e.index++,e.index>7&&(e.index=0)}),100);setTimeout((function(){e.result=t.data,e.configInfo.prizes.forEach((function(i,n){t.data.id==i.id&&(e.luckPosition=n)})),e.stop(e.luckPosition,i)}),1500)}else e.luckDrawLock=!0,466==t.code&&e.getlotteryConfigInfo()}))))},stop:function(e,t){clearInterval(t);var i=this.index+1;this.stopLuck(e,i,0,20)},stopLuck:function(e,t){var i=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3?arguments[3]:void 0;setTimeout((function(){i.index=t,n<320||t!=e?(o++,n+=o,++t>7&&(t=0),i.stopLuck(e,t,n,o)):setTimeout((function(){i.luckDrawLock=!0,i.result.prize_type&&10!=i.result.prize_type&&i.getNotExchangeOrder(),i.popupCallback(1)}),1e3)}),n)},popupCallback:function(e){var t=this;if(3!=e||this.phone)if(0==e)this.$refs.popup.show();else if(1==e){var i={};if(i.img_url=this.result.prize_img,i.prize_type=this.result.prize_type,i.name=this.result.prize_name||this.configInfo.prizes[this.luckPosition].name,i.prize_type){var n={prize_name:i.name,nickname:this.userInfo.nickname};this.prizeRecordList.splice(this.current+1,0,n)}this.popupCallbackData=i,setTimeout((function(){t.$refs.popup1.show()}),200)}else 2==e?this.$refs.popup6.hide():3==e?this.$refs.popup6.show():4==e&&(this.$refs.popup1.hide(),this.$refs.popup7.show())},getPhone:function(e){var t=this;e&&e.detail.encryptedData&&this.$http.getPhone({encryptedData:e.detail.encryptedData,iv:e.detail.iv}).then((function(e){if(200==e.code){if(!e.data.telphone)return n.showToast({title:"解密失败，请先移除小程序后重试！",icon:"none",duration:2e3});t.phone=e.data.telphone,t.$refs.popup6.show()}}))},exchange:function(e,t){var i=this;this.exchangeLock&&(this.exchangeLock=!1,this.$http.otteryExchange({id:this.result.other_id||t.other_id,telphone:e}).then((function(e){i.exchangeLock=!0,200==e.code&&(i.phone="",n.removeStorageSync("phone"),i.getNotExchangeOrder(),i.popupCallback(2),200!=e.code&&410!=e.code||n.showToast({title:e.message,icon:"success",duration:2e3}),30!=i.result.prize_type&&30!=t.prize_type||(i.code=e.data.kf_qr_img,i.popupCallback(4)))})))},nav:function(){this.$utils.handleLoginNav()||this.$utils.navRouter("/subpackage/luckDraw/record/index")}},onShareAppMessage:function(e){var t;return t=n.getStorageSync("isScenes")?"/pages/luckDraw/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/luckDraw/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:t,imageUrl:this.shareUrl}},onShareTimeline:function(e){var t;return t=n.getStorageSync("isScenes")?"/pages/luckDraw/index?uid="+this.user.hm_uid+"&micro_scene="+this.$store.state.micro_scene:"/pages/luckDraw/index?uid="+this.user.hm_uid,{title:this.shareTitle,path:t,imageUrl:this.shareUrl}},onLoad:function(){this.$utils.hasLogin()&&this.getUserInfo()}},r=i(93),s=(0,(i.n(r)(),i(9453)).default)(o,(function(){var e=this;e.$createElement;e._self._c,e._isMounted||(e.e0=function(t){e.$refs.popup1.hide(),e.pageLock=!0},e.e1=function(t){e.$refs.popup1.hide(),e.$refs.popup6.show()},e.e2=function(t){return e.$refs.popup1.hide()},e.e3=function(t){e.$refs.popup1.hide(),e.pageLock=!0},e.e4=function(t){return e.$refs.popup6.hide()},e.e5=function(t){return e.$refs.popup7.hide()},e.e6=function(t){e.$refs.popup.hide(),e.pageLock=!0})}),[],!1,null,"d4d19b92",null,!1,void 0,void 0).exports},2586:function(e,t,i){i.r(t),i(5476);var n=i(9910),o=i(8793).default,r=i(7039).createPage;o.__webpack_require_UNI_MP_PLUGIN__=i,r(n.default)},93:function(){}},function(e){e.O(0,["common/vendor"],(function(){return t=2586,e(e.s=t);var t})),e.O()}]); 
 			}); 	require("pages/luckDraw/index.js");
 		__wxRoute = 'pages/yppPay/yppPay';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/yppPay/yppPay.js';	define("pages/yppPay/yppPay.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["pages/yppPay/yppPay"],{9841:function(e,t,a){a.r(t),a(5476);var n=a(8793).default,o=a(7039).default,r={data:function(){return{returnUrl:"",type:"",orderId:""}},onLoad:function(e){console.log("支付页面",e);var t={type:e.type,orderId:e.orderId,returnUrl:e.returnUrl};this.$http.getPayGenerateMp1(t).then((function(t){200==t.code&&n.requestPayment({timeStamp:t.data.timeStamp,nonceStr:t.data.nonceStr,package:t.data.package,signType:t.data.signType,paySign:t.data.paySign,success:function(t){console.log("支付成功",t),o.navigateTo({url:"/subpackage/webView/h5?&url="+e.returnUrl+"&type="+e.type+"&orderId="+e.orderId})},fail:function(t){console.log("支付失败",e.returnUrl),0==e.type?o.navigateTo({url:"/subpackage/webView/h5?url="+encodeURIComponent("https://www.youpiaopiao.cn/h10/#/pages/order/movie/index")+"&state=noPay"}):5==e.type&&o.navigateTo({url:"/subpackage/webView/h5?&url="+decodeURIComponent("https://www.youpiaopiao.cn/h10/#/pages/kfc/orderList")+"&state=noPay"})}})}))}},u=(0,a(9453).default)(r,(function(){this.$createElement;this._self._c}),[],!1,null,null,null,!1,void 0,void 0).exports,p=a(8793).default,c=a(7039).createPage;p.__webpack_require_UNI_MP_PLUGIN__=a,c(u)}},function(e){e.O(0,["common/vendor"],(function(){return t=9841,e(e.s=t);var t})),e.O()}]); 
 			}); 	require("pages/yppPay/yppPay.js");
 		__wxRoute = 'pages/yppPay/chooseLocation';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/yppPay/chooseLocation.js';	define("pages/yppPay/chooseLocation.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["pages/yppPay/chooseLocation"],{6792:function(o,e,n){n.r(e),n(5476);var a=n(7039).default,t={name:"chooseLocation",data:function(){return{addressInfo:{},returnUrl:""}},onLoad:function(o){var e=o.address,n=o.returnUrl;this.addressInfo=JSON.parse(e),this.returnUrl=decodeURIComponent(n),this.chooseLocation()},methods:{chooseLocation:function(){var o=this;a.chooseLocation({success:function(e){var n=e.address,t=e.name,r=e.latitude,c=e.longitude;o.addressInfo.addr=n+t,o.addressInfo.lat=r,o.addressInfo.lon=c,console.log(66,o.addressInfo);var s="".concat(o.returnUrl,"?address=").concat(JSON.stringify(o.addressInfo),"&lat=").concat(r,"&lng=").concat(c);a.redirectTo({url:"/subpackage/webView/h5?url="+encodeURIComponent(s)})},fail:function(o){a.navigateBack()}})}}},r=(0,n(9453).default)(t,(function(){this.$createElement;this._self._c}),[],!1,null,"76c7e998",null,!1,void 0,void 0).exports,c=n(8793).default,s=n(7039).createPage;c.__webpack_require_UNI_MP_PLUGIN__=n,s(r)}},function(o){o.O(0,["common/vendor"],(function(){return e=6792,o(o.s=e);var e})),o.O()}]); 
 			}); 	require("pages/yppPay/chooseLocation.js");
 		__wxRoute = 'pages/material/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/material/index.js';	define("pages/material/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";(global.webpackChunkbwc=global.webpackChunkbwc||[]).push([["pages/material/index"],{8156:function(t,e,n){n.r(e),n(5476);var r=n(9510),c=n(4587),a=n(4216),o=n.n(a),i=n(7256),s=n.n(i),u=n(7039).default,f={name:"index",components:{},data:function(){return{typeData:[],list:[],qrcodeUrl:"",authorizer_type:1,qrcodeImgPath:"",params:{type_id:""}}},onLoad:function(){this.$utils.hasLogin()&&this.init()},created:function(){var t=this;u.$on("login",(function(){t.init()}))},methods:{init:function(){var t=this;return(0,c.default)(o().mark((function e(){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getTypeList();case 2:return e.next=4,t.getQrcodeUrl();case 4:return e.next=6,t.getQrcodePath();case 6:return e.next=8,t.getList();case 8:case"end":return e.stop()}}),e)})))()},getTypeList:function(){var t=this;return(0,c.default)(o().mark((function e(){var n;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.getMomentsTypeList();case 2:200===(n=e.sent).code&&(t.typeData=n.data);case 4:case"end":return e.stop()}}),e)})))()},getQrcodeUrl:function(){var t=this;return(0,c.default)(o().mark((function e(){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.$http.popularize({}).then((function(e){200==e.code&&(t.qrcodeUrl=e.data.qrcode,t.authorizer_type=e.data.authorizer_type)})));case 1:case"end":return e.stop()}}),e)})))()},getQrcodePath:function(){var t=this;return(0,c.default)(o().mark((function e(){var n;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t,e.abrupt("return",new Promise((function(t){1==n.authorizer_type?s()({width:180,height:180,x:8,y:8,correctLevel:3,canvasId:"qrcode",text:n.qrcodeUrl,callback:function(){setTimeout((function(){u.canvasToTempFilePath({canvasId:"qrcode",quality:1,success:function(e){n.qrcodeImgPath=e.tempFilePath,t()}})}),160)}}):u.getImageInfo({src:n.qrcodeUrl,success:function(e){var r=e.path;e.width,e.height,n.qrcodeImgPath=r,t()}})})));case 2:case"end":return e.stop()}}),e)})))()},setPosterQrcode:function(t,e){this.$set(e,"posterQrcode",t)},getList:function(){var t=this;return(0,c.default)(o().mark((function e(){var n;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.getMomentsList(t.params);case 2:200===(n=e.sent).code&&(t.list=n.data.list.map((function(t){return t.picList=[].concat((0,r.default)(t.pic.map((function(t){return{img:t,isPoster:1}}))),(0,r.default)(t.moments_pic.map((function(t){return{img:t,isPoster:0}})))),t})),t.draw());case 4:case"end":return e.stop()}}),e)})))()},draw:function(){var t=this;this.list.forEach((function(e,n){e.picList.forEach((function(e,r){var c=u.createCanvasContext("image-qrcode-canvas-".concat(n,"-").concat(r),t);u.getImageInfo({src:e.img,success:function(a){var o=a.path;a.width,a.height,c.drawImage(o,0,0,456,812),e.isPoster&&c.drawImage(t.qrcodeImgPath,138,612,180,180),c.draw(!1,(function(){u.canvasToTempFilePath({canvasId:"image-qrcode-canvas-".concat(n,"-").concat(r),quality:1,success:function(n){t.$set(e,"posterQrcode",n.tempFilePath)},fail:function(t){console.log(66,t)}})}))}})}))}))},clickType:function(t){this.params.type_id=t,this.getList()},copyText:function(t){var e="".concat(t.content," \n ").concat(t.link);this.$utils.copy(e)},downLoadImg:function(t){var e=this;return(0,c.default)(o().mark((function n(){var r;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t.posterQrcode,r=e,u.authorize({scope:"scope.writePhotosAlbum",success:function(){t.picList.forEach((function(t){u.saveImageToPhotosAlbum({filePath:t.posterQrcode,success:function(){r.$utils.showToast("保存成功")},fail:function(t){r.$utils.showToast("保存失败")}})}))},fail:function(){u.showModal({title:"您已拒绝获取相册权限",content:"是否进入权限管理，调整授权？",success:function(t){if(t.confirm)u.openSetting({success:function(t){}});else if(t.cancel)return u.showToast({title:"已取消！"})}})}});case 3:case"end":return n.stop()}}),n)})))()},preview:function(t,e){var n=t.picList.map((function(t){return t.posterQrcode}));u.previewImage({urls:n,current:e})},getImgUrlPath:function(t){return new Promise((function(e){u.getImageInfo({src:t,success:function(t){e(t.path)}})}))}}},p=n(3615),d=(0,(n.n(p)(),n(9453)).default)(f,(function(){var t=this,e=(t.$createElement,t._self._c,t.list.length),n=0!==e?t.__map(t.list,(function(e,n){return{$orig:t.__get_orig(e),g1:e.picList.length}})):null;t.$mp.data=Object.assign({},{$root:{g0:e,l0:n}})}),[],!1,null,"2007ebea",null,!1,void 0,void 0).exports,h=n(8793).default,l=n(7039).createPage;h.__webpack_require_UNI_MP_PLUGIN__=n,l(d)},3615:function(){}},function(t){t.O(0,["common/vendor"],(function(){return e=8156,t(t.s=e);var e})),t.O()}]); 
 			}); 	require("pages/material/index.js");
 	