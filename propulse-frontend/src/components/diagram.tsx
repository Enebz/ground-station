import './diagram.css';

const valveposition = false;
const pressure_regulator = 12.78878787;
const temperature = 33;
const number_of_decimals = 2;


export default function Diagram(){
  return(
    <div id="diagramContainer">
        <div id="div1" className={!valveposition ? 'smallBox closed' : 'smallBox open' }>div1</div>
        <div id="div2" className={!valveposition ? 'smallBox closed' : 'smallBox open' }>div2</div>
        <div id="div3" className={!valveposition ? 'smallBox closed' : 'smallBox open' }>div3</div>
        <div id="div4" className={pressure_regulator <= 0 ? 'mediumBox closed' : 'mediumBox open'}>{pressure_regulator?.toFixed(number_of_decimals)}% div4</div>
        <div id="div5" className={pressure_regulator <= 0 ? 'mediumBox closed' : 'mediumBox open'}>{pressure_regulator?.toFixed(number_of_decimals)}% div5</div>
        <div id="div6" className="largeBox">div6 </div>
        <div id="div7" className="largeBox">div7 {temperature?.toFixed(number_of_decimals)}°C</div>
        <div id="div8" className="largeBox">div8 </div>
        <div id="div9" className="largeBox">div9 {temperature?.toFixed(number_of_decimals)}°C</div>
        <div id="div10" className="largeBox">div10 30 Bar</div>
        <div id="div11" className="largeBox">div11 {temperature?.toFixed(number_of_decimals)}°C</div>
        <div id="div12" className="largeBox">div12 A</div>
        <div id="div13" className="largeBox">div13 12V</div>
        <div id="div14" className="largeBox">div1 78%</div>
        <div id="div15" className="largeBox">div15 {temperature?.toFixed(number_of_decimals)}°C</div>
        <div id="div16" className={pressure_regulator <= 0 ? 'mediumBox closed' : 'mediumBox open'}>{pressure_regulator?.toFixed(number_of_decimals)}% div16</div>
        <div id="div17" className="largeBox">div17</div>
        <div id="div18" className="largeBox">div18</div>
        <div id="div19" className="largeBox">div19 {temperature?.toFixed(number_of_decimals)}°C</div>
        <div id="div20" className="largeBox">div20 {temperature?.toFixed(number_of_decimals)}°C</div>
        <div id="div21" className="largeBox">div21</div>
        <div id="div22" className={pressure_regulator <= 0 ? 'mediumBox closed' : 'mediumBox open'}>{pressure_regulator?.toFixed(number_of_decimals)}% div22</div>
        <div id="div23" className={pressure_regulator <= 0 ? 'mediumBox closed' : 'mediumBox open'}>{pressure_regulator?.toFixed(number_of_decimals)}% div23</div>
    </div>
  )
}