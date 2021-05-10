import logo from './logo.svg';
import './App.css';
import { getTopHeadLines, getNextNewsArticles} from "./headlinesApi";
import { Container, Header, Button, FormButton } from "semantic-ui-react";
import React from "react";
import ArticleList from "./components/ArticleList";

class App extends React.Component {
  state = {
    articles: [],
    apiError: "",
    totalPages: 0,
    pageNum:0,
  };

  async componentDidMount() {
    try {
        this.getNews(false, true);
        if(this.state.pageNum ===1){
        setInterval(async () => {
          this.getNews(false, true);
      }, 300000);
    }
    }
    catch (error) {
      this.setState({ apiError: "Service Unavailable. Please try after some time"});
    }
  }
  render() {
    const { articles, apiError } = this.state;
    return (
      <div>
      <Container style = {{paddingBottom:25}}>
        <Header as="h1" style={{ textAlign: "center", margin: 20, color:"purple " }}>
          <b>Latest News</b>
        </Header>
        {articles.length > 0 && <ArticleList articles={articles} />}
        {apiError && <h2 style={{textAlign: 'center'}}>{apiError}</h2>}
        <div style = {{paddingTop: 25}}>
        <button id = "next" disabled = {this.state.pageNum >= this.state.totalPages} class="ui right labeled icon button" style={{float: "right" , color:"green"}} onClick= {() => this.getNews(true,false)}>
        <i class="right arrow icon"></i>
          Next
        </button>
        <button id="prev" disabled = {this.state.pageNum === 1} class="ui left labeled icon button" style={{float: "left" , color:"green"}} onClick= {() =>  this.getNews(false,false)}>
        <i class="left arrow icon"></i>
          Previous
        </button>
        </div>
        </Container>
        
        <div style={{paddingTop:50}}></div>
        </div>


    );
  }
  getNews = async (next, reset) =>{

    const{pageNum,totalPages} = this.state;
     let page = next?pageNum +1:pageNum-1;
     if(page < 0) page = 1;
    const response = await getTopHeadLines(page);
    this.setState({
      articles: response.articles,
      pageNum: page
     
    });
    if(reset){
       this.setState({
         totalPages: Math.ceil(response.totalResults/10)
       });
    }
   
  }
 
}
export default App;
