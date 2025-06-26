import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import {
    Play,
    FileText,
    MessageSquare,
    Lightbulb,
    Bookmark,
    Share2,
    Clock,
    ChevronRight,
    BookOpen,
    Terminal,
    Code2,
    Users,
    ThumbsUp,
    Home,
} from "lucide-react";

import Editor from "@monaco-editor/react";
import { useProblemstore } from '../store/useProblemStore.js';

function ProblemPage() {

    const { problem, isProblemLoading, getProblemById } = useProblemstore()
    const { id } = useParams()




    useEffect(() => {
        getProblemById(id)
    }, [id])

    console.log(problem);



    const submissionCount = 10

    if (isProblemLoading || !problem) {
        return (
            <div className="flex items-center justify-center h-screen bg-base-200">
                <div className="card bg-base-100 p-8 shadow-xl">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="mt-4 text-base-content/70">Loading problem...</p>
                </div>
            </div>
        )
    }

    return (

        <div className='min-h-screen bg-gradient-to-br from-base-300 to-base-200  mx-20 '>

            <nav className='navbar bg-base-100 shadow-lg'>

                <div className='flex-1 gap-2'>

                    <Link to={"/"} className='flex items-center gap-2 text-primary '>

                        <Home className='w-6 h-6' />
                        <ChevronRight className='w-4 h-4' />

                    </Link>


                    <div className='mt-2'>
                        <h1 className='text-xl font-bold'>{problem.title}</h1>

                        <div className='flex items-center gap-2 text-sm text-base-content/70  mt-5'>

                            <Clock />
                            <span>
                                Updated{" "}
                                {new Date(problem.createdAt).toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                            <span className="text-base-content/30">•</span>
                            <Users className="w-4 h-4" />
                            <span>{submissionCount} Submissions</span>
                            <span className="text-base-content/30">•</span>
                            <ThumbsUp className="w-4 h-4" />
                            <span>95% Success Rate</span>
                        </div>

                    </div>


                </div>


                <div className='flex-none gap-4 mr-20'>

                    <button className='btn btn-ghost btn-circle'>
                        <Bookmark className="w-5 h-5" />
                    </button>

                    <button className="btn btn-ghost btn-circle">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>

            </nav>

            <div className="container mx-auto p-4">

                <div className=' grid grid-cols-1 lg:grid-cols-2 gap-6'>

                    <div className='card bg-base-100 shadow-xl'>

                        <div className='card-body p-0'>

                            <div className='tabs tabs-bordered'>

                                <button
                                    className={`tab gap-2 `}

                                >
                                    <FileText className="w-4 h-4" />
                                    Description
                                </button>
                                <button
                                    className={`tab gap-2`}

                                >
                                    <Code2 className="w-4 h-4" />
                                    Submissions
                                </button>
                                <button
                                    className={`tab gap-2 `}

                                >
                                    <MessageSquare className="w-4 h-4" />
                                    Discussion
                                </button>
                                <button
                                    className={`tab gap-2 `}

                                >
                                    <Lightbulb className="w-4 h-4" />
                                    Hints
                                </button>
                            </div>

                        </div>
                    </div>


                    <div className='card bg-base-100 shadow-xl '>

                        <div className='card-body p-0'>

                            <div className='tabs tabs-bordered'>
                                <button className="tab tab-active gap-2">
                                    <Terminal className="w-4 h-4" />
                                    Code Editor
                                </button>
                            </div>

                            <div className='h-[600px] w-full'>
                                <Editor
                                    height="100%"
                                    language="javascript"
                                    theme='vs-dark'
                                />

                            </div>

                        </div>
                    </div>





                </div>

            </div>


        </div>


    )
}

export default ProblemPage