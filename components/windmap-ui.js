import React from 'react'
import { render } from 'react-dom'

import LevelDropdown from './LevelDropdown'
import ElementDropdown from './ElementDropdown'
import TimeSlider from './TimeSlider'
import Loader from './Loader'

const style = {
	position: 'absolute',
	bottom: 0,
	left: 0,
	zIndex: 20,
	display: 'inline-block',
	paddingLeft: 10,
}

class WindmapUI extends React.Component {
	state = {
		showTimeSlider: false,
		interval: '1h',
		level: 'surface',
		loading: true,
	}

	constructor(props) {
		super(props)

		let self = this
		window.windmapUI = {
			setTimeSlider: function (start, end, now){
				self.setState({ showTimeSlider: true, start, end, now })
			},
			changeTimeSliderTime: function (now){
				self.setState({ now })
			},
			changeTimeSliderInterval: function (interval){
				self.setState({ interval })
			},
			setLevel: function (level){
				self.setState({ level })
			},
			showLoading: function (){
				self.setState({ loading: true })
			},
			hideLoading: function (){
				self.setState({ loading: false })
			},
		}
	}

	render() {
		let state = this.state

		return (
			<div style={style}>
				<LevelDropdown level={state.level} />
				<ElementDropdown />
				{(() => {
					if (state.showTimeSlider){
						return (
							<TimeSlider 
								start={state.start}
								end={state.end}
								now={state.now}
								interval={state.interval}
								loading={state.loading}
							/>
						)
					}
				})()}
				{(() => {
					if (state.loading){
						return (
							<Loader />
						)
					}
				})()}
			</div>
		)
	}
}


render(
	<WindmapUI />,
	document.getElementById('app')
)

