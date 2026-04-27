// The Brain The Head boss
//CharacterCounter is the parent It holds the state

import { useState } from "react";// use state lets us remember things 

import TextInput from "../TextInput/TextInput.tsx";

import StatsDisplay from "../StatsDisplay/StatsDisplay.tsx";

import { TextStats, CharacterCounterProps } from "../../types";



// This functions does the math 
const calculateStats = (text: string): TextStats => {
    const trimmed = text.trim(); // remove spaces at the end 

    // count words pusing if else 

    let wordCount = 0;
    if (trimmed === '') {
        wordCount = 0;

    } else {
        const words = trimmed.split(' ').filter(word => word !== '');
        wordCount = words.length;
    }
    // Returnall three sstats this is what text stats requiers 

    return {
        characterCount: text.length,
        wordCount: wordCount,
        readingTime: Math.ceil(wordCount / 200) // Round to the nearest minute 

    };





};

const CharacterCounter = ({
    minWords,// minimum words the user should write 
    maxWords// maxium words the user should write 

}: CharacterCounterProps) => {

    // Holds our stats sticky note
    // Stats what is on the note as of right now 
    // setstats the pen to update the note 
    // Starts at all Zeros becuase nothing is being typed yet 
    const [stats, setStats] = useState<TextStats>({
        characterCount: 0,
        wordCount: 0,
        readingTime: 0

    });
    //This runs every time user types a character 
    //It allows the new text from textInput 

    const handleTextChange = (text: string) => {
        setStats(calculateStats(text));
    };
    // Warning before return 

    // Below the minimum word goal

    let isBelowMin = false;
    if (minWords !== undefined && stats.wordCount < minWords) {
        isBelowMin = true;
    }
    //Over the maxium word limit 


    let isAboveMax = false;
    if (maxWords !== undefined && stats.wordCount > maxWords) {
        isAboveMax = true;
    }


    // bar turns red if over the limit but otherwise stays blue if okay
    let barColor = 'bg-blue-500';
    if (isAboveMax) {
        barColor = 'bg-red-500';

    }
    // Bar width depends on how far along you are towards max count 
    let barWidth = '0%';
    if (maxWords) {
        const percentage = (stats.wordCount / maxWords) * 100;
        if (percentage > 100) {
            barWidth = '100%';// The bar doesnt go over the edge 
        } else {
            barWidth = `${percentage}%`; // fill the bar progress
        }

    }

    return (

        <div className="max-w-2xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">Character Counter</h1>

            {/*When user types textInput calls OntextChange handleTextChange runs */}

            <TextInput onTextChange={handleTextChange} />


            {/* ShowReadingTime boolean props defualt to true  */}
            <StatsDisplay stats={stats} showReadingTime />

            {/* Progress bar only shows maxWords and the && if maxword exists show everything to right */}

            {maxWords && (
                <div>
                {/*word count label and warnings  */ }
                < div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>{stats.wordCount} / {maxWords}</span>
            {isBelowMin && <span className="text-red-500">Need More Words!</span>}
            {isAboveMax && <span className="text-red-500">To Many Words!</span>}



        </div>

                {/* Progress bar track*/ }

    <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`h-2 rounded-full transition-all ${barColor}`}
            style={{ width: barWidth }} />






    </div>




                 </div >
            

            )}


        </div >

        
    );
};

export default CharacterCounter;