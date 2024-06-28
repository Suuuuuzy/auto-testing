
def ASSERT_NOT_REACHED():
    raise Exception("Token Type not reached.")

def ERROREOUS_END_TAG():
    raise Exception("Erroreous end tag.")

def OUT_OF_INDEX():
    raise Exception("Iterable out of index.")

def ASSERT_UNIMPLEMENTED():
    raise Exception("Bind Function type not implemented yet.")

def ASSERT_NOT_WXML_DATA():
    raise Exception("Data is script instead of WXML-readable format.")