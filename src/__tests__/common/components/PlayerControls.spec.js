import React from 'react';
import { shallow } from 'enzyme'
import { PlayerControls, getProgress } from 'common/components/PlayerControls'
import Grid from '@material-ui/core/Grid';
import PlayIcon from '@material-ui/icons/PlayArrow';
import Fab from '@material-ui/core/Fab';
import PauseIcon from '@material-ui/icons/Pause'
import CircularProgress from '@material-ui/core/CircularProgress';


describe('PlayerControls component should', () => {
    it('render correctly', () => {
        const component = shallow(<PlayerControls />)
        expect(component).toMatchSnapshot('PlayerControls renders with no props');
    });

    it('not render anything if songInfo is undefined', () => {
        const classes = {
            songName: "songName",
            songArtists: "songArtists"
        }
        const songInfo = undefined

        const component = shallow(<PlayerControls classes={classes} songInfo={songInfo} />)
        expect(component.find(Grid)).toHaveLength(0)
    })

    it('render song and artist', () => {
        const classes = {
            songName: "songName",
            songArtists: "songArtists"
        }
        const songInfo = {
            name: "TestName",
            artists: [
                {
                    name: "TestArtist"
                }
            ]
        }

        const component = shallow(<PlayerControls classes={classes} songInfo={songInfo} />)
        const songName = component.find('.songName');
        const songArtist = component.find('.songArtists')
        expect(songName.text()).toEqual('TestName')
        expect(songArtist.text()).toEqual('TestArtist')
    })

    it('render a play button if isPlaying is false', () => {
        const classes = {}

        const songInfo = {
            name: "",
            artists: []
        }

        const component = shallow(<PlayerControls songInfo={songInfo} classes={classes} loading={false} isPlaying={false} />)
        const button = component.find(PlayIcon);
        expect(button).toHaveLength(1)
    })
    
    
    it('render a pause button if isPlaying is true', () => {
        const classes = {}

        const songInfo = {
            name: "",
            artists: []
        }

        const component = shallow(<PlayerControls songInfo={songInfo} classes={classes} loading={false} isPlaying={true} />)
        const button = component.find(PauseIcon);
        expect(button).toHaveLength(1)
    })

    it('render a loading indicator in the button if loading is true', () => {
        const classes = {}

        const songInfo = {
            name: "",
            artists: []
        }

        const component = shallow(<PlayerControls songInfo={songInfo} classes={classes} loading={true} isPlaying={true} />)
        const button = component.find(CircularProgress);
        expect(button).toHaveLength(1)
    })

    it('render song duration and progress', () => {
        const classes = {
            songProgress: "songProgress"
        }

        const songInfo = {
            name: "",
            artists: [],
            duration_ms: 5000
        }

        const component = shallow(<PlayerControls progress={2000} songInfo={songInfo} classes={classes} loading={false} isPlaying={true} />)
        const progress = component.find('.songProgress');
        expect(progress.text()).toEqual('0:02 / 0:05')
    })

    it('dispatch switchPlaying on play button click', () => {
        const classes = {}

        const songInfo = {
            name: "",
            artists: []
        }
        
        const switchPlaying = jest.fn()

        const component = shallow(<PlayerControls pauseResumePlayer={switchPlaying} songInfo={songInfo} classes={classes} loading={false} isPlaying={true} />)
        component.find(Fab).simulate('click');
        expect(switchPlaying).toHaveBeenCalledTimes(1)
    })
})

describe('getProgress function should', () => {
    it('return the right progress', () => {
        const secondsProgress = 5
        const secondsDuration = 60
        const expectedReturn = "0:05 / 1:00"
        expect(getProgress(secondsProgress * 1000, secondsDuration * 1000)).toEqual(expectedReturn)
    })
})