import axios from "axios";
import "./App.css";
import { rsaEncrypt } from "./utils/rsa";

function App() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { number, ccv, month, year } = e.target;

    const keys = await axios.get("http://localhost:3000/keys");

    const data = rsaEncrypt(
      JSON.stringify({
        number: number.value,
        ccv: ccv.value,
        month: month.value,
        year: year.value,
      }),
      keys.data.package
    );

    const result = await axios.put("http://localhost:3000/send", { data });

    console.log("result >>> ", result);
  };

  return (
    <div className="App">
      <h1 className="App-Title">Confirmar compra</h1>
      <form onSubmit={handleSubmit}>
        <div className="App-Row">
          <label htmlFor="number">Número do cartão de crédito</label>
          <input required type="text" name="number" id="number" />
        </div>
        <div className="App-Row">
          <label htmlFor="ccv">CCV</label>
          <input required type="text" maxLength={4} name="ccv" id="ccv" />
        </div>
        <div className="App-Row">
          <label htmlFor="month">Mês</label>
          <select required name="month" id="month">
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maior</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>
        </div>
        <div className="App-Row">
          <label htmlFor="year">Ano</label>
          <select required name="year" id="year">
            <option value="2028">2028</option>
            <option value="2027">2027</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <div className="App-Row">
          <button type="submit">Confirmar</button>
        </div>
      </form>
    </div>
  );
}

export default App;
