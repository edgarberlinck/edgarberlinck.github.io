Parse.initialize("uqtak0NIPXo9p6YhxGsJsWc8KuY1nRWuXdftHHTj","ekid6tq3RgD2i1lHMePpsFSobHawbFIH1NuUNrde");

var DIAS_SEMANA = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
var campanha = undefined;

$(document).ready(function(){
    $('#wizard').smartWizard({
        selected: 0,  // Selected Step, 0 = first step   
        keyNavigation: true, // Enable/Disable key navigation(left and right keys are used if enabled)
        enableAllSteps: false,  // Enable/Disable all steps on first load
        transitionEffect: 'fade', // Effect on navigation, none/fade/slide/slideleft
        contentURL:null, // specifying content url enables ajax content loading
        contentCache:true, // cache step contents, if false content is fetched always from ajax url
        cycleSteps: false, // cycle step navigation
        enableFinishButton: false, // makes finish button enabled always
        errorSteps:[],    // array of step numbers to highlighting as error steps
        labelNext:'Próximo', // label for Next button
        labelPrevious:'Anterior', // label for Previous button
        labelFinish:'Finalizar',  // label for Finish button        
        // Events
        onLeaveStep: leaveAStep, // triggers when leaving a step
        onShowStep: onShowAStep,  // triggers when showing a step
        onFinish: onFinish  // triggers when Finish button is clicked
    });

    doInitialize();
});

function leaveAStep (obj){
  var step_num = obj.attr('rel'); 
  return validateSteps(step_num); 
}

function onFinish(){
  if(validateAllSteps()){
    // Enviar objeto para o parse
  }
}

function onShowAStep(obj) {
  var step_num = obj.attr('rel');
  return configureStep(step_num);
}

function validateSteps(stepnumber){
  var isStepValid = true;
  // validate step 1
  if(stepnumber == 1){
    //Lógica para o 1º passo
  }

  if(stepnumber == 2){
    var periodicidade = $("[name=periodicidade]:checked").val();
    if (periodicidade === "S") {
      var weekDays = $("[name=diaSemana]:checked");
      isStepValid = weekDays.length > 0;
    } else if (periodicidade === "U"){
      var data = $("#data").val();
      isStepValid = validateDate(data);
    } else {
      isStepValid = false;
    }
  }

  if(stepnumber == 3){
    //Lógica para o 3º passo
  }

  return isStepValid;
}

function validateAllSteps(){
  var isStepValid = true;
  /*
    Validar todas as informações necessárias
  */
  return isStepValid;
} 

function configureStep(stepnumber) {
  var isConfigurationOK = true;

  if (stepnumber == 3) {
    var controls = "";
    $("[name=diaSemana]:checked").each(function(index, element){
      controls += "<div>";
      controls += "<span>";
      controls += DIAS_SEMANA[element.value]+" <input type='text' id='"+element.value+"' name='descontoSemana'>";
      controls += "</span>";
      controls += "</div>";
    });
    $("#diasSemana").attr("innerHTML", controls);
  }

  return isConfigurationOK;
}

function validateDate(aDate) {
  return true;
}

function doInitialize() {
  var Campanha = Parse.Object.extend("Campanha", {
    isValid: function() {
      //TODO validar atributos
      return true;
    }
  });

  campanha = new Campanha();
  campanha.set("descricao", "");
  campanha.set("periodicidade", "S");
  campanha.set("diasSemana", []);
  campanha.set("data", "");
  campanha.set("beneficio", []);
  campanha.set("imgCampanha", "");
}