Parse.initialize("VAlZMToAqr3mIJymUds3F2oCNWRyPoHFB6Vc7AoW", "ELd5pPxzQQy2t5M7tl63AgZowLQwkgJ3JKr3DZ0x");

var content = document.getElementById("content");
var messages = document.getElementById("messages");

function home(message) {
	if(message) {
		messages.classList.remove("alert-danger");
		messages.classList.add("alert-success");
		messages.children[0].innerHTML = message;
		messages.classList.remove("hide");
		messages.classList.add("show");
	}
	goTo("notifly/addquery.html", configureQuery);	
}


function search() {
	messages.classList.add("hide");
	messages.classList.remove("show");

	$(".has-error").removeClass("has-error");

	var origem = document.getElementById("origem");
	var destino = document.getElementById("destino");
	var ida = document.getElementById("ida");
	var volta = document.getElementById("volta");
	var adultos = document.getElementById("adultos");
	var criancas = document.getElementById("criancas");
	var bebes = document.getElementById("bebes");
	var valor = document.getElementById("valor");
	var hasErrors = false;
	
	if (origem.value === "") {
		hasErrors = true;
		origem.parentNode.parentNode.classList.add("has-error");
	}

	if (destino.value === "") {
		hasErrors = true;
		destino.parentNode.parentNode.classList.add("has-error");
	}

	if (ida.value === "") {
		hasErrors = true;
		ida.parentNode.classList.add("has-error");	
	}

	if (adultos.value === "" && criancas.value === "" && bebes.value === "") {
		hasErrors = true;
		adultos.parentNode.classList.add("has-error");	
	}

	if (valor.value === "") {
		hasErrors = true;
		valor.parentNode.classList.add("has-error");	
	}

	if (hasErrors) {
		messages.classList.remove("hide");
		messages.classList.add("show");
	} else {

		var search = new Object();
		search.origem = origem.value;
		search.destino = destino.value;
		search.ida = ida.value;
		search.volta = volta.value;
		search.adultos = adultos.value;
		search.criancas = criancas.value;
		search.bebes = bebes.value;
		search.valor = valor.value;

		sessionStorage.setItem("search", JSON.stringify(search));

		var currentUser = Parse.User.current();

		if (!currentUser) {
			goTo("notifly/register.html");
		} else {
			salvar(search);
		}
	}

}

function registrar() {
	messages.classList.add("hide");
	messages.classList.remove("show");

	var nome = document.getElementById("nomeCompleto");
	var email = document.getElementById("email");
	var senha = document.getElementById("senha");
	var senha2 = document.getElementById("senha2");
	var hasErrors = false;

	if (nome.value === "") {
		hasErrors = true;
		nome.parentNode.classList.add("has-error");
	}

	if (email.value === "") {
		hasErrors = true;
		email.parentNode.classList.add("has-error");
	}

	if (senha.value === "") {
		hasErrors = true;
		senha.parentNode.classList.add("has-error");
	}

	if (senha2.value === "") {
		hasErrors = true;
		senha2.parentNode.classList.add("has-error");
	}

	if (!hasErrors) {
		if (senha.value !== senha2.value) {
			messages.children[0].innerHTML = "As senhas devem ser iguais :("
			messages.classList.remove("hide");
			messages.classList.add("show");
		} else {
			var newuser = new Parse.User();
			newuser.set("username", email.value);
			newuser.set("password", senha.value);
			newuser.set("email", email.value);
			newuser.set("nome", nome.value);
			
			newuser.signUp().then(function(user){
				salvar(user);
			});
		}
	} else {
		messages.classList.remove("hide");
		messages.classList.add("show");
	}
}

function logar(user) {
	var username;
	var password;

	if (!user){
		username = document.getElementById("username").value;
		password = document.getElementById("password").value;
	} else {
		username = user.get("username");
		password = user.get("password");
	}

	Parse.User.logIn(username, password).then(
	function(){
		var search = sessionStorage.getItem("search");
		if (search) {
			search = JSON.parse(search);
			salvar(search);
		} else {
			home();
		}
	}, 
	function() {
		messages.classList.add("alert-danger");
		messages.classList.remove("alert-success");
		messages.children[0].innerHTML = "Usuário / Senha incorretos.";
		messages.classList.remove("hide");
		messages.classList.add("show");
	});
}

function salvar(search) {
	var currentUser = Parse.User.current();
	if (!currentUser) {
		goTo("notifly/register.html");
	} else {
		var Busca = Parse.Object.extend("busca");
		var busca = new Busca();
		
		if (!search) {
			search = JSON.parse(sessionStorage.getItem("search"));
		}

		busca.set("origem", search.origem);
		busca.set("destino", search.destino);
		busca.set("ida", search.ida);
		busca.set("volta", search.volta);
		busca.set("adultos", search.adultos);
		busca.set("criancas", search.criancas);
		busca.set("bebes", search.bebes);
		busca.set("valor", search.valor);
		busca.relation("user").add(currentUser);
		
		busca.save().then(function(busca){
			home("Ok. Avisaremos quando encontramos!");
			sessionStorage.removeItem("search");
		});
	}
}

function goTo(page, complete) {
    messages.classList.add("alert-danger");
	messages.classList.remove("alert-success");
	messages.classList.add("hide");
	messages.classList.remove("show");

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
      "VIX - Aeroporto Eurico de Aguiar Salles",
      "CNF - Aeroporto Internacional Tancredo Neves",
      "REC - Aeroporto Internacional dos Guararapes Gilberto Freyre",
      "PNZ - Aeroporto de Petrolin",
      "FEN - Aeroporto de Fernando de Noronha",
      "GRU - Aeroporto Internacional de São Paulo-Guarulhos",
      "VCP - Aeroporto Internacional de Viracopos-Campinas",
      "CGH - Aeroporto de Congonhas/São Paulo",
      "GIG - Aeroporto Internacional do Rio de Janeiro",
      "SDU - Aeroporto Santos Dumont"
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

  function help() {
  	goTo("notifly/ajuda.html");
  }

  function contato(){
  	goTo("notifly/contato.html");	
  }

  function enviarContato() {
  	messages.classList.add("hide");
	messages.classList.remove("show");
	$(".form-group").removeClass("has-error");

  	var nomeContato = document.getElementById("nomeContato");
  	var email = document.getElementById("emailContato");
  	var mensagem = document.getElementById("mensagem");
  	var hasError = false;

  	if (nomeContato.value === "") {
  		hasError = true;
  		nomeContato.parentNode.classList.add("has-error");
  	}

  	if (email.value===""){
  		hasError = true;
  		email.parentNode.classList.add("has-error");
  	}

  	if(mensagem.value===""){
  		hasError = true;
  		mensagem.parentNode.classList.add("has-error");
  	}

  	if (!hasError) {
  		var Contato = Parse.Object.extend("contato");
  		var contato = new Contato();
  		contato.set("nome", nomeContato.value);
  		contato.set("email", emailContato.value);
  		contato.set("mensagem", mensagem.value);
  		contato.save().then(function(){
  			home("Sua mensagem foi enviado. Responderemos assim que possível!");
  		})
  	} else {
  		messages.children[0].innerHTML = "Por favor, preencha todos os campos!"
		messages.classList.remove("hide");
		messages.classList.add("show");
  	}
  }

home();
