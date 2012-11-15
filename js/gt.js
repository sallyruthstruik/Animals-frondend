function gt( tag, id, cls, attr, inner ) {
	str = "<" + tag;
	if ( id != "" ) str += " id=" + tag + "_" + id;
	if ( cls != "" ) str += " class=" + tag + "_" + cls + "_class";
	if ( attr != "" ) str += " " + attr;
	str += ">";
	if ( inner != "" ) str += inner;
	str += "</" + tag + ">";
	return str;
}

function div( id, cls, attr, inner ) {
	return gt( "div", id, cls, attr, inner );
}

function sp() {
	return div( "", "spacer", "", "" );
}

function a( id, cls, attr, inner ) {
	return gt( "a", id, cls, attr, inner );
}

function button( id, cls, attr, inner ) {
	return gt( "button", id, cls, attr, inner );
}

function input( id, cls, attr, inner ) {
	return gt( "input", id, cls, attr, inner );
}

function img( id, cls, attr, inner ) {
	return gt( "img", id, cls, attr, inner );
}

function span( id, cls, attr, inner ) {
	return gt( "span", id, cls, attr, inner );
}