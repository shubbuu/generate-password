import React from "react";
import "./RandomPasswordGenerator.css";
import { useState } from "react";
import myTextFile from './word.txt'
import useFetch from "./useFetch";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { numbers, specialCharacters } from "./Character";
import { COPY_Fail, COPY_SUCCESS } from "./Message";



function RandomPasswordGenerator() {
    const [password, setPassword] = useState("");
    const [wordCount, setWordCount] = useState();
    const [digitCount, setDigitCount] = useState();
    const [specialCharacterCount, setSpecialCharacterCount] = useState();

    const [word] = useFetch(myTextFile);

    // if (word) {
    //     console.log("word length", word.length)
    //     console.log("Displaying word", word)
    //     console.log("Type", typeof (word))
    // }

    // console.log("Word Count", wordCount);
    // console.log("Digit Count", digitCount);
    // console.log("Special Character Count", specialCharacterCount)
    // console.log("Word Count type", typeof (wordCount))
    // console.log("------------------")

    const handleGeneratePassword = () => {
        // console.log("Inside handleGeneratePassword")
        if (!isNaN(wordCount) && !isNaN(digitCount) && !isNaN(specialCharacterCount)) {
            // console.log("Inside if")
            setPassword(createPassword());
            notify("Password is generated successfully", false);
            // console.log("password", password);
        }
        else {
            notify(
                "Please provide appropriate input to generate password",
                true
            );
        }
    };

    const createPassword = () => {
        let str = ""
        for (let i = 0; i < wordCount; i++) {
            const wordIndex = Math.round(
                Math.random() * word.length
            );
            let temp = word[wordIndex];
            temp = temp.charAt(0).toUpperCase() + temp.slice(1);
            str = str + temp;

        }

        for (let i = 0; i < digitCount; i++) {
            const digitIndex = Math.round(
                Math.random() * numbers.length
            );
            str = str + numbers[digitIndex];
        }

        for (let i = 0; i < specialCharacterCount; i++) {
            const charIndex = Math.round(
                Math.random() * specialCharacters.length
            );
            str = str + specialCharacters[charIndex];
        }
        str = str.replace(/\s/g, "");   // To replace whitespace in entire string
        console.log(str);
        return str;
    };

    const copyToClipboard = (password) => {
        navigator.clipboard.writeText(password);
    };

    const notify = (message, hasError = false) => {
        if (hasError) {
            toast.error(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleCopyPassword = (e) => {
        if (password === "") {
            notify(COPY_Fail, true);
        } else {
            copyToClipboard(password);
            notify(COPY_SUCCESS);
        }
    };

    return (
        <div className="App">
            <div className="container">
                <div className="generator">
                    <h2 className="generator__header">Password Generator</h2>
                    <div className="generator__password">
                        <h3>{password}</h3>
                        <button className="copy__btn">
                            <i
                                onClick={handleCopyPassword}
                                className="far fa-clipboard"
                            ></i>
                        </button>
                    </div>

                    <div className="form-group">
                        <label htmlFor="count-word">Number of Words</label>
                        <select name="count-word" id="count-word" onChange={(e) => {
                            setWordCount(e.target.value)
                        }}>
                            <option value="">Select</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="count-digit">Number of Digits</label>
                        <select name="count-digit" id="count-digit" onChange={(e) => {
                            setDigitCount(e.target.value)
                        }}>
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="count-specialCharacter">Number of Special Character</label>
                        <select name="count-specialCharacter" id="count-specialCharacter" onChange={(e) => {
                            setSpecialCharacterCount(e.target.value)
                        }}>
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>


                    <button
                        onClick={handleGeneratePassword}
                        className="generator__btn"
                    >
                        Generate Password
                    </button>

                    {/* <ul>
                        {word && word.map((d) => <li key={d}>{d}</li>)}
                    </ul> */}


                    <a href="https://www.defendedsolutions.com/defended-solutions-blog/a-guide-to-passwords-the-3-random-word-system" target="_blank">Password Guidance</a>



                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </div>
            </div>
        </div>
    );
}

export default RandomPasswordGenerator;

