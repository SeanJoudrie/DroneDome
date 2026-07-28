import { Component, type ErrorInfo, type ReactNode } from 'react'

/**
 * A physics NaN, a malformed saved build or a failed model fetch used to take
 * the whole page to white with nothing on screen to explain it. This catches
 * the render and offers the one action that reliably recovers: drop the local
 * state and start again.
 */
export class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('DroneDome crashed while rendering', error, info.componentStack)
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="crash">
        <div className="crash-card">
          <h1>That build broke something.</h1>
          <p>
            The simulator hit an error it could not render around. This is a bug — a
            build should never be able to do this, however absurd it is.
          </p>
          <pre>{this.state.error.message}</pre>
          <div className="crash-actions">
            <button className="btn" onClick={() => this.setState({ error: null })}>
              Try again
            </button>
            <button
              className="btn primary"
              onClick={() => {
                try {
                  localStorage.removeItem('dronedome.builds.v1')
                  localStorage.removeItem('dronedome.prefs.v1')
                } catch {
                  /* nothing else to try */
                }
                location.reload()
              }}
            >
              Clear saved data and reload
            </button>
          </div>
        </div>
      </div>
    )
  }
}
