/*****************************************************************
 * Word HTML Cleaner
 * Copyright (C) 2005 Connor McKay
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
*****************************************************************/

// http://ethilien.net/websoft/wordcleaner/cleaner.htm

//remplacement characters
var rchars = [["Ã±","Ã³", "Ã«", "Ã­", "Ã¬", "Ã®", 'â€ '], ["-", "-", "'", "'", '"', '"', ' ']];

//html entities translation array
var hents = new Array();
hents['Â°'] = '&iexcl;';
hents['Â¢'] = '&cent;';
hents['Â£'] = '&pound;';
hents['Â§'] = '&curren;';
hents['â€¢'] = '&yen;';
hents['Â¶'] = '&brvbar;';
hents['ÃŸ'] = '&sect;';
hents['Â®'] = '&uml;';
hents['Â©'] = '&copy;';
hents['â„¢'] = '&ordf;';
hents['Â´'] = '&laquo;';
hents['Â¨'] = '&not;';
hents['â‰ '] = '&shy;';
hents['Ã†'] = '&reg;';
hents['Ã˜'] = '&macr;';
hents['âˆž'] = '&deg;';
hents['Â±'] = '&plusmn;';
hents['â‰¤'] = '&sup2;';
hents['â‰¥'] = '&sup3;';
hents['Â¥'] = '&acute;';
hents['Âµ'] = '&micro;';
hents['âˆ‚'] = '&para;';
hents['âˆ‘'] = '&middot;';
hents['âˆ'] = '&cedil;';
hents['Ï€'] = '&sup1;';
hents['âˆ«'] = '&ordm;';
hents['Âª'] = '&raquo;';
hents['Âº'] = '&frac14;';
hents['Î©'] = '&frac12;';
hents['Ã¦'] = '&frac34;';
hents['Ã¸'] = '&iquest;';
hents['Â¿'] = '&Agrave;';
hents['Â¡'] = '&Aacute;';
hents['Â¬'] = '&Acirc;';
hents['âˆš'] = '&Atilde;';
hents['Æ’'] = '&Auml;';
hents['â‰ˆ'] = '&Aring;';
hents['âˆ†'] = '&AElig;';
hents['Â«'] = '&Ccedil;';
hents['Â»'] = '&Egrave;';
hents['â€¦'] = '&Eacute;';
hents['Â '] = '&Ecirc;';
hents['Ã€'] = '&Euml;';
hents['Ãƒ'] = '&Igrave;';
hents['Ã•'] = '&Iacute;';
hents['Å’'] = '&Icirc;';
hents['Å“'] = '&Iuml;';
hents['â€“'] = '&ETH;';
hents['â€”'] = '&Ntilde;';
hents['â€œ'] = '&Ograve;';
hents['â€'] = '&Oacute;';
hents['â€˜'] = '&Ocirc;';
hents['â€™'] = '&Otilde;';
hents['Ã·'] = '&Ouml;';
hents['â—Š'] = '&times;';
hents['Ã¿'] = '&Oslash;';
hents['Å¸'] = '&Ugrave;';
hents['â„'] = '&Uacute;';
hents['â‚¬'] = '&Ucirc;';
hents['â€¹'] = '&Uuml;';
hents['â€º'] = '&Yacute;';
hents['ï¬'] = '&THORN;';
hents['ï¬‚'] = '&szlig;';
hents['â€¡'] = '&agrave;';
hents['Â·'] = '&aacute;';
hents['â€š'] = '&acirc;';
hents['â€ž'] = '&atilde;';
hents['â€°'] = '&auml;';
hents['Ã‚'] = '&aring;';
hents['ÃŠ'] = '&aelig;';
hents['Ã'] = '&ccedil;';
hents['Ã‹'] = '&egrave;';
hents['Ãˆ'] = '&eacute;';
hents['Ã'] = '&ecirc;';
hents['ÃŽ'] = '&euml;';
hents['Ã'] = '&igrave;';
hents['ÃŒ'] = '&iacute;';
hents['Ã“'] = '&icirc;';
hents['Ã”'] = '&iuml;';
hents['ï£¿'] = '&eth;';
hents['Ã’'] = '&ntilde;';
hents['Ãš'] = '&ograve;';
hents['Ã›'] = '&oacute;';
hents['Ã™'] = '&ocirc;';
hents['Ä±'] = '&otilde;';
hents['Ë†'] = '&ouml;';
hents['Ëœ'] = '&divide;';
hents['Â¯'] = '&oslash;';
hents['Ë˜'] = '&ugrave;';
hents['Ë™'] = '&uacute;';
hents['Ëš'] = '&ucirc;';
hents['Â¸'] = '&uuml;';
hents['Ë'] = '&yacute;';
hents['Ë›'] = '&thorn;';
hents['Ë‡'] = '&yuml;';
hents['"'] = '&quot;';
hents['<'] = '&lt;';
hents['>'] = '&gt;';

//allowed tags
var tags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'ul', 'ol', 'li', 'u', 'i', 'b', 'a', 'table', 'tr', 'th', 'td', 'img', 'em', 'strong', 'br'];

//tags which should be removed when empty
var rempty = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'ul', 'ol', 'li', 'u', 'i', 'b', 'a', 'table', 'tr', 'em', 'strong'];

//allowed atributes for tags
var aattr = new Array();
aattr['a'] = ['href', 'name'];
aattr['table'] = ['border'];
aattr['th'] = ['colspan', 'rowspan'];
aattr['td'] = ['colspan', 'rowspan'];
aattr['img'] = ['src', 'width', 'height', 'alt'];

//tags who's content should be deleted
var dctags = ['head','xml','style'];

//Quote characters
var quotes = ["'", '"'];

//tags which are displayed as a block
var btags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'ul', 'ol', 'li', 'table', 'tr', 'th', 'td', 'br'];

//d = data, o = out, c = character, n = next character
//in and out variables
var d = '';
var o = '';

function cleanHTML()
{
	o = '';
	var i;
	//Replace all whitespace characters with spaces
	d = d.replace(/(\s|&nbsp;)+/g, ' ');
	//replace weird word characters
	for (i = 0; i < rchars[0].length; i++)
		d = d.replace(new RegExp(rchars[0][i], 'g'), rchars[1][i]);
	
	//initialize flags
	//what the next character is expected to be
	var expected = '';
	//tag text
	var tag = '';
	//tag name
	var tagname = '';
	//what type of tag it is, start, end, or single
	var tagtype = 'start';
	//attribute text
	var attribute = '';
	//attribute name
	var attributen = '';
	//if the attribute has had an equals sign
	var attributeequals = false;
	//if attribute has quotes, and what they are
	var attributequotes = '';
	
	var c = '';
	var n = '';
	
	/*Parser format:
	The parser is divided into three parts:
	The first section is for when the current type of character is known
	The second is for when it is an unknown character in a tag
	The third is for anything outside of a tag
	*/
	
	//editing pass
	for (i = 0; i < d.length; i++)
	{
		//current character
		c = getc(i);
		//next character
		n = getc(i+1);
		
		//***Section for when the current character is known
		
		//if the tagname is expected
		if (expected == 'tagname')
		{
			tagname += c.toLowerCase();
			//lookahead for end of tag name
			if (n == ' ' || n == '>' || n == '/')
			{
				tag += tagname;
				expected = 'tag';
			}
		}
		//if an attribute name is expected
		else if (expected == 'attributen')
		{
			attributen += c.toLowerCase();
			//lookahead for end of attribute name
			if (n == ' ' || n == '>' || n == '/' || n == '=')
			{
				attribute += attributen;
				//check to see if its an attribute without an assigned value
				//determines whether there is anything but spaces between the attribute name and the next equals sign
				if (endOfAttr(i))
				{
					//if the attribute is allowed, add it to the output
					if (ae(attributen, aattr[tagname]))
						tag += attribute;
					
					attribute = '';
					attributen = '';
					attributeequals = false;
					attributequotes = '';
				}
				expected = 'tag';
			}
		}
		//if an attribute value is expected
		else if (expected == 'attributev')
		{
			attribute += c;
			
			//lookahead for end of value
			if ((c == attributequotes) || ((n == ' ' || n == '/' || n == '>') && !attributequotes))
			{
				//if the attribute is allowed, add it to the output
				if (ae(attributen, aattr[tagname]))
					tag += attribute;
				
				attribute = '';
				attributen = '';
				attributeequals = false;
				attributequotes = '';
				
				expected = 'tag';
			}
		}
		
		//***Section for when the character is unknown but it is inside of a tag
		
		else if (expected == 'tag')
		{
			//if its a space
			if (c == ' ')
				tag += c;
			//if its a slash after the tagname, signalling a single tag.
			else if (c == '/' && tagname)
			{
				tag += c;
				tagtype = 'single';
			}
			//if its a slash before the tagname, signalling its an end tag
			else if (c == '/')
			{
				tag += c;
				tagtype = 'end';
			}
			//if its the end of a tag
			else if (c == '>')
			{
				tag += c;
				//if the tag is allowed, add it to the output
				if (ae(tagname, tags))
					o += tag;
				
				//if its a start tag
				if (tagtype == 'start')
				{
					//if the tag is supposed to have its contents deleted
					if (ae(tagname, dctags))
					{
						//if there is an end tag, skip to it in order to delete the tags contents
						if (-1 != (endpos = d.indexOf('</' + tagname, i)))
						{
							//have to make it one less because i gets incremented at the end of the loop
							i = endpos-1;
						}
						//if there isn't an end tag, then it was probably a non-compliant single tag
					}
				}
				
				tag = '';
				tagname = '';
				tagtype = 'start';
				expected = '';
			}
			//if its an attribute name
			else if (tagname && !attributen)
			{
				attributen += c.toLowerCase();
				expected = 'attributen';
				//lookahead for end of attribute name, in case its a one character attribute name
				if (n == ' ' || n == '>' || n == '/' || n == '=')
				{
					attribute += attributen;
					//check to see if its an attribute without an assigned value
					//determines whether there is anything but spaces between the attribute name and the next equals sign
					if (endOfAttr(i))
					{
						//if the attribute is allowed, add it to the output
						if (ae(attributen, attributen))
							tag += attribute;
						
						attribute = '';
						attributen = '';
						attributeequals = false;
						attributequotes = '';
					}
					expected = 'tag';
				}
			}
			//if its a start quote for an attribute value
			else if (ae(c, quotes) && attributeequals)
			{
				attribute += c;
				attributequotes = c;
				expected = 'attributev';
			}
			//if its an attribute value
			else if (attributeequals)
			{
				attribute += c;
				expected = 'attributev';
				
				//lookahead for end of value, in case its only one character
				if ((c == attributequotes) || ((n == ' ' || n == '/' || n == '>') && !attributequotes))
				{
					//if the attribute is allowed, add it to the output
					if (ae(attributen, attributen))
						tag += attribute;
					
					attribute = '';
					attributen = '';
					attributeequals = false;
					attributequotes = '';
					
					expected = 'tag';
				}
			}
			//if its an attribute equals
			else if (c == '=' && attributen)
			{
				attribute += c;
				attributeequals = true;
			}
			//if its the tagname
			else
			{
				tagname += c.toLowerCase();
				expected = 'tagname';
				
				//lookahead for end of tag name, in case its a one character tag name
				if (n == ' ' || n == '>' || n == '/')
				{
					tag += tagname;
					expected = 'tag';
				}
			}
		}
		//if nothing is expected
		else
		{
			//if its the start of a tag
			if (c == '<')
			{
				tag = c;
				expected = 'tag';
			}
			//anything else
			else
				o += htmlentities(c);
		}
	}
	
	//beautifying regexs
	//remove duplicate spaces
	o = o.replace(/\s+/g, ' ');
	//remove unneeded spaces in tags
	o = o.replace(/\s>/g, '>');
	//remove empty tags
	//this loops until there is no change from running the regex
	var remptys = rempty.join('|');
	var oo = o;
	while ((o = o.replace(new RegExp("\\s?<(" + remptys + ")>\s*<\\/\\1>", 'gi'), '')) != oo)
		oo = o;
	//make block tags regex string
	var btagss = btags.join('|');
	//add newlines after block tags
	o = o.replace(new RegExp("\\s?</(" + btagss+ ")>", 'gi'), "</$1>\n");
	//remove spaces before block tags
	o = o.replace(new RegExp("\\s<(" + btagss + ")", 'gi'), "<$1");
	
	//fix lists
	//o = o.replace(/((<p.*>\s*(&middot;|&#9642;) .*<\/p.*>\n)+)/gi, "<ul>\n$1</ul>\n");//make ul for dot lists
	//o = o.replace(/((<p.*>\s*\d+\S*\. .*<\/p.*>\n)+)/gi, "<ol>\n$1</ol>\n");//make ol for numerical lists
	//o = o.replace(/((<p.*>\s*[a-z]+\S*\. .*<\/p.*>\n)+)/gi, "<ol style=\"list-style-type: lower-latin;\">\n$1</ol>\n");//make ol for latin lists
	//o = o.replace(/<p(.*)>\s*(&middot;|&#9642;|\d+(\S*)\.|[a-z]+\S*\.) (.*)<\/p(.*)>\n/gi, "\t<li$1>$3$4</li$5>\n");//make li
	
	//extend outer lists around the nesting lists
	o = o.replace(/<\/(ul|ol|ol style="list-style-type: lower-latin;")>\n(<(?:ul|ol|ol style="list-style-type: lower-latin;")>[\s\S]*<\/(?:ul|ol|ol style="list-style-type: lower-latin;")>)\n(?!<(ul|ol|ol style="list-style-type: lower-latin;")>)/g, "</$1>\n$2\n<$1>\n</$1>\n");
	
	/**/
	//nesting lists
	o = o.replace(/<\/li>\s+<\/ol>\s+<ul>([\s\S]*?)<\/ul>\s+<ol>/g, "\n<ul>$1</ul></li>");//ul in ol
	o = o.replace(/<\/li>\s+<\/ol>\s+<ol style="list-style-type: lower-latin;">([\s\S]*?)<\/ol>\s+<ol>/g, "\n<ol style=\"list-style-type: lower-latin;\">$1</ol></li>");//latin in ol
	o = o.replace(/<\/li>\s+<\/ul>\s+<ol>([\s\S]*?)<\/ol>\s+<ul>/g, "\n<ol>$1</ol></li>");//ol in ul
	o = o.replace(/<\/li>\s+<\/ul>\s+<ol style="list-style-type: lower-latin;">([\s\S]*?)<\/ol>\s+<ul>/g, "\n<ol style=\"list-style-type: lower-latin;\">$1</ol></li>");//latin in ul
	o = o.replace(/<\/li>\s+<\/ol>\s+<ol style="list-style-type: lower-latin;">([\s\S]*?)<\/ol>\s+<ol>/g, "\n<ol style=\"list-style-type: lower-latin;\">$1</ol></li>");//ul in latin
	o = o.replace(/<\/li>\s+<\/ul>\s+<ol style="list-style-type: lower-latin;">([\s\S]*?)<\/ol>\s+<ul>/g, "\n<ol style=\"list-style-type: lower-latin;\">$1</ol></li>");//ul in latin
	/**/
	
	//remove empty tags. this is needed a second time to delete empty lists that were created to fix nesting, but weren't needed
	o = o.replace(new RegExp("\\s?<(" + remptys + ")>\s*<\\/\\1>", 'gi'), '');
	
	return o;
}

//array equals
//loops through all the elements of an array to see if any of them equal the test.
function ae (needle, haystack)
{
	if (typeof(haystack) == 'object')
		for (var i = 0; i < haystack.length; i++)
			if (needle == haystack[i])
				return true;
	
	return false;
}

//get character
//return specified character from d
function getc (i)
{
	return d.charAt(i);
}

//end of attr
//determines if their is anything but spaces between the current character, and the next equals sign
function endOfAttr (i)
{
	var between = d.substring(i+1, d.indexOf('=', i+1));
	if (between.replace(/\s+/g, ''))
		return true;
	else
		return false;
}

function htmlentities (character)
{
	if (hents[character])
		return hents[character];
	else
		return character;
}