"use strict";

function Menu(teclado) {
    this.teclado = teclado;
}

Menu.prototype = {
    atualizar: function () {
        document.getElementById(menu[selectedMenu]).removeAttribute("class");

        if (this.teclado.pressionada(SETA_ABAIXO)) {
            if ( selectedMenu < menu.length-1 ) {
                selectedMenu++;
            } else {
                selectedMenu = 0;
            }
        } else if (this.teclado.pressionada(SETA_ACIMA)) {
            if (selectedMenu === 0)
                selectedMenu - menu.length-1;
            else
                selectedMenu--;
        } else if (this.teclado.pressionada(ENTER)) {
            this.processar();
        }

        this.desenhar();
    },

    desenhar: function () {
        document.getElementById(menu[selectedMenu]).setAttribute("class", "selected");

    },

    processar: function (){
        alert(menu[selectedMenu]);
    }
}