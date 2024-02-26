import { useState, useEffect } from "react";
import myTextFile from "./word.txt";

const useFetch = (myTextFile) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchWords = async () => {
            fetch(myTextFile)
                .then((response) => response.text())
                .then((data) => {
                    // console.log(data)
                    var wordByLine = data.split("\n");
                    setData(wordByLine);
                });
        };

        fetchWords();
    }, []);

    return [data];
};

export default useFetch;
