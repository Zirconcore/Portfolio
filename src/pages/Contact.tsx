import { useState, type FormEvent } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { site } from '@/data/site'

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

function encode(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
}

export function Contact() {
  const [status, setStatus] = useState<SubmitStatus>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload: Record<string, string> = { 'form-name': 'contact' }
    formData.forEach((value, key) => {
      payload[key] = value.toString()
    })

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(payload),
      })
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <SectionHeading
        eyebrow=""
        title="Contacto"
        description={`Ideas claras. Software útil. Desarrollo aplicaciones web y móviles para convertir necesidades reales en soluciones digitales.`}
      />
      <SectionHeading
        eyebrow=""
        title=""
        description={`Envia un mensaje a ${site.email}.`}
      />
      {status === 'success' ? (
        <p className="rounded-md border border-slate-200 bg-slate-50 p-4 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Muchas gracias por ponerte en contacto. Te responderé lo antes posible.
        </p>
      ) : (
        <form name="contact" onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              No lo rellenes este espacio: <input name="bot-field" />
            </label>
          </p>

          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-slate-900 dark:text-white"
            >
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-900 dark:text-white"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-sm font-medium text-slate-900 dark:text-white"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          {status === 'error' && (
            <p className="text-sm text-red-600 dark:text-red-400">
              Algo salió mal al enviar tu mensaje. Por favor, inténtalo de nuevo o envía un correo electrónico a {site.email}{' '}
              directamente.
            </p>
          )}

          <Button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Enviando…' : 'Enviar mensaje'}
          </Button>
        </form>
      )}
    </div>
  )
}
