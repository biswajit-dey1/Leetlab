import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"

import {
  Plus,
  Trash2,
  Code2,
  FileText,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  Download,
} from "lucide-react";

const problemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  constraints: z.string().min(1, "Constraints are required"),
  hints: z.string().optional(),
  editorial: z.string().optional(),
  testcases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
      })
    )
    .min(1, "At least one test case is required"),
  examples: z.object({
    JAVASCRIPT: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    PYTHON: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    JAVA: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
  }),
  codeSnippets: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript code snippet is required"),
    PYTHON: z.string().min(1, "Python code snippet is required"),
    JAVA: z.string().min(1, "Java solution is required"),
  }),
  referenceSolutions: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript solution is required"),
    PYTHON: z.string().min(1, "Python solution is required"),
    JAVA: z.string().min(1, "Java solution is required"),
  }),
})

function CreateProblemForm() {

  const [sampleType, setSampleType] = useState("DP")

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm(
    {
      resolver: zodResolver(problemSchema),
      defaultValues: {
        testcases: [{ input: "", output: "" }],
        tags: [{ value: "" }],
        examples: {
          JAVASCRIPT: { input: "", output: "", explanation: "" },
          PYTHON: { input: "", output: "", explanation: "" },
          JAVA: { input: "", output: "", explanation: "" },
        },
        codeSnippets: {
          JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
          PYTHON: "def solution():\n    # Write your code here\n    pass",
          JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
        },
        referenceSolutions: {
          JAVASCRIPT: "// Add your reference solution here",
          PYTHON: "# Add your reference solution here",
          JAVA: "// Add your reference solution here",
        },
      }
    }
  )


  const {

    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
    replace: replaceTestCase

  } = useFieldArray({
    control,
    name: "testcases"
  })


  const {

    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    replace: replaceTags,

  } = useFieldArray({
    control,
    name: "tags",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (value) => {
    console.log("Form submitted");
    console.log(value);

  }


  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">

      <div className="card bg-base-100 shadow-xl">

        <div className="card-body p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 pb-4 border-b">
            <h2 className="card-title text-2xl md:text-3xl flex items-center gap-3">
              <FileText className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              Create Problem
            </h2>

            <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
              <div className="join">
                <button className="btn join-item"> DP Problem</button>
                <button className="btn join-item"> String Problem</button>
              </div>

              <button className="btn btn-secondary gap-2">
                <Download className="w-4 h-4" />
                Load Sample
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="form-control md:col-span-2">

                <label className="label">
                  <span className="label-text text-base md:text-lg font-semibold">
                    Title
                  </span>
                </label>

                <input
                  type="text"
                  className="input input-bordered w-full text-base md:text-lg"

                  {...register("title")}
                  placeholder="Enter problem title"
                />

              </div>


              <div className="form-control md:col-span-2">

                <label className="label">
                  <span className="label-text text-base md:text-lg font-semibold">
                    Description
                  </span>
                </label>

                <textarea
                  className="textarea textarea-bordered min-h-32 w-full text-base md:text-lg p-4 resize-y"
                  placeholder="Enter problem description"

                  {...register("description")}
                />
              </div>

              <div className="form-control ">
                <label className="label">
                  <span className="label-text text-base md:text-lg font-semibold">
                    Difficulty
                  </span>
                </label>

                <select className="select select-bordered w-full text-base md:text-lg"
                  {...register("difficulty")}
                >
                  <option value="EASY">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>


            {/* Tags */}

            <div className="card bg-base-200 p-6 shadow-md">

              <div className="flex justify-between items-center mb-4">

                <h3 className="text-lg md:text-xl flex items-center gap-2  font-semibold">
                  <BookOpen className="w-5 h-5" />
                  Tags
                </h3>

                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    console.log("Add tag clicked");
                    appendTag({ value: "" })
                  }}

                >
                  <Plus className="w-4 h-4 mr-1" /> Add Tag
                </button>

              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tagFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="input input-bordered flex-1"
                    {...register(`tags.${index}`)}
                    placeholder="Enter tag"
                  />
                  <button
                    type="button"
                    className="btn btn-ghost btn-square btn-sm"
                    onClick={() => removeTag(index)}
                    disabled={tagFields.length === 1}
                  >
                    <Trash2 className="w-4 h-4 text-error" />
                  </button>
                </div>
              ))}
            </div>


            {/* testCases */}

            <div className="card bg-base-200 p-6 shadow-md">

              <div className="flex justify-between items-center mb-4">

                <h3 className="text-lg md:text-xl flex items-center gap-2  font-semibold">
                  <CheckCircle2 className="w-5 h-5" />
                  Test Cases
                </h3>

                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {

                    appendTestCase({ input: "", output: "" })
                  }}

                >
                  <Plus className="w-4 h-4 mr-1" /> Add Test Case
                </button>

              </div>
            </div>
            

            <div className="space-y-6">
              {testCaseFields.map((field, index) => (
                <div key={field.id} className="card bg-base-100 shadow-md">

                  <div className="card-body p-4 md:p-6 ">

                    <div className="flex justify-between items-center">
                      <h4 className="text-base md:text-lg font-semibold">
                        Test Case #{index + 1}
                      </h4>

                      <button
                       className="btn btn-ghost btn-sm text-error"
                       onClick={() => removeTestCase(index)}
                       disabled= {testCaseFields.length === 1}
                       >
                        <Trash2 className="w-4 h-4 mr-1" />Remove
                      </button>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">

                      <div className="form-control">

                        <label className="label">
                          <span className="label-text font-medium">
                            Input
                          </span>
                        </label>

                        <textarea

                          {...register(`testcases.${index}.input`)}
                          className="textarea textarea-bordered  min-h-24 w-full p-3 resize-y"

                          placeholder="Enter test case input"
                        />

                        {errors.testcases?.[index]?.input && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.testcases[index].input.message}
                            </span>
                          </label>
                        )}
                      </div>



                      <div className="form-control">

                        <label className="label">
                          <span className="label-text font-medium">
                            Output
                          </span>
                        </label>

                        <textarea

                          {...register(`testcases.${index}.output`)}
                          className="textarea textarea-bordered  min-h-24 w-full p-3 resize-y"

                          placeholder="Enter test case output"
                        />

                        {errors.testcases?.[index]?.output && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.testcases[index].output.message}
                            </span>
                          </label>
                        )}
                      </div>

                    </div>

                  </div>

                </div>
              ))}

              {errors.testcases && !Array.isArray(errors.testcases) && (
                  <div className="mt-2">
                    <span className="text-error text-sm">
                      {errors.testcases.message}
                    </span>
                  </div>
              )}
            </div>




          </form>
        </div>
      </div>
    </div>
  );
}
433
export default CreateProblemForm;
