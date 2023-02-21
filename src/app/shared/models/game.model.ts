import { Team } from "./team.model";

export interface Game {
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

}