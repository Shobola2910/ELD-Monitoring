// ═══════════════════════════════════════════════════════════
// USERS (login accounts)
// ═══════════════════════════════════════════════════════════
export const USERS = [
  { id:"u1", name:"Shobola",  username:"shobola",  password:"algo2024",  role:"admin", initials:"SH", color:"#7C3AED" },
  { id:"u2", name:"David",    username:"david",    password:"david123",  role:"agent", initials:"DV", color:"#0EA5E9" },
  { id:"u3", name:"Habi",     username:"habi",     password:"habi123",   role:"agent", initials:"HB", color:"#10B981" },
  { id:"u4", name:"Mike",     username:"mike",     password:"mike123",   role:"agent", initials:"MK", color:"#F59E0B" },
  { id:"u5", name:"Nate",     username:"nate",     password:"nate123",   role:"agent", initials:"NT", color:"#EF4444" },
  { id:"u6", name:"Beck",     username:"beck",     password:"beck123",   role:"agent", initials:"BK", color:"#8B5CF6" },
  { id:"u7", name:"Ismail",   username:"ismail",   password:"ismail123", role:"agent", initials:"IS", color:"#06B6D4" },
  { id:"u8", name:"Sue",      username:"sue",      password:"sue123",    role:"agent", initials:"SU", color:"#EC4899" },
  { id:"u9", name:"Arthur",   username:"arthur",   password:"arthur123", role:"agent", initials:"AR", color:"#84CC16" },
];

// ═══════════════════════════════════════════════════════════
// RESPONSIBLE PERSONS (editable in Settings)
// ═══════════════════════════════════════════════════════════
export const DEFAULT_RESPONSIBLE = [
  { id:"r1", name:"Ismail", color:"#818CF8" },
  { id:"r2", name:"Mike",   color:"#34D399" },
  { id:"r3", name:"Nate",   color:"#F87171" },
  { id:"r4", name:"Beck",   color:"#9CA3AF" },
  { id:"r5", name:"David",  color:"#0EA5E9" },
  { id:"r6", name:"Habi",   color:"#FBBF24" },
  { id:"r7", name:"Sue",    color:"#F472B6" },
  { id:"r8", name:"Arthur", color:"#FB923C" },
];

// ═══════════════════════════════════════════════════════════
// NOTE OPTIONS
// ═══════════════════════════════════════════════════════════
export const NOTE_OPTIONS = ["All good","New","Off","Pending","Issue"];
export const ELD_TIME_OPTIONS = ["","ALL GOOD","1st time","2nd time","3rd time","Not set up"];

// ═══════════════════════════════════════════════════════════
// DEFAULT SETTINGS
// ═══════════════════════════════════════════════════════════
export const DEFAULT_SETTINGS = {
  factorToken:"", factorUrl:"https://api.factorhq.com/v1", factorSetAt:null,
  leaderToken:"", leaderUrl:"https://app.leadereld.com/api/v1", leaderSetAt:null,
  syncIntervalMinutes: 15,
};

// ═══════════════════════════════════════════════════════════
// INITIAL DATA
// ═══════════════════════════════════════════════════════════
const today = new Date().toISOString().split("T")[0];

export const INITIAL_DATA = {
  companies:[
    {
      id:"c1", name:"SABIR EXPRESS INC", color:"#3B82F6", eldProvider:"leader",
      collapsed:false, starred:true,
      drivers:[
        {id:"d1",  name:"Abbos Eshnazarov",                       truck:"#002",    responsible:"David", note:"Off",      date:today, paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         eldStatus:"unknown", eldLastSeen:null, active:true,  eldDriverId:"", updatedBy:"David", updatedAt:today},
        {id:"d2",  name:"Afzal Abdullaev",                        truck:"#010",    responsible:"David", note:"New",      date:today, paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         eldStatus:"unknown", eldLastSeen:null, active:true,  eldDriverId:"", updatedBy:"David", updatedAt:today},
        {id:"d3",  name:"Golibjon Ravshanov | Elmurod Berdiev",   truck:"#009",    responsible:"David", note:"All good", date:today, paperLogbook:true, userManual:true, tabletMounted:true, eldTimes:"ALL GOOD", eldStatus:"unknown", eldLastSeen:null, active:true,  eldDriverId:"", updatedBy:"David", updatedAt:today},
        {id:"d4",  name:"Shukhrat Sharofidinov | Farrux Azizov",  truck:"#006",    responsible:"David", note:"All good", date:today, paperLogbook:true, userManual:true, tabletMounted:true, eldTimes:"ALL GOOD", eldStatus:"unknown", eldLastSeen:null, active:true,  eldDriverId:"", updatedBy:"David", updatedAt:today},
        {id:"d5",  name:"Gafur Normamatovich Yuldashev",          truck:"#110",    responsible:"David", note:"All good", date:today, paperLogbook:true, userManual:null, tabletMounted:true, eldTimes:"1st time", eldStatus:"unknown", eldLastSeen:null, active:true,  eldDriverId:"", updatedBy:"David", updatedAt:today},
        {id:"d6",  name:"Lochinbek Abduvali Abduraupov",          truck:"#046",    responsible:"David", note:"All good", date:today, paperLogbook:true, userManual:true, tabletMounted:true, eldTimes:"ALL GOOD", eldStatus:"unknown", eldLastSeen:null, active:true,  eldDriverId:"", updatedBy:"Habi",  updatedAt:today},
        {id:"d7",  name:"Mukhlis Jabborov",                       truck:"#009",    responsible:"David", note:"Off",      date:today, paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         eldStatus:"unknown", eldLastSeen:null, active:true,  eldDriverId:"", updatedBy:"David", updatedAt:today},
        {id:"d8",  name:"Nasiba Kholikova | Guli K Makhmudova",   truck:"#007",    responsible:"David", note:"All good", date:today, paperLogbook:true, userManual:true, tabletMounted:null, eldTimes:"ALL GOOD", eldStatus:"unknown", eldLastSeen:null, active:true,  eldDriverId:"", updatedBy:"David", updatedAt:today},
        {id:"d9",  name:"Olim Abdusalomov",                       truck:"#003",    responsible:"David", note:"All good", date:today, paperLogbook:true, userManual:true, tabletMounted:true, eldTimes:"ALL GOOD", eldStatus:"unknown", eldLastSeen:null, active:true,  eldDriverId:"", updatedBy:"David", updatedAt:today},
        {id:"d10", name:"Rasulbek Davletov",                      truck:"#008",    responsible:"David", note:"New",      date:today, paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         eldStatus:"unknown", eldLastSeen:null, active:true,  eldDriverId:"", updatedBy:"David", updatedAt:today},
        {id:"d11", name:"Shakhzod Choriev",                       truck:"#SAV571", responsible:"David", note:"All good", date:today, paperLogbook:true, userManual:true, tabletMounted:true, eldTimes:"ALL GOOD", eldStatus:"unknown", eldLastSeen:null, active:true,  eldDriverId:"", updatedBy:"David", updatedAt:today},
        {id:"d12", name:"Sherbek Pardaev | Murodjon Murodullaev", truck:"",        responsible:"David", note:"New",      date:today, paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         eldStatus:"unknown", eldLastSeen:null, active:true,  eldDriverId:"", updatedBy:"David", updatedAt:today},
        {id:"d13", name:"Jamshid Kuziev",                         truck:"#110",    responsible:"David", note:"New",      date:today, paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         eldStatus:"unknown", eldLastSeen:null, active:true,  eldDriverId:"", updatedBy:"David", updatedAt:today},
        {id:"d14", name:"Nizom Miyliev",                          truck:"#77",     responsible:"",      note:"",         date:"2025-03-23", paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",   eldStatus:"unknown", eldLastSeen:null, active:false, eldDriverId:"", updatedBy:"",      updatedAt:"2025-03-23"},
      ]
    },
    {
      id:"c2", name:"BRIGHT STAR LOGISTICS", color:"#10B981", eldProvider:"factor",
      collapsed:false, starred:false,
      drivers:[
        {id:"d15", name:"Bobur Yusupov",    truck:"#201", responsible:"Habi", note:"All good", date:today, paperLogbook:true, userManual:true, tabletMounted:true, eldTimes:"ALL GOOD", eldStatus:"unknown", eldLastSeen:null, active:true, eldDriverId:"", updatedBy:"Habi", updatedAt:today},
        {id:"d16", name:"Sardor Toshmatov", truck:"#202", responsible:"Habi", note:"New",      date:today, paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         eldStatus:"unknown", eldLastSeen:null, active:true, eldDriverId:"", updatedBy:"Habi", updatedAt:today},
        {id:"d17", name:"Jasur Mirzayev",   truck:"#203", responsible:"Mike", note:"All good", date:today, paperLogbook:true, userManual:true, tabletMounted:null, eldTimes:"1st time", eldStatus:"unknown", eldLastSeen:null, active:true, eldDriverId:"", updatedBy:"Mike", updatedAt:today},
      ]
    },
    {
      id:"c3", name:"GOLDEN ROAD TRANSPORT", color:"#F59E0B", eldProvider:"leader",
      collapsed:false, starred:false,
      drivers:[
        {id:"d18", name:"Akbar Nazarov",                     truck:"#301", responsible:"Nate", note:"All good", date:today, paperLogbook:true, userManual:true, tabletMounted:true, eldTimes:"ALL GOOD", eldStatus:"unknown", eldLastSeen:null, active:true, eldDriverId:"", updatedBy:"Nate", updatedAt:today},
        {id:"d19", name:"Dilshod Karimov | Ulmas Xolmatov", truck:"#302", responsible:"Beck", note:"Off",      date:today, paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         eldStatus:"unknown", eldLastSeen:null, active:true, eldDriverId:"", updatedBy:"Beck", updatedAt:today},
      ]
    },
  ]
};

export const PRESET_COLORS = [
  "#EF4444","#F97316","#EAB308","#84CC16","#22C55E","#10B981",
  "#06B6D4","#3B82F6","#6366F1","#8B5CF6","#EC4899","#F43F5E",
  "#14B8A6","#0EA5E9","#A855F7","#D946EF","#FB923C","#FBBF24",
  "#4ADE80","#34D399","#818CF8","#C084FC","#FB7185","#94A3B8",
];
