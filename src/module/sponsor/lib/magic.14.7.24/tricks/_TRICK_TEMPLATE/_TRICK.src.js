/***************************************************************************
- File: _TRICK.js
- Version: YY.MM.DD
- java -jar compiler2.jar --js _TRICK.src.js --js_output_file _TRICK.VERSION.js
***************************************************************************/

$m.trick._TRICK = {};

$m.t._TRICK =
{
	 name : "_TRICK"

	/**
	 * Main constructor for trick -- $m.t._TRICK.construct()
	 * 
	 */
	,construct : function(in_wand)
	{
		return;
	}


	/**
	 *  -- $m.t._TRICK._FUNCTION
	 * 
	 */
	,_FUNCTION :
	{
		 name : "_FUNCTION"
		,data_att : "DATA_MJS_ATTRIBUTE"
	
		// $m.t._TRICK._FUNCTION.construct()
		,construct : function(in_var)
		{
			$m.elements.bind($m.tags.a, this.data_att, "click", this.exec);
		}
	
		// $m.t._TRICK._FUNCTION.exec(IN_ID)
		,exec : function(in_id)
		{
			// do stuff
		}
	}



}
