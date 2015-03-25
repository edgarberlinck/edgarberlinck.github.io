var content = document.getElementById("content");

var printOpc = "<div class='row'>"+
		  "<div class='col-sm-6 col-md-4'>"+
		    "<div class='thumbnail'>"+
		      "@OPC_IMAGE"+
		      "<div class='caption'>"+
		        "<h3>@OPC_TEXT</h3>"+
		        "<p><a onclick='alterarOpcao(@OPC_COD)' class='btn btn-primary' role='button'>Alterar</a> <a onclick='excluirOpcao(@OPC_COD)' class='btn btn-default' role='button'>Excluir</a></p>"+
		      "</div>"+
		    "</div>"+
		  "</div>"+
		"</div>";

var newOpc = "<div class='row'>"+
             "<div class='col-sm-6 col-md-4'>"+ 
               "<div class='thumbnail'>"+
               "<h3> Digite um texto para a opção </h3>"+
               "<div class='input-group'>"+
  			   "<span class='input-group-addon' id='textoOpcao'><span class='fa fa-check-circle'></span></span>"+
  			   "<input id='itextoOpcao' type='text' value='@OPC_TEXT' class='form-control' placeholder='Digite um texto para a opção (Opcional)' aria-describedby='textoOpcao'>"+
			   '</div>'+
                 "<div class='caption'>"+
                   "<h3> Inclua uma imagem </h3>"+
               		"<div class='input-group'>"+
               		"<span class='input-group-addon' id='arquivo'><span class='fa fa-picture-o'></span></span>"+
               		"@OPC_IMG"+
               		"<input type='file' id='iarquivo'  />"+  	
               		"</div>"+
               		"<br>"+
                 	"<p>"+
                 		"<button onclick='salvarOpcao(@UPDATE_INDEX)' class='btn btn-block btn-primary'>Salvar</button>"+
                 		"<button onclick='listarOpcoes()' class='btn btn-block btn-default'>Cancelar</button>"+
                 	"</p>"+
                 "</div>"+
               "</div>"+
             "</div>"+
             "</div>";

var pesquisa;
var __opcoes = new Array();

function home() {
	startParse();
	goTo("pages/autenticacao.html", function() {
		localStorage.setItem("participante", undefined);
	});
}

function admin() {
	goTo("pages/authadmin.html", function () {
		setTitle("Bem vindo ao vota-fácil", "Informe suas credenciais para se autenticar no sistema")
	});
}

function homeAdmin() {
	goTo("pages/opcadm.html", function() {
		$(function() {
		    $(".list-group-item").hover(function() {
		        $(this).stop(true,true).addClass("active", 500);
		    }, function() {
		        $(this).stop(true,true).removeClass("active", 100);
		    });
		    
		})
		setTitle("Vota-Fácil", "Escolha uma das opções abaixo.");
	});
}

function autenticar() {
	var username = document.getElementById("iusername").value;
	var password = document.getElementById("ipassword").value;

	Parse.User.logIn(username, password, {
		success : function(user) {
			if (user.get("isAdmin")) {
				homeAdmin();
			} else {
				alert("Não é admin");
			}
		},

		error: function (user) {

		}
	})
}

function logoff() {
	startParse();
	Parse.User.logOut();
	admin();
}

function isLogado() {
	var currentUser = Parse.User.current();
	if (currentUser) {
	    homeAdmin();
	} else {
	   admin();
	}	
}

function iniciarVotacao() {
	var matricula = document.getElementById("iusername").value;
	var query = new Parse.Query(Parse.Object.extend("Participante"));
    
    query.equalTo("matricula", matricula);
    query.find({
     	success : function (list) {
     		if (list.length > 0) {
     			localStorage.setItem("participante", list[0].id);
     			goTo("pages/votar.html", function() {
     				var query = new Parse.Query(Parse.Object.extend("Pesquisa"));
     				query.equalTo("ativa", true);
     				query.find({
     					success : function(data) {
     						var pergunta = document.getElementById("pergunta");
     						var _ = "";
     						var queryOpcoes;

     						if (data.length > 0) {
								$(data).each(function(i, e) {
									queryOpcoes = new Parse.Query(Parse.Object.extend("Opcao"));
	     							queryOpcoes.equalTo("parent", e);
	     							queryOpcoes.find({
		     							success : function (opcoes) {
			     							_ += "<div class='well well-lg'>";
			     							_ += "<div class='page-header'>";
			     							_ += "<h1>"+e.get("titulo")+"</h1>";
			     							_ += "<h3>"+e.get("pergunta")+"</h3>";
			     							$(opcoes).each(function(i, e) {
			     								_ += "<button data-value='"+e.id+"' class='btn btn-block btn-default' onclick='focusControl(this)'>";
			     								if (e.get("arquivo")) 
			     									_ += "<img src='"+e.get("arquivo").url()+"' class='img-rounded' /></br>";
			     								if (e.get("textoOpcao"))
			     									_ += "<h3>"+e.get("textoOpcao")+"</h3>";
			     								_ += "</button><br>";
			     							});
			     							_ += "</div>";
			     							_ += "<div>";
			     							pergunta.innerHTML = _;
		     							}
	     						    })
	     							
     							});
     						} else {
     							pergunta.innerHTML = "Nenhuma pesquisa está disponvel no momento";
     							$(".btn-primary").addClass("disabled");
     						}
     					}
     				});
     			});
     		} else {
     			alert("Matricula não localizada. Entre em contato com o suporte.");
     		}
     	}
     });
}

function focusControl(element) {
	$("button.btn-primary").removeClass("btn-primary");
	$(element).addClass("btn-primary");
}

function registrarVoto() {
	var selecionada = $(".btn-primary")[0];
	if (selecionada) {
		var opcaoid = selecionada.dataset.value;
		var getOpcao = new Parse.Query(Parse.Object.extend("Opcao"));
		getOpcao.get(opcaoid, {
			success : function (opcao) {
				var participanteId = obterParticipanteAtivo();
				var queryParticipante = new Parse.Query(Parse.Object.extend("Participante"));
				queryParticipante.get(participanteId , {
					success : function (participante) {
						var votos = participante.relation("votos");
						votos.add(opcao);
						participante.save().then(home);
					}
				});
			}
		})
	} else {
		alert("Você deve selecionar uma opção.");
	}

}

function obterParticipanteAtivo() {
	return localStorage.getItem("participante");
}

/*
  Menu Administrativo - Cadastro de Pesquisa
 */

 function goCadastrarPesquisa(pesquisa, readonly) {
 	if (pesquisa) {
 		var query = new Parse.Query(Parse.Object.extend("Opcao"));
 		query.equalTo("parent", pesquisa);
 		query.find({
 			success : function (opc) {
 				__opcoes = opc;
 				goTo("pages/cadpesquisa.html", function() {
 					document.getElementById("ipergunta").value = pesquisa.get("pergunta");
 					document.getElementById("ititulo").value = pesquisa.get("titulo");
 					document.getElementById("objectId").value = pesquisa.id;
 					listarOpcoes(); 					

 					if (readonly) {
 						$(".btn").addClass("disabled");
 						$(".btn-danger").removeClass("disabled");
 						$("input.form-control").attr("disabled", "disabled");
 					}
 				});		
 			}
 		});
 	} else {
 		__opcoes = new Array();
 	    goTo("pages/cadpesquisa.html");
 	}
 }

 function goVisualizarPesquisas() {
 	goTo("pages/viewpesquisas.html", function() { 
 		setTitle("Todas as Pesquisas", "Você pode visualizar todas as pesquisas, ordenadas por data de criação");
 		
 		startParse();
 		var query = new Parse.Query(Parse.Object.extend("Pesquisa"));
 		query.find({
		  success : function (data) { 
		  	listarPesquisas(data);  
		  }
		});
 	});
 }
 
 function goCadastrarParticipante() {
 	goTo("pages/cadparticipante.html", function(){
 		setTitle("Cadastrar Participante", "Informe a matricula e o nome do participante");
 	});	
 }

 function goListarParticipantes() {
   goTo("pages/listarparticipantes.html", function (){
     setTitle("Participantes", "Veja abaixo a lista de todos os participantes");
     var listaParticipantes = document.getElementById("listaParticipantes");

     var query = new Parse.Query(Parse.Object.extend("Participante"));
     query.find({
     	success : function (list) {
     		var table = "<table class='table table-striped'>";
     		table += "<thead><td>Matricula</td><td>Nome</nome></thead>";
     		$(list).each( function(i, e) {
     			table += "<tr><td>"+e.get("matricula")+"</td><td>"+e.get("nome")+"</nome></tr>"
     		});
     		table += "</table>";
     		listaParticipantes.innerHTML = table;
     	}
     });
   });
 }

 function goGerarRelatorioPercentualVotacao() {

 }

 /*
    Funcções gerais utilizadas nos menus.
  */

 function viewOpcao(opcao) {
	$(".hide-on-new").hide("slow");
	var opcoes = document.getElementById("newopc");
	
	var textoOpcao = "";
	var imagem;
	
	if (opcao) {
		textoOpcao = opcao.get("textoOpcao");
		imagem = opcao.get("arquivo") ? opcao.get("arquivo").url() : undefined;
	}
	var index = __opcoes.indexOf(opcao);

	opcoes.innerHTML = newOpc.replace("@OPC_TEXT", textoOpcao)
	                         .replace("@OPC_IMG", imagem ? "<img src='"+imagem+"/>" : "")
	                         .replace("@UPDATE_INDEX", index > -1 ? index : undefined);
 }

 function salvarOpcao(index) {
 	var textoOpcao = document.getElementById("itextoOpcao").value;
 	var arquivo = $("#iarquivo")[0];
	if (arquivo.files.length > 0) {
	  var file = arquivo.files[0];
	  var name = randonName();
	 
	  var parseFile = new Parse.File(name, file);
	}
 	
 	var Opcao = Parse.Object.extend("Opcao");
 	var opcao = new Opcao();

 	if (textoOpcao !== "") {
 		opcao.set("textoOpcao", textoOpcao);
 	}

 	if (parseFile) {
 		opcao.set("arquivo", parseFile);
 	}
 	
	if (index !== undefined)
		__opcoes[index] = opcao;
	else
		__opcoes.push(opcao);

	listarOpcoes();
 }

 function alterarOpcao(cod) {
 	viewOpcao(__opcoes[cod]);
 }

function excluirOpcao(cod) {
	__opcoes.splice(cod, 1);
	listarOpcoes();
}

 function listarOpcoes() {
 	document.getElementById("newopc").innerHTML = ""; 
 	var _ = "";
	$(__opcoes).each(function (i, e) {
	    _ += printOpc.replace("@OPC_IMAGE", e.get("arquivo") ? "<img src='"+e.get("arquivo").url()+"' alt='A imagem será carregada assim que a pesquisa for salva.'>" : "")
		             .replace("@OPC_TEXT", e.get("textoOpcao") ? e.get("textoOpcao") : "")
		             .replace("@OPC_COD", __opcoes.indexOf(e))
		             .replace("@OPC_COD", __opcoes.indexOf(e));
	});
	document.getElementById("opcoes").innerHTML = _;
 	$(".hide-on-new").show("slow");
 }

 function salvarPesquisa() {
   if (!__opcoes || __opcoes.length < 2) {
     alert("A pesquisa deve ter ao menos duas opções");
     return;
   } 

   var titulo = document.getElementById("ititulo").value;
   var pergunta = document.getElementById("ipergunta").value;

   if (titulo.trim() === "" || pergunta.trim() === "") {
     alert("Você deve informar todos os campos da pesquisa.");
   } else {
    var objectId = document.getElementById("objectId").value;
	
	Pesquisa = Parse.Object.extend("Pesquisa");
	pesquisa = new Pesquisa();
    
    pesquisa.set("titulo", titulo)	;
    pesquisa.set("pergunta", pergunta);
    pesquisa.set("ativa", false);
    if (objectId)
    	pesquisa.set("objectId", objectId);

    var opcoes = pesquisa.relation("opcoes");     
    $(__opcoes).each(function(i, e) {
        e.set("parent", pesquisa);
     	e.save().then( function() {
     		opcoes.add(e);
     	});
    });

     pesquisa.save().then(homeAdmin);
   }

 }

function listarPesquisas(pesquisas) {
	var pesquisasAtivas = "";
	var pesquisasInativas = "";

	var item = "<div class='container-fluid'>"+
			    "<h3>@TITULO </h3><small>@PERGUNTA</small>"+
			    "<div class='container-inline'>@OPC</div>"+
			    "</div>";
	
	var view = "<button class='btn' data-id='@COD_PESQUISA' onclick='verPesquisa(this)'> <span class='fa fa-info'></span></button>";
	var edit = "<button class='btn' data-id='@COD_PESQUISA' onclick='alterarPesquisa(this)'> <span class='fa fa-edit'></span></button>";
	var ativar = "<button class='btn btn-primary' data-id='@COD_PESQUISA' onclick='ativarPesquisa(this)'> <span class=\'fa fa-bell\'> </span></button>";
	var desativar = "<button class='btn btn-danger' data-id='@COD_PESQUISA' onclick='desativarPesquisa(this)'> <span class='fa fa-bell-slash'></span></button>";
    
    var opc;

	$(pesquisas).each(function(i, e) {
		if (e.get("ativa")) {
			opc = view.replace("@COD_PESQUISA", e.id) +'&nbsp;'+ desativar.replace("@COD_PESQUISA", e.id);
			pesquisasAtivas += item.replace("@TITULO", e.get("titulo"))
			                       .replace("@PERGUNTA", e.get("pergunta"))
			                       .replace("@OPC", opc);
		} else {
			opc = view.replace("@COD_PESQUISA", e.id) + '&nbsp;' + edit.replace("@COD_PESQUISA", e.id) + '&nbsp;' + ativar.replace("@COD_PESQUISA", e.id);
			pesquisasInativas += item.replace("@TITULO", e.get("titulo"))
			                          .replace("@PERGUNTA", e.get("pergunta"))
			                          .replace("@OPC", opc);
		}
	});

	$(".pesquisa-ativa").html(pesquisasAtivas !== "" ? pesquisasAtivas : "Nenhuma pesquisa está ativa no momento.");
	$(".pesquisas").html(pesquisasInativas !== "" ? pesquisasInativas : "Nenhuma Pesquisa encontrada.");
}

 function verPesquisa(element) {
 	query = new Parse.Query(Parse.Object.extend("Pesquisa"));
 	query.equalTo("objectId", element.dataset.id);
 	query.find({
 		success : function (data) {
 			var obj = data[0];
 			goCadastrarPesquisa(obj, true);
 		}, error : function (error) {
 			console.log("error");
 		}
 	});  
 }

 function alterarPesquisa(element) {
 	query = new Parse.Query(Parse.Object.extend("Pesquisa"));
 	query.equalTo("objectId", element.dataset.id);
 	query.find({
 		success : function (data) {
 			var obj = data[0];
 			goCadastrarPesquisa(obj);
 		}, error : function (error) {
 			console.log("error");
 		}
 	});  
 }

 function ativarPesquisa(element) {
 	//startParse();
 	var query = new Parse.Query(Parse.Object.extend("Pesquisa"));
 	//desativar todas as pesquisas
 	query.equalTo("ativa", true);
 	query.find({
 		success : function(data) {
 			$(data).each(function (i,e) {
 				e.set("ativa", false);
 				e.save();
 			});
 		}
 	});
 	// Agora vou ativar a pesquisa selecionada
 	query = new Parse.Query(Parse.Object.extend("Pesquisa"));
 	query.equalTo("objectId", element.dataset.id);
 	query.find({
 		success : function (data) {
 			var obj = data[0];
 			obj.set("ativa", true);
 			obj.save(null, {
 				success : function (a) {
 					goVisualizarPesquisas();
 				}
 			});
 		}, error : function (error) {
 			console.log("error");
 		}
 	});
 }

 function desativarPesquisa(element) {
	query = new Parse.Query(Parse.Object.extend("Pesquisa"));
 	query.equalTo("objectId", element.dataset.id);
 	query.find({
 		success : function (data) {
 			var obj = data[0];
 			obj.set("ativa", false);
 			obj.save(null, {
 				success : function (a) {
 					goVisualizarPesquisas();
 				}
 			});
 		}, error : function (error) {
 			console.log("error");
 		}
 	});
 }

 function salvarParticipante() {
 	var matricula = document.getElementById("imatricula").value;
 	var nome = document.getElementById("inome").value;

 	var Participante = Parse.Object.extend("Participante");
 	var participante = new Participante();

 	participante.set("matricula", matricula);
 	participante.set("nome", nome);
 	participante.set("ativo", true);

 	participante.save().then(homeAdmin);
 }

//////////////////////

function randonName() {
	//TODO criar um nome único.
	return "arquivo.png";
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

			if (Parse.User.current()) {
				$(".logoff").fadeIn();
			} else {
				$(".logoff").fadeOut();
			}
			
			loading.hide();
		}
	}
	xmlhttp.open("GET", page, true);
	xmlhttp.send();
}

function setTitle(title, subtitle) {
	$(".page-title").html(title);
	$(".page-subtitle").html(subtitle);
}

function startParse() {
	Parse.initialize("c0ppHCN9En9JFhExK7H7HaYZeRNNOGnHCjCvTnyE", "PQrtHfb683zjR9pSHHwzeyWO34uT3mFZqpPQHeAK");
}

