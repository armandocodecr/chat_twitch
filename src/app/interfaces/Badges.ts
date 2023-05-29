//MY BADGES

export interface IMyBadges {
    set_id:   string;
    versions: Version[];
}

export interface Version {
    id:           string;
    image_url_1x: string;
    image_url_2x: string;
    image_url_4x: string;
    title:        string;
    description:  string;
    click_action: string | null;
    click_url:    string | null;
}

//BADGES GLOBALS

export interface IBadgesGlobal {
    data: Datum[];
}

export interface Datum {
    set_id:   string;
    versions: Version[];
}

export interface Version {
    id:           string,
    image_url_1x: string,
    image_url_2x: string,
    image_url_4x: string,
    title:        string,
    description:  string,
    click_action: string | null,
    click_url: string | null,
}

