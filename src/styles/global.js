export const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body,#root{height:100%;font-family:'Plus Jakarta Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
body{background:#1e1f21;color:#f1f0ee}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#3d3e40;border-radius:99px}
input,select,textarea,button{font-family:inherit}
input::placeholder{color:#5a5c61}
input:focus,select:focus,textarea:focus{outline:none}
button{cursor:pointer}
@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideRight{from{opacity:0;transform:translateX(12px)}to{opacity:1;transform:translateX(0)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes blink{0%,100%{box-shadow:0 0 0 0 currentColor}50%{box-shadow:0 0 0 4px transparent}}
.fade-up{animation:fadeUp .18s ease}
.fade-in{animation:fadeIn .15s ease}

/* Row hover */
.driver-row{transition:background .08s}
.driver-row:hover{background:#2c2d2f!important}
.driver-row:hover .row-actions{opacity:1!important}

/* Cell edit */
.cell-edit:hover{background:rgba(255,255,255,.04)!important;cursor:pointer}

/* Sidebar item */
.sidebar-item{transition:background .08s;border-radius:6px}
.sidebar-item:hover{background:rgba(255,255,255,.06)!important}
.sidebar-item.active{background:rgba(255,255,255,.1)!important}

/* Button */
.btn-ghost{background:transparent;border:none;color:#9d9ea3;padding:4px 8px;border-radius:5px;transition:background .08s}
.btn-ghost:hover{background:rgba(255,255,255,.08);color:#f1f0ee}

/* Input field */
.field-input{background:#2c2d2f;border:1px solid #3d3e40;border-radius:7px;padding:8px 11px;color:#f1f0ee;font-size:13px;width:100%}
.field-input:focus{border-color:#4573d2;box-shadow:0 0 0 2px rgba(69,115,210,.2)}

/* Dropdown */
.dropdown-menu{background:#2c2d2f;border:1px solid #3d3e40;border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,.5);overflow:hidden}
.dropdown-item{padding:7px 12px;font-size:13px;cursor:pointer;display:flex;align-items:center;gap:8px;transition:background .08s;color:#d9d8d5}
.dropdown-item:hover{background:rgba(255,255,255,.06)}
.dropdown-item.danger:hover{background:rgba(239,68,68,.12);color:#f87171}
`;
