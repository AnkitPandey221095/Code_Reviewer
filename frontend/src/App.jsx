import {useState,useEffect} from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from 'react-simple-code-editor'
import Prism from 'prismjs'
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import api from './lib/axios'
import rehypHighlight from 'rehype-highlight'
import "highlight.js/styles/github-dark.css"
import {FileCode} from 'lucide-react'
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-javascript";


const App = () => {

const [code, setCode] = useState(`function hello(){console.log("Hello World!"}`)
const [loading, setLoading] =useState(false)
const [review,setReview] = useState(``)
const [language,setLanguage] = useState(`js`)
const [target,setTarget]=useState('explain')


const handleClear=()=>{
  setCode(``)
  setReview(``)
}

  const handleSubmit =async()=>{
    setLoading(true)
      try{
        const response= await api.post('/getreview',{code,language,target})
        console.log(response.data)
        setReview(response.data)
      }catch(err){
        console.error("Error occured while fetching review", err)
      }finally{
        setLoading(false)
      }
  }

  useEffect(()=>{
  },[language,target])

  return (
    <div className='h-screen grid grid-rows-[10%_90%]'>
    <div className=' bg-green-800 text-white shadow-md flex items-center justify-between px-4 border-b-white border-b-2 relative'>
      <h1 className='font-serif text-3xl text-green-400 tracking-wider flex items-center justify-around'><FileCode className="text-white mr-2"/>Code<span className="text-white">Reviewer</span></h1>
      <select 
      value={target}
      onChange={(e)=>setTarget(e.target.value)}
      className="border-2 border-white text-white rounded-lg font-normal px-4 py-2 hover:cursor-pointer hover:bg-white hover:text-black absolute right-70 top-3.4">
        <option value="explain" className="bg-white text-green-800">Explain</option>
        <option value="optimize" className="bg-white text-green-800">Optimize</option>
      </select>
      <select 
      value={language}
      onChange={(e)=>setLanguage(e.target.value)}
      className="border-2 border-white text-white rounded-lg font-normal px-4 py-2 hover:cursor-pointer hover:bg-white hover:text-black absolute right-32 top-3.4">
        <option value="javascript" className="bg-white text-green-800">Java-Script</option>
        <option value="python" className="bg-white text-green-800">Python</option>
        <option value="java" className="bg-white text-green-800">Java</option>
        <option value="cpp" className="bg-white text-green-800">C++</option>
        <option value="c" className="bg-white text-green-800">C</option>
      </select>
      <button onClick={handleClear} className='border-2 border-white text-white hover:bg-white hover:text-black px-7 py-2 rounded-lg select-none cursor-pointer '>Clear</button>
    </div>
    <div className='app_container w-full flex bg-[#1e1e1e]'>
      <div className="w-1/2 h-full flex flex-col bg-[#343434] relative border-2 border-r-white">
      <div className=' w-full h-full bg-[#000000] text-white overflow-auto p-2'>
      <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => Prism.highlight(code, Prism.languages[language], language)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          minHeight: '90%',
          outline: 0,
          overflow: 'auto',
        }}
      />
      </div>
        <button className="absolute bottom-4 right-4 bg-green-800 text-white px-7 py-2 rounded hover:bg-green-50 hover:text-black cursor-pointer select-none border-b border-gray-700" onClick={handleSubmit}>{loading?"Reviewing...":"Review"}</button>
      </div>
      <div className="w-1/2 h-full flex flex-col bg-[#343434] text-white px-4 py-4 overflow-auto text-sm">
    <Markdown
      children={review}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypHighlight]}
      style={{ minHeight: "90%" }}
    />
    </div>
    </div>
    </div>
  )
}



export default App
