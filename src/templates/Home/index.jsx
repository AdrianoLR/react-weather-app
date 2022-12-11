import "./home.css";
import React, { Component, useState } from "react";
import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/Posts/index";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState([]);

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue
  ? posts.filter((post) => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    })
  : posts;

  const loadPosts = async () => {
        const { page, postsPerPage } = this.state;
        const postsAndPhotos = await loadPosts();
        this.setState({
          posts: postsAndPhotos.slice(page, postsPerPage),
          allPosts: postsAndPhotos,
        });

        setPosts(postsAndPhotos.slice(page, postsPerPage));
        setAllPosts(postsAndPhotos);
      };

  const loadMorePosts = () => {
        const { page, postsPerPage, allPosts, posts } = this.state;
        const nextPage = page + postsPerPage;
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
        posts.push(...nextPosts);
    
        setPosts(posts);
        setPage(nextPage);
      };
    
  const handleChange = (e) => {
        const { value } = e.target;
        this.setState({ searchValue: value });
      };
  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1>Search Value: {searchValue}</h1>}
        <TextInput
          searchValue={searchValue}
          handleChange={handleChange}
        />
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      {filteredPosts.length === 0 && <p>Sorry, don't have any posts.</p>}

      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
}

// export class Home2 extends Component {
//   componentDidMount() {
//     this.loadPosts();
//   }
 
//   loadPosts = async () => {
//     const { page, postsPerPage } = this.state;
//     const postsAndPhotos = await loadPosts();
//     this.setState({
//       posts: postsAndPhotos.slice(page, postsPerPage),
//       allPosts: postsAndPhotos,
//     });
//   };

//   loadMorePosts = () => {
//     const { page, postsPerPage, allPosts, posts } = this.state;
//     const nextPage = page + postsPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
//     posts.push(...nextPosts);

//     this.setState({ posts, page: nextPage });
//   };

//   handleChange = (e) => {
//     const { value } = e.target;
//     this.setState({ searchValue: value });
//   };
  
//   render() {
//     return 0;
//   }

// }
export default Home;
