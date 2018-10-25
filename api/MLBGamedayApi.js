var XMLParser = require('react-xml-parser');


export default class MLBGamedayApi {

    constructor() {}
        
    //https://gd2.mlb.com/components/game/mlb/year_2018/month_05/day_24

    static getDayURL(year, month, day) {
        //Convert month and day into 2 digit format ...
        if (month < 10) { month = "0" + month; }
        if (day < 10) { day = "0" + day; }
        
        //format the url
        return `${MLBGamedayApi.BaseURL}/components/game/mlb/year_${year}/month_${month}/day_${day}/`;
        }

        static getListOfGamesForDay(year, month, day) {
            var epgURL = MLBGamedayApi.getDayURL(year, month, day) + "epg.xml";
            return fetch (epgURL)
                .then(function(response) { return response.text(); })
                .then(function(text) { return MLBGamedayApi.parseXML(text) })
                .then(function(data) {
                    var games = data.getElementsByTagName("game");
                    var urls = games.map(function(game) {
                        var url = game.attributes["game_data_directory"];
                        var awayTeamID = game.attributes["away_file_code"];
                        var homeTeamID = game.attributes["home_file_code"];
                        var awayTeamName = game.attributes["away_team_name"];
                        var homeTeamName = game.attributes["home_team_name"];
                        return { 
                            url: url, 
                            key: url,
                            awayTeamID: awayTeamID,
                            homeTeamID: homeTeamID,
                            awayTeamName: awayTeamName,
                            homeTeamName: homeTeamName,
                        };
                    });

                    return Promise.resolve(urls);
                })
                //TODO
        }

        static parseXML(s) {
            var xml = new XMLParser().parseFromString(s);
            return Promise.resolve(xml);
        }


    }

MLBGamedayApi.BaseURL = "https://gd2.mlb.com";

/*
fetch(epgURL)
.then(function(response) { return response.json(); })
*/
