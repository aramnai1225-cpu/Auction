function registerAuction(item, date){

    let regNumber =
    "AUC" +
    Math.floor(
    Math.random()*100000
    );

    let auction = {

        item:item,
        date:date,
        regNumber:regNumber
    };

    let auctions =
    JSON.parse(
    localStorage.getItem(
    "registeredAuctions"
    )) || [];

    auctions.push(auction);

    localStorage.setItem(
    "registeredAuctions",
    JSON.stringify(auctions)
    );

    alert(
    "Auction Registered!\nYour Registration Number: "
    + regNumber
    );
}