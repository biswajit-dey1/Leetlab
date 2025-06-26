import React, { useMemo, useState } from 'react'

import { Bookmark, PencilIcon, Trash, TrashIcon, Plus } from "lucide-react";

import { Link } from "react-router-dom";


const ProblemTable = ({ problems }) => {


    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("ALL");
    const [selectedTag, setSelectedTag] = useState("ALL");

    const difficulties = ["EASY", "MEDIUM", "HARD"];


    const allTags = useMemo(() => {

        if (!Array.isArray(problems)) return [];

        const tagSet = new Set()



        problems.forEach((p) => p.tags?.forEach((t) => tagSet.add(t)))

        return Array.from(tagSet)
    }, [problems])





    const filteredProblems = useMemo(() => {
        return (problems || [])
            .filter((problem) =>
                problem.title.toLowerCase().includes(search.toLowerCase())
            )
            .filter((problem) =>
                difficulty === "ALL" ? true : problem.difficulty === difficulty
            )
            .filter((problem) =>
                selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag)
            );
    }, [problems, search, difficulty, selectedTag]);



    // console.log(filteredProblems.forEach((el) =>{
    //     console.log(el.tags)
    // }));
    





    return (

        <div className='w-full max-w-6xl mx-auto mt-10'>

            <div className='flex justify-between items-center mb-6'>
                <h2 className="text-2xl font-bold">Problems</h2>

                <button className='btn btn-primary gap-2'>
                    <Plus className='w-4 h-4' />
                    Create Playlist
                </button>
            </div>

            <div className='flex flex-wrap justify-between mb-6 gap-4'>

                <input type="text"

                    value={search}
                    onChange={(e) => setSearch(e.target.value)}

                    className="input input-bordered"
                    placeholder='Search by title'
                />

                <select value={difficulty}

                    onChange={(e) => setDifficulty(e.target.value)}
                    className='select select-bordered '
                >
                    <option value="All">All Difficulties</option>
                    {
                        difficulties.map((diff) => (
                            <option key={diff} value={diff}>

                                {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}

                            </option>
                        ))
                    }


                </select>


                <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}

                    className='select select-bordered '

                >
                    <option value="All">All Tags</option>

                    {allTags.map((tag) => (
                        <option key={tag} value={tag}>
                            {tag}

                        </option>
                    ))}

                </select>


            </div>

            <div className="overflow-x-auto rounded-xl shadow-md ">
                <table className="table table-zebra table-lg bg-base-200 text-base-content">
                    {/* head */}
                    <thead className='bg-base-300'>
                        <tr>
                            <th>Solved</th>
                            <th>Title</th>
                            <th>Tags</th>
                            <th>Difficulty</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>



                        {filteredProblems.length > 0 ? (
                            filteredProblems.map((problem) => {


                                return (
                                    <tr key={problem.id}>

                                        <td>
                                            <input

                                                type="checkbox"
                                                  readOnly
                                                className="checkbox checkbox-sm"

                                            />
                                        </td>

                                        <td>
                                            <Link to={`/problem/${problem.id}`}
                                                className='font-semibold hover:underline'
                                            >
                                                {problem.title}
                                            </Link>
                                        </td>

                                        <td>
                                            <div
                                            className='flex flex-wrap gap-1'
                                            >
                                                {(problem.tags || []).map((tag, idx) => (
                                               <span
                                                  key={idx}

                                                  className="badge badge-outline badge-warning text-xs font-bold"
                                               >
                                                {tag}
                                               </span>
                                        ))
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (<div></div>)}
                    </tbody>
                </table>
            </div>



        </div>
    )
}

export default ProblemTable