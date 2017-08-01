import React, { Component } from 'react';
import $ from 'jquery';

class News extends Component {
    state = {
        stories: [],
        topStories: []
    }
    componentDidMount() {
        $.get('http://news-at.zhihu.com/api/4/news/latest').then(resp => {
            console.log(resp);
            this.setState({
                stories: resp.stories,
                topStories: resp.top_stories
            })
        })
    }
    render() {
        const { stories, topStories } = this.state;
        // 观察每一次render数据的变化
        console.log(this.state);
        return (
            <div className="latest-news">
                <section className="part1">
                    <div className="title">最热</div>
                    <div className="container">
                        {
                            topStories.map((item, i) => (
                                <div className="item-box" key={i}>
                                    <img src={ item.image } alt=""/>
                                    <div className="sub-title">{ item.title }</div>
                                </div>
                            ))
                        }
                    </div>
                </section>

                <section className="part2">
                    <div className="title">热门</div>
                    <div className="container">
                        {
                            stories.map((item, i) => (
                                <div className="item-box" key={i}>
                                    <img src={ item.images[0] } alt=""/>
                                    <div className="sub-title">{ item.title }</div>
                                </div>
                            ))
                        }
                    </div>
                </section>
            </div>
        )
    }
}

export default News;
