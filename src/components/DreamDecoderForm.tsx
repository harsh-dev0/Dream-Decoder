"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FaSpinner } from "react-icons/fa"
import DreamDecoderResult from "./DreamDecoderResult"
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
  username: z.string().optional(),
  routine: z.string().optional(),
  dream: z.string().min(1, "Please enter your dream"),
})

export default function DreamDecoderForm() {
  const [decoded, setDecoded] = useState("")
  const [loading, setLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      routine: "",
      dream: "",
    },
  })

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL! ||
    "http://localhost:3001/api/dream-roast"

  const handleDecode = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          dream: values.dream,
          routine: values.routine,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setDecoded(data)
        toast({
          title: "Success",
          description: "Your dream roast has been generated!",
        })
      } else {
        setDecoded("Error: " + data.error)
        toast({
          variant: "destructive",
          title: "Error",
          description: data.error || "Something went wrong.",
        })
      }
      setShowResult(true)

      if (resultRef.current) {
        const isMobile = window.matchMedia("(max-width: 768px)").matches
        if (isMobile) {
          resultRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }
    } catch (err) {
      setDecoded("Something went wrong.")
      console.error(err)
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "An unexpected error occurred. Please try again later.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 p-6 flex flex-col lg:flex-row lg:items-start lg:gap-8">
      <div
        className={cn(
          "w-full transition-all duration-500 ease-in-out",
          showResult && !loading ? "lg:w-1/2" : "lg:w-full"
        )}
      >
        <div className="p-6 rounded-2xl shadow-lg bg-background border">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleDecode)}
              className="space-y-6"
            >
              {/* 1. Enter Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-semibold">
                      1. Enter Your username
                    </FormLabel>
                    <Textarea
                      rows={3}
                      placeholder="Your Username without any @ example: itshp7"
                      disabled={loading}
                      {...field}
                    />
                  </FormItem>
                )}
              />

              <div className="text-center font-semibold">Or</div>

              {/* 2. Enter Daily Routine */}
              <FormField
                control={form.control}
                name="routine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-semibold">
                      2. Manually enter your daily routine
                    </FormLabel>
                    <Textarea
                      rows={3}
                      placeholder="Wake up, scroll Twitter, drink coffee, daydream..."
                      disabled={loading}
                      {...field}
                    />
                  </FormItem>
                )}
              />

              {/* 3. Your end Goal or dream */}
              <FormField
                control={form.control}
                name="dream"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="text-xl font-semibold"
                      htmlFor="dream"
                    >
                      3. Your end Goal or dream
                    </FormLabel>
                    <Textarea
                      id="dream"
                      rows={3}
                      placeholder="Astronaut..."
                      disabled={loading}
                      required
                      {...field}
                    />
                  </FormItem>
                )}
              />

              {/* 4. Decode Your Dream */}
              <div>
                <FormLabel className="block text-xl font-semibold mb-2">
                  4. Decode your dream
                </FormLabel>
                <Button
                  type="submit"
                  disabled={loading || form.formState.isSubmitting}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      Decoding...{" "}
                      <FaSpinner className="animate-spin inline-block ml-2" />
                    </>
                  ) : (
                    "Decode My Dream ✨"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Result section with animation */}
      <div
        ref={resultRef}
        className={cn(
          "w-full mt-6 lg:mt-0 transition-all duration-500 ease-in-out",
          showResult
            ? "lg:w-1/2 opacity-100 translate-x-0 "
            : "lg:w-0 opacity-0 lg:translate-x-full"
        )}
      >
        {decoded && (
          <div className="p-6 rounded-2xl shadow-lg bg-background border h-full">
            {loading ? (
              <DreamDecoderResult decoded={null} />
            ) : (
              decoded && <DreamDecoderResult decoded={decoded} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
