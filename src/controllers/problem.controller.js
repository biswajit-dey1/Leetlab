import { getJudge0LanguageId, pollBatchResults, submitBatch } from "../libs/judgeO.lib.js"

import { db } from "../libs/db.js"
import { cleanObject } from "../Utils/cleanObject.js"

export const createProblem = async (req, res) => {

    const { title,
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

            if (!languageId) {
                return res.status(400)
                    .json({
                        error: `Language ${language} is not supported`
                    })
            }

            const submissions = testcases.map((testCaseElement) => {

                let { input, output } = testCaseElement

                return {
                    source_code: solutionCode,
                    language_id: languageId,
                    stdin: input,
                    expected_output: output
                }
            })

            const submissionResults = await submitBatch(submissions)
            console.log(submissionResults)
            const tokens = submissionResults.map((res) => res.token)

            const results = await pollBatchResults(tokens)

            for (let i = 0; i < results.length; i++) {
                const result = results[i];

                console.log("Result-----", result);

            }

            const newProblem = await db.problem.create({
                data: {
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
                    message: "Problem Created Successfully",
                    problem: newProblem,
                })
        }

    } catch (error) {
        console.log(error);

        return res.status(500)
            .json({
                error: "Error While Creating Problem"
            })
    }
}


export const getAllProblems = async (req, res) => {
    try {
        const problems = await db.problem.findMany();

        if (!problems) {
            return res.status(400)
                .json({
                    error: "No problems Found",

                })
        }
        console.log(problems);

        res.status(200)
            .json({
                sucess: true,
                message: "Problems Fetched Succesfully",
                problems
            });

    } catch (error) {
        console.log(error);
        return res.status(500)
            .json({
                error: "Error While Fetching Problems",
            })


    }


}

export const getProblemById = async (req, res) => {
    const userId = req.user.id
    const problemId = req.params.id

    if (!userId) {
        return res.status(401).json({
            error: "User not found"
        })
    }

    try {

        const problem = await db.problem.findUnique({
            where: { id: problemId },
        })

        console.log(problem);


        if (!problem) {
            return res.status(404)
                .json({
                    message: "Problem not found"
                }
                );
        }

        if (problem.userId !== userId) {
            return res.status(403)
                .json({
                    message: "You don't own this problem",
                })
        }

        return res.status(200).json({
            sucess: true,
            message: "Problem Fetched Successfully by Id ",
            problem,
        });

    } catch (error) {
        console.log(error);
        return res.status(500)
            .json({
                error: "Error While Fetching Problem by id",
            })
    }

}



export const updateProblem = async (req, res) => {

  const { title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
    } = req.body

    const userId = req.user.id
    const problemId = req.params.id

    try {
        const existingProblem = await db.problem.findUnique({
            where: { id: problemId },
        })

        if (!existingProblem) {
            return res.status(404)
                .json({
                    message: "Problem not found"
                }
                );
        }

        if (existingProblem.userId !== userId) {
            return res.status(403)
                .json({
                    succes: false,
                    message: "Unauthorized to update this problem",
                })
        }

        const updateData = {
            title: title !== undefined ? title : existingProblem.title,
            description: description !== undefined ? description : existingProblem.description,
            difficulty: difficulty !== undefined ? difficulty : existingProblem.difficulty,
            tags: tags !== undefined ? tags : existingProblem.tags,
            examples: examples !== undefined ? examples : existingProblem.examples,
            constraints: constraints !== undefined ? constraints : existingProblem.constraints,
            testcases: testcases !== undefined ? testcases : existingProblem.testcases,
            codeSnippets: codeSnippets !== undefined ? codeSnippets : existingProblem.codeSnippets,
            referenceSolutions: referenceSolutions !== undefined ? referenceSolutions : existingProblem.referenceSolutions
        };

        const cleanUpdateData = cleanObject(updateData)
        console.log(cleanUpdateData);
        



        for (const [language, solutionCode] of Object.entries(updateData.referenceSolutions)) {

            const languageId = getJudge0LanguageId(language)

            if (!languageId) {
                return res.status(400)
                    .json({
                        error: `Language ${language} is not supported`
                    })
            }

            const submissions = testcases.map((testCaseElement) => {

                let { input, output } = testCaseElement

                return {
                    source_code: solutionCode,
                    language_id: languageId,
                    stdin: input,
                    expected_output: output
                }
            })

            const submissionResults = await submitBatch(submissions)
            console.log(submissionResults)
            const tokens = submissionResults.map((res) => res.token)

            const results = await pollBatchResults(tokens)

            for (let i = 0; i < results.length; i++) {
                const result = results[i];

                console.log("Result-----", result);

            }



            const updateProblem = await db.problem.update({
                where: {
                    id: problemId
                },
                data: cleanUpdateData
            })


            console.log(updateProblem);
            

            return res.status(201).json({
                sucess: true,
                message: "Problem Updated Successfully by Id ",
                updateProblem,
            });


        }
    } catch (error) {
        console.log(error);
        return res.status(500)
            .json({
                error: "Error While updating Problem by id",
            })
    }
}