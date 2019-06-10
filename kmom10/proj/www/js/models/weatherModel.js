import m from "mithril";
var searchXHR = null;

function abortPreviousSearch() {
    if (searchXHR !== null) {
        searchXHR.abort();
    }
    searchXHR = null;
}

var weatherModel = {
    symbolLabel: new Map([
        [1, "Klart"],
        [2, "Lätt molninghet"],
        [3, "Halvklart"],
        [4, "Molnigt"],
        [5, "Mycket moln"],
        [6, "Mulet"],
        [7, "Dimma"],
        [8, "Lätt regnskur"],
        [9, "Regnskur"],
        [10, "Kraftig regnskur"],
        [11, "Åskskur"],
        [12, "Lätt by av regn och snö"],
        [13, "By av regn och snö"],
        [14, "Kraftig by av regn och snö"],
        [15, "Lätt snöby"],
        [16, "Snöby"],
        [17, "Kraftig snöby"],
        [18, "Lätt regn"],
        [19, "Regn"],
        [20, "Kraftigt regn"],
        [21, "Åska"],
        [22, "Lätt snöblandat regn"],
        [23, "Snöblandat regn"],
        [24, "Kraftigt snöblandat regn"],
        [25, "Lätt snöfall"],
        [26, "Snöfall"],
        [27, "Ymnigt snöfall"],
    ]), /* eslint-disable max-len */
    symbolText: new Map([
        [1, "Det är molnfritt eller bara några obetydliga molntussar. Det innebär soligt väder på dagen och stjärnklart på natten."],
        [2, "En stor del av himlen kan vara täckt av molnslöjor, men de är i så fall så tunna att de inte skymmer solen nämnvärt. På natten kan man se åtminstone de ljusaste stjärnorna genom molnslöjorna. Om det är fråga om tjockare moln så täcker de högst en fjärdedel av himlen."],
        [3, "Omkring halva himlen är täckt men det kan vara mer än så om molnen bara är tunna. På sommarhalvåret varierar molnigheten en hel del så att solens skyms till och ifrån. Då handlar det ofta om stackmoln och det kan ofta beskrivas som växlande molnighet."],
        [4, "Det är mycket moln på himlen och solen kanske bara skymtar fram i någon glugg. Symbolen kan innebära att stackmolnen håller på att växa till under dagen och det kan leda till någon regnskur så småningom. Symbolen förekommer ibland även när ett molntäcke lättar eller när molnigheten ökar."],
        [5, "Himlen är heltäckt men det är ändå ganska tunna moln som släpper igenom en del sol."],
        [6, "Himlen är helt täckt med tjocka moln och ofta är himlen helt grå. Det kan möjligen komma någon droppe regn eller på vintern någon snöflinga."],
        [7, "Dimmsymbolen visar när det är dålig sikt under 1000 meter och det kan vara i samband med både mulna och klara vädersituationer. I det senare fallet handlar det om dimbankar. Dimmsymbolen förekommer enbart när det är uppehåll."],
        [8, "Mycket moln och lätt regn. Med lätt nederbörd menas regnmängder på 0,5 mm eller mindre på en timme.  Vanligen beskriver symbolen skurar och på sommarhalvåret innebär det skurmoln/bymoln som bildats ur stackmoln som växt och tornat upp sig. Symbolen kan också beskriva ett förlopp med sol följt av regn eller regn som slutar och följs av sol."],
        [9, "Mycket moln och regn eller regnskurar. Symbolen avser måttlig nederbörd och med det menas regnmängder på 0,5-4 mm på en timme.  Vanligen beskriver symbolen skurar under sommarhalvåret och det innebär skurmoln/bymoln som bildats ur stackmoln som växt och tornat upp sig. Symbolen kan också beskriva ett förlopp med sol följt av regn eller regn som slutar och följs av sol."],
        [10, "Mycket moln och regn eller regnskurar. Med kraftig nederbörd menas regnmängder på mer än 4 mm på en timme.  Vanligen beskriver symbolen skurar under sommarhalvåret och det innebär skurmoln/bymoln som bildats ur stackmoln som växt och tornat upp sig. Åska kan då även förekomma. Symbolen kan också beskriva ett förlopp med sol följt av regn eller regn som slutar och följs av sol."],
        [11, "Mycket moln och regnskurar med stor risk för åska. I samband med åska är ofta regnskurarna kraftiga och det kan förekomma hagel. Symbolen beskriver också ett förlopp med sol följt av åskregn eller åskregn som slutar och följs av sol."],
        [12, "Mycket moln och byar av regn eller snö blandat. Med lätt nederbörd menas mängder i smält form på 0,5 mm eller mindre på en timme.  Symbolen beskriver också ett förlopp med sol följt av snöblandat regn eller snöblandat regn som slutar och följs av sol."],
        [13, "Mycket moln och byar av regn eller snö blandat. Symbolen avser måttlig nederbörd och med det menas mängder i smält form på 0,5-4 mm på en timme. Symbolen beskriver också ett förlopp med sol följt av snöblandat regn eller snöblandat regn som slutar och följs av sol."],
        [14, "Mycket moln och byar av regn eller snö blandat. Med kraftig nederbörd menas mängder i smält form på mer än 4 mm på en timme. Symbolen beskriver också ett förlopp med sol följt av snöblandat regn eller snöblandat regn som slutar och följs av sol."],
        [15, "Mycket moln och snöbyar eller tidvis snöfall. Med lätt nederbörd menas mängder i smält form på 0,5 mm eller mindre på en timme.  Symbolen beskriver också ett förlopp med sol följt av snöfall eller snöfall som slutar och följs av sol."],
        [16, "Mycket moln och snöbyar eller tidvis snöfall. Symbolen avser måttlig nederbörd och med det menas mängder i smält form på 0,5-4 mm på en timme. Symbolen beskriver också ett förlopp med sol följt av snöfall eller snöfall som slutar och följs av sol."],
        [17, "Mycket moln och snöbyar. Med kraftig nederbörd menas mängder i smält form på mer än 4 mm på en timme.  Symbolen beskriver också ett förlopp med sol följt av snöfall eller snöfall som slutar och följs av sol."],
        [18, "Mulet och lätt regn, ihållande eller tidvis. Med lätt nederbörd menas regnmängder på 0,5 mm eller mindre på en timme."],
        [19, "Mulet och regn eller regnskurar. Symbolen avser måttlig nederbörd och med det menas regnmängder på 0,5-4 mm på en timme."],
        [20, "Mulet och regn eller regnskurar. Med kraftig nederbörd menas regnmängder på mer än 4 mm på en timme.  På sommaren kan det i samband med kraftigt regn även vara en viss åskrisk."],
        [21, "Himlen är helt täckt av moln och det kommer regn eller skurar med stor risk för åska. I samband med åska är ofta regnskurarna kraftiga och det kan förekomma hagel."],
        [22, "Himlen är helt täckt av moln och det kommer regn eller snö blandat, ihållande eller med avbrott. Med lätt nederbörd menas mängder i smält form på 0,5 mm eller mindre på en timme."],
        [23, "Himlen är helt täckt av moln och det kommer regn eller snö blandat, ihållande eller med avbrott. Symbolen avser måttlig nederbörd och med det menas mängder i smält form på 0,5-4 mm på en timme."],
        [24, "Himlen är helt täckt av moln och det kommer regn eller snö blandat, ihållande eller med avbrott. Med kraftig nederbörd menas mängder i smält form på mer än 4 mm på en timme."],
        [25, "Himlen är helt täckt av moln och det kommer snö. Snöfallet kan vara ihållande eller med avbrott.  Med lätt nederbörd menas mängder i smält form på 0,5 mm eller mindre på en timme. Det motsvarar mindre än 1 cm snö."],
        [26, "Himlen är helt täckt av moln och det kommer snö. Snöfallet kan vara ihållande eller med avbrott. Symbolen avser måttlig nederbörd och med det menas mängder i smält form som motsvarar 0,5-4 mm på en timme. En generell tumregel är att varje mm motsvarar 1 cm snö, men det kan vara mer än så om det är riktigt kallt."],
        [27, "Himlen är helt täckt av moln och det kommer snö. Snöfallet kan vara ihållande eller med avbrott.  Med ymnigt snöfall menas mängder som i smält form motsvarar mer än 4 mm på en timme.  En generell tumregel är att varje mm motsvarar 1 cm snö, men det kan vara mer än så om det är riktigt kallt."],
    ]), /* eslint-enable max-len */
    currentWeather: {},
    getWeather: (lat, lng) => {
        abortPreviousSearch();

        lat = Math.round(lat * Math.pow(10, 6)) / Math.pow(10, 6);
        lng = Math.round(lng * Math.pow(10, 6)) / Math.pow(10, 6);
        let url = encodeURIComponent(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lng}/lat/${lat}/data.json`); // eslint-disable-line max-len

        return m.request({
            url: "http://www.student.bth.se/~efostud/api-proxy/proxy.php?url=" + url,
            method: "GET",
            config: function (xhr) { searchXHR = xhr }, // eslint-disable-line semi
        })
            .then(function (result) {
                if (result) {
                    weatherModel.currentWeather = result;
                }
            }).catch(function (e) {
                console.error(e.message);
            });
    },
};

export default weatherModel;
