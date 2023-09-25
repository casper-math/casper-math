import { Step } from './interfaces'

export default function log(step: Step): void {
    Logger.getInstance().steps.push(step)
}

export function getLogs(): Step[] {
    return Logger.getInstance().steps
}

export function clearLogs(): void {
    Logger.getInstance().steps = []
}

class Logger {
    private static instance: Logger

    steps: Step[] = []

    static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger()
        }

        return Logger.instance
    }
}
