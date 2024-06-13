VCPKG_ROOT := /home/bella-xia/vcpkg

CXX_SRCS = HTMLToken.cpp Node.cpp Event.cpp utils.cpp HTMLTokenizer.cpp WXMLDocumentParser.cpp test_script.cpp
CXX_OBJS = $(CXX_SRCS:%.cpp=%.o)

CXX_DEBUG_TOKEN_SRCS = HTMLToken.cpp Node.cpp Event.cpp utils.cpp HTMLTokenizer.cpp WXMLDocumentParser.cpp debug_token_script.cpp
CXX_DEBUG_TOKEN_OBJS = $(CXX_DEBUG_TOKEN_SRCS:%.cpp=%.o)

CXX_DEBUG_ARG_SRCS = HTMLToken.cpp Node.cpp Event.cpp utils.cpp HTMLTokenizer.cpp WXMLDocumentParser.cpp debug_arg_script.cpp
CXX_DEBUG_ARG_OBJS = $(CXX_DEBUG_ARG_SRCS:%.cpp=%.o)

CXX = g++ 
CXXFLAGS =  -g -Wall -std=c++17 -I$(VCPKG_ROOT)/installed/x64-linux/include

%.o : %.cpp
	$(CXX) $(CXXFLAGS) -c $<

all : parse

parse : $(CXX_OBJS)
	$(CXX) -o $@ $(CXX_OBJS)

token_debug : $(CXX_DEBUG_TOKEN_OBJS)
	$(CXX) -o $@ $(CXX_DEBUG_TOKEN_OBJS)

arg_debug : $(CXX_DEBUG_ARG_OBJS)
	$(CXX) -o $@ $(CXX_DEBUG_ARG_OBJS)

clean :
	rm -f *.o token_debug arg_debug parse depend.mak

depend :
	$(CXX) $(CXXFLAGS) -M $(CXX_SRCS) >> depend.mak

depend.mak :
	touch $@

solution.zip : 
	zip -9r *.cpp *.h

include depend.mak