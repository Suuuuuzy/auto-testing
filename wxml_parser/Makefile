VCPKG_ROOT := /home/bella-xia/vcpkg

CXX_SRCS = utils.cpp HTMLToken.cpp HTMLTokenizer.cpp WXMLDocumentParser.cpp test_script.cpp
CXX_OBJS = $(CXX_SRCS:%.cpp=%.o)

CXX_DEBUG_SRCS = utils.cpp HTMLToken.cpp HTMLTokenizer.cpp WXMLDocumentParser.cpp debug_script.cpp
CXX_DEBUG_OBJS = $(CXX_DEBUG_SRCS:%.cpp=%.o)

CXX = g++ 
CXXFLAGS =  -g -Wall -std=c++17 -I$(VCPKG_ROOT)/installed/x64-linux/include

%.o : %.cpp
	$(CXX) $(CXXFLAGS) -c $<

all : parse

parse : $(CXX_OBJS)
	$(CXX) -o $@ $(CXX_OBJS)

debug : $(CXX_DEBUG_OBJS)
	$(CXX) -o $@ $(CXX_DEBUG_OBJS)

clean :
	rm -f *.o debug parse depend.mak

depend :
	$(CXX) $(CXXFLAGS) -M $(CXX_SRCS) >> depend.mak

depend.mak :
	touch $@

solution.zip : 
	zip -9r *.cpp *.h

include depend.mak