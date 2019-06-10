/* global menu */

"use strict";

var presentation = (function() {
    var showPresentation = function() {
        window.mainContainer.innerHTML = "";

        /* eslint-disable max-len */
        const markup = `
      <main>
          <header>
            <h1 class="title">Redovisning</h1>
          </header>
          <article>
          
              <h2>kmom01</h2>

              <h4>Är du sedan tidigare bekant med utveckling av mobila appar?</h4>
              <p>Jag har tidigare utvecklad en app för App Store. Men det var i Objective-C och långt ifrån webbens tekniker som används i denna kurs. Utvecklingsmiljön i denna kurs känns som mer den jag är van vid från tidigare webb kurser och webbprogramming i allmänhet.</p>

              <h4>Vilket är den viktigaste lärdomen du gjort om typografi för mobila enheter?</h4>
              <p>Hur viktikt det är med vita utrymmen (whitespace) för att klumpa ihop besläktade element. Vita utrymmen ger dessutom ett luftigare utseende, som känns mer modernt.</p>

              <h4>Du har i kursmomentet hämtat data från två stycken API. Hur kändes detta?</h4>
              <p>Att med XMLHttpRequest och fetch hämta data från de två API fungerade bra. Dokumentationen för Githubs API var från början överväldigande, men med lite tillvänning gick det att få fram det jag sökte. Ger stora möjligheter med API:er där man frikopplad från implementeringen kan få fram snygga klienter. Blir spännande att jobba vidare med detta i kommande kursmoment.</p>
          </article>
      </main>
    `;

        /* eslint-enable max-len */
        window.mainContainer.innerHTML = markup;
        window.rootElement.appendChild(window.mainContainer);

        menu.showMenu("people");
    };

    return {
        showPresentation: showPresentation
    };
})(presentation);
