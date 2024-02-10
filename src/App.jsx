import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setnumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "1234567890";
    if (symbol) str += "`~!@#$%^&*()-";
    for (let i = 0; i < length; i++) {
      pass += str[Math.floor(Math.random() * str.length)];
    }
    setPassword(pass);
  }, [length, number, symbol, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, number, symbol, generatePassword]);

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center text-yellow-700">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 dark:bg-gray-900">
          <h1 className="text-3xl text-center text-white">
            Password Generator
          </h1>
          <div className="flex flex-wrap justify-center mt-4 mb-4">
            <input
              type="text"
              value={password}
              readOnly
              className="h-10 w-80 rounded-l-lg text-black text-xl outline-none shadow-black shadow-xl"
              ref={passwordRef}
            />
            {/* <div className="absolute right-1/3 top-64 invisible text-2xl text-white">
              Copied
            </div> */}
            <button
              className="h-10 w-20 text-white bg-blue-500 top-2 rounded-r-lg shadow-black shadow-xl"
              onClick={copyPassword}
            >
              Copy
            </button>
          </div>
          <div className="flex flexx flex-wrap">
            <div className="mx-2">
              <input
                type="range"
                id="length"
                min="6"
                max="50"
                defaultValue="8"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length:{length}</label>
            </div>
            <div className="mx-2">
              <input
                type="checkbox"
                id="number"
                defaultChecked={false}
                onClick={() => {
                  setnumber((prev) => !prev);
                }}
              />
              <label>Number</label>
            </div>
            <div className="mx-2">
              <input
                type="checkbox"
                id="symbol"
                defaultChecked={false}
                onClick={() => {
                  setSymbol(!symbol);
                }}
              />
              <label>Special Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
