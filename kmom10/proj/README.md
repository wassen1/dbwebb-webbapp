<!--
#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#  KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
#
-->

## **_Particle Finder_**

# Specifikation

> Appen som visar partikelförekomst i luften samt väderprognos.

`Particle Finder` visar partikeldata förekommande från hela världen samt vid inloggning även väderprognoser.

# Datakällor

-   Partikeldata hämtas från [luftdata.se]´s öppna data.
-   Väderprognoserna är baserade på [SMHI]´s öppna data.

# Arkitektur

Appen är skriven med `JavaScript`ramverket [mithril] som en single page aplication (SPA). Aplikationen är utvecklad i mobilutvecklingsramverket [Cordova] för androidenheter samt för webben. Följande [Cordova plugin] har använts: [device], [file], [geolocation], [network-information], [splashscreen] samt [whitelist]. `CSS`en är skriven med [SASS].

Koden är uppdelad i huvudsakligen tre kategorier:

-   views
-   models
-   components

I `views` finns de filer som ansvarar för visningen av aplikationens respektive sidor. `Models` är de filer som utför någon typ av trafik mot servrar. Samt `components` innehåller återanvändbara element som används i vyerna.

Koden bundlas ihop med hjälp av [webpack] till filerna `app.js` eller `bundle.min.js` och laddas sedan in i `index.html`.

```
Copyright © 2019 Fredrik Wassermeyer, kontakt@wassemann.se
```

[luftdata.se]: https://luftdata.se/
[smhi]: http://opendata.smhi.se/apidocs/metfcst/index.html
[mithril]: https://mithril.js.org/
[cordova]: http://cordova.apache.org/docs/en/latest/guide/overview/
[webpack]: https://webpack.js.org/
[sass]: https://sass-lang.com/
[cordova plugin]: https://cordova.apache.org/docs/en/9.x/guide/overview/#plugins
[device]: https://www.npmjs.com/package/cordova-plugin-device
[file]: https://www.npmjs.com/package/cordova-plugin-file
[geolocation]: https://www.npmjs.com/package/cordova-plugin-geolocation
[network-information]: https://www.npmjs.com/package/cordova-plugin-network-information
[splashscreen]: https://www.npmjs.com/package/cordova-plugin-splashscreen
[whitelist]: https://www.npmjs.com/package/cordova-plugin-whitelist
