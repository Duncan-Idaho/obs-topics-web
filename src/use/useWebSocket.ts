import { toValue, watch, type MaybeRefOrGetter } from "vue"

export type VdoNinjaApi = {
  apiKey: MaybeRefOrGetter<string>,
  markTopicAsDone: () => void,
  moveTopicToLast: () => void,
}

export function useVdoNinjaApi(options: VdoNinjaApi) {

	let socket: WebSocket | null = null
	let connecting: number | undefined = undefined
	let failedCount = 0

  watch(
    () => options.apiKey,
    () => connect(),
    { immediate: true }
  )

  function scheduleReconnect() {
    connecting = setTimeout(function () {
      connect()
    }, 100 * failedCount)
    failedCount++
  }

	function connect() {
		clearTimeout(connecting)

    socket?.close()
    if (!toValue(options.apiKey))
      return

		socket = new WebSocket("wss://api.vdo.ninja:443")

		socket.onclose = scheduleReconnect
		socket.onerror = scheduleReconnect

		socket.onopen = function () {
      if (!socket)
        return
      
      const join = toValue(options.apiKey)
      if (!join)
        return

			failedCount = 0
			try {
				socket.send(JSON.stringify({ join }))
			} catch {
				scheduleReconnect()
			}
		}

		socket.onmessage = handleMessage
  }

  async function handleMessage(event: MessageEvent) {
    if (!event.data || !(event.currentTarget instanceof WebSocket))
      return

    let data = JSON.parse(event.data)

    if ("msg" in data) {
      data = data.msg
    }

    if (!("action" in data))
      return

    const result = processAction(data.action)
    if (result !== undefined) {
      data.result = result
      event.currentTarget.send(JSON.stringify({
        callback: data
      }))
    }
	}

  function processAction(action: string) {
    if (action == "mark-topic-as-done") {
      return options.markTopicAsDone()
    } else if (action == "move-topic-to-last") {
      return options.moveTopicToLast()
    }
  }
}
