import React, { useState } from "react";
import { Navbar } from "../components";
import { HexColorPicker } from "react-colorful";
import { copyToClipboard } from "../utils/ClipToClipboard";
import tinycolor from "tinycolor2";

const Playgrounds = () => {
  const [color, setColor] = useState("#0e5e7d");
  const [red, setRed] = useState(14);
  const [green, setGreen] = useState(94);
  const [blue, setBlue] = useState(125);
  const [alpha, setAlpha] = useState(0);
  const [hex, setHex] = useState("");
  const [rgb, setRgb] = useState("");

  const type = alpha > 0 ? "rgba" : "rgb";
  const result =
    type +
    `(${red}, ${green}, ${blue}${alpha ? "," : ""}${alpha ? alpha : ""})`;

  let color2 = tinycolor(color);
  const convert = color2.toRgbString();

  let colorHex = tinycolor(hex);
  const convert2 = colorHex.toRgbString();

  var colorRgb = tinycolor(rgb);
  const convert3 = colorRgb.toHexString();

  const handleChange = (e) => {
    const newAlpha = parseFloat(e.target.value);
    setAlpha(newAlpha);
  };
  return (
    <div className="bg-hero-pattern bg-cover bg-fixed py-20 pt-32 md:pt-40 px-4 min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-center font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-[#4D4F59] to-white mb-8">
          Playgrounds
        </h1>
        <div className="flex gap-6 flex-wrap">
          <div className="flex gap-1">
            <HexColorPicker color={color} onChange={setColor} />
            {color && (
              <div>
                <div
                  className="py-2 px-4 rounded-md flex justify-between items-center w-[180px] text-sm text-white"
                  style={{ backgroundColor: `${color}` }}
                >
                  <p>{color}</p>
                  <div
                    className="p-1 rounded bg-zinc-400 hover:bg-zinc-500 cursor-pointer"
                    onClick={() => copyToClipboard(color)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 24 24"
                      width="18"
                      className="text-white"
                    >
                      <g fill="none">
                        <path
                          d="M5.503 4.627L5.5 6.75v10.504a3.25 3.25 0 0 0 3.25 3.25h8.616a2.251 2.251 0 0 1-2.122 1.5H8.75A4.75 4.75 0 0 1 4 17.254V6.75c0-.98.627-1.815 1.503-2.123zM17.75 2A2.25 2.25 0 0 1 20 4.25v13a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-13A2.25 2.25 0 0 1 8.75 2h9zm0 1.5h-9a.75.75 0 0 0-.75.75v13c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75v-13a.75.75 0 0 0-.75-.75z"
                          fill="currentColor"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>
                <div
                  className="py-2 px-4 rounded-md flex justify-between items-center mt-2 w-[180px] text-sm text-white"
                  style={{ backgroundColor: `${convert}` }}
                >
                  <p>{convert}</p>
                  <div
                    className="p-1 rounded bg-zinc-400 hover:bg-zinc-500 cursor-pointer"
                    onClick={() => copyToClipboard(convert)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 24 24"
                      width="18"
                      className="text-white"
                    >
                      <g fill="none">
                        <path
                          d="M5.503 4.627L5.5 6.75v10.504a3.25 3.25 0 0 0 3.25 3.25h8.616a2.251 2.251 0 0 1-2.122 1.5H8.75A4.75 4.75 0 0 1 4 17.254V6.75c0-.98.627-1.815 1.503-2.123zM17.75 2A2.25 2.25 0 0 1 20 4.25v13a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-13A2.25 2.25 0 0 1 8.75 2h9zm0 1.5h-9a.75.75 0 0 0-.75.75v13c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75v-13a.75.75 0 0 0-.75-.75z"
                          fill="currentColor"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className="w-[200px] h-[200px] rounded-lg flex justify-center items-center text-white relative shadow shadow-ungu"
            style={{ backgroundColor: result }}
          >
            {result}
            <div
              className="p-1 rounded bg-zinc-400 hover:bg-zinc-500 cursor-pointer absolute top-2 right-2"
              onClick={() => copyToClipboard(result)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 24 24"
                width="18"
                className="text-white"
              >
                <g fill="none">
                  <path
                    d="M5.503 4.627L5.5 6.75v10.504a3.25 3.25 0 0 0 3.25 3.25h8.616a2.251 2.251 0 0 1-2.122 1.5H8.75A4.75 4.75 0 0 1 4 17.254V6.75c0-.98.627-1.815 1.503-2.123zM17.75 2A2.25 2.25 0 0 1 20 4.25v13a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-13A2.25 2.25 0 0 1 8.75 2h9zm0 1.5h-9a.75.75 0 0 0-.75.75v13c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75v-13a.75.75 0 0 0-.75-.75z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <div>
              <h1>Red</h1>
              <input
                type="range"
                min={0}
                max={225}
                value={red}
                onChange={(e) => setRed(e.target.value)}
                className="range range-error range-xs"
              />
            </div>
            <div>
              <h1>Green</h1>
              <input
                type="range"
                min={0}
                max={225}
                value={green}
                onChange={(e) => setGreen(e.target.value)}
                className="range range-success range-xs"
              />
            </div>
            <div>
              <h1>Blue</h1>
              <input
                type="range"
                min={0}
                max={225}
                value={blue}
                onChange={(e) => setBlue(e.target.value)}
                className="range range-info range-xs"
              />
            </div>
            <div>
              <h1>Alpha</h1>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={alpha}
                onChange={handleChange}
                className="range range-xs"
              />
            </div>
          </div>

          <div className="w-full">
            <h1 className="text-white font-semibold sm:text-left text-center">
              Hex To RGB
            </h1>
            <div className="flex flex-col sm:flex-row gap-2 items-center">
              <input
                type="text"
                value={hex}
                placeholder="#FFFFFF"
                className="py-2 px-4 rounded text-white w-full sm:w-auto"
                onChange={(e) => setHex(e.target.value)}
              />
              <p className="hidden sm:block">{"👉"}</p>
              <p className="block sm:hidden">{"👇"}</p>
              {hex && (
                <div
                  className={`rounded text-sm py-2 px-4 text-white flex justify-between items-center w-[180px]`}
                  style={{ backgroundColor: `${convert2}` }}
                >
                  <div>{convert2}</div>
                  <div
                    className="p-1 rounded bg-zinc-400 hover:bg-zinc-500 cursor-pointer"
                    onClick={() => copyToClipboard(convert2)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 24 24"
                      width="18"
                      className="text-white"
                    >
                      <g fill="none">
                        <path
                          d="M5.503 4.627L5.5 6.75v10.504a3.25 3.25 0 0 0 3.25 3.25h8.616a2.251 2.251 0 0 1-2.122 1.5H8.75A4.75 4.75 0 0 1 4 17.254V6.75c0-.98.627-1.815 1.503-2.123zM17.75 2A2.25 2.25 0 0 1 20 4.25v13a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-13A2.25 2.25 0 0 1 8.75 2h9zm0 1.5h-9a.75.75 0 0 0-.75.75v13c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75v-13a.75.75 0 0 0-.75-.75z"
                          fill="currentColor"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>
              )}
            </div>

            <h1 className="text-white font-semibold mt-6 text-center sm:text-left">
              RGB To Hex
            </h1>
            <div className="flex flex-col sm:flex-row gap-2 items-center ">
              <input
                type="text"
                value={rgb}
                placeholder="rgb(50, 10, 125)"
                className="py-2 px-4 rounded text-white w-full sm:w-auto"
                onChange={(e) => setRgb(e.target.value)}
              />
              <p className="hidden sm:block">{"👉"}</p>
              <p className="block sm:hidden">{"👇"}</p>
              {rgb && (
                <div
                  className={`rounded text-sm py-2 px-4 text-white flex justify-between items-center w-[180px]`}
                  style={{ backgroundColor: `${convert3}` }}
                >
                  <div>{convert3}</div>
                  <div
                    className="p-1 rounded bg-zinc-400 hover:bg-zinc-500 cursor-pointer"
                    onClick={() => copyToClipboard(convert3)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 24 24"
                      width="18"
                      className="text-white"
                    >
                      <g fill="none">
                        <path
                          d="M5.503 4.627L5.5 6.75v10.504a3.25 3.25 0 0 0 3.25 3.25h8.616a2.251 2.251 0 0 1-2.122 1.5H8.75A4.75 4.75 0 0 1 4 17.254V6.75c0-.98.627-1.815 1.503-2.123zM17.75 2A2.25 2.25 0 0 1 20 4.25v13a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-13A2.25 2.25 0 0 1 8.75 2h9zm0 1.5h-9a.75.75 0 0 0-.75.75v13c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75v-13a.75.75 0 0 0-.75-.75z"
                          fill="currentColor"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playgrounds;
