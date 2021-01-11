import { fireEvent } from '@testing-library/react';
import React, { memo, useState, useEffect } from 'react'
import {
  CodeForceTitleSection,
  NewsItem
} from '../Miscellaneous/Miscellaneous.component';



const Home = () => {

  
  const [newsItems, setNewsItems] = useState([]);


  //Fetch data from server
  useEffect(() => {
    fetchNewsPosts();
  }, []);

  const fetchNewsPosts = async () => {
    let res = await(await(fetch("https://uwcodeforce.ca/api/news"))).json();
    if(res) {
      for(let i = 0; i < res.length; i++) { //Convert times to Date()
        res[i].time = new Date(res[i].time);
      }
      setNewsItems(res);
    }
  }

  // Maybe make a server call for new updates. But that for later.

  return (
    <div className="container-fluid fullscreen intro">
      <CodeForceTitleSection/>
      <div className="row">
        <div className="col-sm-9 col-centered mt-4">
          <h1 className="p-3 text-center">Updates</h1>
          <div className="row pt-4">
            <div className="col-sm-8 p-0 w-100">
              {[...newsItems].sort((v1, v2) => v1.time > v2.time ? -1: 1).map((item, index) => {
                return (
                  <NewsItem key={item.title} even={index % 2 === 0}>
                    <div className="d-flex justify-content-between">
                      <h4 className="pb-3">
                        {item.title}
                      </h4>
                      <small>{item.time.toDateString()}</small>
                    </div>
                    <div>
                      <p dangerouslySetInnerHTML={{__html: item.content}}/>
                    </div>
                  </NewsItem>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default memo(Home)