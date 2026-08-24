export interface ProjectRow {
  name: string;
  loc: string;
  client: string;
  scope: string;
  category: "fittings" | "controls";
}

const RAW: [string, string, string, string, "f" | "c"][] = [
  ["Ritz Carlton Hotel", "Riyadh", "The Ritz Carlton, Riyadh", "Supply of light fittings", "f"],
  ["National Guard Housing Project", "Riyadh", "SALINI", "Supply of light fittings to 5,300 soldier villas", "f"],
  ["King Fahad International Airport", "Dammam", "Dammam Airport Company — DACO", "Supply & installation of light fittings", "f"],
  ["King Faisal Air Academy", "Majma’a, Riyadh", "BSS JV (Bawani, Salini, SAJCO)", "Supply of indoor & outdoor light fittings", "f"],
  ["Four Points by Sheraton", "Riyadh", "Saudi Icon", "Supply & commissioning of KNX lighting control systems", "c"],
  ["Solitaire Mall", "Riyadh", "Bin Dayel Contracting", "Supply of indoor & outdoor light fittings", "f"],
  ["Dr. Sulayman Al Habib Private Palace", "Riyadh", "Masah Contracting", "Supply & commissioning of EIB / KNX lighting control & home automation system", "c"],
  ["King Faisal Hospital", "Riyadh", "Alshawaf International Co. — Al Bawani", "Supply of outdoor light fittings", "f"],
  ["Batha Access — Saudi Customs Offices Project", "KSA access with UAE", "Al Harthy Contracting", "Supply of light fittings", "f"],
  ["Yamama University Al Khobar — General Auditing Bureau", "Al Khobar", "Khaldia Hallstage", "Supply of indoor light fittings", "f"],
  ["Al Waha Private School", "Riyadh", "Khaldia Stages", "Supply of light fittings", "f"],
  ["Yamama Cement Factory", "Riyadh", "Khaldia Stages", "Supply of light fittings", "f"],
  ["Samarkandi Villa Project", "Riyadh", "Ojeil", "Supply of light fittings", "f"],
  ["Al Subaie Private Villa", "Riyadh", "ADEX", "Supply of light fittings", "f"],
  ["Schools Hall Stages", "Riyadh", "Khaldia Stages", "Supply of light fittings", "f"],
  ["Education Administration Building Project", "Riyadh", "Mallouh Al Mallouhi Est.", "Supply of light fittings", "f"],
  ["Dirriyah Farm Golf Club House", "Riyadh", "First Fix Contracting", "Supply of indoor & outdoor light fittings", "f"],
  ["Milling Company MC-2", "Riyadh", "Energy Wave Contracting", "Supply & commissioning of KNX lighting control systems", "c"],
  ["LADUN Center", "Riyadh", "DAYMAT", "Supply of light fittings", "f"],
  ["Delfino Mayfair Restaurant", "Riyadh", "Saudi Icon", "Supply of EIB / KNX lighting control system", "c"],
  ["JAQCD Dirriyah", "Riyadh", "MAN Enterprise Al-Saudia LLC", "Supply, installation & configuration of solar cameras", "c"],
  ["Burn Treatment Center", "Al Ahsa", "FEMCO", "Supply of indoor light fittings", "f"],
  ["Demos Office", "Riyadh", "Masharia Al Ula", "Supply of decorative pendant lights", "f"],
  ["Labor Camp of King Faisal Air Academy Project", "Majma’a, Riyadh", "Saudi Tab Construction Company", "Supply of light fittings", "f"],
  ["Rahmania Villas", "Riyadh", "Restart Co.", "Supply & commissioning of KNX lighting control, IP intercom, smart locks, WiFi & network system", "c"],
  ["Fahad Al Suhaim Private Villa", "Riyadh", "Restart Co.", "Supply & commissioning of KNX lighting control, IP intercom, smart locks, WiFi & network system", "c"],
  ["Turki Al Suhaim Private Villa", "Riyadh", "Restart Co.", "Supply & commissioning of KNX lighting control, IP intercom, smart locks, WiFi & network system", "c"],
  ["Dr. Abdullah Bin Abdel Mohsen Private Villa", "Riyadh", "—", "Supply of indoor & outdoor light fittings", "f"],
  ["Dr. Hawaf Private Palace", "Riyadh", "Seder MEP Group", "Supply & commissioning of EIB / KNX lighting control & home automation system", "c"],
  ["Al Jomaih Private Offices", "Riyadh", "Ojeil", "Supply of light fittings", "f"],
  ["Seder Head Quarter Building", "Riyadh", "Seder Construction", "Supply of indoor & outdoor light fittings", "f"],
  ["TBC Project", "Hafr Al Batin", "Shroff For Contracting Co.", "Supply of light fittings", "f"],
  ["TBC Project", "Shaqra, Riyadh", "Emar Al Faraa", "Supply of light fittings", "f"],
  ["TBC Project", "Turaif", "Gyadin", "Supply of light fittings", "f"],
  ["TBC Project", "Al Ahsa, East Region", "Yousef Al Ali Contracting", "Supply of light fittings", "f"],
];

export const PROJECT_ROWS: ProjectRow[] = RAW.map(([name, loc, client, scope, cat]) => ({
  name,
  loc,
  client,
  scope,
  category: cat === "f" ? "fittings" : "controls",
}));
