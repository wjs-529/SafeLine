import React from "react";
import { Box, Grid, Button, Typography, Container, Stack } from "@mui/material";
import Image from 'next/image'
import DiscussionList from '@/components/community/DiscussionList'
import IssueList from '@/components/community/IssueList'
import { getDiscussions, getIssues } from "@/api";

type CommunityPropsType = {
  discussions: any[];
  issues: any[];
};

export async function getServerSideProps() {
  let discussions = []
  let issues = []
  let isClient = true
  if (typeof window === 'undefined') {
    isClient = false
  }
  try {
    discussions = await getDiscussions('', isClient);
    issues = await getIssues('', isClient);
  
  } finally {
    return {
      props: {
        discussions: discussions || [],
        issues: issues || [],
      },
    }
  }
}

function Community({ discussions, issues }: CommunityPropsType) {
  return (
    <main title="社区 - 长亭雷池 WAF 社区版">
      <Box>
        <Box
          sx={{
            width: "100%",
            height: "380px",
            backgroundImage: "url(/images/community-banner.png)",
            backgroundSize: "cover",
            position: 'relative',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Container>
            <Box pt={23}>
              <Typography variant="h2" sx={{ fontFamily: "AlimamaShuHeiTi-Bold" }}>通过社区获取更多帮助</Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.5 }} mt={1}>同样欢迎你的参与</Typography>
            </Box>
          </Container>
        </Box>
        <Container sx={{ pt: 6, mb: 18 }}>
          <DiscussionList value={discussions} />
        </Container>
        <Container>
          <IssueList value={issues} />
        </Container>
        <Container>
          <Box
            px={6}
            py={6}
            sx={{
              mt: 19,
              background: "#111227",
              borderRadius: "16px",
            }}
            className="flex flex-col justify-center"
          >
            <Grid container>
              <Grid item xs={12} md={6}>
                <Stack sx={{ color: "common.white" }}>
                  <Typography variant="h3" sx={{ fontSize: "36px" }}>绕过反馈</Typography>
                  <Typography mt={1} variant="body1" sx={{ opacity: 0.5 }}>向 CT Stack 安全社区提交雷池 XSS、SQL 绕过，可获取积分奖励</Typography>
                  <Button
                    variant="outlined"
                    target="_blank"
                    sx={{
                      width: { xs: "146px" },
                      height: "50px",
                      mt: 10,
                      fontSize: "16px",
                      backgroundColor: "common.white",
                    }}
                    href="https://stack.chaitin.com/security-challenge/safeline/index"
                  >
                    去提交
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6} display="flex" justifyContent={{ sx: 'flex-start', md: 'flex-end' }} mt={{ xs: 2, md: 0 }}>
                <Box
                  sx={{
                    width: { xs: '100%', md: '367px' },
                    height: { xs: 'auto', md: '206px' }
                  }}
                >
                  <Image
                    src="/images/feedback.svg"
                    alt=""
                    layout="responsive"
                    width={100}
                    height={100}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Container>
          <Box
            sx={{
              backgroundImage: "url(/images/partner-bg.svg)",
              backgroundSize: "cover",
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <Box textAlign="center" pt={13} pb={12}>
              <Image
                src="/images/wechat-230825.png"
                alt="wechat"
                width={300}
                height={300}
              />
              <Typography variant="h4" mt={3}>微信讨论组</Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </main>
  );
}

export default Community;
