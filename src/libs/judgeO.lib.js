

export const getJudge0LanguageId = (language) =>{

    const languageMap = {
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63,
    }

    return languageMap[language.toUpperCase()]
}