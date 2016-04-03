var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("app/utils", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Utils;
    return {
        setters:[],
        execute: function() {
            Utils = (function () {
                function Utils() {
                }
                Utils.isNumber = function (n) {
                    return /^\d+$/.test(n);
                };
                return Utils;
            }());
            exports_1("Utils", Utils);
        }
    }
});
System.register("app/timezones", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Timezones;
    return {
        setters:[],
        execute: function() {
            Timezones = (function () {
                function Timezones() {
                }
                Timezones.TIMEZONES = [
                    "africa/abidjan",
                    "africa/accra",
                    "africa/addis_ababa",
                    "africa/algiers",
                    "africa/asmara",
                    "africa/asmera",
                    "africa/bamako",
                    "africa/bangui",
                    "africa/banjul",
                    "africa/bissau",
                    "africa/blantyre",
                    "africa/brazzaville",
                    "africa/bujumbura",
                    "africa/cairo",
                    "africa/casablanca",
                    "africa/ceuta",
                    "africa/conakry",
                    "africa/dakar",
                    "africa/dar_es_salaam",
                    "africa/djibouti",
                    "africa/douala",
                    "africa/el_aaiun",
                    "africa/freetown",
                    "africa/gaborone",
                    "africa/harare",
                    "africa/johannesburg",
                    "africa/juba",
                    "africa/kampala",
                    "africa/khartoum",
                    "africa/kigali",
                    "africa/kinshasa",
                    "africa/lagos",
                    "africa/libreville",
                    "africa/lome",
                    "africa/luanda",
                    "africa/lubumbashi",
                    "africa/lusaka",
                    "africa/malabo",
                    "africa/maputo",
                    "africa/maseru",
                    "africa/mbabane",
                    "africa/mogadishu",
                    "africa/monrovia",
                    "africa/nairobi",
                    "africa/ndjamena",
                    "africa/niamey",
                    "africa/nouakchott",
                    "africa/ouagadougou",
                    "africa/porto-novo",
                    "africa/sao_tome",
                    "africa/timbuktu",
                    "africa/tripoli",
                    "africa/tunis",
                    "africa/windhoek",
                    "america/adak",
                    "america/anchorage",
                    "america/anguilla",
                    "america/antigua",
                    "america/araguaina",
                    "america/argentina/buenos_aires",
                    "america/argentina/catamarca",
                    "america/argentina/comodrivadavia",
                    "america/argentina/cordoba",
                    "america/argentina/jujuy",
                    "america/argentina/la_rioja",
                    "america/argentina/mendoza",
                    "america/argentina/rio_gallegos",
                    "america/argentina/salta",
                    "america/argentina/san_juan",
                    "america/argentina/san_luis",
                    "america/argentina/tucuman",
                    "america/argentina/ushuaia",
                    "america/aruba",
                    "america/asuncion",
                    "america/atikokan",
                    "america/atka",
                    "america/bahia",
                    "america/bahia_banderas",
                    "america/barbados",
                    "america/belem",
                    "america/belize",
                    "america/blanc-sablon",
                    "america/boa_vista",
                    "america/bogota",
                    "america/boise",
                    "america/buenos_aires",
                    "america/cambridge_bay",
                    "america/campo_grande",
                    "america/cancun",
                    "america/caracas",
                    "america/catamarca",
                    "america/cayenne",
                    "america/cayman",
                    "america/chicago",
                    "america/chihuahua",
                    "america/coral_harbour",
                    "america/cordoba",
                    "america/costa_rica",
                    "america/creston",
                    "america/cuiaba",
                    "america/curacao",
                    "america/danmarkshavn",
                    "america/dawson",
                    "america/dawson_creek",
                    "america/denver",
                    "america/detroit",
                    "america/dominica",
                    "america/edmonton",
                    "america/eirunepe",
                    "america/el_salvador",
                    "america/ensenada",
                    "america/fort_nelson",
                    "america/fort_wayne",
                    "america/fortaleza",
                    "america/glace_bay",
                    "america/godthab",
                    "america/goose_bay",
                    "america/grand_turk",
                    "america/grenada",
                    "america/guadeloupe",
                    "america/guatemala",
                    "america/guayaquil",
                    "america/guyana",
                    "america/halifax",
                    "america/havana",
                    "america/hermosillo",
                    "america/indiana/indianapolis",
                    "america/indiana/knox",
                    "america/indiana/marengo",
                    "america/indiana/petersburg",
                    "america/indiana/tell_city",
                    "america/indiana/vevay",
                    "america/indiana/vincennes",
                    "america/indiana/winamac",
                    "america/indianapolis",
                    "america/inuvik",
                    "america/iqaluit",
                    "america/jamaica",
                    "america/jujuy",
                    "america/juneau",
                    "america/kentucky/louisville",
                    "america/kentucky/monticello",
                    "america/knox_in",
                    "america/kralendijk",
                    "america/la_paz",
                    "america/lima",
                    "america/los_angeles",
                    "america/louisville",
                    "america/lower_princes",
                    "america/maceio",
                    "america/managua",
                    "america/manaus",
                    "america/marigot",
                    "america/martinique",
                    "america/matamoros",
                    "america/mazatlan",
                    "america/mendoza",
                    "america/menominee",
                    "america/merida",
                    "america/metlakatla",
                    "america/mexico_city",
                    "america/miquelon",
                    "america/moncton",
                    "america/monterrey",
                    "america/montevideo",
                    "america/montreal",
                    "america/montserrat",
                    "america/nassau",
                    "america/new_york",
                    "america/nipigon",
                    "america/nome",
                    "america/noronha",
                    "america/north_dakota/beulah",
                    "america/north_dakota/center",
                    "america/north_dakota/new_salem",
                    "america/ojinaga",
                    "america/panama",
                    "america/pangnirtung",
                    "america/paramaribo",
                    "america/phoenix",
                    "america/port-au-prince",
                    "america/port_of_spain",
                    "america/porto_acre",
                    "america/porto_velho",
                    "america/puerto_rico",
                    "america/rainy_river",
                    "america/rankin_inlet",
                    "america/recife",
                    "america/regina",
                    "america/resolute",
                    "america/rio_branco",
                    "america/rosario",
                    "america/santa_isabel",
                    "america/santarem",
                    "america/santiago",
                    "america/santo_domingo",
                    "america/sao_paulo",
                    "america/scoresbysund",
                    "america/shiprock",
                    "america/sitka",
                    "america/st_barthelemy",
                    "america/st_johns",
                    "america/st_kitts",
                    "america/st_lucia",
                    "america/st_thomas",
                    "america/st_vincent",
                    "america/swift_current",
                    "america/tegucigalpa",
                    "america/thule",
                    "america/thunder_bay",
                    "america/tijuana",
                    "america/toronto",
                    "america/tortola",
                    "america/vancouver",
                    "america/virgin",
                    "america/whitehorse",
                    "america/winnipeg",
                    "america/yakutat",
                    "america/yellowknife",
                    "antarctica/casey",
                    "antarctica/davis",
                    "antarctica/dumontdurville",
                    "antarctica/macquarie",
                    "antarctica/mawson",
                    "antarctica/mcmurdo",
                    "antarctica/palmer",
                    "antarctica/rothera",
                    "antarctica/south_pole",
                    "antarctica/syowa",
                    "antarctica/troll",
                    "antarctica/vostok",
                    "arctic/longyearbyen",
                    "asia/aden",
                    "asia/almaty",
                    "asia/amman",
                    "asia/anadyr",
                    "asia/aqtau",
                    "asia/aqtobe",
                    "asia/ashgabat",
                    "asia/ashkhabad",
                    "asia/baghdad",
                    "asia/bahrain",
                    "asia/baku",
                    "asia/bangkok",
                    "asia/beirut",
                    "asia/bishkek",
                    "asia/brunei",
                    "asia/calcutta",
                    "asia/chita",
                    "asia/choibalsan",
                    "asia/chongqing",
                    "asia/chungking",
                    "asia/colombo",
                    "asia/dacca",
                    "asia/damascus",
                    "asia/dhaka",
                    "asia/dili",
                    "asia/dubai",
                    "asia/dushanbe",
                    "asia/gaza",
                    "asia/harbin",
                    "asia/hebron",
                    "asia/ho_chi_minh",
                    "asia/hong_kong",
                    "asia/hovd",
                    "asia/irkutsk",
                    "asia/istanbul",
                    "asia/jakarta",
                    "asia/jayapura",
                    "asia/jerusalem",
                    "asia/kabul",
                    "asia/kamchatka",
                    "asia/karachi",
                    "asia/kashgar",
                    "asia/kathmandu",
                    "asia/katmandu",
                    "asia/khandyga",
                    "asia/kolkata",
                    "asia/krasnoyarsk",
                    "asia/kuala_lumpur",
                    "asia/kuching",
                    "asia/kuwait",
                    "asia/macao",
                    "asia/macau",
                    "asia/magadan",
                    "asia/makassar",
                    "asia/manila",
                    "asia/muscat",
                    "asia/nicosia",
                    "asia/novokuznetsk",
                    "asia/novosibirsk",
                    "asia/omsk",
                    "asia/oral",
                    "asia/phnom_penh",
                    "asia/pontianak",
                    "asia/pyongyang",
                    "asia/qatar",
                    "asia/qyzylorda",
                    "asia/rangoon",
                    "asia/riyadh",
                    "asia/saigon",
                    "asia/sakhalin",
                    "asia/samarkand",
                    "asia/seoul",
                    "asia/shanghai",
                    "asia/singapore",
                    "asia/srednekolymsk",
                    "asia/taipei",
                    "asia/tashkent",
                    "asia/tbilisi",
                    "asia/tehran",
                    "asia/tel_aviv",
                    "asia/thimbu",
                    "asia/thimphu",
                    "asia/tokyo",
                    "asia/ujung_pandang",
                    "asia/ulaanbaatar",
                    "asia/ulan_bator",
                    "asia/urumqi",
                    "asia/ust-nera",
                    "asia/vientiane",
                    "asia/vladivostok",
                    "asia/yakutsk",
                    "asia/yekaterinburg",
                    "asia/yerevan",
                    "atlantic/azores",
                    "atlantic/bermuda",
                    "atlantic/canary",
                    "atlantic/cape_verde",
                    "atlantic/faeroe",
                    "atlantic/faroe",
                    "atlantic/jan_mayen",
                    "atlantic/madeira",
                    "atlantic/reykjavik",
                    "atlantic/south_georgia",
                    "atlantic/st_helena",
                    "atlantic/stanley",
                    "australia/act",
                    "australia/adelaide",
                    "australia/brisbane",
                    "australia/broken_hill",
                    "australia/canberra",
                    "australia/currie",
                    "australia/darwin",
                    "australia/eucla",
                    "australia/hobart",
                    "australia/lhi",
                    "australia/lindeman",
                    "australia/lord_howe",
                    "australia/melbourne",
                    "australia/nsw",
                    "australia/north",
                    "australia/perth",
                    "australia/queensland",
                    "australia/south",
                    "australia/sydney",
                    "australia/tasmania",
                    "australia/victoria",
                    "australia/west",
                    "australia/yancowinna",
                    "brazil/acre",
                    "brazil/denoronha",
                    "brazil/east",
                    "brazil/west",
                    "canada/atlantic",
                    "canada/central",
                    "canada/east-saskatchewan",
                    "canada/eastern",
                    "canada/mountain",
                    "canada/newfoundland",
                    "canada/pacific",
                    "canada/saskatchewan",
                    "canada/yukon",
                    "chile/continental",
                    "chile/easterisland",
                    "etc/gmt",
                    "etc/gmt+0",
                    "etc/gmt+1",
                    "etc/gmt+10",
                    "etc/gmt+11",
                    "etc/gmt+12",
                    "etc/gmt+2",
                    "etc/gmt+3",
                    "etc/gmt+4",
                    "etc/gmt+5",
                    "etc/gmt+6",
                    "etc/gmt+7",
                    "etc/gmt+8",
                    "etc/gmt+9",
                    "etc/gmt-0",
                    "etc/gmt-1",
                    "etc/gmt-10",
                    "etc/gmt-11",
                    "etc/gmt-12",
                    "etc/gmt-13",
                    "etc/gmt-14",
                    "etc/gmt-2",
                    "etc/gmt-3",
                    "etc/gmt-4",
                    "etc/gmt-5",
                    "etc/gmt-6",
                    "etc/gmt-7",
                    "etc/gmt-8",
                    "etc/gmt-9",
                    "etc/gmt0",
                    "etc/greenwich",
                    "etc/uct",
                    "etc/utc",
                    "etc/universal",
                    "etc/zulu",
                    "europe/amsterdam",
                    "europe/andorra",
                    "europe/athens",
                    "europe/belfast",
                    "europe/belgrade",
                    "europe/berlin",
                    "europe/bratislava",
                    "europe/brussels",
                    "europe/bucharest",
                    "europe/budapest",
                    "europe/busingen",
                    "europe/chisinau",
                    "europe/copenhagen",
                    "europe/dublin",
                    "europe/gibraltar",
                    "europe/guernsey",
                    "europe/helsinki",
                    "europe/isle_of_man",
                    "europe/istanbul",
                    "europe/jersey",
                    "europe/kaliningrad",
                    "europe/kiev",
                    "europe/lisbon",
                    "europe/ljubljana",
                    "europe/london",
                    "europe/luxembourg",
                    "europe/madrid",
                    "europe/malta",
                    "europe/mariehamn",
                    "europe/minsk",
                    "europe/monaco",
                    "europe/moscow",
                    "europe/nicosia",
                    "europe/oslo",
                    "europe/paris",
                    "europe/podgorica",
                    "europe/prague",
                    "europe/riga",
                    "europe/rome",
                    "europe/samara",
                    "europe/san_marino",
                    "europe/sarajevo",
                    "europe/simferopol",
                    "europe/skopje",
                    "europe/sofia",
                    "europe/stockholm",
                    "europe/tallinn",
                    "europe/tirane",
                    "europe/tiraspol",
                    "europe/uzhgorod",
                    "europe/vaduz",
                    "europe/vatican",
                    "europe/vienna",
                    "europe/vilnius",
                    "europe/volgograd",
                    "europe/warsaw",
                    "europe/zagreb",
                    "europe/zaporozhye",
                    "europe/zurich",
                    "indian/antananarivo",
                    "indian/chagos",
                    "indian/christmas",
                    "indian/cocos",
                    "indian/comoro",
                    "indian/kerguelen",
                    "indian/mahe",
                    "indian/maldives",
                    "indian/mauritius",
                    "indian/mayotte",
                    "indian/reunion",
                    "mexico/bajanorte",
                    "mexico/bajasur",
                    "mexico/general",
                    "pacific/apia",
                    "pacific/auckland",
                    "pacific/bougainville",
                    "pacific/chatham",
                    "pacific/chuuk",
                    "pacific/easter",
                    "pacific/efate",
                    "pacific/enderbury",
                    "pacific/fakaofo",
                    "pacific/fiji",
                    "pacific/funafuti",
                    "pacific/galapagos",
                    "pacific/gambier",
                    "pacific/guadalcanal",
                    "pacific/guam",
                    "pacific/honolulu",
                    "pacific/johnston",
                    "pacific/kiritimati",
                    "pacific/kosrae",
                    "pacific/kwajalein",
                    "pacific/majuro",
                    "pacific/marquesas",
                    "pacific/midway",
                    "pacific/nauru",
                    "pacific/niue",
                    "pacific/norfolk",
                    "pacific/noumea",
                    "pacific/pago_pago",
                    "pacific/palau",
                    "pacific/pitcairn",
                    "pacific/pohnpei",
                    "pacific/ponape",
                    "pacific/port_moresby",
                    "pacific/rarotonga",
                    "pacific/saipan",
                    "pacific/samoa",
                    "pacific/tahiti",
                    "pacific/tarawa",
                    "pacific/tongatapu",
                    "pacific/truk",
                    "pacific/wake",
                    "pacific/wallis",
                    "pacific/yap",
                    "us/alaska",
                    "us/aleutian",
                    "us/arizona",
                    "us/central",
                    "us/east-indiana",
                    "us/eastern",
                    "us/hawaii",
                    "us/indiana-starke",
                    "us/michigan",
                    "us/mountain",
                    "us/pacific",
                    "us/pacific-new",
                    "us/samoa",
                ];
                Timezones.SHORT_TIMEZONES = [
                    "acdt", "acst", "act", "act", "adt", "aedt", "aest", "aft", "akdt", "akst", "amst", "amt", "amt", "art", "ast", "ast", "awdt",
                    "awst", "azost", "azt", "bdt", "bdt", "biot", "bit", "bot", "brst", "brt", "bst", "bst", "bst", "btt", "cat", "cct", "cdt", "cdt",
                    "cedt", "cest", "cet", "chadt", "chast", "chot", "chst", "chut", "cist", "cit", "ckt", "clst", "clt", "cost", "cot", "cst", "cst",
                    "cst", "cst", "cst", "ct", "cvt", "cwst", "cxt", "davt", "ddut", "dft", "easst", "east", "eat", "ect", "ect", "edt", "eedt", "eest",
                    "eet", "egst", "egt", "eit", "est", "est", "fet", "fjt", "fkst", "fkst", "fkt", "fnt", "galt", "gamt", "get", "gft", "gilt", "git",
                    "gmt", "gst", "gst", "gyt", "hadt", "haec", "hast", "hkt", "hmt", "hovt", "hst", "ibst", "ict", "idt", "iot", "irdt", "irkt", "irst",
                    "ist", "ist", "ist", "jst", "kgt", "kost", "krat", "kst", "lhst", "lhst", "lint", "magt", "mart", "mawt", "mdt", "met", "mest", "mht",
                    "mist", "mit", "mmt", "msk", "mst", "mst", "mst", "mut", "mvt", "myt", "nct", "ndt", "nft", "npt", "nst", "nt", "nut", "nzdt", "nzst",
                    "omst", "orat", "pdt", "pet", "pett", "pgt", "phot", "pkt", "pmdt", "pmst", "pont", "pst", "pst", "pyst", "pyt", "ret", "rott", "sakt",
                    "samt", "sast", "sbt", "sct", "sgt", "slst", "sret", "srt", "sst", "sst", "syot", "taht", "tha", "tft", "tjt", "tkt", "tlt", "tmt",
                    "tot", "tvt", "uct", "ulat", "usz1", "utc", "uyst", "uyt", "uzt", "vet", "vlat", "volt", "vost", "vut", "wakt", "wast", "wat", "wedt",
                    "west", "wet", "wit", "wst", "yakt", "yekt", "z",
                ];
                return Timezones;
            }());
            exports_2("Timezones", Timezones);
        }
    }
});
System.register("app/segment-type-setting", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var SegmentTypeSetting, BooleanSegmentTypeSetting, StringSegmentTypeSetting, DropdownSegmentTypeSetting;
    return {
        setters:[],
        execute: function() {
            SegmentTypeSetting = (function () {
                function SegmentTypeSetting(name, label, helptext, value) {
                    this.name = name;
                    this.label = label;
                    this.helptext = helptext;
                    this.value = value;
                }
                SegmentTypeSetting.prototype.getName = function () {
                    return this.name;
                };
                SegmentTypeSetting.prototype.getValue = function () {
                    return this.value;
                };
                SegmentTypeSetting.prototype.setValue = function (value) {
                    this.value = value;
                };
                return SegmentTypeSetting;
            }());
            exports_3("SegmentTypeSetting", SegmentTypeSetting);
            BooleanSegmentTypeSetting = (function (_super) {
                __extends(BooleanSegmentTypeSetting, _super);
                function BooleanSegmentTypeSetting(name, label, helptext, value) {
                    _super.call(this, name, label, helptext, value);
                }
                return BooleanSegmentTypeSetting;
            }(SegmentTypeSetting));
            exports_3("BooleanSegmentTypeSetting", BooleanSegmentTypeSetting);
            StringSegmentTypeSetting = (function (_super) {
                __extends(StringSegmentTypeSetting, _super);
                function StringSegmentTypeSetting(name, label, helptext, value) {
                    _super.call(this, name, label, helptext, value);
                }
                return StringSegmentTypeSetting;
            }(SegmentTypeSetting));
            exports_3("StringSegmentTypeSetting", StringSegmentTypeSetting);
            DropdownSegmentTypeSetting = (function (_super) {
                __extends(DropdownSegmentTypeSetting, _super);
                function DropdownSegmentTypeSetting(name, label, helptext, value, possibleValues) {
                    _super.call(this, name, label, helptext, value);
                    this.possibleValues = possibleValues;
                }
                DropdownSegmentTypeSetting.prototype.getPossibleValues = function () {
                    return this.possibleValues;
                };
                return DropdownSegmentTypeSetting;
            }(SegmentTypeSetting));
            exports_3("DropdownSegmentTypeSetting", DropdownSegmentTypeSetting);
        }
    }
});
System.register("app/segment-type-settings", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var SegmentTypeSettings;
    return {
        setters:[],
        execute: function() {
            SegmentTypeSettings = (function () {
                function SegmentTypeSettings() {
                    this.settings = {};
                }
                SegmentTypeSettings.prototype.add = function (setting) {
                    if (setting.getName() in this.settings) {
                        return false;
                    }
                    this.settings[setting.getName()] = setting;
                };
                SegmentTypeSettings.prototype.has = function (name) {
                    return name in this.settings;
                };
                SegmentTypeSettings.prototype.set = function (name, value) {
                    if (!this.has(name)) {
                        throw new RangeError("Setting with name " + name + " not found");
                    }
                    this.settings[name].setValue(value);
                };
                SegmentTypeSettings.prototype.get = function (name) {
                    if (!this.has(name)) {
                        return null;
                    }
                    return this.settings[name];
                };
                SegmentTypeSettings.prototype.getSettings = function () {
                    var _this = this;
                    return Object.keys(this.settings).map(function (key) { return _this.settings[key]; });
                };
                return SegmentTypeSettings;
            }());
            exports_4("SegmentTypeSettings", SegmentTypeSettings);
        }
    }
});
System.register("app/segment-type", ["app/utils", "app/timezones", "app/segment-type-settings", "app/segment-type-setting"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var utils_1, timezones_1, segment_type_settings_1, segment_type_setting_1;
    var SegmentType, CaseStyle, StringSegmentType, ShortDaySegmentType, LongDaySegmentType, ShortMonthSegmentType, LongMonthSegmentType, DaySegmentType, MonthSegmentType, YearSegmentType, ShortYearSegmentType, HourMinuteSegmentType, HourMinuteSecondSegmentType, YearMonthDaySegmentType, YearMonthDayHourMinuteSegmentType, YearMonthDayHourMinuteSecondSegmentType, MultiSegment, HourSegmentType, MinuteSegmentType, SecondSegmentType, MillisecondSegmentType, AMPMSegmentType, ShortTimezoneSegmentType, LongTimezoneSegmentType, TimezoneOffsetType, TimezoneOffsetSegmentType, EpochSegmentType, FillSegmentType, SEGMENT_TYPES;
    return {
        setters:[
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (timezones_1_1) {
                timezones_1 = timezones_1_1;
            },
            function (segment_type_settings_1_1) {
                segment_type_settings_1 = segment_type_settings_1_1;
            },
            function (segment_type_setting_1_1) {
                segment_type_setting_1 = segment_type_setting_1_1;
            }],
        execute: function() {
            SegmentType = (function () {
                function SegmentType(token) {
                    this.valid = false;
                    this.enabled = true;
                    this.segment = token;
                    this.settings = new segment_type_settings_1.SegmentTypeSettings();
                }
                SegmentType.prototype.isEnabled = function () {
                    return this.enabled;
                };
                SegmentType.prototype.enable = function () {
                    this.enabled = true;
                };
                SegmentType.prototype.disable = function () {
                    this.enabled = false;
                };
                SegmentType.prototype.isValid = function () {
                    return this.valid;
                };
                SegmentType.prototype.getValue = function () {
                    return this.segment;
                };
                SegmentType.prototype.getSettings = function () {
                    return this.settings;
                };
                SegmentType.prototype.getName = function () {
                    return this.constructor['name'];
                };
                return SegmentType;
            }());
            exports_5("SegmentType", SegmentType);
            (function (CaseStyle) {
                CaseStyle[CaseStyle["Lower"] = 0] = "Lower";
                CaseStyle[CaseStyle["Upper"] = 1] = "Upper";
                CaseStyle[CaseStyle["Title"] = 2] = "Title";
                CaseStyle[CaseStyle["Unknown"] = 3] = "Unknown";
            })(CaseStyle || (CaseStyle = {}));
            exports_5("CaseStyle", CaseStyle);
            StringSegmentType = (function (_super) {
                __extends(StringSegmentType, _super);
                function StringSegmentType(token) {
                    _super.call(this, token);
                    var styles = (_a = {},
                        _a[CaseStyle.Lower] = "lower",
                        _a[CaseStyle.Upper] = "UPPER",
                        _a[CaseStyle.Title] = "Title",
                        _a[CaseStyle.Unknown] = "Unknown",
                        _a
                    );
                    this.settings.add(new segment_type_setting_1.DropdownSegmentTypeSetting("caseStyle", "Case Style", null, CaseStyle.Title, styles));
                    this.setCaseStyle(token);
                    var _a;
                }
                StringSegmentType.parseCaseStyle = function (str) {
                    if (/^[a-z]+$/.test(str)) {
                        return CaseStyle.Lower;
                    }
                    else if (/^[A-Z]+$/.test(str)) {
                        return CaseStyle.Upper;
                    }
                    else if (/^[A-Z][a-z]+$/.test(str)) {
                        return CaseStyle.Title;
                    }
                    return CaseStyle.Unknown;
                };
                StringSegmentType.prototype.setCaseStyle = function (token) {
                    this.settings.get("caseStyle").setValue(StringSegmentType.parseCaseStyle(token));
                };
                StringSegmentType.prototype.getCaseStyle = function () {
                    return parseInt(this.settings.get("caseStyle").getValue(), 10);
                };
                return StringSegmentType;
            }(SegmentType));
            exports_5("StringSegmentType", StringSegmentType);
            ShortDaySegmentType = (function (_super) {
                __extends(ShortDaySegmentType, _super);
                function ShortDaySegmentType(token) {
                    _super.call(this, token);
                    this.name = "ShortDay";
                    if (ShortDaySegmentType.SHORT_DAYS.indexOf(token.toLowerCase()) !== -1) {
                        this.setCaseStyle(token);
                        this.valid = true;
                    }
                }
                ShortDaySegmentType.SHORT_DAYS = ["mon", "tues", "tue", "wed", "thu", "thurs", "fri", "sat", "sun"];
                return ShortDaySegmentType;
            }(StringSegmentType));
            exports_5("ShortDaySegmentType", ShortDaySegmentType);
            LongDaySegmentType = (function (_super) {
                __extends(LongDaySegmentType, _super);
                function LongDaySegmentType(token) {
                    _super.call(this, token);
                    this.name = "LongDay";
                    if (LongDaySegmentType.DAYS.indexOf(token.toLowerCase()) !== -1) {
                        this.setCaseStyle(token);
                        this.valid = true;
                    }
                }
                LongDaySegmentType.DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
                return LongDaySegmentType;
            }(StringSegmentType));
            exports_5("LongDaySegmentType", LongDaySegmentType);
            ShortMonthSegmentType = (function (_super) {
                __extends(ShortMonthSegmentType, _super);
                function ShortMonthSegmentType(token) {
                    _super.call(this, token);
                    this.name = "ShortMonth";
                    if (ShortMonthSegmentType.SHORT_MONTHS.indexOf(token.toLowerCase()) !== -1) {
                        this.setCaseStyle(token);
                        this.valid = true;
                    }
                }
                ShortMonthSegmentType.SHORT_MONTHS = [
                    "jan", "feb", "mar", "apr", "may", "jun",
                    "jul", "aug", "sep", "sept", "oct", "nov", "dec",
                ];
                return ShortMonthSegmentType;
            }(StringSegmentType));
            exports_5("ShortMonthSegmentType", ShortMonthSegmentType);
            LongMonthSegmentType = (function (_super) {
                __extends(LongMonthSegmentType, _super);
                function LongMonthSegmentType(token) {
                    _super.call(this, token);
                    this.name = "LongMonth";
                    if (LongMonthSegmentType.MONTHS.indexOf(token.toLowerCase()) !== -1) {
                        this.setCaseStyle(token);
                        this.valid = true;
                    }
                }
                LongMonthSegmentType.MONTHS = [
                    "january", "february", "march", "april", "may", "june",
                    "july", "august", "september", "october", "november", "december",
                ];
                return LongMonthSegmentType;
            }(StringSegmentType));
            exports_5("LongMonthSegmentType", LongMonthSegmentType);
            DaySegmentType = (function (_super) {
                __extends(DaySegmentType, _super);
                function DaySegmentType(token) {
                    _super.call(this, token);
                    this.name = "Day";
                    this.settings.add(new segment_type_setting_1.BooleanSegmentTypeSetting("leadingZero", "Leading Zero", "Whether or not the day is padded with a leading zero.", true));
                    this.settings.add(new segment_type_setting_1.BooleanSegmentTypeSetting("prettyEnding", "Pretty Ending", "Whether or not the day is suffixed with 'st', 'nd', 'rd', and 'th'.", false));
                    var ending;
                    if (token.length === 3) {
                        ending = token.substring(1, 3);
                        token = token[0];
                    }
                    else if (token.length === 4) {
                        ending = token.substring(2, 4);
                        token = token.substring(0, 2);
                    }
                    if (ending) {
                        this.setCaseStyle(ending);
                    }
                    if ((token.length === 2 || token.length === 1) && utils_1.Utils.isNumber(token) && parseInt(token, 10) >= 1 && parseInt(token, 10) <= 31) {
                        if (token.length === 1) {
                            this.settings.set("leadingZero", false);
                        }
                        this.valid = true;
                    }
                    if (ending && DaySegmentType.DATE_ENDINGS.indexOf(ending.toLowerCase()) !== -1) {
                        this.settings.set("prettyEnding", true);
                    }
                    else if (ending && DaySegmentType.DATE_ENDINGS.indexOf(ending.toLowerCase()) === -1) {
                        this.valid = false;
                    }
                }
                DaySegmentType.prototype.isZeroPadded = function () {
                    return this.settings.get("leadingZero").getValue();
                };
                DaySegmentType.prototype.isPrettyEnding = function () {
                    return this.settings.get("prettyEnding").getValue();
                };
                DaySegmentType.DATE_ENDINGS = ["st", "nd", "rd", "th"];
                return DaySegmentType;
            }(StringSegmentType));
            exports_5("DaySegmentType", DaySegmentType);
            MonthSegmentType = (function (_super) {
                __extends(MonthSegmentType, _super);
                function MonthSegmentType(token) {
                    _super.call(this, token);
                    this.name = "Month";
                    this.settings.add(new segment_type_setting_1.BooleanSegmentTypeSetting("leadingZero", "Leading Zero", "Whether or not the month is padded with a leading zero.", true));
                    if ((token.length === 2 || token.length === 1) && utils_1.Utils.isNumber(token) && parseInt(token, 10) >= 1 && parseInt(token, 10) <= 12) {
                        if (token.length === 1) {
                            this.settings.set("leadingZero", false);
                        }
                        this.valid = true;
                    }
                }
                MonthSegmentType.prototype.isZeroPadded = function () {
                    return this.settings.get("leadingZero").getValue();
                };
                return MonthSegmentType;
            }(SegmentType));
            exports_5("MonthSegmentType", MonthSegmentType);
            YearSegmentType = (function (_super) {
                __extends(YearSegmentType, _super);
                function YearSegmentType(token) {
                    _super.call(this, token);
                    this.name = "Year";
                    this.settings.add(new segment_type_setting_1.BooleanSegmentTypeSetting("leadingZeroes", "Leading Zeroes", "Whether or not the year is padded with leading zeroes.", true));
                    if (token.length === 4 && utils_1.Utils.isNumber(token)) {
                        this.valid = true;
                    }
                }
                YearSegmentType.prototype.isZeroPadded = function () {
                    return this.settings.get("leadingZeroes").getValue();
                };
                return YearSegmentType;
            }(SegmentType));
            exports_5("YearSegmentType", YearSegmentType);
            ShortYearSegmentType = (function (_super) {
                __extends(ShortYearSegmentType, _super);
                function ShortYearSegmentType(token) {
                    _super.call(this, token);
                    this.name = "ShortYear";
                    this.settings.add(new segment_type_setting_1.BooleanSegmentTypeSetting("leadingZero", "Leading Zero", "Whether or not the year is padded with a leading zero.", true));
                    if (token.length === 2 && utils_1.Utils.isNumber(token)) {
                        this.valid = true;
                    }
                }
                ShortYearSegmentType.prototype.isZeroPadded = function () {
                    return this.settings.get("leadingZero").getValue();
                };
                return ShortYearSegmentType;
            }(SegmentType));
            exports_5("ShortYearSegmentType", ShortYearSegmentType);
            HourMinuteSegmentType = (function (_super) {
                __extends(HourMinuteSegmentType, _super);
                function HourMinuteSegmentType(token) {
                    _super.call(this, token);
                    this.name = "HourMinute";
                    if (token.length === 4 && utils_1.Utils.isNumber(token)) {
                        this.valid = true;
                    }
                }
                return HourMinuteSegmentType;
            }(SegmentType));
            exports_5("HourMinuteSegmentType", HourMinuteSegmentType);
            HourMinuteSecondSegmentType = (function (_super) {
                __extends(HourMinuteSecondSegmentType, _super);
                function HourMinuteSecondSegmentType(token) {
                    _super.call(this, token);
                    this.name = "HourMinuteSecond";
                    if (token.length === 6 && utils_1.Utils.isNumber(token)) {
                        this.valid = true;
                    }
                }
                return HourMinuteSecondSegmentType;
            }(SegmentType));
            exports_5("HourMinuteSecondSegmentType", HourMinuteSecondSegmentType);
            YearMonthDaySegmentType = (function (_super) {
                __extends(YearMonthDaySegmentType, _super);
                function YearMonthDaySegmentType(token) {
                    _super.call(this, token);
                    this.name = "YearMonthDay";
                    if (token.length === 8 && utils_1.Utils.isNumber(token)) {
                        this.valid = true;
                    }
                }
                return YearMonthDaySegmentType;
            }(SegmentType));
            exports_5("YearMonthDaySegmentType", YearMonthDaySegmentType);
            YearMonthDayHourMinuteSegmentType = (function (_super) {
                __extends(YearMonthDayHourMinuteSegmentType, _super);
                function YearMonthDayHourMinuteSegmentType(token) {
                    _super.call(this, token);
                    this.name = "YearMonthDayHourMinute";
                    if (token.length === 12 && utils_1.Utils.isNumber(token)) {
                        this.valid = true;
                    }
                }
                return YearMonthDayHourMinuteSegmentType;
            }(SegmentType));
            exports_5("YearMonthDayHourMinuteSegmentType", YearMonthDayHourMinuteSegmentType);
            YearMonthDayHourMinuteSecondSegmentType = (function (_super) {
                __extends(YearMonthDayHourMinuteSecondSegmentType, _super);
                function YearMonthDayHourMinuteSecondSegmentType(token) {
                    _super.call(this, token);
                    this.name = "YearMonthDayHourMinuteSecond";
                    if (token.length === 14 && utils_1.Utils.isNumber(token)) {
                        this.valid = true;
                    }
                }
                return YearMonthDayHourMinuteSecondSegmentType;
            }(SegmentType));
            exports_5("YearMonthDayHourMinuteSecondSegmentType", YearMonthDayHourMinuteSecondSegmentType);
            MultiSegment = (function (_super) {
                __extends(MultiSegment, _super);
                function MultiSegment() {
                    _super.apply(this, arguments);
                }
                return MultiSegment;
            }(SegmentType));
            exports_5("MultiSegment", MultiSegment);
            HourSegmentType = (function (_super) {
                __extends(HourSegmentType, _super);
                function HourSegmentType(token) {
                    _super.call(this, token);
                    this.name = "Hour";
                    this.settings.add(new segment_type_setting_1.BooleanSegmentTypeSetting("leadingZeroes", "Leading Zeroes", "Whether or not the year is padded with leading zeroes.", true));
                    this.settings.add(new segment_type_setting_1.BooleanSegmentTypeSetting("twentyFour", "24-Hour", "Whether or not the hour is in 24-hour format.", false));
                    if ((token.length === 2 || token.length === 1) && utils_1.Utils.isNumber(token)) {
                        if (token.length === 1) {
                            this.settings.set("leadingZeroes", false);
                        }
                        if (parseInt(token, 10) > 12 || token === "00") {
                            this.settings.set("twentyFour", true);
                        }
                        this.valid = true;
                    }
                }
                HourSegmentType.prototype.setTwentyFour = function (value) {
                    this.settings.set("twentyFour", value);
                };
                HourSegmentType.prototype.getTwentyFour = function () {
                    return this.settings.get("twentyFour").getValue();
                };
                HourSegmentType.prototype.isZeroPadded = function () {
                    return this.settings.get("leadingZeroes").getValue();
                };
                return HourSegmentType;
            }(SegmentType));
            exports_5("HourSegmentType", HourSegmentType);
            MinuteSegmentType = (function (_super) {
                __extends(MinuteSegmentType, _super);
                function MinuteSegmentType(token) {
                    _super.call(this, token);
                    this.name = "Minute";
                    this.settings.add(new segment_type_setting_1.BooleanSegmentTypeSetting("leadingZeroes", "Leading Zeroes", "Whether or not the minute is padded with leading zeroes.", true));
                    if ((token.length === 2 || token.length === 1) && utils_1.Utils.isNumber(token) && parseInt(token, 10) >= 0 && parseInt(token, 10) < 60) {
                        if (token.length === 1) {
                            this.settings.set("leadingZeroes", false);
                        }
                        this.valid = true;
                    }
                }
                MinuteSegmentType.prototype.isZeroPadded = function () {
                    return this.settings.get("leadingZeroes").getValue();
                };
                return MinuteSegmentType;
            }(SegmentType));
            exports_5("MinuteSegmentType", MinuteSegmentType);
            SecondSegmentType = (function (_super) {
                __extends(SecondSegmentType, _super);
                function SecondSegmentType(token) {
                    _super.call(this, token);
                    this.name = "Second";
                    this.settings.add(new segment_type_setting_1.BooleanSegmentTypeSetting("leadingZeroes", "Leading Zeroes", "Whether or not the second is padded with leading zeroes.", true));
                    if ((token.length === 2 || token.length === 1) && utils_1.Utils.isNumber(token) && parseInt(token, 10) >= 0 && parseInt(token, 10) < 60) {
                        if (token.length === 1) {
                            this.settings.set("leadingZeroes", false);
                        }
                        this.valid = true;
                    }
                }
                SecondSegmentType.prototype.isZeroPadded = function () {
                    return this.settings.get("leadingZeroes").getValue();
                };
                return SecondSegmentType;
            }(SegmentType));
            exports_5("SecondSegmentType", SecondSegmentType);
            MillisecondSegmentType = (function (_super) {
                __extends(MillisecondSegmentType, _super);
                function MillisecondSegmentType(token) {
                    _super.call(this, token);
                    this.name = "Millisecond";
                    this.settings.add(new segment_type_setting_1.BooleanSegmentTypeSetting("nanoseconds", "Nanoseconds", "If this is nanoseconds or not.", false));
                    if (utils_1.Utils.isNumber(token)) {
                        this.valid = true;
                        if (token.length > 3) {
                            this.settings.set("nanoseconds", true);
                        }
                    }
                }
                return MillisecondSegmentType;
            }(SegmentType));
            exports_5("MillisecondSegmentType", MillisecondSegmentType);
            AMPMSegmentType = (function (_super) {
                __extends(AMPMSegmentType, _super);
                function AMPMSegmentType(token) {
                    _super.call(this, token);
                    this.name = "AMPM";
                    if (AMPMSegmentType.AMPM.indexOf(token.toLowerCase()) !== -1) {
                        this.setCaseStyle(token);
                        this.valid = true;
                    }
                }
                AMPMSegmentType.AMPM = ["am", "a", "pm", "p"];
                return AMPMSegmentType;
            }(StringSegmentType));
            exports_5("AMPMSegmentType", AMPMSegmentType);
            ShortTimezoneSegmentType = (function (_super) {
                __extends(ShortTimezoneSegmentType, _super);
                function ShortTimezoneSegmentType(token) {
                    _super.call(this, token);
                    this.name = "ShortTimezone";
                    this.settings.add(new segment_type_setting_1.BooleanSegmentTypeSetting("z", "Z", null, false));
                    if (timezones_1.Timezones.SHORT_TIMEZONES.indexOf(token.toLowerCase()) !== -1) {
                        if (token.toLowerCase() === "z") {
                            this.settings.set("z", true);
                        }
                        this.setCaseStyle(token);
                        this.valid = true;
                    }
                }
                return ShortTimezoneSegmentType;
            }(StringSegmentType));
            exports_5("ShortTimezoneSegmentType", ShortTimezoneSegmentType);
            LongTimezoneSegmentType = (function (_super) {
                __extends(LongTimezoneSegmentType, _super);
                function LongTimezoneSegmentType(token) {
                    _super.call(this, token);
                    this.name = "LongTimezone";
                    if (timezones_1.Timezones.TIMEZONES.indexOf(token.toLowerCase()) !== -1) {
                        this.setCaseStyle(token);
                        this.valid = true;
                    }
                }
                return LongTimezoneSegmentType;
            }(StringSegmentType));
            exports_5("LongTimezoneSegmentType", LongTimezoneSegmentType);
            (function (TimezoneOffsetType) {
                TimezoneOffsetType[TimezoneOffsetType["Hour"] = 0] = "Hour";
                TimezoneOffsetType[TimezoneOffsetType["HourMinute"] = 1] = "HourMinute";
                TimezoneOffsetType[TimezoneOffsetType["HourMinuteSecond"] = 2] = "HourMinuteSecond";
                TimezoneOffsetType[TimezoneOffsetType["HourMinuteSeparated"] = 3] = "HourMinuteSeparated";
                TimezoneOffsetType[TimezoneOffsetType["HourMinuteSecondSeparated"] = 4] = "HourMinuteSecondSeparated";
            })(TimezoneOffsetType || (TimezoneOffsetType = {}));
            exports_5("TimezoneOffsetType", TimezoneOffsetType);
            ;
            TimezoneOffsetSegmentType = (function (_super) {
                __extends(TimezoneOffsetSegmentType, _super);
                function TimezoneOffsetSegmentType(token) {
                    _super.call(this, token);
                    this.name = "TimezoneOffset";
                    var types = (_a = {},
                        _a[TimezoneOffsetType.Hour] = "+-XX",
                        _a[TimezoneOffsetType.HourMinute] = "+-XXXX",
                        _a[TimezoneOffsetType.HourMinuteSecond] = "+-XXXXXX",
                        _a[TimezoneOffsetType.HourMinuteSeparated] = "+-XX:XX",
                        _a[TimezoneOffsetType.HourMinuteSecondSeparated] = "+-XX:XX:XX",
                        _a
                    );
                    this.settings.add(new segment_type_setting_1.DropdownSegmentTypeSetting("timezoneOffsetType", "Timezone Offset Type", null, TimezoneOffsetType.HourMinute, types));
                    if (/^[-+](\d\d)((:\d\d){1,2}|(\d\d){1,2})?$/.test(token)) {
                        if (/^[-+]\d{2}$/.test(token)) {
                            this.settings.set("timezoneOffsetType", TimezoneOffsetType.Hour);
                        }
                        else if (/^[-+]\d{4}$/.test(token)) {
                            this.settings.set("timezoneOffsetType", TimezoneOffsetType.HourMinute);
                        }
                        else if (/^[-+]\d{6}$/.test(token)) {
                            this.settings.set("timezoneOffsetType", TimezoneOffsetType.HourMinuteSecond);
                        }
                        else if (/^[-+]\d\d:\d\d$/.test(token)) {
                            this.settings.set("timezoneOffsetType", TimezoneOffsetType.HourMinuteSeparated);
                        }
                        else if (/^[-+]\d\d:\d\d:\d\d$/.test(token)) {
                            this.settings.set("timezoneOffsetType", TimezoneOffsetType.HourMinuteSecondSeparated);
                        }
                        this.valid = true;
                    }
                    var _a;
                }
                TimezoneOffsetSegmentType.prototype.getTimezoneOffsetType = function () {
                    return parseInt(this.settings.get("timezoneOffsetType").getValue(), 10);
                };
                return TimezoneOffsetSegmentType;
            }(SegmentType));
            exports_5("TimezoneOffsetSegmentType", TimezoneOffsetSegmentType);
            EpochSegmentType = (function (_super) {
                __extends(EpochSegmentType, _super);
                function EpochSegmentType(token) {
                    _super.call(this, token);
                    this.name = "Epoch";
                    this.settings.add(new segment_type_setting_1.BooleanSegmentTypeSetting("milliseconds", "Milliseconds", "Whether or not the epoch is in milliseconds.", false));
                    if (utils_1.Utils.isNumber(token)) {
                        if (parseInt(token, 10) > 2147483647) {
                            this.settings.set("milliseconds", true);
                        }
                        this.valid = true;
                    }
                }
                return EpochSegmentType;
            }(SegmentType));
            exports_5("EpochSegmentType", EpochSegmentType);
            FillSegmentType = (function (_super) {
                __extends(FillSegmentType, _super);
                function FillSegmentType(token) {
                    _super.call(this, token);
                    this.name = "Fill";
                    this.settings.add(new segment_type_setting_1.StringSegmentTypeSetting("token", "String", "The content of the fill", token));
                    this.valid = true;
                }
                return FillSegmentType;
            }(SegmentType));
            exports_5("FillSegmentType", FillSegmentType);
            exports_5("SEGMENT_TYPES", SEGMENT_TYPES = [
                ShortDaySegmentType, LongDaySegmentType, DaySegmentType,
                ShortMonthSegmentType, LongMonthSegmentType, MonthSegmentType,
                YearSegmentType, ShortYearSegmentType,
                HourMinuteSegmentType, HourMinuteSecondSegmentType, YearMonthDaySegmentType,
                YearMonthDayHourMinuteSegmentType, YearMonthDayHourMinuteSecondSegmentType,
                HourSegmentType, MinuteSegmentType,
                SecondSegmentType, MillisecondSegmentType, AMPMSegmentType,
                ShortTimezoneSegmentType, LongTimezoneSegmentType, TimezoneOffsetSegmentType,
                EpochSegmentType, FillSegmentType,
            ]);
        }
    }
});
System.register("app/segment", ["app/segment-type"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var segment_type_1;
    var Segment;
    return {
        setters:[
            function (segment_type_1_1) {
                segment_type_1 = segment_type_1_1;
            }],
        execute: function() {
            Segment = (function () {
                function Segment(token) {
                    this.token = token;
                    this.selected = null;
                    this.types = {};
                    for (var i = 0; i < segment_type_1.SEGMENT_TYPES.length; i++) {
                        var segmentType = segment_type_1.SEGMENT_TYPES[i];
                        var segment = Object.create(segmentType.prototype);
                        segment.constructor.apply(segment, new Array(token));
                        if (segment.isValid()) {
                            this.types[segmentType.name] = segment;
                        }
                        else {
                            this.types[segmentType.name] = null;
                        }
                    }
                }
                Segment.prototype.has = function (segmentType) {
                    return this.types[segmentType.name] !== undefined && this.types[segmentType.name] !== null;
                };
                Segment.prototype.hasEnabled = function (segmentType) {
                    return !(!this.types[segmentType.name] || !this.types[segmentType.name].isEnabled());
                };
                Segment.prototype.getTypes = function () {
                    var types = [];
                    for (var i = 0; i < segment_type_1.SEGMENT_TYPES.length; i++) {
                        if (this.has(segment_type_1.SEGMENT_TYPES[i])) {
                            types.push(this.getType(segment_type_1.SEGMENT_TYPES[i]));
                        }
                    }
                    return types;
                };
                Segment.prototype.getEnabledTypes = function () {
                    var types = [];
                    for (var i = 0; i < segment_type_1.SEGMENT_TYPES.length; i++) {
                        if (this.hasEnabled(segment_type_1.SEGMENT_TYPES[i])) {
                            types.push(this.getType(segment_type_1.SEGMENT_TYPES[i]));
                        }
                    }
                    return types;
                };
                Segment.prototype.getType = function (segmentType) {
                    if (this.has(segmentType)) {
                        return this.types[segmentType.name];
                    }
                    return null;
                };
                Segment.prototype.getToken = function () {
                    return this.token;
                };
                Segment.prototype.numTypes = function () {
                    var count = 0;
                    for (var i = 0; i < segment_type_1.SEGMENT_TYPES.length; i++) {
                        if (this.hasEnabled(segment_type_1.SEGMENT_TYPES[i])) {
                            count += 1;
                        }
                    }
                    return count;
                };
                Segment.prototype.enableType = function (segmentType) {
                    if (this.types[segmentType.name]) {
                        this.types[segmentType.name].enable();
                    }
                };
                Segment.prototype.disableType = function (segmentType) {
                    if (this.types[segmentType.name]) {
                        this.types[segmentType.name].disable();
                    }
                };
                Segment.prototype.setType = function (segmentType) {
                    this.enableType(segmentType);
                    for (var i = 0; i < segment_type_1.SEGMENT_TYPES.length; i++) {
                        if (segmentType.name !== segment_type_1.SEGMENT_TYPES[i].name) {
                            this.disableType(segment_type_1.SEGMENT_TYPES[i]);
                        }
                    }
                };
                Segment.prototype.setTypes = function (allowedSegmentTypes) {
                    for (var i = 0; i < allowedSegmentTypes.length; i++) {
                        this.enableType(allowedSegmentTypes[i]);
                    }
                    for (var i = 0; i < segment_type_1.SEGMENT_TYPES.length; i++) {
                        if (allowedSegmentTypes.indexOf(segment_type_1.SEGMENT_TYPES[i]) === -1) {
                            this.disableType(segment_type_1.SEGMENT_TYPES[i]);
                        }
                    }
                };
                Segment.prototype.getOnlySegmentType = function () {
                    var found = null;
                    for (var i = 0; i < segment_type_1.SEGMENT_TYPES.length; i++) {
                        if (this.types[segment_type_1.SEGMENT_TYPES[i].name] && this.types[segment_type_1.SEGMENT_TYPES[i].name].isEnabled()) {
                            if (found) {
                                return null;
                            }
                            found = this.types[segment_type_1.SEGMENT_TYPES[i].name];
                        }
                    }
                    return found;
                };
                Segment.prototype.setSelected = function (segmentType) {
                    if (this.has(segmentType)) {
                        this.enableType(segmentType);
                        this.selected = segmentType;
                    }
                };
                Segment.prototype.setSelectedName = function (segmentTypeName) {
                    for (var i = 0; i < segment_type_1.SEGMENT_TYPES.length; i++) {
                        if (segment_type_1.SEGMENT_TYPES[i].name === segmentTypeName) {
                            this.setSelected(segment_type_1.SEGMENT_TYPES[i]);
                        }
                    }
                };
                Segment.prototype.getSelected = function () {
                    return this.selected;
                };
                Segment.prototype.toString = function () {
                    var str = "\"" + this.token + "\"";
                    for (var i = 0; i < segment_type_1.SEGMENT_TYPES.length; i++) {
                        if (this.types[segment_type_1.SEGMENT_TYPES[i].name] && this.types[segment_type_1.SEGMENT_TYPES[i].name].isEnabled()) {
                            str += ", " + segment_type_1.SEGMENT_TYPES[i].name;
                        }
                    }
                    return str;
                };
                return Segment;
            }());
            exports_6("Segment", Segment);
        }
    }
});
System.register("app/datetime", ["app/segment", "app/segment-type"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var segment_1, segment_type_2;
    var DateTime;
    return {
        setters:[
            function (segment_1_1) {
                segment_1 = segment_1_1;
            },
            function (segment_type_2_1) {
                segment_type_2 = segment_type_2_1;
            }],
        execute: function() {
            DateTime = (function () {
                function DateTime(datetimeString) {
                    this.segments = this.parseSegments(datetimeString);
                    for (var i = 0; i < this.segments.length; i++) {
                        var enabledTypes = this.segments[i].getEnabledTypes();
                        if (enabledTypes.length > 0) {
                            this.segments[i].setSelectedName(enabledTypes[0].getName());
                        }
                    }
                }
                DateTime.prototype.toString = function () {
                    var str = "";
                    for (var i = 0; i < this.segments.length; i++) {
                        str += this.segments[i].getToken();
                    }
                    return str;
                };
                DateTime.prototype.getSegments = function () {
                    return this.segments;
                };
                DateTime.prototype.editSegment = function (segment) {
                    var _this = this;
                    var segmentId = this.segments.indexOf(segment);
                    $('#edit-segment-modal input').val(segment.getToken());
                    $('#edit-segment-modal .btn-primary').off('click');
                    $('#edit-segment-modal .btn-primary').click(function () {
                        var val = $('#edit-segment-modal input').val();
                        var newSegment = new segment_1.Segment(val);
                        newSegment.setSelected(segment.getSelected());
                        if (newSegment.getSelected() === null) {
                            newSegment.setSelected(segment_type_2.FillSegmentType);
                        }
                        _this.segments.splice(segmentId, 1, newSegment);
                        $('#edit-segment-modal').modal('hide');
                    });
                    $('#edit-segment-modal').modal();
                };
                DateTime.prototype.deleteSegment = function (segment) {
                    var _this = this;
                    var segmentId = this.segments.indexOf(segment);
                    $('#delete-segment-modal .btn-primary').off('click');
                    $('#delete-segment-modal .btn-primary').click(function () {
                        _this.segments.splice(segmentId, 1);
                        $('#delete-segment-modal').modal('hide');
                    });
                    $('#delete-segment-modal').modal();
                };
                DateTime.prototype.newSegment = function (segment) {
                    var _this = this;
                    var segmentId = this.segments.indexOf(segment);
                    $('#new-segment-modal input').val(segment.getToken());
                    $('#new-segment-modal .btn-primary').off('click');
                    $('#new-segment-modal .btn-primary').click(function () {
                        var val = $('#new-segment-modal input').val();
                        var newSegment = new segment_1.Segment(val);
                        newSegment.setSelected(segment_type_2.FillSegmentType);
                        _this.segments.splice(segmentId + 1, 0, newSegment);
                        $('#new-segment-modal').modal('hide');
                    });
                    $('#new-segment-modal').modal();
                };
                DateTime.prototype.joinSegments = function () {
                    var _this = this;
                    $('#join-segments-modal .segments').html('');
                    $('#join-segments-modal .slider').html('');
                    var start = Math.floor(this.segments.length / 2);
                    var end = Math.floor(Math.min(this.segments.length - 1, this.segments.length / 2 + 1));
                    var ele;
                    for (var i = 0; i < this.segments.length; i++) {
                        ele = $('<li>' + this.segments[i].getToken() + '</li>');
                        if (i === start || i === end) {
                            ele.addClass('joining');
                        }
                        $('#join-segments-modal .segments').append(ele);
                    }
                    $('#join-segments-modal .slider').slider({
                        max: this.segments.length - 1,
                        min: 0,
                        range: true,
                        slide: function (e, ui) {
                            var lis = $('#join-segments-modal .segments li');
                            lis.removeClass('joining');
                            for (var i = ui.values[0]; i <= ui.values[1]; i++) {
                                $(lis[i]).addClass('joining');
                            }
                        },
                        values: [start, end],
                    });
                    $('#join-segments-modal .btn-primary').off('click');
                    $('#join-segments-modal .btn-primary').click(function () {
                        var range = $('#join-segments-modal .slider').slider('option', 'values');
                        var token = '';
                        for (var i = range[0]; i <= range[1]; i++) {
                            token += _this.segments[i].getToken();
                        }
                        var newSegment = new segment_1.Segment(token);
                        newSegment.setSelected(segment_type_2.FillSegmentType);
                        _this.segments.splice(range[0], range[1] - range[0] + 1, newSegment);
                        $('#join-segments-modal').modal('hide');
                    });
                    $('#join-segments-modal').modal();
                };
                DateTime.prototype.splitSegment = function (segment) {
                    var _this = this;
                    var segmentId = this.segments.indexOf(segment);
                    var token = this.segments[segmentId].getToken();
                    var newSegment;
                    var newSegments = [];
                    var ul = $('#split-segment-modal .characters');
                    ul.html('');
                    for (var i = 0; i < token.length; i++) {
                        ul.append('<li>' + token[i] + '</li>');
                        if (i !== token.length - 1) {
                            ul.append('<input type="checkbox">');
                        }
                    }
                    $('#split-segment-modal .btn-primary').off('click');
                    $('#split-segment-modal .btn-primary').click(function () {
                        var start = 0;
                        var end = 0;
                        var substringIndices = [];
                        var checkboxes = $('#split-segment-modal .characters input');
                        for (var i = 0; i < checkboxes.length; i++) {
                            if (checkboxes[i].checked) {
                                substringIndices.push(i + 1);
                            }
                        }
                        for (var i = 0; i < substringIndices.length; i++) {
                            end = substringIndices[i];
                            if (end > token.length) {
                                throw new Error("Tried to split on out of bounds");
                            }
                            newSegment = new segment_1.Segment(token.substring(start, end));
                            newSegment.setSelected(segment_type_2.FillSegmentType);
                            newSegments.push(newSegment);
                            start = substringIndices[i];
                        }
                        if (start < token.length) {
                            newSegment = new segment_1.Segment(token.substring(start, token.length));
                            newSegment.setSelected(segment_type_2.FillSegmentType);
                            newSegments.push(newSegment);
                        }
                        _this.segments.splice(segmentId, 1);
                        for (var i = 0; i < newSegments.length; i++) {
                            _this.segments.splice(segmentId + i, 0, newSegments[i]);
                        }
                        $('#split-segment-modal').modal('hide');
                    });
                    $('#split-segment-modal').modal();
                };
                DateTime.prototype.parseSegments = function (datetimeString) {
                    var tokens = datetimeString.match(/([^a-zA-Z\s\d]+|\d+|\s+|[a-zA-Z]+)/g);
                    var segments = [];
                    for (var i = 0; i < tokens.length; i++) {
                        segments.push(new segment_1.Segment(tokens[i]));
                    }
                    this.consolidateSegmentTypes(segments);
                    return segments;
                };
                DateTime.prototype.disableAllOfSegmentType = function (segments, segmentType) {
                    var changed = false;
                    for (var i = 0; i < segments.length; i++) {
                        if (segments[i].numTypes() > 1) {
                            if (segments[i].has(segmentType) && segments[i].hasEnabled(segmentType)) {
                                changed = true;
                            }
                            segments[i].disableType(segmentType);
                        }
                    }
                    return changed;
                };
                DateTime.prototype.consolidateSegmentTypes = function (segments) {
                    for (var i = 0; i < segments.length; i++) {
                        var segment = segments[i];
                        if (segment.has(segment_type_2.AMPMSegmentType)) {
                            for (var j = 0; j < segments.length; j++) {
                                if (segments[j].has(segment_type_2.HourSegmentType)) {
                                    segments[j].getType(segment_type_2.HourSegmentType).setTwentyFour(false);
                                }
                            }
                        }
                        if (i + 1 < segments.length && segment.has(segment_type_2.DaySegmentType) && segment_type_2.DaySegmentType.DATE_ENDINGS.indexOf(segments[i + 1].getToken().toLowerCase()) !== -1) {
                            segments.splice(i, 2, new segment_1.Segment(segment.getToken() + segments[i + 1].getToken()));
                            continue;
                        }
                        if (segment.has(segment_type_2.EpochSegmentType) && segments.length > 1) {
                            segment.disableType(segment_type_2.EpochSegmentType);
                        }
                        else if (segment.has(segment_type_2.EpochSegmentType)) {
                            segment.setType(segment_type_2.EpochSegmentType);
                        }
                        if (segment.getToken() === "-" || segment.getToken() === "+") {
                            if (i + 1 < segments.length && segments[i + 1].has(segment_type_2.HourMinuteSegmentType)) {
                                segments.splice(i, 2, new segment_1.Segment(segment.getToken() + segments[i + 1].getToken()));
                                continue;
                            }
                            if (i + 1 < segments.length && segments[i + 1].has(segment_type_2.HourSegmentType)) {
                                if (i + 3 < segments.length && segments[i + 2].getToken() === ":" && segments[i + 3].has(segment_type_2.MinuteSegmentType)) {
                                    if (i + 5 < segments.length && segments[i + 4].getToken() === ":" && segments[i + 5].has(segment_type_2.SecondSegmentType)) {
                                        segments.splice(i, 6, new segment_1.Segment(segment.getToken() + segments[i + 1].getToken() + ":" + segments[i + 3].getToken() + ":" + segments[i + 5].getToken()));
                                        continue;
                                    }
                                    else {
                                        segments.splice(i, 4, new segment_1.Segment(segment.getToken() + segments[i + 1].getToken() + ":" + segments[i + 3].getToken()));
                                        continue;
                                    }
                                }
                                else {
                                    segments.splice(i, 2, new segment_1.Segment(segment.getToken() + segments[i + 1].getToken()));
                                    continue;
                                }
                            }
                            if (i + 1 < segments.length && segments[i + 1].has(segment_type_2.HourMinuteSecondSegmentType)) {
                                segments.splice(i, 2, new segment_1.Segment(segment.getToken() + segments[i + 1].getToken()));
                                continue;
                            }
                        }
                        if ((segment.has(segment_type_2.MonthSegmentType) || segment.has(segment_type_2.DaySegmentType)) && i + 2 < segments.length && DateTime.DATE_SEPARATORS.indexOf(segments[i + 1].getToken()) !== -1
                            && (segments[i + 2].has(segment_type_2.DaySegmentType) || segments[i + 2].has(segment_type_2.MonthSegmentType))) {
                            var j = i;
                            if (i + 4 < segments.length && DateTime.DATE_SEPARATORS.indexOf(segments[i + 3].getToken()) !== -1 && (segments[i + 4].has(segment_type_2.YearSegmentType) || segments[i + 4].has(segment_type_2.ShortYearSegmentType))) {
                                this.disableAllOfSegmentType(segments, segment_type_2.YearSegmentType);
                                this.disableAllOfSegmentType(segments, segment_type_2.ShortYearSegmentType);
                                segments[i + 4].setTypes([segment_type_2.YearSegmentType, segment_type_2.ShortYearSegmentType]);
                                j += 2;
                            }
                            this.disableAllOfSegmentType(segments, segment_type_2.MonthSegmentType);
                            this.disableAllOfSegmentType(segments, segment_type_2.DaySegmentType);
                            if (!segment.has(segment_type_2.MonthSegmentType)) {
                                segment.setType(segment_type_2.DaySegmentType);
                                segments[i + 2].setType(segment_type_2.MonthSegmentType);
                            }
                            else if (!segments[i + 2].has(segment_type_2.MonthSegmentType)) {
                                segment.setType(segment_type_2.MonthSegmentType);
                                segments[i + 2].setType(segment_type_2.DaySegmentType);
                            }
                            else {
                                segment.setTypes([segment_type_2.MonthSegmentType, segment_type_2.DaySegmentType]);
                                segments[i + 2].setTypes([segment_type_2.MonthSegmentType, segment_type_2.DaySegmentType]);
                            }
                            i = j + 2;
                            continue;
                        }
                        if (segment.has(segment_type_2.YearSegmentType) && i + 4 < segments.length
                            && DateTime.DATE_SEPARATORS.indexOf(segments[i + 1].getToken()) !== -1 && segments[i + 2].has(segment_type_2.MonthSegmentType)
                            && DateTime.DATE_SEPARATORS.indexOf(segments[i + 3].getToken()) !== -1 && segments[i + 4].has(segment_type_2.DaySegmentType)) {
                            this.disableAllOfSegmentType(segments, segment_type_2.MonthSegmentType);
                            this.disableAllOfSegmentType(segments, segment_type_2.DaySegmentType);
                            this.disableAllOfSegmentType(segments, segment_type_2.YearSegmentType);
                            segments[i + 2].setType(segment_type_2.MonthSegmentType);
                            segments[i + 4].setType(segment_type_2.DaySegmentType);
                            segment.setType(segment_type_2.YearSegmentType);
                            i += 4;
                            continue;
                        }
                        if (segment.has(segment_type_2.HourSegmentType) && i + 2 < segments.length && segments[i + 1].getToken() === ":" && segments[i + 2].has(segment_type_2.MinuteSegmentType)) {
                            var j = i;
                            if (i + 4 < segments.length && segments[i + 3].getToken() === ":" && segments[i + 4].has(segment_type_2.SecondSegmentType)) {
                                this.disableAllOfSegmentType(segments, segment_type_2.SecondSegmentType);
                                segments[i + 4].setType(segment_type_2.SecondSegmentType);
                                j += 1;
                            }
                            this.disableAllOfSegmentType(segments, segment_type_2.HourMinuteSegmentType);
                            this.disableAllOfSegmentType(segments, segment_type_2.HourSegmentType);
                            this.disableAllOfSegmentType(segments, segment_type_2.MinuteSegmentType);
                            segment.setType(segment_type_2.HourSegmentType);
                            segments[i + 2].setType(segment_type_2.MinuteSegmentType);
                            i = j + 2;
                            continue;
                        }
                        if (segment.has(segment_type_2.SecondSegmentType) && i + 2 < segments.length && segments[i + 1].getToken() === "." && segments[i + 2].has(segment_type_2.MillisecondSegmentType)) {
                            this.disableAllOfSegmentType(segments, segment_type_2.SecondSegmentType);
                            this.disableAllOfSegmentType(segments, segment_type_2.MillisecondSegmentType);
                            segment.setType(segment_type_2.SecondSegmentType);
                            segments[i + 2].setType(segment_type_2.MillisecondSegmentType);
                            i += 2;
                            continue;
                        }
                        if (segment.has(segment_type_2.MillisecondSegmentType)) {
                            segment.disableType(segment_type_2.MillisecondSegmentType);
                        }
                    }
                    for (var i = 0; i < segments.length; i++) {
                        if (i + 1 < segments.length &&
                            segments[i].getOnlySegmentType() !== null && segments[i].getOnlySegmentType().getName() === segment_type_2.FillSegmentType.name &&
                            segments[i + 1].getOnlySegmentType() !== null && segments[i + 1].getOnlySegmentType().getName() === segment_type_2.FillSegmentType.name) {
                            segments.splice(i, 2, new segment_1.Segment(segments[i].getToken() + segments[i + 1].getToken()));
                            i -= 1;
                            continue;
                        }
                        if (segments[i].has(segment_type_2.FillSegmentType) && segments[i].numTypes() > 1) {
                            segments[i].disableType(segment_type_2.FillSegmentType);
                        }
                    }
                    var segmentTypeEquivalences = [
                        [segment_type_2.YearSegmentType, segment_type_2.ShortYearSegmentType],
                        [segment_type_2.LongMonthSegmentType, segment_type_2.ShortMonthSegmentType, segment_type_2.MonthSegmentType],
                        [segment_type_2.LongDaySegmentType, segment_type_2.ShortDaySegmentType],
                        [segment_type_2.HourSegmentType, segment_type_2.HourMinuteSegmentType, segment_type_2.HourMinuteSecondSegmentType],
                        [segment_type_2.MinuteSegmentType, segment_type_2.HourMinuteSegmentType, segment_type_2.HourMinuteSecondSegmentType],
                        [segment_type_2.SecondSegmentType, segment_type_2.HourMinuteSecondSegmentType],
                        [segment_type_2.LongTimezoneSegmentType, segment_type_2.ShortTimezoneSegmentType, segment_type_2.TimezoneOffsetSegmentType],
                    ];
                    for (var i = 0; i < segment_type_2.SEGMENT_TYPES.length; i++) {
                        segmentTypeEquivalences.unshift([segment_type_2.SEGMENT_TYPES[i]]);
                    }
                    var changed = true;
                    while (changed) {
                        changed = false;
                        for (var i = 0; i < segments.length; i++) {
                            var onlySegmentType = segments[i].getOnlySegmentType();
                            if (onlySegmentType !== null) {
                                for (var j = 0; j < segmentTypeEquivalences.length; j++) {
                                    for (var k = 0; k < segmentTypeEquivalences[j].length; k++) {
                                        if (onlySegmentType instanceof segmentTypeEquivalences[j][k]) {
                                            for (var l = 0; l < segmentTypeEquivalences[j].length; l++) {
                                                changed = changed || this.disableAllOfSegmentType(segments, segmentTypeEquivalences[j][l]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                DateTime.DATE_SEPARATORS = ["-", "/", "."];
                return DateTime;
            }());
            exports_7("DateTime", DateTime);
        }
    }
});
System.register("app/map-to-iterable.directive", ['angular2/core'], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_1;
    var MapToIterable;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            MapToIterable = (function () {
                function MapToIterable() {
                }
                MapToIterable.prototype.transform = function (dict) {
                    var a = [];
                    for (var key in dict) {
                        if (dict.hasOwnProperty(key)) {
                            a.push({ key: key, val: dict[key] });
                        }
                    }
                    return a;
                };
                MapToIterable = __decorate([
                    core_1.Pipe({
                        name: 'mapToIterable'
                    }), 
                    __metadata('design:paramtypes', [])
                ], MapToIterable);
                return MapToIterable;
            }());
            exports_8("MapToIterable", MapToIterable);
        }
    }
});
System.register("app/segment-type-setting.component", ['angular2/core', "app/map-to-iterable.directive"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_2, map_to_iterable_directive_1;
    var BooleanSegmentTypeSettingComponent, StringSegmentTypeSettingComponent, DropdownSegmentTypeSettingComponent;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (map_to_iterable_directive_1_1) {
                map_to_iterable_directive_1 = map_to_iterable_directive_1_1;
            }],
        execute: function() {
            BooleanSegmentTypeSettingComponent = (function () {
                function BooleanSegmentTypeSettingComponent() {
                }
                BooleanSegmentTypeSettingComponent = __decorate([
                    core_2.Component({
                        inputs: ['segmentTypeSetting'],
                        selector: 'booleanSegmentTypeSetting',
                        template: "\n    <input class=\"segmentTypeSetting booleanSetting\" name=\"{{segmentTypeSetting.name}}\" type='checkbox' placeholder=\"{{segmentTypeSetting.placeholder}}\" [(ngModel)]=\"segmentTypeSetting.value\">\n    <label attr.for=\"{{segmentTypeSetting.name}}\">{{segmentTypeSetting.label}}</label>\n  ",
                    }), 
                    __metadata('design:paramtypes', [])
                ], BooleanSegmentTypeSettingComponent);
                return BooleanSegmentTypeSettingComponent;
            }());
            exports_9("BooleanSegmentTypeSettingComponent", BooleanSegmentTypeSettingComponent);
            StringSegmentTypeSettingComponent = (function () {
                function StringSegmentTypeSettingComponent() {
                }
                StringSegmentTypeSettingComponent = __decorate([
                    core_2.Component({
                        inputs: ['segmentTypeSetting'],
                        selector: 'stringSegmentTypeSetting',
                        template: "\n    <input class=\"segmentTypeSetting stringSetting\" name=\"{{segmentTypeSetting.name}}\" type='text' placeholder=\"{{segmentTypeSetting.placeholder}}\" [(ngModel)]=\"segmentTypeSetting.value\">\n    <label attr.for=\"{{segmentTypeSetting.name}}\">{{segmentTypeSetting.label}}</label>\n  ",
                    }), 
                    __metadata('design:paramtypes', [])
                ], StringSegmentTypeSettingComponent);
                return StringSegmentTypeSettingComponent;
            }());
            exports_9("StringSegmentTypeSettingComponent", StringSegmentTypeSettingComponent);
            DropdownSegmentTypeSettingComponent = (function () {
                function DropdownSegmentTypeSettingComponent() {
                }
                DropdownSegmentTypeSettingComponent = __decorate([
                    core_2.Component({
                        inputs: ['segmentTypeSetting'],
                        pipes: [map_to_iterable_directive_1.MapToIterable],
                        selector: 'dropdownSegmentTypeSetting',
                        template: "\n    <select class=\"segmentTypeSetting dropdownSetting\" [(ngModel)]=\"segmentTypeSetting.value\">\n      <label>{{segmentTypeSetting.label}}</label>\n      <option *ngFor=\"#possibleValue of segmentTypeSetting.possibleValues | mapToIterable\" [value]=\"possibleValue.key\">\n        {{possibleValue.val}}\n      </option>\n    </select>\n  ",
                    }), 
                    __metadata('design:paramtypes', [])
                ], DropdownSegmentTypeSettingComponent);
                return DropdownSegmentTypeSettingComponent;
            }());
            exports_9("DropdownSegmentTypeSettingComponent", DropdownSegmentTypeSettingComponent);
        }
    }
});
System.register("app/segment-type-settings.component", ['angular2/core', "app/segment-type-setting", "app/segment-type-setting.component"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var core_3, segment_type_setting_2, segment_type_setting_component_1;
    var SegmentTypeSettingsComponent;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (segment_type_setting_2_1) {
                segment_type_setting_2 = segment_type_setting_2_1;
            },
            function (segment_type_setting_component_1_1) {
                segment_type_setting_component_1 = segment_type_setting_component_1_1;
            }],
        execute: function() {
            SegmentTypeSettingsComponent = (function () {
                function SegmentTypeSettingsComponent() {
                }
                SegmentTypeSettingsComponent.prototype.isBooleanSegmentTypeSetting = function (segmentTypeSetting) {
                    return segmentTypeSetting instanceof segment_type_setting_2.BooleanSegmentTypeSetting;
                };
                SegmentTypeSettingsComponent.prototype.isStringSegmentTypeSetting = function (segmentTypeSetting) {
                    return segmentTypeSetting instanceof segment_type_setting_2.StringSegmentTypeSetting;
                };
                SegmentTypeSettingsComponent.prototype.isDropdownSegmentTypeSetting = function (segmentTypeSetting) {
                    return segmentTypeSetting instanceof segment_type_setting_2.DropdownSegmentTypeSetting;
                };
                SegmentTypeSettingsComponent = __decorate([
                    core_3.Component({
                        directives: [
                            segment_type_setting_component_1.BooleanSegmentTypeSettingComponent,
                            segment_type_setting_component_1.StringSegmentTypeSettingComponent,
                            segment_type_setting_component_1.DropdownSegmentTypeSettingComponent,
                        ],
                        inputs: ['segmentTypeSettings'],
                        selector: 'segmentTypeSettings',
                        template: "\n    <div class=\"segmentTypeSettings\" *ngFor=\"#segmentTypeSetting of segmentTypeSettings.getSettings()\">\n      <booleanSegmentTypeSetting\n        *ngIf=\"isBooleanSegmentTypeSetting(segmentTypeSetting)\"\n        [segmentTypeSetting]=\"segmentTypeSetting\">\n      </booleanSegmentTypeSetting>\n      <stringSegmentTypeSetting\n        *ngIf=\"isStringSegmentTypeSetting(segmentTypeSetting)\"\n        [segmentTypeSetting]=\"segmentTypeSetting\">\n      </stringSegmentTypeSetting>\n      <dropdownSegmentTypeSetting\n        *ngIf=\"isDropdownSegmentTypeSetting(segmentTypeSetting)\"\n        [segmentTypeSetting]=\"segmentTypeSetting\">\n      </dropdownSegmentTypeSetting>\n    </div>\n  ",
                    }), 
                    __metadata('design:paramtypes', [])
                ], SegmentTypeSettingsComponent);
                return SegmentTypeSettingsComponent;
            }());
            exports_10("SegmentTypeSettingsComponent", SegmentTypeSettingsComponent);
        }
    }
});
System.register("app/segment-type.component", ['angular2/core', "app/segment-type-settings.component"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_4, segment_type_settings_component_1;
    var SegmentTypeComponent;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (segment_type_settings_component_1_1) {
                segment_type_settings_component_1 = segment_type_settings_component_1_1;
            }],
        execute: function() {
            SegmentTypeComponent = (function () {
                function SegmentTypeComponent() {
                }
                SegmentTypeComponent = __decorate([
                    core_4.Component({
                        directives: [segment_type_settings_component_1.SegmentTypeSettingsComponent],
                        inputs: ['segmentType', 'selected'],
                        selector: 'segmentType',
                        template: "\n      <div class=\"segmentType\" *ngIf=\"segmentType.valid\" [class.disabled]=\"!segmentType.enabled\" [class.selected]=\"selected\">\n        {{segmentType.name}}\n        <segmentTypeSettings [segmentTypeSettings]=\"segmentType.getSettings()\"></segmentTypeSettings>\n      </div>\n    ",
                    }), 
                    __metadata('design:paramtypes', [])
                ], SegmentTypeComponent);
                return SegmentTypeComponent;
            }());
            exports_11("SegmentTypeComponent", SegmentTypeComponent);
        }
    }
});
System.register("app/segment.component", ['angular2/core', "app/segment-type.component"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var core_5, segment_type_component_1;
    var SegmentComponent;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (segment_type_component_1_1) {
                segment_type_component_1 = segment_type_component_1_1;
            }],
        execute: function() {
            SegmentComponent = (function () {
                function SegmentComponent() {
                }
                SegmentComponent.prototype.setSelected = function (segment, segmentType) {
                    segment.setSelectedName(segmentType.getName());
                };
                SegmentComponent.prototype.isSelected = function (segment, segmentType) {
                    if (!segment.getSelected()) {
                        return false;
                    }
                    return segment.getSelected().name === segmentType.getName();
                };
                SegmentComponent = __decorate([
                    core_5.Component({
                        directives: [segment_type_component_1.SegmentTypeComponent],
                        inputs: ['segment', 'datetime'],
                        selector: 'segment',
                        template: "\n    <div class=\"segment\">\n      Token: {{segment.token}} (<a (click)=\"datetime.splitSegment(segment)\">Split</a> | <a (click)=\"datetime.editSegment(segment)\">Edit</a> | <a (click)=\"datetime.deleteSegment(segment)\">Delete</a>)\n      <segmentType *ngFor=\"#segmentType of segment.getTypes()\" [segmentType]=\"segmentType\" (click)=\"setSelected(segment,segmentType)\" [selected]=\"isSelected(segment, segmentType)\"></segmentType>\n    </div>\n  ",
                    }), 
                    __metadata('design:paramtypes', [])
                ], SegmentComponent);
                return SegmentComponent;
            }());
            exports_12("SegmentComponent", SegmentComponent);
        }
    }
});
System.register("app/datetime.component", ['angular2/core', "app/segment.component"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var core_6, segment_component_1;
    var DateTimeComponent;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (segment_component_1_1) {
                segment_component_1 = segment_component_1_1;
            }],
        execute: function() {
            DateTimeComponent = (function () {
                function DateTimeComponent() {
                }
                DateTimeComponent = __decorate([
                    core_6.Component({
                        directives: [segment_component_1.SegmentComponent],
                        inputs: ['datetime'],
                        selector: 'datetime',
                        template: "\n      <div class=\"datetime\" *ngIf=\"datetime\">\n        <div>{{datetime.toString()}}</div>\n        <a (click)=\"datetime.joinSegments()\">Join Segments</a>\n        <div *ngFor=\"#segment of datetime.segments\">\n          <segment [segment]=\"segment\" [datetime]=\"datetime\">Segment</segment>\n          <a (click)=\"datetime.newSegment(segment)\">New Segment</a>\n        </div>\n      </div>\n    ",
                    }), 
                    __metadata('design:paramtypes', [])
                ], DateTimeComponent);
                return DateTimeComponent;
            }());
            exports_13("DateTimeComponent", DateTimeComponent);
        }
    }
});
System.register("app/dateformats/dateformat-segment", [], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var DateFormatSegment, DateFormatSegmentStatus;
    return {
        setters:[],
        execute: function() {
            DateFormatSegment = (function () {
                function DateFormatSegment(value, s, tooltip) {
                    this.value = value;
                    this.stat = s;
                    this.tooltip = tooltip;
                }
                DateFormatSegment.prototype.getValue = function () {
                    return this.value;
                };
                DateFormatSegment.prototype.getStatusClass = function () {
                    switch (this.stat) {
                        case DateFormatSegmentStatus.ERROR:
                            return 'statusclass-error';
                        case DateFormatSegmentStatus.OKAY:
                            return 'statusclass-okay';
                        case DateFormatSegmentStatus.WARN:
                            return 'statusclass-warn';
                        default:
                            return null;
                    }
                };
                return DateFormatSegment;
            }());
            exports_14("DateFormatSegment", DateFormatSegment);
            (function (DateFormatSegmentStatus) {
                DateFormatSegmentStatus[DateFormatSegmentStatus["ERROR"] = 0] = "ERROR";
                DateFormatSegmentStatus[DateFormatSegmentStatus["WARN"] = 1] = "WARN";
                DateFormatSegmentStatus[DateFormatSegmentStatus["OKAY"] = 2] = "OKAY";
            })(DateFormatSegmentStatus || (DateFormatSegmentStatus = {}));
            exports_14("DateFormatSegmentStatus", DateFormatSegmentStatus);
        }
    }
});
System.register("app/dateformats/dateformat", [], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var DateFormat;
    return {
        setters:[],
        execute: function() {
            DateFormat = (function () {
                function DateFormat(datetime) {
                    this.datetime = datetime;
                }
                return DateFormat;
            }());
            exports_15("DateFormat", DateFormat);
        }
    }
});
System.register("app/dateformats/coreutils", ["app/dateformats/dateformat", "app/dateformats/dateformat-segment", "app/segment-type"], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var dateformat_1, dateformat_segment_1, segment_type_3;
    var CoreutilsDateFormat;
    return {
        setters:[
            function (dateformat_1_1) {
                dateformat_1 = dateformat_1_1;
            },
            function (dateformat_segment_1_1) {
                dateformat_segment_1 = dateformat_segment_1_1;
            },
            function (segment_type_3_1) {
                segment_type_3 = segment_type_3_1;
            }],
        execute: function() {
            CoreutilsDateFormat = (function (_super) {
                __extends(CoreutilsDateFormat, _super);
                function CoreutilsDateFormat() {
                    _super.apply(this, arguments);
                }
                CoreutilsDateFormat.prototype.getLabel = function () {
                    return "Coreutils Date";
                };
                CoreutilsDateFormat.prototype.getFormat = function () {
                    var format = [];
                    var segments = this.datetime.getSegments();
                    var segmentType;
                    for (var i = 0; i < segments.length; i++) {
                        var segment = segments[i];
                        switch (segment.getSelected()) {
                            case segment_type_3.ShortDaySegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                format.push(this.getCasedSegmentType(segmentType, "a", ""));
                                break;
                            case segment_type_3.LongDaySegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                format.push(this.getCasedSegmentType(segmentType, "A", ""));
                                break;
                            case segment_type_3.ShortMonthSegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                format.push(this.getCasedSegmentType(segmentType, "b", ""));
                                break;
                            case segment_type_3.LongMonthSegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                format.push(this.getCasedSegmentType(segmentType, "B", ""));
                                break;
                            case segment_type_3.DaySegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                var tooltip = null;
                                var stat = dateformat_segment_1.DateFormatSegmentStatus.OKAY;
                                if (segmentType.isPrettyEnding()) {
                                    tooltip = "Coreutils Bash does not support st, nd, rd, th.";
                                    stat = dateformat_segment_1.DateFormatSegmentStatus.ERROR;
                                }
                                if (segmentType.isZeroPadded()) {
                                    format.push(new dateformat_segment_1.DateFormatSegment("%d", stat, tooltip));
                                }
                                else {
                                    format.push(new dateformat_segment_1.DateFormatSegment("%-d", stat, tooltip));
                                }
                                break;
                            case segment_type_3.MonthSegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                if (segmentType.isZeroPadded()) {
                                    format.push(new dateformat_segment_1.DateFormatSegment("%m", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                }
                                else {
                                    format.push(new dateformat_segment_1.DateFormatSegment("%-m", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                }
                                break;
                            case segment_type_3.YearSegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                if (segmentType.isZeroPadded()) {
                                    format.push(new dateformat_segment_1.DateFormatSegment("%Y", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                }
                                else {
                                    format.push(new dateformat_segment_1.DateFormatSegment("%-Y", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                }
                                break;
                            case segment_type_3.YearMonthDaySegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                format.push(new dateformat_segment_1.DateFormatSegment("%Y%m%d", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                break;
                            case segment_type_3.YearMonthDayHourMinuteSegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                format.push(new dateformat_segment_1.DateFormatSegment("%Y%m%d%H%M", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                break;
                            case segment_type_3.YearMonthDayHourMinuteSecondSegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                format.push(new dateformat_segment_1.DateFormatSegment("%Y%m%d%H%M%S", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                break;
                            case segment_type_3.ShortYearSegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                if (segmentType.isZeroPadded()) {
                                    format.push(new dateformat_segment_1.DateFormatSegment("%y", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                }
                                else {
                                    format.push(new dateformat_segment_1.DateFormatSegment("%-y", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                }
                                break;
                            case segment_type_3.HourMinuteSegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                format.push(new dateformat_segment_1.DateFormatSegment("%H%M", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                break;
                            case segment_type_3.HourMinuteSecondSegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                format.push(new dateformat_segment_1.DateFormatSegment("%H%M%S", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                break;
                            case segment_type_3.HourSegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                if (segmentType.getTwentyFour()) {
                                    if (segmentType.isZeroPadded()) {
                                        format.push(new dateformat_segment_1.DateFormatSegment("%H", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                    }
                                    else {
                                        format.push(new dateformat_segment_1.DateFormatSegment("%-H", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                    }
                                }
                                else {
                                    if (segmentType.isZeroPadded()) {
                                        format.push(new dateformat_segment_1.DateFormatSegment("%I", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                    }
                                    else {
                                        format.push(new dateformat_segment_1.DateFormatSegment("%-I", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                    }
                                }
                                break;
                            case segment_type_3.MinuteSegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                if (segmentType.isZeroPadded()) {
                                    format.push(new dateformat_segment_1.DateFormatSegment("%M", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                }
                                else {
                                    format.push(new dateformat_segment_1.DateFormatSegment("%-M", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                }
                                break;
                            case segment_type_3.SecondSegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                if (segmentType.isZeroPadded()) {
                                    format.push(new dateformat_segment_1.DateFormatSegment("%S", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                }
                                else {
                                    format.push(new dateformat_segment_1.DateFormatSegment("%-S", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                }
                                break;
                            case segment_type_3.MillisecondSegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                format.push(new dateformat_segment_1.DateFormatSegment("%N", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                break;
                            case segment_type_3.AMPMSegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                switch (segmentType.getCaseStyle()) {
                                    case segment_type_3.CaseStyle.Upper:
                                        format.push(new dateformat_segment_1.DateFormatSegment("%p", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                        break;
                                    default:
                                        format.push(new dateformat_segment_1.DateFormatSegment("%P", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                        break;
                                }
                                break;
                            case segment_type_3.ShortTimezoneSegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                format.push(new dateformat_segment_1.DateFormatSegment("%Z", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                break;
                            case segment_type_3.LongTimezoneSegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                format.push(new dateformat_segment_1.DateFormatSegment(segmentType.getSettings().get('token').getValue().replace('%', '%%'), dateformat_segment_1.DateFormatSegmentStatus.ERROR, "Coreutils Date does not support Long Timezones"));
                                break;
                            case segment_type_3.TimezoneOffsetSegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                switch (segmentType.getTimezoneOffsetType()) {
                                    case segment_type_3.TimezoneOffsetType.Hour:
                                        format.push(new dateformat_segment_1.DateFormatSegment("%:::z", dateformat_segment_1.DateFormatSegmentStatus.WARN, "This mode specifies to necessary precision. Coreutils Date does not have a way of forcing only hour."));
                                        break;
                                    case segment_type_3.TimezoneOffsetType.HourMinute:
                                        format.push(new dateformat_segment_1.DateFormatSegment("%z", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                        break;
                                    case segment_type_3.TimezoneOffsetType.HourMinuteSecond:
                                        format.push(new dateformat_segment_1.DateFormatSegment("%::z", dateformat_segment_1.DateFormatSegmentStatus.ERROR, "There is no way to specify hour-minute-second without separators in bash"));
                                        break;
                                    case segment_type_3.TimezoneOffsetType.HourMinuteSeparated:
                                        format.push(new dateformat_segment_1.DateFormatSegment("%:z", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                        break;
                                    case segment_type_3.TimezoneOffsetType.HourMinuteSecondSeparated:
                                        format.push(new dateformat_segment_1.DateFormatSegment("%::z", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                        break;
                                }
                                break;
                            case segment_type_3.EpochSegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                format.push(new dateformat_segment_1.DateFormatSegment("%s", dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                break;
                            case segment_type_3.FillSegmentType:
                                segmentType = segment.getType(segment.getSelected());
                                format.push(new dateformat_segment_1.DateFormatSegment(segmentType.getSettings().get('token').getValue().replace('%', '%%'), dateformat_segment_1.DateFormatSegmentStatus.OKAY, null));
                                break;
                            default:
                                throw new Error("Unhandled SegmentType (" + segment.getSelected().name + ") Encountered for type: " + this.getLabel());
                        }
                    }
                    return format;
                };
                CoreutilsDateFormat.prototype.getFormatString = function () {
                    var format = this.getFormat();
                    var formatString = "";
                    for (var i in format) {
                        formatString += format[i].getValue();
                    }
                    return formatString;
                };
                CoreutilsDateFormat.prototype.getParseExample = function () {
                    return "date '+" + this.getFormatString() + "' --date='" + this.datetime.toString() + "'";
                };
                CoreutilsDateFormat.prototype.getPrintExample = function () {
                    return "date '+" + this.getFormatString() + "'";
                };
                CoreutilsDateFormat.prototype.getCasedSegmentType = function (segmentType, formatString, extraFormatters) {
                    var format = "%" + extraFormatters;
                    var stat = dateformat_segment_1.DateFormatSegmentStatus.OKAY;
                    var tooltip = null;
                    switch (segmentType.getCaseStyle()) {
                        case segment_type_3.CaseStyle.Upper:
                            format += "^";
                            break;
                        case segment_type_3.CaseStyle.Lower:
                            stat = dateformat_segment_1.DateFormatSegmentStatus.ERROR;
                            tooltip = "Coreutils Date does not have an option for lowercase.";
                            break;
                        case segment_type_3.CaseStyle.Unknown:
                            stat = dateformat_segment_1.DateFormatSegmentStatus.ERROR;
                            tooltip = "An unknown CaseStyle was specified.";
                            break;
                        case segment_type_3.CaseStyle.Title:
                            break;
                        default:
                            break;
                    }
                    format += formatString + extraFormatters;
                    return new dateformat_segment_1.DateFormatSegment(format, stat, tooltip);
                };
                return CoreutilsDateFormat;
            }(dateformat_1.DateFormat));
            exports_16("CoreutilsDateFormat", CoreutilsDateFormat);
        }
    }
});
System.register("app/dateformat.component", ['angular2/core', "app/segment-type", "app/dateformats/coreutils"], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var core_7, segment_type_4, coreutils_1;
    var DateFormatComponent;
    return {
        setters:[
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (segment_type_4_1) {
                segment_type_4 = segment_type_4_1;
            },
            function (coreutils_1_1) {
                coreutils_1 = coreutils_1_1;
            }],
        execute: function() {
            DateFormatComponent = (function () {
                function DateFormatComponent() {
                    this.DATE_FORMATS = [
                        coreutils_1.CoreutilsDateFormat,
                    ];
                }
                DateFormatComponent.prototype.getWarnings = function (datetime) {
                    var warnings = [];
                    var segments = datetime.getSegments();
                    var segmentType;
                    var foundTypes = [];
                    var foundDuplicates = [];
                    for (var i in segments) {
                        segmentType = segments[i].getSelected();
                        if (segmentType === null) {
                            continue;
                        }
                        if (foundTypes.indexOf(segmentType) > -1 && foundDuplicates.indexOf(segmentType) === -1 && segmentType !== segment_type_4.FillSegmentType) {
                            warnings.push("Multiple segmentTypes of " + segmentType.name + " found.");
                            foundDuplicates.push(segmentType);
                        }
                        else {
                            foundTypes.push(segmentType);
                        }
                    }
                    if ((foundTypes.indexOf(segment_type_4.MonthSegmentType) > -1 || foundTypes.indexOf(segment_type_4.LongMonthSegmentType) > -1 || foundTypes.indexOf(segment_type_4.ShortMonthSegmentType) > -1) && foundTypes.indexOf(segment_type_4.DaySegmentType) === -1) {
                        warnings.push("A month segment was found but no day segment was found");
                    }
                    else if (foundTypes.indexOf(segment_type_4.DaySegmentType) > -1 && (foundTypes.indexOf(segment_type_4.MonthSegmentType) === -1 && foundTypes.indexOf(segment_type_4.LongMonthSegmentType) === -1 && foundTypes.indexOf(segment_type_4.ShortMonthSegmentType) === -1)) {
                        warnings.push("A day segment was found but no month segment was found");
                    }
                    return warnings;
                };
                DateFormatComponent.prototype.getDateFormats = function (datetime) {
                    var dateFormats = [];
                    for (var i in this.DATE_FORMATS) {
                        var o = Object.create(this.DATE_FORMATS[i].prototype);
                        o.constructor.apply(o, new Array(datetime));
                        dateFormats.push(o);
                    }
                    return dateFormats;
                };
                DateFormatComponent = __decorate([
                    core_7.Component({
                        inputs: ['datetime'],
                        selector: 'dateformat',
                        template: "\n      <template [ngIf]=\"datetime\">\n        <div *ngFor=\"#warning of getWarnings(datetime)\">\n          {{warning}}\n        </div>\n        <div *ngFor=\"#dateFormat of getDateFormats(datetime)\">\n          <div>\n            {{dateFormat.getLabel()}}:\n            <span *ngFor=\"#dateFormatSegment of dateFormat.getFormat()\" [class]=\"dateFormatSegment.getStatusClass()\" title=\"{{dateFormatSegment.tooltip}}\">{{dateFormatSegment.value}}</span>\n          </div>\n          <div>Print Example: {{dateFormat.getPrintExample()}}</div>\n          <div>Parse Example: {{dateFormat.getParseExample()}}</div>\n        </div>\n      </template>\n    ",
                    }), 
                    __metadata('design:paramtypes', [])
                ], DateFormatComponent);
                return DateFormatComponent;
            }());
            exports_17("DateFormatComponent", DateFormatComponent);
        }
    }
});
System.register("app/converter.component", ['angular2/core', "app/datetime", "app/datetime.component", "app/dateformat.component"], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var core_8, datetime_1, datetime_component_1, dateformat_component_1;
    var ConverterComponent;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (datetime_1_1) {
                datetime_1 = datetime_1_1;
            },
            function (datetime_component_1_1) {
                datetime_component_1 = datetime_component_1_1;
            },
            function (dateformat_component_1_1) {
                dateformat_component_1 = dateformat_component_1_1;
            }],
        execute: function() {
            ConverterComponent = (function () {
                function ConverterComponent() {
                    this.testDates = [
                        "Sun, 29 Feb 2004 16:21:42 -0800",
                        "Wednesday 16th October 2013 19:00 CET",
                        "Sunday, 29 February 2004 16:21:42 -0800",
                        "2004-02-29 16:21:42",
                        "1997-07-16T19:20:30+01:00",
                        "1997-07-16T19:20:30",
                        "1997-07-16T19:20+01:00",
                        "1997-07-16T19:20",
                        "1997-07-07T19:20:30+01:00",
                        "1997-07-07T192030+01:00",
                        "1997-07-07T192030+0100",
                        "1997-07-07 192030+0100",
                        "11/11/11",
                        "11/11/2011",
                        "11.11.2011",
                        "11/11/2011 01:03:45.1203",
                        "11/11/2011 01:03:45.1203Z",
                        "11/11/2011 01:03:45.1203 GMT",
                        "20120203-123443",
                        "10230810",
                    ];
                    this.date = this.getRandomDate();
                }
                ConverterComponent.prototype.getRandomInt = function (min, max) {
                    return Math.floor(Math.random() * (max - min)) + min;
                };
                ConverterComponent.prototype.getRandomDate = function () {
                    return this.testDates[this.getRandomInt(0, this.testDates.length)];
                };
                ConverterComponent.prototype.convert = function () {
                    this.datetime = new datetime_1.DateTime(this.date);
                };
                ConverterComponent.prototype.setRandom = function () {
                    this.date = this.getRandomDate();
                };
                ConverterComponent = __decorate([
                    core_8.Component({
                        directives: [datetime_component_1.DateTimeComponent, dateformat_component_1.DateFormatComponent],
                        selector: 'converter',
                        template: "\n    <div>\n      <div>\n        <input [(ngModel)]=\"date\" className=\"date\" type=\"text\"/>\n        <button className=\"btn\" (click)=\"convert()\">Convert</button>\n        <button className=\"btn\" (click)=\"setRandom()\">Random</button>\n      </div>\n      <dateformat [datetime]=\"datetime\"></dateformat>\n      <datetime [datetime]=\"datetime\"></datetime>\n    </div>\n  ",
                    }), 
                    __metadata('design:paramtypes', [])
                ], ConverterComponent);
                return ConverterComponent;
            }());
            exports_18("ConverterComponent", ConverterComponent);
        }
    }
});
System.register("app/main", ['angular2/platform/browser', "app/converter.component"], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var browser_1, converter_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (converter_component_1_1) {
                converter_component_1 = converter_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(converter_component_1.ConverterComponent);
            console.log("Loaded!!");
        }
    }
});
