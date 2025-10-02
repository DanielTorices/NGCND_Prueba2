/* eslint-disable no-console */
sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("zlaunchpad.controller.MainView", {
      onInit: function () {},
      onNavigateToPartidasIndividualesLibroMayor: function () {
        // eslint-disable-next-line fiori-custom/sap-no-hardcoded-url, fiori-custom/sap-no-localhost, fiori-custom/sap-no-location-usage
        window.location.href = "https://orange-island-03edf1a10.2.azurestaticapps.net/";
      },
      onNavigateToSaldosCuentasMayor: function () {
        // eslint-disable-next-line fiori-custom/sap-no-hardcoded-url, fiori-custom/sap-no-localhost, fiori-custom/sap-no-location-usage
        window.location.href = "http://localhost:8082/index.html";
      },
      onNavigateToApp: function (oEvent) {
        // Obtenemos el ID del GenericTile que fue presionado
        const sTileId = oEvent.getSource().data("tileKey");
        console.log("Tile seleccionado",sTileId);
        // Usamos el switch para redirigir según el ID
        switch (sTileId) {
          case "VisualizarDocumentos":
            // eslint-disable-next-line fiori-custom/sap-no-hardcoded-url, fiori-custom/sap-no-localhost, fiori-custom/sap-no-location-usage
            window.location.href = "http://localhost:8081/index.html";
            break;
          case "PartidasIndividualesLibroMayor":
            // eslint-disable-next-line fiori-custom/sap-no-hardcoded-url, fiori-custom/sap-no-localhost, fiori-custom/sap-no-location-usage
            window.location.href = "http://localhost:8082/index.html";
            break;
          case "SaldosCuentasMayor":
            // eslint-disable-next-line fiori-custom/sap-no-hardcoded-url, fiori-custom/sap-no-localhost, fiori-custom/sap-no-location-usage
            window.location.href = "http://localhost:8083/index.html";
            break;
          default:
            // Opcional: Manejar el caso por defecto si no se encuentra el ID
            console.error("ID de GenericTile no reconocido:", sTileId);
            break;
        }
      },
      onSearch: function (oEvent) {
        var sQuery = oEvent.getParameter("newValue").toLowerCase(); // Texto de búsqueda

        // 1. Obtenemos el ObjectPageLayout raíz
        var oPage = this.byId("_IDGenObjectPageLayout1");

        // 2. Buscamos todas las SubSections (recursivamente)
        var aSubSections = oPage.findAggregatedObjects(
          true,
          function (oControl) {
            return oControl.isA("sap.uxap.ObjectPageSubSection");
          }
        );

        // 3. Recorremos cada SubSection
        aSubSections.forEach(function (oSubSection) {
          var aBlocks = oSubSection.getBlocks(); // Bloques de cada SubSection

          // 4. Recorremos cada bloque
          aBlocks.forEach(function (oBlock) {
            if (oBlock.isA("sap.m.GenericTile")) {
              // Solo si es GenericTile
              var sHeader = oBlock.getHeader() || "";
              var sSubheader = oBlock.getSubheader() || "";

              // 5. Verificamos coincidencia
              var bVisible =
                sHeader.toLowerCase().includes(sQuery) ||
                sSubheader.toLowerCase().includes(sQuery);

              // 6. Mostramos u ocultamos el tile
              oBlock.setVisible(bVisible);
            }
          });
        });
      },
      onSearch1: function (oEvent) {
        // 1. Obtener el valor del campo de búsqueda y convertirlo a minúsculas
        var sQuery = oEvent.getParameter("newValue").toLowerCase();

        // 2. Obtener el IconTabBar por su ID
        var oIconTabBar = this.byId("idIconTabBar");

        // 3. Obtener todos los IconTabFilter del IconTabBar
        var aIconTabFilters = oIconTabBar.getItems();

        // 4. Recorrer cada IconTabFilter
        aIconTabFilters.forEach(function (oIconTabFilter) {
          // 5. Obtener los controles dentro del IconTabFilter (en este caso, el FlexBox)
          var aContent = oIconTabFilter.getContent();

          // 6. Recorrer el contenido del IconTabFilter
          aContent.forEach(function (oContent) {
            // Verificar si el control es un FlexBox
            if (oContent.isA("sap.m.FlexBox")) {
              // 7. Obtener los GenericTiles dentro del FlexBox
              var aGenericTiles = oContent.getItems();

              // 8. Recorrer cada GenericTile
              aGenericTiles.forEach(function (oGenericTile) {
                var sHeader = oGenericTile.getHeader() || "";
                var sSubheader = oGenericTile.getSubheader() || "";

                // 9. Verificar si el texto del encabezado o subencabezado coincide con la búsqueda
                var bVisible =
                  sHeader.toLowerCase().includes(sQuery) ||
                  sSubheader.toLowerCase().includes(sQuery);

                // 10. Mostrar u ocultar el GenericTile
                oGenericTile.setVisible(bVisible);
              });
            }
          });
        });
      },
    });
  }
);
