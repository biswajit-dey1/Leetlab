import { getJudge0LanguageId, pollBatchResults, submitBatch } from "../libs/judgeO.lib.js"

import {db} from "../libs/db.js"

export const createProblem = async (req,res) =>{
    
    const {title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
    } = req.body



    try {

        for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
            
            const languageId = getJudge0LanguageId(language)

            if(!languageId){
                return res.status(400)
                .json({
                    error: `Language ${language} is not supported`  
                })
            }

            const submissions = testcases.map((testCaseElement) => {
              
                let {input,output} = testCaseElement

                return {
                    source_code: solutionCode,
                    language_id: languageId,
                    stdin: input,
                    expected_output:output
                }
            })

            const submissionResults = await submitBatch(submissions)
            console.log(submissionResults)
            const tokens = submissionResults.map((res) => res.token)

            const results = await pollBatchResults(tokens)

            for(let i = 0; i < results.length; i++){
                const result = results[i];

                console.log("Result-----",result);
                
            }

            const newProblem = await db.problem.create({
                data:{
                    title,
                    description,
                    difficulty,
                    tags,
                    examples,
                    constraints,
                    testcases,
                    codeSnippets,
                    referenceSolutions,
                    userId: req.user.id
                }
            })

            return res.status(201)
            .json({
                sucess: true,
                message: "Message Created Successfully",
                problem: newProblem,
            })
        }
        
    } catch (error) {
        console.log(error);
        
        return res.status(500)
        .json({
            error:"Error While Creating Problem"
        })
    }
}