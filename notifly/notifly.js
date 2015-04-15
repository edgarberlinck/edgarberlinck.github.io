Parse.initialize("VAlZMToAqr3mIJymUds3F2oCNWRyPoHFB6Vc7AoW", "ELd5pPxzQQy2t5M7tl63AgZowLQwkgJ3JKr3DZ0x");

var content = document.getElementById("content");

function home() {
	goTo("notifly/addquery.html", configureQuery);	
}

function goTo(page, complete) {
    var loading = $(".loading");
    loading.show();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            content.innerHTML = this.responseText;
            if (complete) 
                complete();
        }
    }
    xmlhttp.open("GET", page, true);
    xmlhttp.send();
}

function configureQuery() {
    var availableAirports = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];

	var substringMatcher = function(strs) {
	  return function findMatches(q, cb) {
	    var matches, substrRegex;
	    matches = [];
	    substrRegex = new RegExp(q, 'i');
	
	    $.each(strs, function(i, str) {
	      if (substrRegex.test(str)) {
	        matches.push({ value: str });
	      }
	    });
	 
	    cb(matches);
	  };
	};

    $('.form-control.typeahead').typeahead({
		  hint: true,
		  highlight: true,
		  minLength: 1,

		},
		{
		  name: 'airport',
		  displayKey: 'value',
		  source: substringMatcher(availableAirports)
	});

  	
  };
home();
