import { Team } from "./team.model";

export class Game {
    date: string;
    home_team: Team;
    home_team_score: number;
    id: number;
    period: number;
    postseason: number;
    season: number;
    status: string;
    time: string;
    visitor_team: Team;
    visitor_team_score: number;
    winnerTeam: number;

    constructor(date: string, home_team : Team,home_team_score : number, id : number, period : number, postseason : number, season : number, status : string, time : string, visitor_team : Team, visitor_team_score : number ){
        this.date = date;
        this.home_team = home_team;
        this.home_team_score = home_team_score;
        this.id = id;
        this.period = period;
        this.postseason = postseason;
        this.season = season;
        this.status = status;
        this.time = time;
        this.visitor_team = visitor_team;
        this.visitor_team_score = visitor_team_score;
        this.winnerTeam = this.home_team_score > this.visitor_team_score ? this.home_team.id : this.visitor_team.id;
    }

}