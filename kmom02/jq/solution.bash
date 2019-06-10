#!/usr/bin/env bash

file='tag-dbwebb.json'


# 1. Hitta de 'keys' som finns i filen. Lägg svaret i filen 'a.txt'.
jq 'keys' tag-dbwebb.json | tee a.txt
# 2. Vilket värde har meta.code som är statuskoden för HTTP requesten (b.txt)?
jq '.meta.code' $file | tee b.txt
# 3. Filen innehåller en länk till nästa resultat i flödet, en så kallad pagination. Visa länken till nästa länk (next_url) (c.txt).
jq '.pagination.next_url' $file | tee c.txt
# 4. Hur många ‘likes’ har den tionde bilden (d.txt).
jq '.data[9].likes.count' $file | tee d.txt
# 5. Vilka taggar (tags) har den första bilden (e.txt).
jq '.data[0].tags | .[]' $file | tee e.txt
# 6. Visa detaljer om den användare (user) som lagt upp den första bilden (f.txt).
jq '.data[0].user | .[]' $file | tee f.txt
# 7. Den första bilden är tagen på en viss plats (location) som har ett visst namn (name), vilket (g.txt)?
jq '.data[0].location.name' $file | tee g.txt
# 8. Den första bilden har en kommentar (comments), visa texten (text) för kommentaren (h.txt).
jq '.data[0].comments.data[0].text' $file | tee h.txt
# 9. Den första bilden har flera likes. Visa namnet på den andra personen som gjorde like på bilden (i.txt).
jq '.data[0].likes.data[1].full_name' $file | tee i.txt
# 10. Visa länken till den första bilden som är av standard_resolution (j.txt).
jq '.data[0].images.standard_resolution.url' $file | tee j.txt
# 11. Användaren alkifaey har gjort en kommentar. Använd användarnamnet och visa själva kommentaren (text) (k.txt).
jq '.data[].comments.data[] | select(.from.username == "alkifaey") | .text' $file | tee k.txt
# 12. Lista länkarna (link) till bilderna som användaren ‘tobhed’ har kommenterat (l.txt).
jq '.data[] | select(.comments.data[].from.username == "tobhed") | .link' $file | tee l.txt
# 13. Lista länkarna till de bilder med fler ‘likes’ än 7 (m.txt).
jq '.data[] | select(.likes.count > 7) | .link' $file | tee m.txt
# 14. Lista länkarna till de bilder som har fler än 5 ‘likes’ och minst 1 ‘comment’ (n.txt).
jq '.data[] | select(.likes.count > 5) | select(.comments.count > 0) | .link' $file | tee n.txt
# 15. Hitta användarnamnen (username) på de användare som likeat bilden som är tagen på ‘Studentviken’ (location “Studentviken”) (o.txt).
jq '.data[] | select(.location.name == "Studentviken") | .likes.data[].username' $file | tee o.txt