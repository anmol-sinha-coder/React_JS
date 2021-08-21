import React, { useEffect, useState } from "react";
import jumanji from './jumanji.json';
import useDebounce from './debounce';
import axios from "axios";

const divstyles ={
  position: 'fixed',
  top: '10%',
  maxWidth: '50%', 
  maxHeight: '50%',  
  margin: 'auto', 
  padding: '10px'}

function App(){
  // const classes=styles();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [noValue,setnoValue] =useState(false);
  
    const debouncedSearchTerm = useDebounce(searchTerm, 3000);
    const getResults = () => {
      axios
        .get("./jumanji.json")
        .then((response) => {
          setResults([...response.data]);
        })
        .then((error) => {
          console.log("Error", error);
        });
    };
   
    useEffect(
      () => {
        if (debouncedSearchTerm) {
          setIsSearching(true);
          const filter = jumanji.filter(autho => {
           getResults();
            return autho.author.toLowerCase().startsWith(debouncedSearchTerm.toLowerCase());
          });
          
          setIsSearching(false);
          if(IsnoValue(filter)===1 ){
            
            setnoValue(true);

          }else{
            setnoValue(false);
            setResults(filter);
          }
          
        
          // setIsSearching(false);
          
        } else {

          setResults([]);
        }
      },
      [debouncedSearchTerm]
    );
  
    function IsnoValue(result){
      if(result.length==0){
        return 1;
      }
      return null;
   }  
  
    return (
      <div style={{display:"flex",justifyContent:"center"}}>
        <div style={divstyles}>
        <input  style={{padding:"10px",width:"700px"}}
          placeholder="Search Author"
          onChange={e => {setSearchTerm(e.target.value); if(e.target.value == '')setnoValue(false)}}
        />
        {isSearching && <div>Searching ...</div>}
        {noValue && <div><h1 style={{textAlign:"center",color:"red"}}>No Results Found</h1></div>}
        {results.map((result, index) => (
          <div key={result.isbn} style={{lineHeight:0.5, width:"700px"}}>
            <h2>isbn: {result.isbn}</h2>
            <h2>title: {result.title}</h2>
            <h2>subtitle: {result.subtitle}</h2>
            <h2>author: {result.author}</h2>
          </div>
        ))}
        
      </div>
      </div>
    );
   
  
  
  
  




  
  
  
}

export default App;
