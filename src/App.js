import {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

import LoginRoute from './components/Login'
import HomeRoute from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import TrendingRoute from './components/Trending'
import GamingRoute from './components/Gaming'
import VideoItemDetailsRoute from './components/VideoItemDetails'
import SavedVideosRoute from './components/SavedVideosRoute'
import NotFoundRoute from './components/NotFound'

import NxtWatchAppContext from './Context/NxtWatchAppContext'

import './App.css'

class App extends Component {
  state = {
    isDarkModeEnabled: false,
    savedVideosList: [],
    videosReactionList: [],
  }

  onToggleDarkMode = () => {
    this.setState(prevState => ({
      isDarkModeEnabled: !prevState.isDarkModeEnabled,
    }))
  }

  onSaveVideo = videoDetails => {
    const {savedVideosList} = this.state
    const updatedVideoDetails = {...videoDetails, isVideoSaved: true}
    this.setState({
      savedVideosList: [...savedVideosList, updatedVideoDetails],
    })
  }

  onUnSaveVideo = id => {
    const {savedVideosList} = this.state
    const filteredList = savedVideosList.filter(eachitem => eachitem.id !== id)
    this.setState({savedVideosList: filteredList})
  }

  onLikeVideo = id => {
    const {videosReactionList} = this.state
    const filteredList = videosReactionList.filter(
      eachitem => eachitem.id === id,
    )
    if (filteredList.length === 0) {
      this.setState({
        videosReactionList: [
          ...videosReactionList,
          {id, isVideoLiked: true, isVideoDisLiked: false},
        ],
      })
    } else {
      const newList = videosReactionList.map(eachitem => {
        if (eachitem.id === id) {
          return {id, isVideoLiked: true, isVideoDisLiked: false}
        }
        return eachitem
      })
      this.setState({videosReactionList: newList})
    }
  }

  onDislikeVideo = id => {
    const {videosReactionList} = this.state
    const filteredList = videosReactionList.filter(
      eachitem => eachitem.id === id,
    )
    if (filteredList.length === 0) {
      this.setState({
        videosReactionList: [
          ...videosReactionList,
          {id, isVideoLiked: false, isVideoDisLiked: true},
        ],
      })
    } else {
      const newList = videosReactionList.map(eachitem => {
        if (eachitem.id === id) {
          return {id, isVideoLiked: false, isVideoDisLiked: true}
        }
        return eachitem
      })
      this.setState({videosReactionList: newList})
    }
  }

  render() {
    const {isDarkModeEnabled, savedVideosList, videosReactionList} = this.state
    return (
      <NxtWatchAppContext.Provider
        value={{
          isDarkModeEnabled,
          savedVideosList,
          videosReactionList,
          onToggleDarkMode: this.onToggleDarkMode,
          onSaveVideo: this.onSaveVideo,
          onUnSaveVideo: this.onUnSaveVideo,
          onLikeVideo: this.onLikeVideo,
          onDislikeVideo: this.onDislikeVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute exact path="/gaming" component={GamingRoute} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetailsRoute}
          />
          <ProtectedRoute
            exact
            path="/saved-videos"
            component={SavedVideosRoute}
          />
          <ProtectedRoute exact path="/not-found" component={NotFoundRoute} />
          <Redirect to="/not-found" />
        </Switch>
      </NxtWatchAppContext.Provider>
    )
  }
}

export default App
